# Smart Contract Testing Task

Demo project: https://github.com/dantelabs-a/testing-project-2

## Objective

Create a simple smart contract. The smart contract should allow users to store and retrieve simple data (e.g., messages) on the blockchain.

## Task Breakdown

### 1. Smart Contract Development

- Create a simple smart contract using Solidity.
- The smart contract should have the following functionalities:
  - A function to store a message (string).
  - A function to retrieve the stored message.
  - An event that emits when a message is stored.
- Ensure proper access control and data validation in your contract (e.g., only the contract owner can store a message).

### 2. Backend Development

- Make backend API route to interact with the smart contract in the exist backend.
- Use a library like `ethers.js` or `web3.js` to connect to the Ethereum blockchain (e.g., using a local Ethereum node, Ganache, or testnet).
- Create API endpoints with the following functionalities:
  - `POST /api/store-message`: Accepts a message from the client and calls the smart contract's function to store the message.
  - `GET /api/retrieve-message`: Calls the smart contract's function to retrieve the stored message and returns it to the console.

### 3. Review

You don't need to push the result to the repository. We will check the result in the technical interview with our technical leader. Be prepared to demonstrate the feature you implemented and explain your testing approach.
