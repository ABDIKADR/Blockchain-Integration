// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


/**
 * @title MessageStorage
 * @dev A simple contract to store and retrieve messages on the blockchain
 */


contract MessageStorage 
{
address public owner;
string private message;

// Event emitted when a message is stored
event MessageStored(address indexed sender, string message);

// Modifier to restrict access to the owner
modifier onlyOwner() 
{
require(msg.sender == owner, "Not authorized: Only owner can perform this action");
_;
}

/**
 * @dev Constructor sets the owner to the deployer of the contract
 */
constructor() 
{
owner = msg.sender;
}

/**
 * @dev Store a message in the contract
 * @param _message The message to store
 */
function storeMessage(string memory _message) public onlyOwner 
{
require(bytes(_message).length > 0, "Message cannot be empty");
message = _message;
emit MessageStored(msg.sender, _message);
}

/**
 * @dev Retrieve the stored message
 * @return The stored message
 */
function retrieveMessage() public view returns (string memory) 
{
return message;
}

/**
 * @dev Transfer ownership of the contract
 * @param newOwner The address of the new owner
 */
function transferOwnership(address newOwner) public onlyOwner 
{
require(newOwner != address(0), "New owner cannot be the zero address");
owner = newOwner;
}
} 