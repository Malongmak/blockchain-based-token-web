const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying new contracts with the account:", deployer.address);

  // Deploy ConservationFund Contract
  const ConservationFund = await hre.ethers.getContractFactory("ConservationFund");
  // IMPORTANT: Replace this with the actual government wallet address for tax collection
  // For testing, we are temporarily using the deployer's address to bypass a Hardhat/Ethers.js v6 bug.
  const taxRecipientAddress = deployer.address; 
  const taxPercentage = 5; // 5% tax
  const conservationFund = await ConservationFund.deploy(taxRecipientAddress, taxPercentage);
  await conservationFund.waitForDeployment();
  const conservationFundAddress = await conservationFund.getAddress();
  console.log(`✅ ConservationFund deployed to: ${conservationFundAddress}`);

  // Deploy CommunityIncentives Contract
  const CommunityIncentives = await hre.ethers.getContractFactory("CommunityIncentives");
  const communityIncentives = await CommunityIncentives.deploy();
  await communityIncentives.waitForDeployment();
  const communityIncentivesAddress = await communityIncentives.getAddress();
  console.log(`✅ CommunityIncentives deployed to: ${communityIncentivesAddress}`);

  console.log("\n🎉 New Features Deployment Successful!");
  console.log(`ConservationFund Address: ${conservationFundAddress}`);
  console.log(`CommunityIncentives Address: ${communityIncentivesAddress}`);

  console.log("\nRemember to update CONSERVATION_FUND_ADDRESS and COMMUNITY_INCENTIVES_ADDRESS in frontend/app.js with these new addresses!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 