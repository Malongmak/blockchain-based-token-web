// Slide toggle logic
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const formSlider = document.getElementById('form-slider');
const walletSection = document.getElementById('walletSection');
const walletAddress = document.getElementById('walletAddress');

// Toggle to Login
loginBtn.addEventListener('click', () => {
  formSlider.style.transform = 'translateX(0)';
  loginBtn.classList.add('active');
  signupBtn.classList.remove('active');
  walletSection.classList.add('hidden');
});

// Toggle to Signup
signupBtn.addEventListener('click', () => {
  formSlider.style.transform = 'translateX(-50%)';
  signupBtn.classList.add('active');
  loginBtn.classList.remove('active');
  walletSection.classList.add('hidden');
});

// Login Simulation + Redirect + Show Wallet Connect
document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  console.log('Simulating successful login...');
  walletSection.classList.remove('hidden');
});

// Signup Simulation
document.getElementById('signupForm').addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Simulating signup...');
  alert('Signup successful! Now login.');
  signupBtn.click(); // Switch to login form after signup
});

// MetaMask Connect
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      walletAddress.innerText = `Connected: ${address}`;

      // Redirect to index.html after wallet connection
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    } catch (err) {
      console.error('MetaMask connection failed:', err);
      alert('Connection failed. Please try again.');
    }
  } else {
    alert('MetaMask not detected. Please install it to proceed.');
  }
}
