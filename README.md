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
![wwww4](https://github.com/user-attachments/assets/51a079c1-1d0d-4a60-8b2e-cb3b5a2fc51a)

https://youtu.be/7HkBPWZ_Xic?si=KvjaWGVZzJuKV6_5

💻 GitHub Repository –[ Browse the code](https://github.com/Malongmak/blockchain-based-token.git)

Screenshots:
Frontend UI
![Screenshot (308)](https://github.com/user-attachments/assets/7209583d-77e4-4060-90e9-0fc7ca240c60)
![Screenshot (307)](https://github.com/user-attachments/assets/58553c24-5f51-4f6a-a208-9da31a7357cd)
![Screenshot (306)](https://github.com/user-attachments/assets/8df0b347-bba2-49af-bc6c-42a2e1baabbc)
![Screenshot (310)](https://github.com/user-attachments/assets/965aea0b-edc0-4622-9b31-85b8e903d0a1)
![Screenshot (309)](https://github.com/user-attachments/assets/e48e09a3-7d43-4b95-a7f5-1da30f8a95af)
Wallet Connection
Testing
Deployment

![copy of what am doing](https://github.com/user-attachments/assets/677c3a1c-fe2a-4812-9b2e-408de86923ab)

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
Joshua Malong Author
# 📜 License
This project is licensed under the MIT License.
