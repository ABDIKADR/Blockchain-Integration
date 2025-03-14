const express = require('express');
const router = express.Router();
const {
  initializeContract,
  storeMessage,
  retrieveMessage,
  deployContract,
  getContractAddress,
} = require('../utils/contractUtils');

/**
 * @route   POST /api/deploy-contract
 * @desc    Deploy a new instance of the StorageContract contract
 * @access  Public
 */
router.post('/deploy-contract', async (req, res) => {
  try {
    const contractAddress = await deployContract();
    return res.status(200).json({
      success: true,
      message: 'Contract deployed successfully',
      contractAddress,
    });
  } catch (error) {
    console.error('Error deploying contract:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deploying contract',
      error: error.message,
    });
  }
});

/**
 * @route   POST /api/store-message
 * @desc    Store a message in the smart contract
 * @access  Public
 */
router.post('/store-message', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // Initialize contract if not already initialized
    if (!getContractAddress()) {
      if (req.body.contractAddress) {
        initializeContract(req.body.contractAddress);
      } else {
        return res.status(400).json({
          success: false,
          message: 'Contract address is required',
        });
      }
    } else {
      initializeContract();
    }

    const receipt = await storeMessage(message);

    return res.status(200).json({
      success: true,
      message: 'Message stored successfully',
      transactionHash: receipt.transactionHash,
    });
  } catch (error) {
    console.error('Error storing message:', error);
    return res.status(500).json({
      success: false,
      message: 'Error storing message',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/retrieve-message
 * @desc    Retrieve the stored message from the smart contract
 * @access  Public
 */
router.get('/retrieve-message', async (req, res) => {
  try {
    // Initialize contract if not already initialized
    if (!getContractAddress()) {
      if (req.query.contractAddress) {
        initializeContract(req.query.contractAddress);
      } else {
        return res.status(400).json({
          success: false,
          message: 'Contract address is required',
        });
      }
    } else {
      initializeContract();
    }

    const message = await retrieveMessage();

    return res.status(200).json({
      success: true,
      message: 'Message retrieved successfully',
      data: message,
    });
  } catch (error) {
    console.error('Error retrieving message:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving message',
      error: error.message,
    });
  }
});

/**
 * @route   GET /api/contract-address
 * @desc    Get the current contract address
 * @access  Public
 */
router.get('/contract-address', (req, res) => {
  const contractAddress = getContractAddress();

  if (!contractAddress) {
    return res.status(404).json({
      success: false,
      message: 'No contract has been deployed or initialized yet',
    });
  }

  return res.status(200).json({
    success: true,
    contractAddress,
  });
});

module.exports = router;
