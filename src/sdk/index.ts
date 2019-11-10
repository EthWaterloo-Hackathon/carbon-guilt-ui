import BN from 'bignumber.js';
// import { web3 } from './web3';

import { AbiItem } from 'web3-utils';

const web3 = (window as any).web3;

async function contractAddress() {
  return '0x05b3d197670C6725597f0D424e1037412B745718';
  // const chainId = 3; //await web3.eth.getChainId();
  // switch (chainId) {
  //   case 3:
  //     return '0x05b3d197670C6725597f0D424e1037412B745718';
  //   case 15:
  //     return '';
  //   default:
  //     throw new Error('Chain is not supported yed');
  // }
}

const contractABI: AbiItem[] = [
  {
    constant: true,
    inputs: [],
    name: 'MIN_CONTRIBUTION',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'registry',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'carbonTonnagePerETH',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'ethOffset',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'token',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        name: '_token',
        type: 'address'
      },
      {
        name: '_registry',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_beneficiaryENS',
        type: 'bytes32'
      }
    ],
    name: 'offsetCarbonFootprint',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_ens',
        type: 'bytes32'
      },
      {
        name: '_name',
        type: 'bytes32'
      },
      {
        name: '_wallet',
        type: 'address'
      }
    ],
    name: 'addBeneficiary',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_rate',
        type: 'uint256'
      }
    ],
    name: 'setCarbonTonnagePerETH',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export const offsetCarbonFootprint = async (to: string, ethAmount: string) => {
  console.log('START');
  // const beneficiaryAddress = to.startsWith('0x')
  //   ? to
  //   : await web3.eth.ens.getAddress(to);
  // if (!web3.utils.isAddress(beneficiaryAddress)) {
  //   throw new Error('Beneficiary is not a valid address');
  // }
  console.log('START1');
  const registryContract = new web3.eth.Contract(
    contractABI,
    await contractAddress()
  );
  console.log('START2');
  // await (window as any).ethereum.enable();
  // const accounts = await web3.eth.getAccounts();
  const accounts = await (window as any).ethereum.send('eth_accounts');
  console.log(web3.version);
  console.log('ADDRESS', accounts);
  await registryContract.methods.offsetCarbonFootprint(to).send({
    from: accounts[0],
    value: web3.utils.toWei(ethAmount.toString())
  });
};

const registryABI: AbiItem[] = [
  {
    constant: false,
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'isOwner',
    outputs: [
      {
        name: '',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: '_ens',
        type: 'bytes32'
      },
      {
        indexed: false,
        name: 'name',
        type: 'bytes32'
      }
    ],
    name: 'LogBeneficiaryAdded',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_ens',
        type: 'bytes32'
      },
      {
        name: '_name',
        type: 'bytes32'
      },
      {
        name: '_wallet',
        type: 'address'
      },
      {
        name: '_rateApiUrl',
        type: 'bytes32'
      }
    ],
    name: 'addBeneficiary',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '_ens',
        type: 'bytes32'
      }
    ],
    name: 'getBeneficiary',
    outputs: [
      {
        name: '_name',
        type: 'bytes32'
      },
      {
        name: '_wallet',
        type: 'address'
      },
      {
        name: '_exists',
        type: 'bool'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getAllBeneficiaries',
    outputs: [
      {
        name: '_names',
        type: 'bytes32[]'
      },
      {
        name: '_wallets',
        type: 'address[]'
      },
      {
        name: '_ensAddresses',
        type: 'bytes32[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '_ens',
        type: 'bytes32'
      }
    ],
    name: 'getRate',
    outputs: [
      {
        name: '_rate',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
  }
];

export const getBenneficiaries = async () => {
  const offsetContract = new web3.eth.contract(
    contractABI,
    await contractAddress()
  );
  const beneficiaryContractAddress = await offsetContract.methods
    .registry()
    .call();
  const registryContract = new web3.eth.contract(
    registryABI,
    beneficiaryContractAddress
  );
  const allBeneficiaries = await registryContract.methods.getAllBeneficiaries.call();
  let result = [];
  for (let i = 0; i < allBeneficiaries[0].length; i++) {
    result.push({
      name: web3.utils.hexToUtf8(allBeneficiaries[i][0]),
      wallet: allBeneficiaries[i][1],
      ens: web3.utils.hexToUtf8(allBeneficiaries[i][2])
    });
  }
  return result;
};
