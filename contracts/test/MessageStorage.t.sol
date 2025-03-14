// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Test} from "forge-std/Test.sol";
import {MessageStorage} from "../src/SimpleStorage.sol";

contract MessageStorageTest is Test {
    MessageStorage public messageStorage;
    address public owner;
    address public user;

    // Define the event to match the contract's event
    event MessageStored(address indexed sender, string message);

    function setUp() public {
        owner = address(this);
        user = address(0x1);

        // Deploy the contract
        messageStorage = new MessageStorage();
    }

    function testStoreMessage() public {
        string memory testMessage = "Hello, Blockchain!";

        // Store a message
        messageStorage.storeMessage(testMessage);

        // Verify the message was stored correctly
        assertEq(messageStorage.retrieveMessage(), testMessage);
    }

    function testOnlyOwnerCanStoreMessage() public {
        string memory testMessage = "This should fail";

        // Try to store a message as a non-owner
        vm.prank(user);
        vm.expectRevert("Not authorized: Only owner can perform this action");
        messageStorage.storeMessage(testMessage);
    }

    function testEmptyMessageReverts() public {
        string memory emptyMessage = "";

        // Try to store an empty message
        vm.expectRevert("Message cannot be empty");
        messageStorage.storeMessage(emptyMessage);
    }

    function testTransferOwnership() public {
        // Transfer ownership to user
        messageStorage.transferOwnership(user);

        // Verify ownership was transferred
        assertEq(messageStorage.owner(), user);

        // Try to store a message as the new owner
        vm.prank(user);
        messageStorage.storeMessage("New owner message");

        // Verify the message was stored
        assertEq(messageStorage.retrieveMessage(), "New owner message");
    }

    function testEventEmission() public {
        string memory testMessage = "Event test message";

        // Expect the MessageStored event to be emitted
        vm.expectEmit(true, false, false, true);
        emit MessageStored(owner, testMessage);

        // Store a message
        messageStorage.storeMessage(testMessage);
    }
}
