const CONSERVATION_FUND_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const COMMUNITY_INCENTIVES_ADDRESS = "0x646975e797BBd23B1252551af67424Dbe4d2e88E";

const CONSERVATION_FUND_ABI = ["function donate() payable"];
const COMMUNITY_INCENTIVES_ABI = [
  "function reportConservationCase()",
  "function redeemPoints(uint256 _pointsToRedeem, string calldata _itemDescription)",
  "function points(address) view returns (uint256)"
];

const CONSERVATION_PROJECTS = {
  general: { name: "General Wildlife Fund", impact: "Supports various conservation efforts" },
  tigers: { name: "Save the elephants", impact: "Protects 1 tiger for every 0.1 ETH donated" },
  oceans: { name: "buffaloes's Protection Initiative", impact: "Removes 10kg of plastic for every 0.01 ETH" },
  forests: { name: "African lions", impact: "Saves 100 sqm of forest for every 0.05 ETH" }
};

let provider, signer, conservationFundContract, communityIncentivesContract;
let isConnecting = false;

window.addEventListener("DOMContentLoaded", async () => {
  if (!localStorage.getItem("currentUser")) {
    window.location.href = "login.html";
    return;
  }

  const projectSelect = document.getElementById("projectSelect");
  if (projectSelect) {
    projectSelect.innerHTML = Object.entries(CONSERVATION_PROJECTS)
      .map(([id, proj]) => `<option value="${id}">${proj.name}</option>`)
      .join("");
  }

  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);
    if (accounts.length > 0) {
      await connectWallet(accounts[0]);
    } else {
      showStatus("Connect your wallet to begin.", "info");
    }
  } else {
    showStatus("MetaMask not detected!", "error");
  }
});

document.getElementById("connectBtn").addEventListener("click", async () => {
  if (!window.ethereum || isConnecting) {
    showStatus("MetaMask is not available or already connecting.", "info");
    return;
  }

  isConnecting = true;
  const btn = document.getElementById("connectBtn");
  btn.disabled = true;
  btn.textContent = "Connecting...";

  try {
    provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);
    let account;

    if (accounts.length > 0) {
      account = accounts[0];
    } else {
      const requested = await provider.send("eth_requestAccounts", []);
      account = requested[0];
    }

    await connectWallet(account);

  } catch (err) {
    if (err.code === -32002) {
      showStatus("MetaMask is already connecting. Check your browser popup.", "error");
    } else {
      showStatus(`Connection error: ${err.message}`, "error");
    }
  } finally {
    btn.disabled = false;
    btn.textContent = "Connect Wallet";
    isConnecting = false;
  }
});

async function connectWallet(address) {
  signer = await provider.getSigner();
  conservationFundContract = new ethers.Contract(CONSERVATION_FUND_ADDRESS, CONSERVATION_FUND_ABI, signer);
  communityIncentivesContract = new ethers.Contract(COMMUNITY_INCENTIVES_ADDRESS, COMMUNITY_INCENTIVES_ABI, signer);

  updateWalletDisplay(address);
  await updateBalance();
  await updatePointsDisplay();
  updateDonationHistory();
  updateImpactStats();
  showStatus("Wallet connected!", "success");
}

function updateWalletDisplay(address) {
  const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const btn = document.getElementById("connectBtn");
  btn.innerHTML = `<span>${short}</span> <span id="copyIcon">📋</span>`;
  document.getElementById("copyIcon").onclick = () => {
    navigator.clipboard.writeText(address);
    showStatus("Address copied!", "success");
  };
}

async function updateBalance() {
  const address = signer?.address;
  if (!address) return;
  const balance = await provider.getBalance(address);
  document.getElementById("balance").textContent = parseFloat(ethers.formatEther(balance)).toFixed(4);
}

async function updatePointsDisplay() {
  const userPointsElem = document.getElementById("userPoints");
  try {
    if (!signer || !communityIncentivesContract) {
      userPointsElem.textContent = "Connect wallet";
      return;
    }
    const user = signer?.address;
    if (!user) {
      userPointsElem.textContent = "Address error";
      return;
    }
    const points = await communityIncentivesContract.points(user);
    userPointsElem.textContent = points.toString();
  } catch (err) {
    console.error("Points error:", err);
    userPointsElem.textContent = "Error";
    showStatus("Failed to fetch points: " + (err?.message || ""), "error");
  }
}

