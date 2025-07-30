🦏 Blockchain-Based Tokenization System for Crowdfunding Wildlife Conservation  
A decentralized application (DApp) that empowers transparent, token-based donations to protect endangered species. The platform leverages Ethereum smart contracts and a web interface to track and demonstrate conservation impact in real time.  
✨ Introduction  
This project enables donors to contribute ERC-20 tokens directly to wildlife conservation initiatives. All donations are recorded on the Ethereum blockchain, ensuring full transparency, auditability, and trust.  
Key Points
- Donors contribute via ERC-20 tokens instead of fiat currency.  
- All transactions are stored on-chain and publicly verifiable.  
- Conservation impact metrics are updated in real-time for donors to track progress.  
🚀 Features  
1️⃣ Transparent Token-Based Donations 
- Donate via ERC-20 tokens.  
- Every transaction is securely recorded on Ethereum.  
- Smart contracts automatically manage donations.  

2️⃣ Real-Time Donation & Impact Tracking
- View live donation totals and conservation impact data.  
- All transactions are verifiable on-chain.  
3️⃣ Conservation Impact Monitoring  
- Conservation admins update protected species stats.  
- Donors see exactly how their funds are used.  
4️⃣ Secure & Decentralized Transactions  
- Ethereum ensures trustless and tamper-proof transactions.  
- MetaMask integration simplifies wallet connectivity.  
🛠 Tech Stack  
-Blockchain: Ethereum (Smart Contracts)  
-Smart Contracts: Solidity (ERC-20 & Custom Donation Contracts)  
- Frontend: JavaScript, HTML, CSS  
- Blockchain Interaction: Ethers.js  
- Wallet: MetaMask  
- Development Environment: Hardhat  
- Testing: Chai & Mocha  

 🔥 Project Highlights  
-ERC-20 Token Donations: Replaces traditional fiat-based funding with blockchain tokens.  
-Immutable Ledger: Every contribution is auditable and verifiable by anyone.  
-Milestone-Based Fund Release: Smart contracts release funds only after conservation goals are met.  
-Global Participation: Ethereum’s decentralized network enables worldwide support.

⚙ Installation & Setup  
1️⃣ Prerequisites  
Ensure you have the following installed:  
- [Node.js (v16+)](https://nodejs.org/)  
- npm (Node Package Manager)  
- [MetaMask Wallet](https://metamask.io/)  
- Hardhat (Ethereum Development Tool)
  
Install Hardhat globally:  
“npm install -g hardhat”

2️⃣ Clone the Repository
git clone https://github.com/Malongmak/blockchain-based-token.git
cd blockchain-based-token

3️⃣ Install Dependencies
“npm install”

4️⃣ Compile Smart Contracts
“npx hardhat compile”

5️⃣ Start Local Blockchain
“npx hardhat node”

6️⃣ Deploy Contracts
Open another terminal and run:
“npx hardhat run scripts/deploy.js --network localhost”

7️⃣ Connect MetaMask
Open MetaMask and add Localhost 8545 as a custom network.
Import one of the test accounts (private keys displayed in the Hardhat console)

8️⃣ Run Tests
“npx hardhat test”

9️⃣ Launch Frontend
If the project includes a frontend:

“npm start”
Visit: https://splendorous-tapioca-95a9cc.netlify.app/

🧩 Usage Guide
Open the DApp in your browser.
Connect MetaMask wallet.
Select an amount and donate via ERC-20 tokens.
Verify donation transactions on the blockchain.
View updated conservation impact metrics in real-time.

📄 Smart Contracts
1. Token Contract (ERC-20):
Name: MyToken
Symbol: MTK
Initial Supply: 1,000,000 MTK


Key Functions:
constructor(uint256 initialSupply)
transfer(address recipient, uint256 amount)
approve(address spender, uint256 amount)
transferFrom(address sender, address recipient, uint256 amount)

2. Wildlife Donation Contract:
Handles donations and tracks conservation impact.
constructor(address _tokenAddress)
donate(uint256 _amount)
totalDonated()
updateSpeciesProtected(uint256 _newCount)
speciesProtected()

🏗 Project Structure
/blockchain-based-token
│── contracts/        # Solidity Smart Contracts  
│── scripts/          # Deployment Scripts  
│── test/             # Unit Tests  
│── frontend/         # Web Interface  
│── hardhat.config.js # Hardhat Config File  
│── README.md

🎥 Demo & Repository
Live Demo (5 min): Watch Here
GitHub Repository: Browse the Code

🖼 Screenshots
Frontend UI
<img width="1366" height="768" alt="Image" src="https://github.com/user-attachments/assets/57e3fa6b-d831-4401-a8b4-f1c99b9120f2" />

🛠 Troubleshooting
Contracts Not Deploying?
Ensure Hardhat node is running.
Check Solidity version compatibility.

MetaMask Not Connecting?
Confirm MetaMask is set to localhost:8545 network.
Verify contract addresses.
Donations Failing?
Ensure sufficient tokens are approved.
Confirm correct function parameters.

🚀 Next Steps
Deploy to Ethereum Testnet (e.g., Sepolia).
Build React-based frontend integrations.
Add advanced analytics dashboard.
Launch live production demo site.

👤 Contributors
Joshua Malong – Author & Developer

📜 License
This project is licensed under the MIT License.


