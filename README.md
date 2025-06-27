# 🦏 Blockchain-Based Tokenization System for Crowdfunding Wildlife-conservation

A decentralized application (DApp) that empowers transparent, token-based donations to protect endangered species. The project leverages Ethereum smart contracts and a web interface to track and demonstrate conservation impact in real time.
## 📑 Table of Contents
Introduction
Features
Tech Stack
Installation
Usage
Smart Contracts
Project Structure
Examples
Troubleshooting
Next Steps
Contributors
License
## ✨Introduction
This project enables donors to contribute ERC-20 tokens transparently to wildlife conservation. Every transaction is stored on-chain, making contributions fully auditable and verifiable.

## Highlights:
ERC-20 tokens instead of fiat
Transparent conservation impact reporting
Secure, decentralized transactions
Integration with MetaMask
# 🚀 Features
1️⃣ Transparent Token-Based Donations
Donate via ERC-20 tokens.
Transactions recorded on Ethereum.
Smart contracts handle donations securely.

2️⃣ Real-Time Tracking of Donations & Impact
Live updates of donations and protected species.
Anyone can verify transactions on-chain.

3️⃣ Conservation Impact Monitoring
Conservation admins update impact stats.
Donors see exactly where funds go.

4️⃣ Secure & Decentralized Transactions
Ethereum-based payments.
No intermediaries, reducing costs.
MetaMask integration.
# 🛠 Tech Stack
Solidity (Smart Contracts)
JavaScript (Frontend)
HTML / CSS (Web UI)
Web3.js (Blockchain interaction)
MetaMask (Wallet)
Hardhat (Development Environment)
# ⚙ Installation
1️⃣ Install Prerequisites
Make sure you have:
Node.js (version 16 or higher)
npm (Node Package Manager)
Hardhat
npm install -g hardhat
2️⃣ Create & Initialize Project
mkdir Blockchain_Based_Donation
cd Blockchain_Based_Donation
npx hardhat
Choose Create a basic sample project and install dependencies.
3️⃣ Install Dependencies
npm install @openzeppelin/contracts hardhat-ethers ethers dotenv chai
# 🧩 Usage
4️⃣ Compile Contracts
npx hardhat compile
5️⃣ Start Local Blockchain
npx hardhat node
6️⃣ Deploy Contracts
In a separate terminal:
npx hardhat run scripts/deploy.js --network localhost
You will see deployed contract addresses in the console.
7️⃣ Run Tests
npx hardhat test
# 📄 Smart Contracts
🔹Token Contract (ERC-20)
Name: MyToken
Symbol: MTK
Initial Supply: 1,000,000 MTK
Key Functions:
constructor(uint256 initialSupply)
transfer(address recipient, uint256 amount)
approve(address spender, uint256 amount)
transferFrom(address sender, address recipient, uint256 amount)
🔹 Wildlife Donation Contract
Handles donations and conservation impact.
Name: WildlifeDonation
Key Functions:
constructor(address _tokenAddress)
donate(uint256 _amount)
totalDonated()
updateSpeciesProtected(uint256 _newCount)
speciesProtected()
# 🏗 Project Structure
Blockchain_Based_Donation
│
├── contracts/
├── Token.sol
└── WildlifeDonation.sol
├── frontend/
├── index.html
└── donate.js
├── scripts/
└── deploy.js
├── Screenshots/
├── video-demo/
└── demo.mp4
├── hardhat.config.js
├── package.json
└── README.md
# Demo
🎥 Video Walkthrough – Watch the 5-minute demo
💻 GitHub Repository – Browse the code
Screenshots:
Frontend UI
Wallet Connection
Testing
Deployment
# 🛠 Troubleshooting
Contracts Not Deploying?
Ensure Hardhat node is running.
Check Solidity version compatibility.
MetaMask Not Connecting?
Confirm MetaMask is set to the local network.
Verify correct contract addresses.
Donations Failing?
Ensure sufficient test tokens are approved for spending.
Check donate() call parameters.
# 🚀 Next Steps
Deploy to Ethereum Testnet (e.g., Sepolia)
Build React frontend integrations
MetaMask UI improvements
Launch live demo site
# 👤 Contributors
Joshua Malong – Author
# 📜 License
This project is licensed under the MIT License.
