Confidential Counter – README / Tutorial
Overview

This project is a frontend dApp built with React and ethers.js v6.
It interacts directly with the deployed Confidential Counter smart contract on-chain.

Users can connect their MetaMask wallet.

Enter a number and click Update Counter.

The dApp calls the updateCounter(bytes32 _newValue) function on the smart contract.

The dApp can also call getEncryptedCounter() to fetch the encrypted counter value.

Features

Wallet connection via MetaMask (EIP-1193 provider).

On-chain transaction: securely updates the counter with an encrypted value.

View encrypted counter directly from the contract.

Prerequisites

Node.js >= 18.x

npm >= 9.x

MetaMask browser extension installed

Some test ETH on the network where the contract is deployed

Setup

Clone the repository

git clone <your-repo-url>
cd confidential-counter


Install dependencies

npm install


Start development server

npm start


App runs on http://localhost:3000.

Smart Contract

Contract Address:

0x91C5a918a9f056ce9596959e5ab15fFA474a73ff


ABI (relevant parts)

[
  {
    "inputs":[{"internalType":"euint256","name":"_newValue","type":"bytes32"}],
    "name":"updateCounter",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"getEncryptedCounter",
    "outputs":[{"internalType":"euint256","name":"","type":"bytes32"}],
    "stateMutability":"view",
    "type":"function"
  }
]

How It Works
1. Connect Wallet

The dApp requests wallet connection via window.ethereum.

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

2. Update Counter

When a user enters a number and clicks Update Counter:

The number is converted to a bytes32 value.

Calls the smart contract function updateCounter(bytes32) using the connected wallet.

MetaMask pops up for the user to confirm.

const encryptedValue = ethers.zeroPadValue(
  ethers.toBeHex(inputValue), 32
);
await contract.updateCounter(encryptedValue);

3. Get Encrypted Counter

To display the encrypted counter value:

const value = await contract.getEncryptedCounter();
setCounter(value);

Usage

Connect MetaMask to the network where the contract is deployed.

Enter a number in the input box.

Click Update Counter → confirm in MetaMask.

The frontend will show the encrypted counter value (as bytes32).

Deployment (Optional)

To deploy on GitHub Pages:

Install gh-pages:

npm install gh-pages --save-dev


In package.json:

"homepage": "https://<username>.github.io/<repo-name>",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}


Deploy:

npm run deploy

Notes

This is a live smart contract interaction — not a stub.

Contract methods available:

updateCounter(bytes32 _newValue) → Updates counter.

getEncryptedCounter() → Reads encrypted value.

isEqual(value), isNotEqual(value) → Comparison functions.

Ensure you are on the correct network and the contract address matches.
