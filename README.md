# Blockchain-Integration

A simple blockchain-based message storage system built with Solidity, Ethers.js, and Express. Demonstrates smart contract development, blockchain integration, and API creation with proper access controls. Includes comprehensive testing and a demo UI for interaction.

## Project Structure

- `contracts/`: Contains the smart contract code and tests
  - `src/StorageContract.sol`: The main smart contract
  - `test/StorageContract.t.sol`: Tests for the smart contract
- `server/`: Contains the backend API code
  - `routes/messageRoute.js`: API routes for interacting with the smart contract
  - `utils/contractUtils.js`: Utility functions for interacting with the smart contract
- `scripts/`: Contains scripts for deployment and testing
  - `deploy-contract.js`: Script to deploy the contract and test the API

## Features

- Smart Contract:

  - Store a message on the blockchain (only contract owner)
  - Retrieve the stored message
  - Transfer ownership of the contract
  - Event emission when a message is stored

- Backend API:
  - Deploy a new contract instance
  - Store a message in the contract
  - Retrieve the stored message
  - Get the current contract address

## Getting Started

### Prerequisites

- Node.js and npm
- Foundry (for smart contract development and testing)
- Anvil (for local Ethereum development)

### Installation

1. Install dependencies:

   ```
   npm install
   ```

2. Install Foundry if you haven't already:
   ```
   curl -L https://foundry.paradigm.xyz | bash
   foundryup
   ```

### Testing the Smart Contract

Run the Foundry tests:

```
cd contracts
forge test -vv
```

### Running the API

1. Start a local Anvil instance:

   ```
   anvil --port 8545
   ```

2. Start the server:

   ```
   npm run server
   ```

3. Deploy the contract and test the API:
   ```
   node scripts/deploy-contract.js
   ```

## API Endpoints

- `POST /api/deploy-contract`: Deploy a new instance of the contract
- `POST /api/store-message`: Store a message in the contract
- `GET /api/retrieve-message`: Retrieve the stored message
- `GET /api/contract-address`: Get the current contract address

## Technologies Used

- Solidity: For smart contract development
- Foundry: For smart contract testing and deployment
- Ethers.js: For interacting with the Ethereum blockchain
- Express.js: For building the backend API
- Anvil: For local Ethereum development
