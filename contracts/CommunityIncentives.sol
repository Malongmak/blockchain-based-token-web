// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CommunityIncentives is Ownable {
    mapping(address => uint256) public points;

    event CaseReported(address indexed reporter, uint256 pointsAwarded);
    event PointsRedeemed(address indexed user, uint256 pointsUsed, string itemDescription);

    uint256 public constant POINTS_PER_REPORT = 100;

    constructor() Ownable(msg.sender) {}

    // Function to report a conservation case and earn points
    function reportConservationCase() public {
        points[msg.sender] += POINTS_PER_REPORT;
        emit CaseReported(msg.sender, POINTS_PER_REPORT);
    }

    // Function to redeem points for an item or benefit
    function redeemPoints(uint256 _pointsToRedeem, string calldata _itemDescription) public {
        require(points[msg.sender] >= _pointsToRedeem, "Not enough points to redeem");
        require(_pointsToRedeem > 0, "Points to redeem must be greater than zero");

        points[msg.sender] -= _pointsToRedeem;
        emit PointsRedeemed(msg.sender, _pointsToRedeem, _itemDescription);
    }

    // Function for owner to adjust points (e.g., for disputes or manual awards)
    function adjustPoints(address _user, uint256 _amount, bool _add) public onlyOwner {
        if (_add) {
            points[_user] += _amount;
        } else {
            require(points[_user] >= _amount, "Cannot subtract more points than user has");
            points[_user] -= _amount;
        }
    }
}