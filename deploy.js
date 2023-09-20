const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

// const provider = new HDWalletProvider(
//   'diet snow neck yellow urban fashion omit above term robot enemy cactus',
//   // remember to change this to your own phrase!
//   'https://eth-sepolia.g.alchemy.com/v2/VLvHCP0vCSgBezMWUiijnTv5_ruucnGl'
//   // remember to change this to your own endpoint!
// );
const provider = new HDWalletProvider(
  'depth fall buddy genuine resemble system honey bird wonder squeeze asthma solution',
  // remember to change this to your own phrase!
  'http://127.0.0.1:8545/'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(accounts);

  // console.log('Attempting to deploy from account', accounts[1]);

  // const result = await new web3.eth.Contract(JSON.parse(interface))
  //   .deploy({ data: bytecode })
  //   .send({ gas: '1000000', from: accounts[0] });

  // console.log(interface);

  // console.log('Contract deployed to', result.options.address);
  // provider.engine.stop();
};
deploy();