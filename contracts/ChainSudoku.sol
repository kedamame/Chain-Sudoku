// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ChainSudoku {
    mapping(address => uint256) public dailyClears;
    mapping(address => uint256) public randomClears;

    event DailyClear(address indexed player, uint256 newTotal);
    event RandomClear(address indexed player, uint256 newTotal);

    function incrementDaily() external {
        dailyClears[msg.sender]++;
        emit DailyClear(msg.sender, dailyClears[msg.sender]);
    }

    function incrementRandom() external {
        randomClears[msg.sender]++;
        emit RandomClear(msg.sender, randomClears[msg.sender]);
    }

    function getClears(address player) external view returns (uint256 daily, uint256 random) {
        return (dailyClears[player], randomClears[player]);
    }
}
