require('dotenv').config();
const ethers = require('ethers');

const contractABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_addressLimit",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_tokenAddress",
          "type": "address"
        }
      ],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "addressLimit",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "depositTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "gasLeft",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "addresses",
          "type": "address[]"
        }
      ],
      "name": "sendEth",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address[]",
          "name": "addresses",
          "type": "address[]"
        },
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "sendTokens",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "internalType": "contract IERC20",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdrawTokens",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ];


const provider = new ethers.AlchemyProvider(
  'goerli',
  process.env.ALCHEMY_KEY
);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);


async function main() {
  const sendContract = new ethers.Contract(
    '', // my goerli deployment address
    contractABI,
    wallet
  );
  
  const toWei = ethers.parseEther(``); //eth or token amount
  const addresses = [ // add upto 100 ethereum addresses
    "0x1",
    "0x2",
    "0x3",
    "0x4",
    "0x5",
  ];
  let tx = await sendContract.sendEth(addresses, {
    value: toWei,
  }); // function to multisend eth
  let tx2 = await sendContract.depositTokens(toWei); // function to despoit erc20 tokens
  let tx3 = await sendContract.sendTokens(addresses, toWei); //function to multisend erc20 tokens
  // add other functions from the contract abi.....
  
  
  console.log(tx2);
}

main();