import BN from 'bignumber.js';
import { web3 } from './web3';

async function contractAddress() {
  return '0xdd82c733F148F7377e2873145A5D956bFbcc8767';
}

const contractABI = [
  {
    constant: true,
    inputs: [],
    name: 'totalContributions',
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
    name: 'oracle',
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
    name: 'carbonEmissionsPerGasUnit',
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
      },
      {
        name: '_oracle',
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
        name: '_tonnes',
        type: 'uint256'
      },
      {
        indexed: true,
        name: '_gas',
        type: 'uint256'
      }
    ],
    name: 'GuiltAlleviated',
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
      },
      {
        name: '_giftPrice',
        type: 'uint256'
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
    inputs: [],
    name: 'getCarbonEmissionsPerGasUnit',
    outputs: [
      {
        name: '_emissions',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

export const offsetCarbonFootprint = async (to: string, ethAmount: string) => {
  const registryContract = new web3.eth.Contract(
    contractABI,
    await contractAddress()
  );

  // await (window as any).ethereum.enable();
  const accounts = await web3.eth.getAccounts();
  // const accounts = await (window as any).ethereum.send('eth_accounts');
  console.log(web3.version);
  console.log('ADDRESS', accounts);
  const receipt = await registryContract.methods
    .offsetCarbonFootprint(to)
    .send({
      from: accounts[0],
      value: web3.utils.toWei(ethAmount.toString(), 'ether')
    });
  console.log(receipt);
  const tonnes = web3.utils.fromWei(
    receipt.events.GuiltAlleviated.returnValues._tonnes as string,
    'ether'
  );
  const gas = receipt.events.GuiltAlleviated.returnValues._gas;
  console.log('GAS', gas);
  return {
    aquiredTokens: tonnes,
    offsettedCarbon: web3.utils.fromWei(gas, 'ether')
  };
};

const registryABI = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'ensIndex',
    outputs: [
      {
        name: '',
        type: 'bytes32'
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
    inputs: [
      {
        name: '',
        type: 'bytes32'
      }
    ],
    name: 'registry',
    outputs: [
      {
        name: 'name',
        type: 'bytes32'
      },
      {
        name: 'wallet',
        type: 'address'
      },
      {
        name: 'giftPrice',
        type: 'uint256'
      },
      {
        name: 'exists',
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
        name: '_giftPrice',
        type: 'uint256'
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
        name: '_giftPrice',
        type: 'uint256'
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
        name: '_giftPrices',
        type: 'uint256[]'
      },
      {
        name: '_ensAddresses',
        type: 'bytes32[]'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

export const getBenneficiaries = async () => {
  const offsetContract = new web3.eth.Contract(
    contractABI,
    await contractAddress()
  );
  console.log('Contract', offsetContract);
  // console.log(web3.version);
  const beneficiaryContractAddress = await offsetContract.methods
    .registry()
    .call();
  const registryContract = new web3.eth.Contract(
    registryABI,
    beneficiaryContractAddress
  );
  //console.log(registryContract);
  const ensName = await registryContract.methods.ensIndex(0).call();
  const beneficiary = await registryContract.methods
    .getBeneficiary(ensName)
    .call();
  console.log(beneficiary);
  return [
    {
      name: web3.utils.hexToUtf8(beneficiary[0]),
      wallet: beneficiary[1],
      rate: web3.utils.fromWei(beneficiary[2], 'ether'),
      ens: ensName
    }
  ];
};
