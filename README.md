# Project: Lottery

This is a project that acts like a lottery winner picker using web3 technologies. The players bet eth in the lottery prize pool to get a chance to winning.
Only the manager account who deploys the lottery contract has permissions to pick the winner. A simple representation is as below.

![lottery_eth drawio](https://github.com/rajeshsatpathy1/Lottery/assets/21288436/02dbb001-4359-4bc9-8a3a-f37e4185f158)

## Contract Design

### Variables

**Manager:** Address of the person who created the account

**Players:** Array of addresses of people who have entered

### Functions

**enter:** Enters a player into the lottery

**pickWinner:** Randomly picks a winner and sends them the prize pool

**getPlayers:** Gets the array of addresses of the players. This is done explicity, because the array get created by default provides only indexed elements

## Testing

Testing is done on mocha, which includes asserting player addresses and transactions with each of the functions.

## Deployment

Deployment is tested on the hardhat local ethereum network and Sepolia test network using web3, ganache and truffle libraries.
