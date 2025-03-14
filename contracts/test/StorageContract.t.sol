// SPDX-License-Identifier: MIT
/* solhint-disable */
pragma solidity 0.8.24;

import {Test} from "forge-std/Test.sol";
import {StorageContract} from "../src/StorageContract.sol";

contract StorageContractTest is Test {
    StorageContract public storageContract;
    address public owner;
    address public user;

    // Define the event to match the contract's event
    event MessageStored(address indexed sender, string message);

    function setUp() public {
        owner = address(this);
        user = address(0x1);

        // Deploy the contract
        storageContract = new StorageContract();
    }

    function testStoreMessage() public {
        string memory testMessage = "Hello, Blockchain!";

        // Store a message
        storageContract.storeMessage(testMessage);

        // Verify the message was stored correctly
        assertEq(storageContract.retrieveMessage(), testMessage);
    }

    function testOnlyOwnerCanStoreMessage() public {
        string memory testMessage = "This should fail";

        // Try to store a message as a non-owner
        vm.prank(user);
        vm.expectRevert(StorageContract.NotAuthorized.selector);
        storageContract.storeMessage(testMessage);
    }

    function testEmptyMessageReverts() public {
        string memory emptyMessage = "";

        // Try to store an empty message
        vm.expectRevert(StorageContract.EmptyMessage.selector);
        storageContract.storeMessage(emptyMessage);
    }

    function testTransferOwnership() public {
        // Transfer ownership to user
        storageContract.transferOwnership(user);

        // Verify ownership was transferred
        assertEq(storageContract.owner(), user);

        // Try to store a message as the new owner
        vm.prank(user);
        storageContract.storeMessage("New owner message");

        // Verify the message was stored
        assertEq(storageContract.retrieveMessage(), "New owner message");
    }

    function testEventEmission() public {
        string memory testMessage = "Event test message";

        // Expect the MessageStored event to be emitted
        vm.expectEmit(true, false, false, true);
        emit MessageStored(owner, testMessage);

        // Store a message
        storageContract.storeMessage(testMessage);
    }
}
