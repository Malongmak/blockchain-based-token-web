// Replace with your actual donation address or smart contract address
// const DONATION_ADDRESS = "0x9736bDBc7Aa8c098F4228652743189C18ECFC165"; // Old donation address

// Placeholder for your deployed ConservationFund contract address
const CONSERVATION_FUND_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
// Placeholder for your deployed CommunityIncentives contract address
const COMMUNITY_INCENTIVES_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// ABI for ConservationFund contract (simplified for interaction)
const CONSERVATION_FUND_ABI = [
  "function donate() payable",
];

// ABI for CommunityIncentives contract (simplified for interaction)
const COMMUNITY_INCENTIVES_ABI = [
  "function reportConservationCase()",
  "function redeemPoints(uint256 _pointsToRedeem, string calldata _itemDescription)",
  "function points(address) view returns (uint256)"
];

// Conservation projects data
const CONSERVATION_PROJECTS = {
  general: {
    name: "General Wildlife Fund",
    impact: "Supports various conservation efforts"
  },
  tigers: {
    name: "Tiger Protection",
    impact: "Protects 1 tiger for every 0.1 ETH donated"
  },
  oceans: {
    name: "Ocean Cleanup",
    impact: "Removes 10kg of plastic for every 0.01 ETH"
  },
  forests: {
    name: "Rainforest Preservation",
    impact: "Saves 100 sqm of forest for every 0.05 ETH"
  }
};

let provider, signer, conservationFundContract, communityIncentivesContract;
let isConnecting = false;

// Connect wallet button handler
document.getElementById("connectBtn").onclick = async () => {
  if (!window.ethereum) {
    showStatus("MetaMask not detected! Please install it or open this page in a Web3 browser.", "error");
    console.error("MetaMask is not detected. window.ethereum is not available.");
    return;
  }

  if (isConnecting) {
    showStatus("Connection in progress, please wait...", "info");
    return;
  }
  isConnecting = true;

  try {
    // Request accounts from MetaMask. This will open the MetaMask popup.
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts || accounts.length === 0) {
      throw new Error("No Ethereum account was provided by MetaMask.");
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    const account = accounts[0]; // Use the first account returned

    // Initialize contract instances
    conservationFundContract = new ethers.Contract(CONSERVATION_FUND_ADDRESS, CONSERVATION_FUND_ABI, signer);
    communityIncentivesContract = new ethers.Contract(COMMUNITY_INCENTIVES_ADDRESS, COMMUNITY_INCENTIVES_ABI, signer);

    updateWalletDisplay(account);
    await updateBalance();
    updateDonationHistory();
    updateImpactStats();
    await updatePointsDisplay(); // New: Update points display
    showStatus("🔗 Wallet connected successfully!", "success");

  } catch (error) {
    console.error("Connection error:", error);

    if (error.code === 4001) {
      // User rejected the connection
      showStatus("Connection rejected by user. Please approve in MetaMask.", "error");
    } else if (error.code === -32002) {
      // Request already pending (e.g., user clicked connect multiple times)
      showStatus("⏳ MetaMask request already pending. Please check your wallet popup.", "error");
    } else {
      // Generic error
      showStatus(`Connection failed: ${error.message || error}`, "error");
    }
  } finally {
    isConnecting = false;
  }
};

// Update wallet UI
function updateWalletDisplay(address) {
  const connectBtn = document.getElementById("connectBtn");
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  connectBtn.innerHTML = `
    <span>${shortAddress}</span>
    <span id="copyIcon" title="Copy Address">📋</span>
  `;

  document.getElementById("copyIcon").onclick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(address);
    showStatus("Address copied!", "success");
  };
}

// Update ETH balance
async function updateBalance() {
  try {
    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    document.getElementById("balance").textContent = parseFloat(ethers.formatEther(balance)).toFixed(4);
  } catch (err) {
    console.error("Balance fetch error:", err);
  }
}