function showStatus(message, type = "info") {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    backgroundColor:
      type === "error" ? "#ff4444" :
      type === "success" ? "#00C851" : "#33b5e5"
  }).showToast();
}

document.getElementById("donateForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const amountInput = document.getElementById("donationAmount");
  let amount = parseFloat(amountInput.value);

  if (!signer || !conservationFundContract || isNaN(amount) || amount < 0.001) {
    showStatus("Invalid donation or wallet not connected.", "error");
    return;
  }

  if (amount > 0.001) {
    amount = 0.001;
    amountInput.value = "0.001";
    showStatus("Adjusted donation to 0.001 ETH for testing.", "info");
  }

  try {
    showStatus("Processing donation...", "info");
    const tx = await conservationFundContract.donate({ value: ethers.parseEther(amount.toString()) });
    await tx.wait();

    const donation = {
      amount,
      project: document.getElementById("projectSelect").value,
      timestamp: new Date().toISOString()
    };

    const donations = JSON.parse(localStorage.getItem("conservationDonations") || "[]");
    donations.push(donation);
    localStorage.setItem("conservationDonations", JSON.stringify(donations));

    updateDonationHistory();
    updateImpactStats();
    await updateBalance();
    showStatus("Thank you for your donation!", "success");
  } catch (error) {
    showStatus(`Donation failed: ${error.message}`, "error");
  }
});

function updateDonationHistory() {
  const donations = JSON.parse(localStorage.getItem("conservationDonations") || "[]");
  const container = document.getElementById("txHistory");
  if (!container) return;

  donations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  container.innerHTML = donations.length === 0
    ? `<li>No donations yet.</li>`
    : donations.map(d => {
        const project = CONSERVATION_PROJECTS[d.project] || CONSERVATION_PROJECTS.general;
        return `
          <li class="history-item">
            <div class="history-header">
              <strong>${project.name}</strong>
              <span>${parseFloat(d.amount).toFixed(4)} ETH</span>
            </div>
            <div class="history-details">
              <em>${project.impact}</em>
              <small>${new Date(d.timestamp).toLocaleString()}</small>
            </div>
          </li>
        `;
      }).join("");
}

function updateImpactStats() {
  const donations = JSON.parse(localStorage.getItem("conservationDonations") || "[]");
  const total = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);
  document.getElementById("totalDonated").textContent = `${total.toFixed(4)} ETH`;

  let impact = 0;
  donations.forEach(d => {
    const amount = parseFloat(d.amount);
    switch (d.project) {
      case "tigers": impact += amount / 0.1; break;
      case "oceans": impact += (amount / 0.01) * 10; break;
      case "forests": impact += (amount / 0.05) * 100; break;
      default: impact += amount * 10;
    }
  });

  document.getElementById("speciesProtected").textContent = donations.length === 0 ? "No donations yet" : Math.round(impact);
}

document.getElementById("reportBtn").addEventListener("click", async () => {
  if (!signer || !communityIncentivesContract) {
    showStatus("Wallet not connected.", "error");
    return;
  }

  try {
    showStatus("Reporting case...", "info");
    const tx = await communityIncentivesContract.reportConservationCase();
    await tx.wait();
    showStatus("Case reported! Points awarded.", "success");
    await updatePointsDisplay();
  } catch (err) {
    console.error("Report failed:", err);
    showStatus("Report failed: " + (err.message || ""), "error");
  }
});

document.getElementById("redeemPointsForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const points = parseInt(document.getElementById("pointsToRedeem").value);
  const description = document.getElementById("itemDescription").value.trim();

  if (!signer || !communityIncentivesContract) {
    showStatus("Wallet not connected.", "error");
    return;
  }

  if (isNaN(points) || points <= 0 || description === "") {
    showStatus("Please enter valid points and item.", "error");
    return;
  }

  try {
    showStatus("Redeeming points...", "info");
    const tx = await communityIncentivesContract.redeemPoints(points, description);
    await tx.wait();
    showStatus("Points redeemed!", "success");
    await updatePointsDisplay();
    document.getElementById("pointsToRedeem").value = "";
    document.getElementById("itemDescription").value = "";
  } catch (err) {
    console.error("Redemption failed:", err);
    showStatus("Redemption failed: " + (err.message || ""), "error");
  }
});
