// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// SimpleStorage contract for storing and retrieving messages
contract SimpleStorage {
    address public owner;
    string private message;

    event MessageStored(address indexed sender, string message);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized: Only owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeMessage(string memory _message) public onlyOwner {
        require(bytes(_message).length > 0, "Message cannot be empty");
        message = _message;
        emit MessageStored(msg.sender, _message);
    }

    function retrieveMessage() public view returns (string memory) {
        return message;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
    }
}
