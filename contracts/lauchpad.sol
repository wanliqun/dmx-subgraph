// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Launchpad is Ownable {
    event Buy(address indexed buyer, uint256 indexed id, uint256 amountIn);

    uint256 tokenId = 1;
    mapping (address => uint256) tokenIds;
    
    function add(address token) public onlyOwner {
        if (tokenIds[token] == 0) {
            tokenIds[token] = tokenId++;
        }
    }

    function buy(address buyer, address token, uint256 amount) public payable {
        require(tokenIds[token] != 0, "token does not exists");
        emit Buy(buyer, tokenIds[token], amount);
    }
}
