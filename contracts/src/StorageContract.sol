// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

/**
 * @title StorageContract
 * @dev A simple contract for storing and retrieving messages
 */
contract StorageContract {
    address public owner;
    string private message;

    event MessageStored(address indexed sender, string message);

    // Custom errors
    error NotAuthorized();
    error EmptyMessage();
    error ZeroAddress();

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotAuthorized();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeMessage(string memory _message) public onlyOwner {
        if (bytes(_message).length == 0) revert EmptyMessage();
        message = _message;
        emit MessageStored(msg.sender, _message);
    }

    function retrieveMessage() public view returns (string memory) {
        return message;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner == address(0)) revert ZeroAddress();
        owner = newOwner;
    }
}
