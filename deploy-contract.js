const { ethers } = require('ethers');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Load the contract ABI from the compiled contract
const contractPath = path.join(__dirname, '../contracts/out/SimpleStorage.sol/SimpleStorage.json');
const contractJson = JSON.parse(fs.readFileSync(contractPath));
const contractABI = contractJson.abi;
const contractBytecode = contractJson.bytecode.object;

// Provider setup - use a local provider for development
const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');

// Wallet setup - use a private key for signing transactions
const wallet = new ethers.Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', // Default Anvil private key
  provider,
);

// API base URL
const API_BASE_URL = 'http://localhost:4000/api';

/**
 * Deploy the SimpleStorage contract
 */
async function deployContract() {
  console.log('Deploying SimpleStorage contract...');

  const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log(`Contract deployed at address: ${contract.address}`);
  return contract;
}

/**
 * Test storing a message via the API
 */
async function testStoreMessage(contractAddress, message) {
  console.log(`Storing message "${message}" via API...`);

  try {
    const response = await axios.post(`${API_BASE_URL}/store-message`, {
      contractAddress,
      message,
    });

    console.log('Store message response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error storing message:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Test retrieving a message via the API
 */
async function testRetrieveMessage(contractAddress) {
  console.log('Retrieving message via API...');

  try {
    const response = await axios.get(`${API_BASE_URL}/retrieve-message?contractAddress=${contractAddress}`);

    console.log('Retrieved message:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error retrieving message:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Main function to run the deployment and tests
 */
async function main() {
  try {
    // Start a local Anvil instance if not already running
    console.log('Make sure Anvil is running with: anvil --port 8545');

    // Deploy the contract
    const contract = await deployContract();

    // Test the API
    const testMessage = 'Hello, Blockchain World!';
    await testStoreMessage(contract.address, testMessage);
    await testRetrieveMessage(contract.address);

    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the main function
main();
