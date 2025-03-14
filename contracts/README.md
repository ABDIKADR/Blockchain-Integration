# MessageStorage Smart Contract

This is a simple smart contract implementation that allows users to store and retrieve messages on the blockchain. The contract is built using Solidity and Foundry for testing.

## Features

- Store a message on the blockchain (only contract owner)
- Retrieve the stored message
- Transfer ownership of the contract
- Event emission when a message is stored

## Project Structure

- `src/MessageStorage.sol`: The main smart contract
- `test/MessageStorage.t.sol`: Tests for the smart contract
- `scripts/deploy-contract.js`: Script to deploy the contract and test the API

## Smart Contract Details

The `MessageStorage` contract has the following functions:

- `storeMessage(string memory _message)`: Allows the owner to store a message
- `retrieveMessage()`: Returns the stored message
- `transferOwnership(address newOwner)`: Transfers ownership of the contract

## API Endpoints

The backend provides the following API endpoints to interact with the smart contract:

- `POST /api/deploy-contract`: Deploy a new instance of the contract
- `POST /api/store-message`: Store a message in the contract
- `GET /api/retrieve-message`: Retrieve the stored message
- `GET /api/contract-address`: Get the current contract address

## Getting Started

### Prerequisites

- Node.js and npm
- Foundry (for smart contract development and testing)
- Anvil (for local Ethereum development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install Foundry if you haven't already:
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

## Usage Examples

### Deploying the Contract

```javascript
const response = await axios.post('http://localhost:5000/api/deploy-contract');
const contractAddress = response.data.contractAddress;
```

### Storing a Message

```javascript
await axios.post('http://localhost:5000/api/store-message', {
  contractAddress: 'YOUR_CONTRACT_ADDRESS',
  message: 'Hello, Blockchain!',
});
```

### Retrieving a Message

```javascript
const response = await axios.get('http://localhost:5000/api/retrieve-message?contractAddress=YOUR_CONTRACT_ADDRESS');
const message = response.data.data;
```
