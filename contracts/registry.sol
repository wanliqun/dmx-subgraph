// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is Ownable {
    event Registered(address indexed operator, address launchpad, uint256 idoType);
    
    /**
     * @dev Register different types of launchpads by owner.
     */
    function register(address launchpad) external onlyOwner {
        emit Registered(address(0), launchpad, 0);
    }
}
