// import Web3 from 'web3';
// const Eth = require('ethjs');
import Eth from 'ethjs';

// const web3 = new Web3((window as any).ethereum);
const eth = new Eth(window.ethereum);

export { eth };