// Show toast message
function showStatus(message, type = "info") {
  const statusEl = document.getElementById("donationStatus");
  statusEl.textContent = message;
  statusEl.className = type;

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

// Handle donation form
document.getElementById("donateForm").onsubmit = async (e) => {
  e.preventDefault();

  const amountInput = document.getElementById("donationAmount");
  const donationAmount = parseFloat(amountInput.value);
  const selectedProject = document.getElementById("projectSelect").value;

  if (!signer || !conservationFundContract) { // Check for conservationFundContract
    showStatus("Please connect your wallet and ensure contracts are loaded first.", "error");
    return;
  }

  if (isNaN(donationAmount) || donationAmount <= 0) {
    showStatus("Please enter a valid donation amount.", "error");
    return;
  }

  try {
    showStatus("Processing donation...", "info");

    // Call the donate function on the ConservationFund contract
    const tx = await conservationFundContract.donate({ value: ethers.parseEther(donationAmount.toString()) });
    await tx.wait(); // Wait for the transaction to be mined

    console.log(`Donated ${donationAmount} ETH to Conservation Fund for ${selectedProject}`);

    // Simulate donation history (keep this for now, can be replaced by on-chain events later)
    const newDonation = {
      amount: donationAmount,
      project: selectedProject,
      timestamp: new Date().toISOString()
    };

    const donations = JSON.parse(localStorage.getItem("conservationDonations") || "[]");
    donations.push(newDonation);
    localStorage.setItem("conservationDonations", JSON.stringify(donations));

    updateDonationHistory();
    updateImpactStats();
    await updateBalance();

    showStatus("✅ Thank you for your donation!", "success");
    amountInput.value = "";

  } catch (error) {
    console.error("Donation error:", error);
    showStatus(`❌ Donation failed: ${error.message}`, "error");
  }
};

// New: Function to report a conservation case and earn points
document.getElementById("reportCaseBtn").onclick = async () => {
  if (!signer || !communityIncentivesContract) {
    showStatus("Please connect your wallet and ensure contracts are loaded first.", "error");
    return;
  }

  try {
    showStatus("Reporting case...", "info");
    const tx = await communityIncentivesContract.reportConservationCase();
    await tx.wait();
    await updatePointsDisplay();
    showStatus("✅ Case reported! You've earned points!", "success");
  } catch (error) {
    console.error("Report case error:", error);
    showStatus(`❌ Failed to report case: ${error.message || error}`, "error");
  }
};

// New: Function to redeem points
document.getElementById("redeemPointsForm").onsubmit = async (e) => {
  e.preventDefault();

  const pointsToRedeem = parseInt(document.getElementById("pointsToRedeem").value);
  const itemDescription = document.getElementById("redeemItemDescription").value;

  if (!signer || !communityIncentivesContract) {
    showStatus("Please connect your wallet and ensure contracts are loaded first.", "error");
    return;
  }

  if (isNaN(pointsToRedeem) || pointsToRedeem <= 0) {
    showStatus("Please enter a valid amount of points to redeem.", "error");
    return;
  }

  if (!itemDescription.trim()) {
    showStatus("Please enter a description for the item you are redeeming.", "error");
    return;
  }

  try {
    showStatus(`Redeeming ${pointsToRedeem} points...`, "info");
    const tx = await communityIncentivesContract.redeemPoints(pointsToRedeem, itemDescription);
    await tx.wait();
    await updatePointsDisplay();
    showStatus(`✅ Successfully redeemed ${pointsToRedeem} points for ${itemDescription}!`, "success");
    document.getElementById("pointsToRedeem").value = "";
    document.getElementById("redeemItemDescription").value = "";
  } catch (error) {
    console.error("Redeem points error:", error);
    showStatus(`❌ Failed to redeem points: ${error.message || error}`, "error");
  }
};

// New: Function to update and display user's points
async function updatePointsDisplay() {
  try {
    if (signer && communityIncentivesContract) {
      const userAddress = await signer.getAddress();
      const currentPoints = await communityIncentivesContract.points(userAddress);
      document.getElementById("userPoints").textContent = currentPoints.toString();
    }
  } catch (err) {
    console.error("Failed to fetch user points:", err);
    document.getElementById("userPoints").textContent = "Error";
  }
}

// Update donation history
function updateDonationHistory() {
  const donations = JSON.parse(localStorage.getItem("conservationDonations") || "[]");
  const container = document.getElementById("txHistory");
  if (!container) return;

  donations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  container.innerHTML = donations.length === 0
    ? `<li class="history-item"><p>No donations yet.</p></li>`
    : donations.map(d => {
        const project = CONSERVATION_PROJECTS[d.project] || CONSERVATION_PROJECTS.general;
        return `
          <li class="history-item">
            <div class="history-header">
              <strong class="project-name">${project.name}</strong>
              <span class="donation-amount">${parseFloat(d.amount).toFixed(4)} ETH</span>
            </div>
            <div class="history-details">
              <em class="project-impact">${project.impact}</em>
              <small class="donation-timestamp">${new Date(d.timestamp).toLocaleString()}</small>
            </div>
          </li>
        `;
      }).join('');
}

// Update total donation and impact
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

  document.getElementById("speciesProtected").textContent = Math.round(impact);
}

// Init page
window.addEventListener("DOMContentLoaded", async () => {
  updateDonationHistory();
  updateImpactStats();

  const projectSelect = document.getElementById("projectSelect");
  if (projectSelect) {
    projectSelect.innerHTML = Object.entries(CONSERVATION_PROJECTS)
      .map(([id, proj]) => `<option value="${id}">${proj.name}</option>`)
      .join('');
  }

  // Auto-reconnect
  if (window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_accounts", []);
    if (accounts.length > 0) {
      signer = await provider.getSigner();
      // Initialize contract instances on auto-reconnect as well
      conservationFundContract = new ethers.Contract(CONSERVATION_FUND_ADDRESS, CONSERVATION_FUND_ABI, signer);
      communityIncentivesContract = new ethers.Contract(COMMUNITY_INCENTIVES_ADDRESS, COMMUNITY_INCENTIVES_ABI, signer);

      updateWalletDisplay(await signer.getAddress());
      await updateBalance();
      updateDonationHistory();
      updateImpactStats();
      await updatePointsDisplay(); // New: Update points display
      showStatus("🔗 Wallet reconnected!", "success");
    }
  }
});
