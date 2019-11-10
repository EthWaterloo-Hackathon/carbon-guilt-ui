// import Web3 from 'web3';
const Eth = require('ethjs');

// const web3 = new Web3((window as any).ethereum);
const eth = new Eth((window as any).ethereum);

export { eth };
