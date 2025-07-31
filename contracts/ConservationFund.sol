// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ConservationFund {
    address public immutable owner;
    address public immutable taxRecipient;
    uint256 public taxPercentage; // 1% (meaning 1% of donation goes to taxRecipient)

    event DonationReceived(address indexed donor, uint256 amount, uint256 taxedAmount);
    event TaxCollected(address indexed recipient, uint256 amount);

    constructor(address _taxRecipient, uint256 _taxPercentage) {
        require(_taxRecipient != address(0), "Tax recipient cannot be zero address");
        require(_taxPercentage <= 100, "Tax percentage cannot exceed 100");
        owner = msg.sender;
        taxRecipient = _taxRecipient;
        taxPercentage = _taxPercentage;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation amount must be greater than zero");

        uint256 taxAmount = (msg.value * taxPercentage) / 100;
        uint256 netDonation = msg.value - taxAmount;

        // Send tax to the tax recipient
        (bool taxSuccess, ) = taxRecipient.call{value: taxAmount}("");
        require(taxSuccess, "Failed to send tax");
        emit TaxCollected(taxRecipient, taxAmount);

        // Remaining funds stay in this contract for conservation efforts
        // In a more complex system, this might be forwarded to another contract or multisig
        emit DonationReceived(msg.sender, msg.value, taxAmount);
    }

    // Function to allow owner to withdraw net funds collected
    function withdrawFunds() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");
        (bool success, ) = owner.call{value: contractBalance}("");
        require(success, "Failed to withdraw funds");
    }

    // Modifier to restrict access to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
    }
    receive() external payable {}
    fallback() external payable {}
} 
