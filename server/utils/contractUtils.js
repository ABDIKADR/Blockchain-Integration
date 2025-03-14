const { ethers } = require('ethers');
const path = require('path');
const fs = require('fs');

// Load the contract ABI from the compiled contract
const contractPath = path.join(__dirname, '../../contracts/out/SimpleStorage.sol/SimpleStorage.json');
const contractABI = JSON.parse(fs.readFileSync(contractPath)).abi;

// Contract address - this will be set after deployment
let contractAddress = process.env.CONTRACT_ADDRESS || '';

// Provider setup - use a local provider for development
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://localhost:8545');

// Wallet setup - use a private key for signing transactions
const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY || '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80', // Default Anvil private key
  provider,
);

// Contract instance
let simpleStorageContract = null;

/**
 * Initialize the contract instance
 * @param {string} address - The deployed contract address
 */
const initializeContract = address => {
  if (address) {
    contractAddress = address;
  }

  if (!contractAddress) {
    throw new Error('Contract address not set');
  }

  simpleStorageContract = new ethers.Contract(contractAddress, contractABI, wallet);
  return simpleStorageContract;
};

/**
 * Store a message in the contract
 * @param {string} message - The message to store
 * @returns {Promise<object>} - Transaction receipt
 */
const storeMessage = async message => {
  if (!simpleStorageContract) {
    throw new Error('Contract not initialized');
  }

  const tx = await simpleStorageContract.storeMessage(message);
  const receipt = await tx.wait();
  return receipt;
};

/**
 * Retrieve the stored message from the contract
 * @returns {Promise<string>} - The stored message
 */
const retrieveMessage = async () => {
  if (!simpleStorageContract) {
    throw new Error('Contract not initialized');
  }

  const message = await simpleStorageContract.retrieveMessage();
  return message;
};

/**
 * Deploy a new instance of the SimpleStorage contract
 * @returns {Promise<string>} - The address of the deployed contract
 */
const deployContract = async () => {
  const contractFactory = new ethers.ContractFactory(
    contractABI,
    fs.readFileSync(path.join(__dirname, '../../contracts/out/SimpleStorage.sol/SimpleStorage.json')).bytecode,
    wallet,
  );

  const contract = await contractFactory.deploy();
  await contract.deployed();

  contractAddress = contract.address;
  simpleStorageContract = contract;

  return contractAddress;
};

module.exports = {
  initializeContract,
  storeMessage,
  retrieveMessage,
  deployContract,
  getContractAddress: () => contractAddress,
};
