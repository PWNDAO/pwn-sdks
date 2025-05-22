import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const accessControlAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Chainlink
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const chainlinkAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'ETH',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'L2_GRACE_PERIOD',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_CHAINLINK_FEED_PRICE_AGE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedPriceTooOld',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'price', internalType: 'int256', type: 'int256' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedReturnedNegativePrice',
  },
  { type: 'error', inputs: [], name: 'ChainlinkInvalidInputLenghts' },
  {
    type: 'error',
    inputs: [
      { name: 'timeSinceUp', internalType: 'uint256', type: 'uint256' },
      { name: 'gracePeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'GracePeriodNotOver',
  },
  { type: 'error', inputs: [], name: 'L2SequencerDown' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ChainlinkDenominations
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const chainlinkDenominationsAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'BTC',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ETH',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'USD',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ChainlinkHarness
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const chainlinkHarnessAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'l2SequencerUptimeFeed',
        internalType: 'contract IChainlinkAggregatorLike',
        type: 'address',
      },
    ],
    name: 'checkSequencerUptime',
    outputs: [],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'feedRegistry',
        internalType: 'contract IChainlinkFeedRegistryLike',
        type: 'address',
      },
      { name: 'currentPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'currentDecimals', internalType: 'uint8', type: 'uint8' },
      { name: 'currentDenomination', internalType: 'address', type: 'address' },
      { name: 'nextDenomination', internalType: 'address', type: 'address' },
      { name: 'nextInvert', internalType: 'bool', type: 'bool' },
    ],
    name: 'convertPriceDenomination',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'feedRegistry',
        internalType: 'contract IChainlinkFeedRegistryLike',
        type: 'address',
      },
      { name: 'creditAsset', internalType: 'address', type: 'address' },
      { name: 'collateralAsset', internalType: 'address', type: 'address' },
      {
        name: 'feedIntermediaryDenominations',
        internalType: 'address[]',
        type: 'address[]',
      },
      { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
    ],
    name: 'fetchCreditPriceWithCollateralDenomination',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'feedRegistry',
        internalType: 'contract IChainlinkFeedRegistryLike',
        type: 'address',
      },
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'denomination', internalType: 'address', type: 'address' },
    ],
    name: 'fetchPrice',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'price1', internalType: 'uint256', type: 'uint256' },
      { name: 'decimals1', internalType: 'uint8', type: 'uint8' },
      { name: 'price2', internalType: 'uint256', type: 'uint256' },
      { name: 'decimals2', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'syncDecimalsUp',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedPriceTooOld',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'price', internalType: 'int256', type: 'int256' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedReturnedNegativePrice',
  },
  { type: 'error', inputs: [], name: 'ChainlinkInvalidInputLenghts' },
  {
    type: 'error',
    inputs: [
      { name: 'timeSinceUp', internalType: 'uint256', type: 'uint256' },
      { name: 'gracePeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'GracePeriodNotOver',
  },
  { type: 'error', inputs: [], name: 'L2SequencerDown' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ContextUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const contextUpgradeableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DSTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dsTestAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'logs',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Deployments
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deploymentsAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'deploymentsSubpath',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DummyPoolAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dummyPoolAdapterAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'supply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155Abi = [
  {
    type: 'constructor',
    inputs: [{ name: 'uri_', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1967Proxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1967ProxyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_logic', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'payable',
  },
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1967Upgrade
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1967UpgradeAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnosisSafeLike
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gnosisSafeLikeAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'uint8', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      {
        name: 'refundReceiver',
        internalType: 'address payable',
        type: 'address',
      },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execTransaction',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IAccessControl
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iAccessControlAbi = [
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBeacon
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBeaconAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IChainlinkAggregatorLike
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iChainlinkAggregatorLikeAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'description',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { name: 'roundId', internalType: 'uint80', type: 'uint80' },
      { name: 'answer', internalType: 'int256', type: 'int256' },
      { name: 'startedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
      { name: 'answeredInRound', internalType: 'uint80', type: 'uint80' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IChainlinkFeedRegistryLike
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iChainlinkFeedRegistryLikeAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'base', internalType: 'address', type: 'address' },
      { name: 'quote', internalType: 'address', type: 'address' },
      { name: 'aggregator', internalType: 'address', type: 'address' },
    ],
    name: 'confirmFeed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'base', internalType: 'address', type: 'address' },
      { name: 'quote', internalType: 'address', type: 'address' },
    ],
    name: 'getFeed',
    outputs: [
      {
        name: 'aggregator',
        internalType: 'contract IChainlinkAggregatorLike',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'base', internalType: 'address', type: 'address' },
      { name: 'quote', internalType: 'address', type: 'address' },
      { name: 'aggregator', internalType: 'address', type: 'address' },
    ],
    name: 'proposeFeed',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICryptoKitties
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iCryptoKittiesAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: 'name', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: 'symbol', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_preferredTransport', internalType: 'string', type: 'string' },
    ],
    name: 'tokenMetadata',
    outputs: [{ name: 'infoUrl', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'tokensOfOwner',
    outputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: 'total', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155MetadataURI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155MetadataUriAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1271
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1271Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1822Proxiable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1822ProxiableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'proxiableUUID',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1967
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1967Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Permit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20PermitAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC5646
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc5646Abi = [
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getStateFingerprint',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMultiTokenCategoryRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMultiTokenCategoryRegistryAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'assetAddress', internalType: 'address', type: 'address' },
      { name: 'category', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'registerCategoryValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetAddress', internalType: 'address', type: 'address' },
    ],
    name: 'registeredCategoryValue',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetAddress', internalType: 'address', type: 'address' },
    ],
    name: 'unregisterCategoryValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'assetAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'category', internalType: 'uint8', type: 'uint8', indexed: true },
    ],
    name: 'CategoryRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'assetAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'CategoryUnregistered',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPWNDeployer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ipwnDeployerAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecodeHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'computeAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'deploy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'bytecode', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'deployAndTransferOwnership',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPWNLoanMetadataProvider
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ipwnLoanMetadataProviderAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'loanMetadataUri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPoolAdapter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPoolAdapterAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'supply',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IStateFingerpringComputer
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iStateFingerpringComputerAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'computeStateFingerprint',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'supportsToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ITransparentUpgradeableProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iTransparentUpgradeableProxyAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'admin',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'changeAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'implementation',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initializable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const initializableAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiTokenAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'CATEGORY_NOT_REGISTERED',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CRYPTO_KITTIES_INTERFACE_ID',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ERC1155_INTERFACE_ID',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ERC20_INTERFACE_ID',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ERC721_INTERFACE_ID',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'error',
    inputs: [{ name: 'categoryValue', internalType: 'uint8', type: 'uint8' }],
    name: 'UnsupportedCategory',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiTokenCategoryRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiTokenCategoryRegistryAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'CATEGORY_NOT_REGISTERED',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetAddress', internalType: 'address', type: 'address' },
      { name: 'category', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'registerCategoryValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetAddress', internalType: 'address', type: 'address' },
    ],
    name: 'registeredCategoryValue',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetAddress', internalType: 'address', type: 'address' },
    ],
    name: 'unregisterCategoryValue',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'assetAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'category', internalType: 'uint8', type: 'uint8', indexed: true },
    ],
    name: 'CategoryRegistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'assetAddress',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'CategoryUnregistered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'error', inputs: [], name: 'ReservedCategoryValue' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable2Step
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownable2StepAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable2StepUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownable2StepUpgradeableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OwnableUpgradeable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableUpgradeableAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNConfig
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnConfigAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_FEE',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fee',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'feeCollector',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'pool', internalType: 'address', type: 'address' }],
    name: 'getPoolAdapter',
    outputs: [
      { name: '', internalType: 'contract IPoolAdapter', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'asset', internalType: 'address', type: 'address' }],
    name: 'getStateFingerprintComputer',
    outputs: [
      {
        name: '',
        internalType: 'contract IStateFingerpringComputer',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: '_fee', internalType: 'uint16', type: 'uint16' },
      { name: '_feeCollector', internalType: 'address', type: 'address' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'loanMetadataUri',
    outputs: [{ name: 'uri', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'pool', internalType: 'address', type: 'address' },
      { name: 'adapter', internalType: 'address', type: 'address' },
    ],
    name: 'registerPoolAdapter',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'asset', internalType: 'address', type: 'address' },
      { name: 'computer', internalType: 'address', type: 'address' },
    ],
    name: 'registerStateFingerprintComputer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'metadataUri', internalType: 'string', type: 'string' }],
    name: 'setDefaultLOANMetadataUri',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_fee', internalType: 'uint16', type: 'uint16' }],
    name: 'setFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_feeCollector', internalType: 'address', type: 'address' },
    ],
    name: 'setFeeCollector',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'loanContract', internalType: 'address', type: 'address' },
      { name: 'metadataUri', internalType: 'string', type: 'string' },
    ],
    name: 'setLOANMetadataUri',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'newUri',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'DefaultLOANMetadataUriUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldFeeCollector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newFeeCollector',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'FeeCollectorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
      {
        name: 'newFee',
        internalType: 'uint16',
        type: 'uint16',
        indexed: false,
      },
    ],
    name: 'FeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'version', internalType: 'uint8', type: 'uint8', indexed: false },
    ],
    name: 'Initialized',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newUri',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'LOANMetadataUriUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'error',
    inputs: [
      { name: 'computer', internalType: 'address', type: 'address' },
      { name: 'asset', internalType: 'address', type: 'address' },
    ],
    name: 'InvalidComputerContract',
  },
  {
    type: 'error',
    inputs: [
      { name: 'fee', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidFeeValue',
  },
  { type: 'error', inputs: [], name: 'ZeroFeeCollector' },
  { type: 'error', inputs: [], name: 'ZeroLoanContract' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNHub
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnHubAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'hasTag',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_address', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
      { name: '_hasTag', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTag',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_addresses', internalType: 'address[]', type: 'address[]' },
      { name: '_tags', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_hasTag', internalType: 'bool', type: 'bool' },
    ],
    name: 'setTags',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_address',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'hasTag', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'TagSet',
  },
  { type: 'error', inputs: [], name: 'InvalidInputData' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNLOAN
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnloanAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_hub', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getStateFingerprint',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastLoanId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'loanContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'mint',
    outputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'LOANBurned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'loanContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'LOANMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [{ name: 'tag', internalType: 'bytes32', type: 'bytes32' }],
    name: 'CallerMissingHubTag',
  },
  { type: 'error', inputs: [], name: 'InvalidLoanContractCaller' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNRevokedNonce
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnRevokedNonceAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_accessTag', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accessTag',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'currentNonceSpace',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isNonceRevoked',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isNonceUsable',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'nonce', internalType: 'uint256', type: 'uint256' }],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokeNonceSpace',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'nonces', internalType: 'uint256[]', type: 'uint256[]' }],
    name: 'revokeNonces',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonceSpace',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'nonce',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'NonceRevoked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'nonceSpace',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'NonceSpaceRevoked',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceAlreadyRevoked',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSignatureChecker
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSignatureCheckerAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSignatureCheckerHarness
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSignatureCheckerHarnessAbi = [
  {
    type: 'function',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'exposed_isValidSignatureNow',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoan
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_loanToken', internalType: 'address', type: 'address' },
      { name: '_config', internalType: 'address', type: 'address' },
      { name: '_revokedNonce', internalType: 'address', type: 'address' },
      { name: '_categoryRegistry', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ACCRUING_INTEREST_APR_DECIMALS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ACCRUING_INTEREST_APR_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EXTENSION_PROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_ACCRUING_INTEREST_APR',
    outputs: [{ name: '', internalType: 'uint40', type: 'uint40' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_EXTENSION_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MINUTES_IN_YEAR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_EXTENSION_DURATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_LOAN_DURATION',
    outputs: [{ name: '', internalType: 'uint32', type: 'uint32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'categoryRegistry',
    outputs: [
      {
        name: '',
        internalType: 'contract IMultiTokenCategoryRegistry',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'claimLOAN',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposalSpec',
        internalType: 'struct PWNSimpleLoan.ProposalSpec',
        type: 'tuple',
        components: [
          {
            name: 'proposalContract',
            internalType: 'address',
            type: 'address',
          },
          { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
          {
            name: 'proposalInclusionProof',
            internalType: 'bytes32[]',
            type: 'bytes32[]',
          },
          { name: 'signature', internalType: 'bytes', type: 'bytes' },
        ],
      },
      {
        name: 'lenderSpec',
        internalType: 'struct PWNSimpleLoan.LenderSpec',
        type: 'tuple',
        components: [
          { name: 'sourceOfFunds', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: 'callerSpec',
        internalType: 'struct PWNSimpleLoan.CallerSpec',
        type: 'tuple',
        components: [
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'revokeNonce', internalType: 'bool', type: 'bool' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'extra', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createLOAN',
    outputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'extension',
        internalType: 'struct PWNSimpleLoan.ExtensionProposal',
        type: 'tuple',
        components: [
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'compensationAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'compensationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'duration', internalType: 'uint40', type: 'uint40' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'extendLOAN',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extensionProposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'extension',
        internalType: 'struct PWNSimpleLoan.ExtensionProposal',
        type: 'tuple',
        components: [
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'compensationAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'compensationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'duration', internalType: 'uint40', type: 'uint40' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'getExtensionHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'getLOAN',
    outputs: [
      { name: 'status', internalType: 'uint8', type: 'uint8' },
      { name: 'startTimestamp', internalType: 'uint40', type: 'uint40' },
      { name: 'defaultTimestamp', internalType: 'uint40', type: 'uint40' },
      { name: 'borrower', internalType: 'address', type: 'address' },
      { name: 'originalLender', internalType: 'address', type: 'address' },
      { name: 'loanOwner', internalType: 'address', type: 'address' },
      { name: 'accruingInterestAPR', internalType: 'uint24', type: 'uint24' },
      { name: 'fixedInterestAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'credit',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'collateral',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: 'originalSourceOfFunds',
        internalType: 'address',
        type: 'address',
      },
      { name: 'repaymentAmount', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'lenderSpec',
        internalType: 'struct PWNSimpleLoan.LenderSpec',
        type: 'tuple',
        components: [
          { name: 'sourceOfFunds', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getLenderSpecHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getStateFingerprint',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'isValidAsset',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'loanMetadataUri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'loanRepaymentAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'loanToken',
    outputs: [{ name: '', internalType: 'contract PWNLOAN', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'extension',
        internalType: 'struct PWNSimpleLoan.ExtensionProposal',
        type: 'tuple',
        components: [
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'compensationAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'compensationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'duration', internalType: 'uint40', type: 'uint40' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'makeExtensionProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'repayLOAN',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256' },
      { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'loanOwner', internalType: 'address', type: 'address' },
    ],
    name: 'tryClaimRepaidLOAN',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'extensionHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoan.ExtensionProposal',
        type: 'tuple',
        components: [
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'compensationAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'compensationAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'duration', internalType: 'uint40', type: 'uint40' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ExtensionProposalMade',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'defaulted', internalType: 'bool', type: 'bool', indexed: true },
    ],
    name: 'LOANClaimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'proposalHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposalContract',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'refinancingLoanId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'terms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
        indexed: false,
      },
      {
        name: 'lenderSpec',
        internalType: 'struct PWNSimpleLoan.LenderSpec',
        type: 'tuple',
        components: [
          { name: 'sourceOfFunds', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
      { name: 'extra', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'LOANCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'originalDefaultTimestamp',
        internalType: 'uint40',
        type: 'uint40',
        indexed: false,
      },
      {
        name: 'extendedDefaultTimestamp',
        internalType: 'uint40',
        type: 'uint40',
        indexed: false,
      },
    ],
    name: 'LOANExtended',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'LOANPaidBack',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'poolAdapter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PoolSupply',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'poolAdapter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PoolWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'origin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VaultPull',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VaultPush',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'origin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VaultPushFrom',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  { type: 'error', inputs: [], name: 'CallerNotLOANTokenHolder' },
  { type: 'error', inputs: [], name: 'CallerNotVault' },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'expiration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Expired',
  },
  { type: 'error', inputs: [], name: 'IncompleteTransfer' },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InterestAPROutOfBounds',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidDuration',
  },
  { type: 'error', inputs: [], name: 'InvalidExtensionCaller' },
  {
    type: 'error',
    inputs: [
      { name: 'duration', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidExtensionDuration',
  },
  {
    type: 'error',
    inputs: [
      { name: 'allowed', internalType: 'address', type: 'address' },
      { name: 'current', internalType: 'address', type: 'address' },
    ],
    name: 'InvalidExtensionSigner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'expected', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidLenderSpecHash',
  },
  {
    type: 'error',
    inputs: [
      { name: 'category', internalType: 'uint8', type: 'uint8' },
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidMultiTokenAsset',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sourceOfFunds', internalType: 'address', type: 'address' },
    ],
    name: 'InvalidSourceOfFunds',
  },
  {
    type: 'error',
    inputs: [{ name: 'timestap', internalType: 'uint40', type: 'uint40' }],
    name: 'LoanDefaulted',
  },
  { type: 'error', inputs: [], name: 'LoanNotAutoclaimable' },
  { type: 'error', inputs: [], name: 'LoanNotRepaid' },
  { type: 'error', inputs: [], name: 'LoanNotRunning' },
  { type: 'error', inputs: [], name: 'LoanRepaid' },
  { type: 'error', inputs: [], name: 'LoanRunning' },
  { type: 'error', inputs: [], name: 'NonExistingLoan' },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'currentBorrower', internalType: 'address', type: 'address' },
      { name: 'newBorrower', internalType: 'address', type: 'address' },
    ],
    name: 'RefinanceBorrowerMismatch',
  },
  { type: 'error', inputs: [], name: 'RefinanceCollateralMismatch' },
  { type: 'error', inputs: [], name: 'RefinanceCreditMismatch' },
  {
    type: 'error',
    inputs: [{ name: 'categoryValue', internalType: 'uint8', type: 'uint8' }],
    name: 'UnsupportedCategory',
  },
  { type: 'error', inputs: [], name: 'UnsupportedTransferFunction' },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'VaultTransferSameSourceAndDestination',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoanDutchAuctionProposal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanDutchAuctionProposalAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_revokedNonce', internalType: 'address', type: 'address' },
      { name: '_config', internalType: 'address', type: 'address' },
      { name: '_utilizedCredit', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'acceptor', internalType: 'address', type: 'address' },
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
      {
        name: 'proposalInclusionProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'acceptProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'loanTerms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalData', internalType: 'bytes', type: 'bytes' }],
    name: 'decodeProposalData',
    outputs: [
      {
        name: '',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'maxCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'auctionStart', internalType: 'uint40', type: 'uint40' },
          { name: 'auctionDuration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.ProposalValues',
        type: 'tuple',
        components: [
          {
            name: 'intendedCreditAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'slippage', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'maxCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'auctionStart', internalType: 'uint40', type: 'uint40' },
          { name: 'auctionDuration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: 'proposalValues',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.ProposalValues',
        type: 'tuple',
        components: [
          {
            name: 'intendedCreditAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'slippage', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'encodeProposalData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'maxCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'auctionStart', internalType: 'uint40', type: 'uint40' },
          { name: 'auctionDuration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      { name: 'timestamp', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCreditAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'multiproposal',
        internalType: 'struct PWNSimpleLoanProposal.Multiproposal',
        type: 'tuple',
        components: [
          {
            name: 'multiproposalMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    name: 'getMultiproposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'maxCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'auctionStart', internalType: 'uint40', type: 'uint40' },
          { name: 'auctionDuration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getProposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'maxCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'auctionStart', internalType: 'uint40', type: 'uint40' },
          { name: 'auctionDuration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'makeProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'utilizedCredit',
    outputs: [
      { name: '', internalType: 'contract PWNUtilizedCredit', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanDutchAuctionProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'maxCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'auctionStart', internalType: 'uint40', type: 'uint40' },
          { name: 'auctionDuration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposalMade',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'AcceptorIsProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [{ name: 'current', internalType: 'uint256', type: 'uint256' }],
    name: 'AuctionDurationNotInFullMinutes',
  },
  {
    type: 'error',
    inputs: [
      { name: 'currentTimestamp', internalType: 'uint256', type: 'uint256' },
      { name: 'auctionStart', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AuctionNotInProgress',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'CallerIsNotStatedProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'address', type: 'address' },
      { name: 'allowed', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotAllowedAcceptor',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotLoanContract',
  },
  {
    type: 'error',
    inputs: [
      { name: 'defaultDate', internalType: 'uint32', type: 'uint32' },
      { name: 'current', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DefaultDateInPast',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'expiration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Expired',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAuctionDuration',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposed', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidCollateralStateFingerprint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'auctionCreditAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'intendedCreditAmount',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'slippage', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCreditAmount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'maxCreditAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidCreditAmountRange',
  },
  {
    type: 'error',
    inputs: [
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRefinancingLoanId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
  { type: 'error', inputs: [], name: 'MissingStateFingerprintComputer' },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoanElasticChainlinkProposal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanElasticChainlinkProposalAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_revokedNonce', internalType: 'address', type: 'address' },
      { name: '_config', internalType: 'address', type: 'address' },
      { name: '_utilizedCredit', internalType: 'address', type: 'address' },
      {
        name: '_chainlinkFeedRegistry',
        internalType: 'address',
        type: 'address',
      },
      {
        name: '_l2SequencerUptimeFeed',
        internalType: 'address',
        type: 'address',
      },
      { name: '_weth', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LOAN_TO_VALUE_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_INTERMEDIARY_DENOMINATIONS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WETH',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'acceptor', internalType: 'address', type: 'address' },
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
      {
        name: 'proposalInclusionProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'acceptProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'loanTerms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'chainlinkFeedRegistry',
    outputs: [
      {
        name: '',
        internalType: 'contract IChainlinkFeedRegistryLike',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalData', internalType: 'bytes', type: 'bytes' }],
    name: 'decodeProposalData',
    outputs: [
      {
        name: '',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: '',
        internalType:
          'struct PWNSimpleLoanElasticChainlinkProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: 'proposalValues',
        internalType:
          'struct PWNSimpleLoanElasticChainlinkProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'encodeProposalData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'creditAddress', internalType: 'address', type: 'address' },
      { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'collateralAddress', internalType: 'address', type: 'address' },
      {
        name: 'feedIntermediaryDenominations',
        internalType: 'address[]',
        type: 'address[]',
      },
      { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
      { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCollateralAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'multiproposal',
        internalType: 'struct PWNSimpleLoanProposal.Multiproposal',
        type: 'tuple',
        components: [
          {
            name: 'multiproposalMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    name: 'getMultiproposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getProposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'l2SequencerUptimeFeed',
    outputs: [
      {
        name: '',
        internalType: 'contract IChainlinkAggregatorLike',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'makeProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'utilizedCredit',
    outputs: [
      { name: '', internalType: 'contract PWNUtilizedCredit', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposalMade',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'AcceptorIsProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'CallerIsNotStatedProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'address', type: 'address' },
      { name: 'allowed', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotAllowedAcceptor',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotLoanContract',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedPriceTooOld',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'price', internalType: 'int256', type: 'int256' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedReturnedNegativePrice',
  },
  { type: 'error', inputs: [], name: 'ChainlinkInvalidInputLenghts' },
  {
    type: 'error',
    inputs: [
      { name: 'defaultDate', internalType: 'uint32', type: 'uint32' },
      { name: 'current', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DefaultDateInPast',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'expiration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Expired',
  },
  {
    type: 'error',
    inputs: [
      { name: 'timeSinceUp', internalType: 'uint256', type: 'uint256' },
      { name: 'gracePeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'GracePeriodNotOver',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientCreditAmount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'IntermediaryDenominationsOutOfBounds',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposed', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidCollateralStateFingerprint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRefinancingLoanId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
  { type: 'error', inputs: [], name: 'L2SequencerDown' },
  { type: 'error', inputs: [], name: 'MinCreditAmountNotSet' },
  { type: 'error', inputs: [], name: 'MissingStateFingerprintComputer' },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoanElasticChainlinkProposalHarness
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanElasticChainlinkProposalHarnessAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_revokedNonce', internalType: 'address', type: 'address' },
      { name: '_config', internalType: 'address', type: 'address' },
      { name: '_utilizedCredit', internalType: 'address', type: 'address' },
      {
        name: '_chainlinkFeedRegistry',
        internalType: 'address',
        type: 'address',
      },
      {
        name: '_l2SequencerUptimeFeed',
        internalType: 'address',
        type: 'address',
      },
      { name: '_weth', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'LOAN_TO_VALUE_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_INTERMEDIARY_DENOMINATIONS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WETH',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'acceptor', internalType: 'address', type: 'address' },
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
      {
        name: 'proposalInclusionProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'acceptProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'loanTerms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'chainlinkFeedRegistry',
    outputs: [
      {
        name: '',
        internalType: 'contract IChainlinkFeedRegistryLike',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalData', internalType: 'bytes', type: 'bytes' }],
    name: 'decodeProposalData',
    outputs: [
      {
        name: '',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: '',
        internalType:
          'struct PWNSimpleLoanElasticChainlinkProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: 'proposalValues',
        internalType:
          'struct PWNSimpleLoanElasticChainlinkProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'encodeProposalData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'exposed_erc712EncodeProposal',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'creditAddress', internalType: 'address', type: 'address' },
      { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'collateralAddress', internalType: 'address', type: 'address' },
      {
        name: 'feedIntermediaryDenominations',
        internalType: 'address[]',
        type: 'address[]',
      },
      { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
      { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getCollateralAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'multiproposal',
        internalType: 'struct PWNSimpleLoanProposal.Multiproposal',
        type: 'tuple',
        components: [
          {
            name: 'multiproposalMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    name: 'getMultiproposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getProposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'l2SequencerUptimeFeed',
    outputs: [
      {
        name: '',
        internalType: 'contract IChainlinkAggregatorLike',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'makeProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'utilizedCredit',
    outputs: [
      { name: '', internalType: 'contract PWNUtilizedCredit', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticChainlinkProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'feedIntermediaryDenominations',
            internalType: 'address[]',
            type: 'address[]',
          },
          { name: 'feedInvertFlags', internalType: 'bool[]', type: 'bool[]' },
          { name: 'loanToValue', internalType: 'uint256', type: 'uint256' },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposalMade',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'AcceptorIsProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'CallerIsNotStatedProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'address', type: 'address' },
      { name: 'allowed', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotAllowedAcceptor',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotLoanContract',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedPriceTooOld',
  },
  {
    type: 'error',
    inputs: [
      { name: 'feed', internalType: 'address', type: 'address' },
      { name: 'price', internalType: 'int256', type: 'int256' },
      { name: 'updatedAt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ChainlinkFeedReturnedNegativePrice',
  },
  { type: 'error', inputs: [], name: 'ChainlinkInvalidInputLenghts' },
  {
    type: 'error',
    inputs: [
      { name: 'defaultDate', internalType: 'uint32', type: 'uint32' },
      { name: 'current', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DefaultDateInPast',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'expiration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Expired',
  },
  {
    type: 'error',
    inputs: [
      { name: 'timeSinceUp', internalType: 'uint256', type: 'uint256' },
      { name: 'gracePeriod', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'GracePeriodNotOver',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientCreditAmount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'IntermediaryDenominationsOutOfBounds',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposed', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidCollateralStateFingerprint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRefinancingLoanId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
  { type: 'error', inputs: [], name: 'L2SequencerDown' },
  { type: 'error', inputs: [], name: 'MinCreditAmountNotSet' },
  { type: 'error', inputs: [], name: 'MissingStateFingerprintComputer' },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoanElasticProposal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanElasticProposalAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_revokedNonce', internalType: 'address', type: 'address' },
      { name: '_config', internalType: 'address', type: 'address' },
      { name: '_utilizedCredit', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'acceptor', internalType: 'address', type: 'address' },
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
      {
        name: 'proposalInclusionProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'acceptProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'loanTerms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalData', internalType: 'bytes', type: 'bytes' }],
    name: 'decodeProposalData',
    outputs: [
      {
        name: '',
        internalType: 'struct PWNSimpleLoanElasticProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'creditPerCollateralUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct PWNSimpleLoanElasticProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'creditPerCollateralUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: 'proposalValues',
        internalType: 'struct PWNSimpleLoanElasticProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'encodeProposalData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'creditPerCollateralUnit',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'getCollateralAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'multiproposal',
        internalType: 'struct PWNSimpleLoanProposal.Multiproposal',
        type: 'tuple',
        components: [
          {
            name: 'multiproposalMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    name: 'getMultiproposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'creditPerCollateralUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getProposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'creditPerCollateralUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'makeProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'utilizedCredit',
    outputs: [
      { name: '', internalType: 'contract PWNUtilizedCredit', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanElasticProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          {
            name: 'creditPerCollateralUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'minCreditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposalMade',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'AcceptorIsProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'CallerIsNotStatedProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'address', type: 'address' },
      { name: 'allowed', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotAllowedAcceptor',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotLoanContract',
  },
  {
    type: 'error',
    inputs: [
      { name: 'defaultDate', internalType: 'uint32', type: 'uint32' },
      { name: 'current', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DefaultDateInPast',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'expiration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Expired',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InsufficientCreditAmount',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposed', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidCollateralStateFingerprint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRefinancingLoanId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
  { type: 'error', inputs: [], name: 'MinCreditAmountNotSet' },
  { type: 'error', inputs: [], name: 'MissingStateFingerprintComputer' },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
  { type: 'error', inputs: [], name: 'ZeroCreditPerCollateralUnit' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoanListProposal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanListProposalAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_revokedNonce', internalType: 'address', type: 'address' },
      { name: '_config', internalType: 'address', type: 'address' },
      { name: '_utilizedCredit', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'acceptor', internalType: 'address', type: 'address' },
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
      {
        name: 'proposalInclusionProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'acceptProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'loanTerms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalData', internalType: 'bytes', type: 'bytes' }],
    name: 'decodeProposalData',
    outputs: [
      {
        name: '',
        internalType: 'struct PWNSimpleLoanListProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'collateralIdsWhitelistMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct PWNSimpleLoanListProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'merkleInclusionProof',
            internalType: 'bytes32[]',
            type: 'bytes32[]',
          },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanListProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'collateralIdsWhitelistMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
      {
        name: 'proposalValues',
        internalType: 'struct PWNSimpleLoanListProposal.ProposalValues',
        type: 'tuple',
        components: [
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'merkleInclusionProof',
            internalType: 'bytes32[]',
            type: 'bytes32[]',
          },
        ],
      },
    ],
    name: 'encodeProposalData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'multiproposal',
        internalType: 'struct PWNSimpleLoanProposal.Multiproposal',
        type: 'tuple',
        components: [
          {
            name: 'multiproposalMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    name: 'getMultiproposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanListProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'collateralIdsWhitelistMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getProposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanListProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'collateralIdsWhitelistMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'makeProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'utilizedCredit',
    outputs: [
      { name: '', internalType: 'contract PWNUtilizedCredit', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanListProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'collateralIdsWhitelistMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposalMade',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'AcceptorIsProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'CallerIsNotStatedProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'address', type: 'address' },
      { name: 'allowed', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotAllowedAcceptor',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotLoanContract',
  },
  {
    type: 'error',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'CollateralIdNotWhitelisted',
  },
  {
    type: 'error',
    inputs: [
      { name: 'defaultDate', internalType: 'uint32', type: 'uint32' },
      { name: 'current', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DefaultDateInPast',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'expiration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Expired',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposed', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidCollateralStateFingerprint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRefinancingLoanId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
  { type: 'error', inputs: [], name: 'MissingStateFingerprintComputer' },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoanProposal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanProposalAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'acceptor', internalType: 'address', type: 'address' },
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
      {
        name: 'proposalInclusionProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'acceptProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'loanTerms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'multiproposal',
        internalType: 'struct PWNSimpleLoanProposal.Multiproposal',
        type: 'tuple',
        components: [
          {
            name: 'multiproposalMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    name: 'getMultiproposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'utilizedCredit',
    outputs: [
      { name: '', internalType: 'contract PWNUtilizedCredit', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'AcceptorIsProposer',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'CallerIsNotStatedProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'address', type: 'address' },
      { name: 'allowed', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotAllowedAcceptor',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotLoanContract',
  },
  {
    type: 'error',
    inputs: [
      { name: 'defaultDate', internalType: 'uint32', type: 'uint32' },
      { name: 'current', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DefaultDateInPast',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposed', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidCollateralStateFingerprint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRefinancingLoanId',
  },
  { type: 'error', inputs: [], name: 'MissingStateFingerprintComputer' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNSimpleLoanSimpleProposal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnSimpleLoanSimpleProposalAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_revokedNonce', internalType: 'address', type: 'address' },
      { name: '_config', internalType: 'address', type: 'address' },
      { name: '_utilizedCredit', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MULTIPROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PROPOSAL_TYPEHASH',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'acceptor', internalType: 'address', type: 'address' },
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
      { name: 'proposalData', internalType: 'bytes', type: 'bytes' },
      {
        name: 'proposalInclusionProof',
        internalType: 'bytes32[]',
        type: 'bytes32[]',
      },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'acceptProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'loanTerms',
        internalType: 'struct PWNSimpleLoan.Terms',
        type: 'tuple',
        components: [
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint32', type: 'uint32' },
          {
            name: 'collateral',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'credit',
            internalType: 'struct MultiToken.Asset',
            type: 'tuple',
            components: [
              {
                name: 'category',
                internalType: 'enum MultiToken.Category',
                type: 'uint8',
              },
              {
                name: 'assetAddress',
                internalType: 'address',
                type: 'address',
              },
              { name: 'id', internalType: 'uint256', type: 'uint256' },
              { name: 'amount', internalType: 'uint256', type: 'uint256' },
            ],
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'lenderSpecHash', internalType: 'bytes32', type: 'bytes32' },
          {
            name: 'borrowerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'config',
    outputs: [
      { name: '', internalType: 'contract PWNConfig', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalData', internalType: 'bytes', type: 'bytes' }],
    name: 'decodeProposalData',
    outputs: [
      {
        name: '',
        internalType: 'struct PWNSimpleLoanSimpleProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanSimpleProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'encodeProposalData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'multiproposal',
        internalType: 'struct PWNSimpleLoanProposal.Multiproposal',
        type: 'tuple',
        components: [
          {
            name: 'multiproposalMerkleRoot',
            internalType: 'bytes32',
            type: 'bytes32',
          },
        ],
      },
    ],
    name: 'getMultiproposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanSimpleProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'getProposalHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanSimpleProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
      },
    ],
    name: 'makeProposal',
    outputs: [
      { name: 'proposalHash', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'proposalsMade',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeNonce',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'revokedNonce',
    outputs: [
      { name: '', internalType: 'contract PWNRevokedNonce', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'utilizedCredit',
    outputs: [
      { name: '', internalType: 'contract PWNUtilizedCredit', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalHash',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'proposer',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'proposal',
        internalType: 'struct PWNSimpleLoanSimpleProposal.Proposal',
        type: 'tuple',
        components: [
          {
            name: 'collateralCategory',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          {
            name: 'collateralAddress',
            internalType: 'address',
            type: 'address',
          },
          { name: 'collateralId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'collateralAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'checkCollateralStateFingerprint',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'collateralStateFingerprint',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'creditAddress', internalType: 'address', type: 'address' },
          { name: 'creditAmount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'availableCreditLimit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'utilizedCreditId',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          {
            name: 'fixedInterestAmount',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'accruingInterestAPR',
            internalType: 'uint24',
            type: 'uint24',
          },
          { name: 'durationOrDate', internalType: 'uint32', type: 'uint32' },
          { name: 'expiration', internalType: 'uint40', type: 'uint40' },
          { name: 'allowedAcceptor', internalType: 'address', type: 'address' },
          { name: 'proposer', internalType: 'address', type: 'address' },
          {
            name: 'proposerSpecHash',
            internalType: 'bytes32',
            type: 'bytes32',
          },
          { name: 'isOffer', internalType: 'bool', type: 'bool' },
          {
            name: 'refinancingLoanId',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
          { name: 'nonce', internalType: 'uint256', type: 'uint256' },
          { name: 'loanContract', internalType: 'address', type: 'address' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposalMade',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'AcceptorIsProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'CallerIsNotStatedProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'address', type: 'address' },
      { name: 'allowed', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotAllowedAcceptor',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'loanContract', internalType: 'address', type: 'address' },
    ],
    name: 'CallerNotLoanContract',
  },
  {
    type: 'error',
    inputs: [
      { name: 'defaultDate', internalType: 'uint32', type: 'uint32' },
      { name: 'current', internalType: 'uint32', type: 'uint32' },
    ],
    name: 'DefaultDateInPast',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'uint256', type: 'uint256' },
      { name: 'expiration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'Expired',
  },
  {
    type: 'error',
    inputs: [
      { name: 'current', internalType: 'bytes32', type: 'bytes32' },
      { name: 'proposed', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidCollateralStateFingerprint',
  },
  {
    type: 'error',
    inputs: [
      { name: 'refinancingLoanId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidRefinancingLoanId',
  },
  {
    type: 'error',
    inputs: [
      { name: 'signer', internalType: 'address', type: 'address' },
      { name: 'digest', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'InvalidSignature',
  },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidSignatureLength',
  },
  { type: 'error', inputs: [], name: 'MissingStateFingerprintComputer' },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'nonceSpace', internalType: 'uint256', type: 'uint256' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'NonceNotUsable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNUtilizedCredit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnUtilizedCreditAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_hub', internalType: 'address', type: 'address' },
      { name: '_accessTag', internalType: 'bytes32', type: 'bytes32' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'accessTag',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'hub',
    outputs: [{ name: '', internalType: 'contract PWNHub', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'utilizeCredit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'utilizedCredit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'error',
    inputs: [
      { name: 'addr', internalType: 'address', type: 'address' },
      { name: 'tag', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'AddressMissingHubTag',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'bytes32', type: 'bytes32' },
      { name: 'utilized', internalType: 'uint256', type: 'uint256' },
      { name: 'limit', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AvailableCreditLimitExceeded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PWNVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const pwnVaultAbi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'poolAdapter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PoolSupply',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'poolAdapter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PoolWithdraw',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'origin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VaultPull',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VaultPush',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'asset',
        internalType: 'struct MultiToken.Asset',
        type: 'tuple',
        components: [
          {
            name: 'category',
            internalType: 'enum MultiToken.Category',
            type: 'uint8',
          },
          { name: 'assetAddress', internalType: 'address', type: 'address' },
          { name: 'id', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      {
        name: 'origin',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'beneficiary',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'VaultPushFrom',
  },
  { type: 'error', inputs: [], name: 'IncompleteTransfer' },
  { type: 'error', inputs: [], name: 'UnsupportedTransferFunction' },
  {
    type: 'error',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'VaultTransferSameSourceAndDestination',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Proxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const proxyAbi = [
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// T1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const t1155Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// T20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const t20Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'subtractedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'decreaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'addedValue', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'increaseAllowance',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// T721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const t721Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Test
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [
      {
        name: 'excludedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [
      {
        name: 'excludedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [
      {
        name: 'excludedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [
      {
        name: 'targetedArtifacts_',
        internalType: 'string[]',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [
      {
        name: 'targetedContracts_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [
      {
        name: 'targetedSenders_',
        internalType: 'address[]',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'int256[]',
        type: 'int256[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'val',
        internalType: 'address[]',
        type: 'address[]',
        indexed: false,
      },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'decimals',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: '', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'logs',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TimelockController
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const timelockControllerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'minDelay', internalType: 'uint256', type: 'uint256' },
      { name: 'proposers', internalType: 'address[]', type: 'address[]' },
      { name: 'executors', internalType: 'address[]', type: 'address[]' },
      { name: 'admin', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'CANCELLER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EXECUTOR_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PROPOSER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'TIMELOCK_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'cancel',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'payload', internalType: 'bytes', type: 'bytes' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'targets', internalType: 'address[]', type: 'address[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'payloads', internalType: 'bytes[]', type: 'bytes[]' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'executeBatch',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinDelay',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'hashOperation',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'targets', internalType: 'address[]', type: 'address[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'payloads', internalType: 'bytes[]', type: 'bytes[]' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'hashOperationBatch',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isOperation',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isOperationDone',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isOperationPending',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'bytes32', type: 'bytes32' }],
    name: 'isOperationReady',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'target', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'delay', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'schedule',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'targets', internalType: 'address[]', type: 'address[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'payloads', internalType: 'bytes[]', type: 'bytes[]' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'salt', internalType: 'bytes32', type: 'bytes32' },
      { name: 'delay', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'scheduleBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newDelay', internalType: 'uint256', type: 'uint256' }],
    name: 'updateDelay',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'target',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'CallExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'salt',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
    ],
    name: 'CallSalt',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'target',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'predecessor',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: false,
      },
      {
        name: 'delay',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'CallScheduled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: true },
    ],
    name: 'Cancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'newDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MinDelayChange',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TransparentUpgradeableProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const transparentUpgradeableProxyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_logic', internalType: 'address', type: 'address' },
      { name: 'admin_', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'payable',
  },
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'newAdmin',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'AdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'beacon',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'BeaconUpgraded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'implementation',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Upgraded',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link accessControlAbi}__
 */
export const readAccessControl = /*#__PURE__*/ createReadContract({
  abi: accessControlAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const readAccessControlDefaultAdminRole =
  /*#__PURE__*/ createReadContract({
    abi: accessControlAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const readAccessControlGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: accessControlAbi,
  functionName: 'getRoleAdmin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const readAccessControlHasRole = /*#__PURE__*/ createReadContract({
  abi: accessControlAbi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readAccessControlSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: accessControlAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link accessControlAbi}__
 */
export const writeAccessControl = /*#__PURE__*/ createWriteContract({
  abi: accessControlAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const writeAccessControlGrantRole = /*#__PURE__*/ createWriteContract({
  abi: accessControlAbi,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const writeAccessControlRenounceRole = /*#__PURE__*/ createWriteContract(
  { abi: accessControlAbi, functionName: 'renounceRole' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const writeAccessControlRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: accessControlAbi,
  functionName: 'revokeRole',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link accessControlAbi}__
 */
export const simulateAccessControl = /*#__PURE__*/ createSimulateContract({
  abi: accessControlAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const simulateAccessControlGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: accessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const simulateAccessControlRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: accessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link accessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const simulateAccessControlRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: accessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link accessControlAbi}__
 */
export const watchAccessControlEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: accessControlAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link accessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const watchAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: accessControlAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link accessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const watchAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: accessControlAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link accessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const watchAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: accessControlAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkAbi}__
 */
export const readChainlink = /*#__PURE__*/ createReadContract({
  abi: chainlinkAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkAbi}__ and `functionName` set to `"ETH"`
 */
export const readChainlinkEth = /*#__PURE__*/ createReadContract({
  abi: chainlinkAbi,
  functionName: 'ETH',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkAbi}__ and `functionName` set to `"L2_GRACE_PERIOD"`
 */
export const readChainlinkL2GracePeriod = /*#__PURE__*/ createReadContract({
  abi: chainlinkAbi,
  functionName: 'L2_GRACE_PERIOD',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkAbi}__ and `functionName` set to `"MAX_CHAINLINK_FEED_PRICE_AGE"`
 */
export const readChainlinkMaxChainlinkFeedPriceAge =
  /*#__PURE__*/ createReadContract({
    abi: chainlinkAbi,
    functionName: 'MAX_CHAINLINK_FEED_PRICE_AGE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkDenominationsAbi}__
 */
export const readChainlinkDenominations = /*#__PURE__*/ createReadContract({
  abi: chainlinkDenominationsAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkDenominationsAbi}__ and `functionName` set to `"BTC"`
 */
export const readChainlinkDenominationsBtc = /*#__PURE__*/ createReadContract({
  abi: chainlinkDenominationsAbi,
  functionName: 'BTC',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkDenominationsAbi}__ and `functionName` set to `"ETH"`
 */
export const readChainlinkDenominationsEth = /*#__PURE__*/ createReadContract({
  abi: chainlinkDenominationsAbi,
  functionName: 'ETH',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkDenominationsAbi}__ and `functionName` set to `"USD"`
 */
export const readChainlinkDenominationsUsd = /*#__PURE__*/ createReadContract({
  abi: chainlinkDenominationsAbi,
  functionName: 'USD',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkHarnessAbi}__
 */
export const readChainlinkHarness = /*#__PURE__*/ createReadContract({
  abi: chainlinkHarnessAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkHarnessAbi}__ and `functionName` set to `"checkSequencerUptime"`
 */
export const readChainlinkHarnessCheckSequencerUptime =
  /*#__PURE__*/ createReadContract({
    abi: chainlinkHarnessAbi,
    functionName: 'checkSequencerUptime',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkHarnessAbi}__ and `functionName` set to `"convertPriceDenomination"`
 */
export const readChainlinkHarnessConvertPriceDenomination =
  /*#__PURE__*/ createReadContract({
    abi: chainlinkHarnessAbi,
    functionName: 'convertPriceDenomination',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkHarnessAbi}__ and `functionName` set to `"fetchCreditPriceWithCollateralDenomination"`
 */
export const readChainlinkHarnessFetchCreditPriceWithCollateralDenomination =
  /*#__PURE__*/ createReadContract({
    abi: chainlinkHarnessAbi,
    functionName: 'fetchCreditPriceWithCollateralDenomination',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkHarnessAbi}__ and `functionName` set to `"fetchPrice"`
 */
export const readChainlinkHarnessFetchPrice = /*#__PURE__*/ createReadContract({
  abi: chainlinkHarnessAbi,
  functionName: 'fetchPrice',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link chainlinkHarnessAbi}__ and `functionName` set to `"syncDecimalsUp"`
 */
export const readChainlinkHarnessSyncDecimalsUp =
  /*#__PURE__*/ createReadContract({
    abi: chainlinkHarnessAbi,
    functionName: 'syncDecimalsUp',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link contextUpgradeableAbi}__
 */
export const watchContextUpgradeableEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: contextUpgradeableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link contextUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchContextUpgradeableInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: contextUpgradeableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link dsTestAbi}__
 */
export const readDsTest = /*#__PURE__*/ createReadContract({ abi: dsTestAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link dsTestAbi}__ and `functionName` set to `"IS_TEST"`
 */
export const readDsTestIsTest = /*#__PURE__*/ createReadContract({
  abi: dsTestAbi,
  functionName: 'IS_TEST',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link dsTestAbi}__
 */
export const writeDsTest = /*#__PURE__*/ createWriteContract({ abi: dsTestAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link dsTestAbi}__ and `functionName` set to `"failed"`
 */
export const writeDsTestFailed = /*#__PURE__*/ createWriteContract({
  abi: dsTestAbi,
  functionName: 'failed',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link dsTestAbi}__
 */
export const simulateDsTest = /*#__PURE__*/ createSimulateContract({
  abi: dsTestAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link dsTestAbi}__ and `functionName` set to `"failed"`
 */
export const simulateDsTestFailed = /*#__PURE__*/ createSimulateContract({
  abi: dsTestAbi,
  functionName: 'failed',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__
 */
export const watchDsTestEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: dsTestAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log"`
 */
export const watchDsTestLogEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: dsTestAbi,
  eventName: 'log',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_address"`
 */
export const watchDsTestLogAddressEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_address',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_bytes"`
 */
export const watchDsTestLogBytesEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: dsTestAbi,
  eventName: 'log_bytes',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_bytes32"`
 */
export const watchDsTestLogBytes32Event =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_bytes32',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_int"`
 */
export const watchDsTestLogIntEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: dsTestAbi,
  eventName: 'log_int',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_address"`
 */
export const watchDsTestLogNamedAddressEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_address',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_bytes"`
 */
export const watchDsTestLogNamedBytesEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_bytes',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_bytes32"`
 */
export const watchDsTestLogNamedBytes32Event =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_bytes32',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_decimal_int"`
 */
export const watchDsTestLogNamedDecimalIntEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_decimal_int',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_decimal_uint"`
 */
export const watchDsTestLogNamedDecimalUintEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_decimal_uint',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_int"`
 */
export const watchDsTestLogNamedIntEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_int',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_string"`
 */
export const watchDsTestLogNamedStringEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_string',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_named_uint"`
 */
export const watchDsTestLogNamedUintEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: dsTestAbi,
    eventName: 'log_named_uint',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_string"`
 */
export const watchDsTestLogStringEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: dsTestAbi, eventName: 'log_string' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"log_uint"`
 */
export const watchDsTestLogUintEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: dsTestAbi,
  eventName: 'log_uint',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link dsTestAbi}__ and `eventName` set to `"logs"`
 */
export const watchDsTestLogsEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: dsTestAbi,
  eventName: 'logs',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link deploymentsAbi}__
 */
export const readDeployments = /*#__PURE__*/ createReadContract({
  abi: deploymentsAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link deploymentsAbi}__ and `functionName` set to `"deploymentsSubpath"`
 */
export const readDeploymentsDeploymentsSubpath =
  /*#__PURE__*/ createReadContract({
    abi: deploymentsAbi,
    functionName: 'deploymentsSubpath',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link dummyPoolAdapterAbi}__
 */
export const writeDummyPoolAdapter = /*#__PURE__*/ createWriteContract({
  abi: dummyPoolAdapterAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link dummyPoolAdapterAbi}__ and `functionName` set to `"supply"`
 */
export const writeDummyPoolAdapterSupply = /*#__PURE__*/ createWriteContract({
  abi: dummyPoolAdapterAbi,
  functionName: 'supply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link dummyPoolAdapterAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeDummyPoolAdapterWithdraw = /*#__PURE__*/ createWriteContract({
  abi: dummyPoolAdapterAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link dummyPoolAdapterAbi}__
 */
export const simulateDummyPoolAdapter = /*#__PURE__*/ createSimulateContract({
  abi: dummyPoolAdapterAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link dummyPoolAdapterAbi}__ and `functionName` set to `"supply"`
 */
export const simulateDummyPoolAdapterSupply =
  /*#__PURE__*/ createSimulateContract({
    abi: dummyPoolAdapterAbi,
    functionName: 'supply',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link dummyPoolAdapterAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateDummyPoolAdapterWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: dummyPoolAdapterAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const readErc1155 = /*#__PURE__*/ createReadContract({ abi: erc1155Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc1155BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readErc1155BalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readErc1155IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc1155SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"uri"`
 */
export const readErc1155Uri = /*#__PURE__*/ createReadContract({
  abi: erc1155Abi,
  functionName: 'uri',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const writeErc1155 = /*#__PURE__*/ createWriteContract({
  abi: erc1155Abi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeErc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: erc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeErc1155SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc1155Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeErc1155SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: erc1155Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__
 */
export const simulateErc1155 = /*#__PURE__*/ createSimulateContract({
  abi: erc1155Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateErc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: erc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateErc1155SafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: erc1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateErc1155SetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: erc1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__
 */
export const watchErc1155Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchErc1155ApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1155Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchErc1155TransferBatchEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1155Abi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchErc1155TransferSingleEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1155Abi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1155Abi}__ and `eventName` set to `"URI"`
 */
export const watchErc1155UriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1155Abi,
  eventName: 'URI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc165Abi}__
 */
export const readErc165 = /*#__PURE__*/ createReadContract({ abi: erc165Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc165Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc165SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc165Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967ProxyAbi}__
 */
export const watchErc1967ProxyEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1967ProxyAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967ProxyAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const watchErc1967ProxyAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1967ProxyAbi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967ProxyAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const watchErc1967ProxyBeaconUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1967ProxyAbi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967ProxyAbi}__ and `eventName` set to `"Upgraded"`
 */
export const watchErc1967ProxyUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1967ProxyAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967UpgradeAbi}__
 */
export const watchErc1967UpgradeEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc1967UpgradeAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967UpgradeAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const watchErc1967UpgradeAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1967UpgradeAbi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967UpgradeAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const watchErc1967UpgradeBeaconUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1967UpgradeAbi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc1967UpgradeAbi}__ and `eventName` set to `"Upgraded"`
 */
export const watchErc1967UpgradeUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc1967UpgradeAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const readErc20 = /*#__PURE__*/ createReadContract({ abi: erc20Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const readErc20Allowance = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const readErc20Decimals = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const readErc20Name = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc20Symbol = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readErc20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const writeErc20 = /*#__PURE__*/ createWriteContract({ abi: erc20Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc20Approve = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const writeErc20DecreaseAllowance = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'decreaseAllowance',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const writeErc20IncreaseAllowance = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'increaseAllowance',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeErc20Transfer = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const simulateErc20 = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc20Approve = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const simulateErc20DecreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: erc20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const simulateErc20IncreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: erc20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateErc20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const watchErc20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc20Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const readErc721 = /*#__PURE__*/ createReadContract({ abi: erc721Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readErc721BalanceOf = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"getApproved"`
 */
export const readErc721GetApproved = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readErc721IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"name"`
 */
export const readErc721Name = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const readErc721OwnerOf = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readErc721SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"symbol"`
 */
export const readErc721Symbol = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const readErc721TokenUri = /*#__PURE__*/ createReadContract({
  abi: erc721Abi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const writeErc721 = /*#__PURE__*/ createWriteContract({ abi: erc721Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const writeErc721Approve = /*#__PURE__*/ createWriteContract({
  abi: erc721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeErc721SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc721Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeErc721SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: erc721Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeErc721TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: erc721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__
 */
export const simulateErc721 = /*#__PURE__*/ createSimulateContract({
  abi: erc721Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"approve"`
 */
export const simulateErc721Approve = /*#__PURE__*/ createSimulateContract({
  abi: erc721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateErc721SafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: erc721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateErc721SetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: erc721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link erc721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateErc721TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: erc721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__
 */
export const watchErc721Event = /*#__PURE__*/ createWatchContractEvent({
  abi: erc721Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Approval"`
 */
export const watchErc721ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc721Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchErc721ApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: erc721Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link erc721Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchErc721TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: erc721Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link gnosisSafeLikeAbi}__
 */
export const writeGnosisSafeLike = /*#__PURE__*/ createWriteContract({
  abi: gnosisSafeLikeAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link gnosisSafeLikeAbi}__ and `functionName` set to `"execTransaction"`
 */
export const writeGnosisSafeLikeExecTransaction =
  /*#__PURE__*/ createWriteContract({
    abi: gnosisSafeLikeAbi,
    functionName: 'execTransaction',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link gnosisSafeLikeAbi}__
 */
export const simulateGnosisSafeLike = /*#__PURE__*/ createSimulateContract({
  abi: gnosisSafeLikeAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link gnosisSafeLikeAbi}__ and `functionName` set to `"execTransaction"`
 */
export const simulateGnosisSafeLikeExecTransaction =
  /*#__PURE__*/ createSimulateContract({
    abi: gnosisSafeLikeAbi,
    functionName: 'execTransaction',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const readIAccessControl = /*#__PURE__*/ createReadContract({
  abi: iAccessControlAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const readIAccessControlGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: iAccessControlAbi,
  functionName: 'getRoleAdmin',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"hasRole"`
 */
export const readIAccessControlHasRole = /*#__PURE__*/ createReadContract({
  abi: iAccessControlAbi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const writeIAccessControl = /*#__PURE__*/ createWriteContract({
  abi: iAccessControlAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const writeIAccessControlGrantRole = /*#__PURE__*/ createWriteContract({
  abi: iAccessControlAbi,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const writeIAccessControlRenounceRole =
  /*#__PURE__*/ createWriteContract({
    abi: iAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const writeIAccessControlRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: iAccessControlAbi,
  functionName: 'revokeRole',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const simulateIAccessControl = /*#__PURE__*/ createSimulateContract({
  abi: iAccessControlAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"grantRole"`
 */
export const simulateIAccessControlGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: iAccessControlAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"renounceRole"`
 */
export const simulateIAccessControlRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: iAccessControlAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iAccessControlAbi}__ and `functionName` set to `"revokeRole"`
 */
export const simulateIAccessControlRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: iAccessControlAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__
 */
export const watchIAccessControlEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: iAccessControlAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const watchIAccessControlRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iAccessControlAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const watchIAccessControlRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iAccessControlAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iAccessControlAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const watchIAccessControlRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iAccessControlAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iBeaconAbi}__
 */
export const readIBeacon = /*#__PURE__*/ createReadContract({ abi: iBeaconAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iBeaconAbi}__ and `functionName` set to `"implementation"`
 */
export const readIBeaconImplementation = /*#__PURE__*/ createReadContract({
  abi: iBeaconAbi,
  functionName: 'implementation',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iChainlinkAggregatorLikeAbi}__
 */
export const readIChainlinkAggregatorLike = /*#__PURE__*/ createReadContract({
  abi: iChainlinkAggregatorLikeAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iChainlinkAggregatorLikeAbi}__ and `functionName` set to `"decimals"`
 */
export const readIChainlinkAggregatorLikeDecimals =
  /*#__PURE__*/ createReadContract({
    abi: iChainlinkAggregatorLikeAbi,
    functionName: 'decimals',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iChainlinkAggregatorLikeAbi}__ and `functionName` set to `"description"`
 */
export const readIChainlinkAggregatorLikeDescription =
  /*#__PURE__*/ createReadContract({
    abi: iChainlinkAggregatorLikeAbi,
    functionName: 'description',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iChainlinkAggregatorLikeAbi}__ and `functionName` set to `"latestRoundData"`
 */
export const readIChainlinkAggregatorLikeLatestRoundData =
  /*#__PURE__*/ createReadContract({
    abi: iChainlinkAggregatorLikeAbi,
    functionName: 'latestRoundData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__
 */
export const readIChainlinkFeedRegistryLike = /*#__PURE__*/ createReadContract({
  abi: iChainlinkFeedRegistryLikeAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"getFeed"`
 */
export const readIChainlinkFeedRegistryLikeGetFeed =
  /*#__PURE__*/ createReadContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'getFeed',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__
 */
export const writeIChainlinkFeedRegistryLike =
  /*#__PURE__*/ createWriteContract({ abi: iChainlinkFeedRegistryLikeAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeIChainlinkFeedRegistryLikeAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"confirmFeed"`
 */
export const writeIChainlinkFeedRegistryLikeConfirmFeed =
  /*#__PURE__*/ createWriteContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'confirmFeed',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"proposeFeed"`
 */
export const writeIChainlinkFeedRegistryLikeProposeFeed =
  /*#__PURE__*/ createWriteContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'proposeFeed',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeIChainlinkFeedRegistryLikeTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__
 */
export const simulateIChainlinkFeedRegistryLike =
  /*#__PURE__*/ createSimulateContract({ abi: iChainlinkFeedRegistryLikeAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateIChainlinkFeedRegistryLikeAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"confirmFeed"`
 */
export const simulateIChainlinkFeedRegistryLikeConfirmFeed =
  /*#__PURE__*/ createSimulateContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'confirmFeed',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"proposeFeed"`
 */
export const simulateIChainlinkFeedRegistryLikeProposeFeed =
  /*#__PURE__*/ createSimulateContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'proposeFeed',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iChainlinkFeedRegistryLikeAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateIChainlinkFeedRegistryLikeTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: iChainlinkFeedRegistryLikeAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__
 */
export const readICryptoKitties = /*#__PURE__*/ createReadContract({
  abi: iCryptoKittiesAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readICryptoKittiesBalanceOf = /*#__PURE__*/ createReadContract({
  abi: iCryptoKittiesAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"name"`
 */
export const readICryptoKittiesName = /*#__PURE__*/ createReadContract({
  abi: iCryptoKittiesAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readICryptoKittiesOwnerOf = /*#__PURE__*/ createReadContract({
  abi: iCryptoKittiesAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readICryptoKittiesSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: iCryptoKittiesAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"symbol"`
 */
export const readICryptoKittiesSymbol = /*#__PURE__*/ createReadContract({
  abi: iCryptoKittiesAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"tokenMetadata"`
 */
export const readICryptoKittiesTokenMetadata = /*#__PURE__*/ createReadContract(
  { abi: iCryptoKittiesAbi, functionName: 'tokenMetadata' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"tokensOfOwner"`
 */
export const readICryptoKittiesTokensOfOwner = /*#__PURE__*/ createReadContract(
  { abi: iCryptoKittiesAbi, functionName: 'tokensOfOwner' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readICryptoKittiesTotalSupply = /*#__PURE__*/ createReadContract({
  abi: iCryptoKittiesAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__
 */
export const writeICryptoKitties = /*#__PURE__*/ createWriteContract({
  abi: iCryptoKittiesAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"approve"`
 */
export const writeICryptoKittiesApprove = /*#__PURE__*/ createWriteContract({
  abi: iCryptoKittiesAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"transfer"`
 */
export const writeICryptoKittiesTransfer = /*#__PURE__*/ createWriteContract({
  abi: iCryptoKittiesAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeICryptoKittiesTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: iCryptoKittiesAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__
 */
export const simulateICryptoKitties = /*#__PURE__*/ createSimulateContract({
  abi: iCryptoKittiesAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"approve"`
 */
export const simulateICryptoKittiesApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: iCryptoKittiesAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateICryptoKittiesTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: iCryptoKittiesAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateICryptoKittiesTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: iCryptoKittiesAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iCryptoKittiesAbi}__
 */
export const watchICryptoKittiesEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: iCryptoKittiesAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `eventName` set to `"Approval"`
 */
export const watchICryptoKittiesApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iCryptoKittiesAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iCryptoKittiesAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchICryptoKittiesTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iCryptoKittiesAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const readIerc1155 = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc1155BalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readIerc1155BalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readIerc1155IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc1155SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: ierc1155Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const writeIerc1155 = /*#__PURE__*/ createWriteContract({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeIerc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeIerc1155SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: ierc1155Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeIerc1155SetApprovalForAll = /*#__PURE__*/ createWriteContract(
  { abi: ierc1155Abi, functionName: 'setApprovalForAll' },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const simulateIerc1155 = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateIerc1155SafeBatchTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateIerc1155SafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateIerc1155SetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__
 */
export const watchIerc1155Event = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchIerc1155ApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1155Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchIerc1155TransferBatchEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1155Abi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchIerc1155TransferSingleEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1155Abi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155Abi}__ and `eventName` set to `"URI"`
 */
export const watchIerc1155UriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1155Abi,
  eventName: 'URI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const readIerc1155MetadataUri = /*#__PURE__*/ createReadContract({
  abi: ierc1155MetadataUriAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc1155MetadataUriBalanceOf =
  /*#__PURE__*/ createReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readIerc1155MetadataUriBalanceOfBatch =
  /*#__PURE__*/ createReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'balanceOfBatch',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readIerc1155MetadataUriIsApprovedForAll =
  /*#__PURE__*/ createReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc1155MetadataUriSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"uri"`
 */
export const readIerc1155MetadataUriUri = /*#__PURE__*/ createReadContract({
  abi: ierc1155MetadataUriAbi,
  functionName: 'uri',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const writeIerc1155MetadataUri = /*#__PURE__*/ createWriteContract({
  abi: ierc1155MetadataUriAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeIerc1155MetadataUriSafeBatchTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeIerc1155MetadataUriSafeTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeIerc1155MetadataUriSetApprovalForAll =
  /*#__PURE__*/ createWriteContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const simulateIerc1155MetadataUri = /*#__PURE__*/ createSimulateContract(
  { abi: ierc1155MetadataUriAbi },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateIerc1155MetadataUriSafeBatchTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateIerc1155MetadataUriSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateIerc1155MetadataUriSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155MetadataUriAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__
 */
export const watchIerc1155MetadataUriEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: ierc1155MetadataUriAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchIerc1155MetadataUriApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchIerc1155MetadataUriTransferBatchEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchIerc1155MetadataUriTransferSingleEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriAbi}__ and `eventName` set to `"URI"`
 */
export const watchIerc1155MetadataUriUriEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1155MetadataUriAbi,
    eventName: 'URI',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const readIerc1155Receiver = /*#__PURE__*/ createReadContract({
  abi: ierc1155ReceiverAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc1155ReceiverSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const writeIerc1155Receiver = /*#__PURE__*/ createWriteContract({
  abi: ierc1155ReceiverAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const writeIerc1155ReceiverOnErc1155BatchReceived =
  /*#__PURE__*/ createWriteContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const writeIerc1155ReceiverOnErc1155Received =
  /*#__PURE__*/ createWriteContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__
 */
export const simulateIerc1155Receiver = /*#__PURE__*/ createSimulateContract({
  abi: ierc1155ReceiverAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const simulateIerc1155ReceiverOnErc1155BatchReceived =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc1155ReceiverAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const simulateIerc1155ReceiverOnErc1155Received =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc1155ReceiverAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1271Abi}__
 */
export const readIerc1271 = /*#__PURE__*/ createReadContract({
  abi: ierc1271Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1271Abi}__ and `functionName` set to `"isValidSignature"`
 */
export const readIerc1271IsValidSignature = /*#__PURE__*/ createReadContract({
  abi: ierc1271Abi,
  functionName: 'isValidSignature',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1822ProxiableAbi}__
 */
export const readIerc1822Proxiable = /*#__PURE__*/ createReadContract({
  abi: ierc1822ProxiableAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc1822ProxiableAbi}__ and `functionName` set to `"proxiableUUID"`
 */
export const readIerc1822ProxiableProxiableUuid =
  /*#__PURE__*/ createReadContract({
    abi: ierc1822ProxiableAbi,
    functionName: 'proxiableUUID',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__
 */
export const watchIerc1967Event = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc1967Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__ and `eventName` set to `"AdminChanged"`
 */
export const watchIerc1967AdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1967Abi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const watchIerc1967BeaconUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1967Abi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc1967Abi}__ and `eventName` set to `"Upgraded"`
 */
export const watchIerc1967UpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc1967Abi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const readIerc20Metadata = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"allowance"`
 */
export const readIerc20MetadataAllowance = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc20MetadataBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"decimals"`
 */
export const readIerc20MetadataDecimals = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"name"`
 */
export const readIerc20MetadataName = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const readIerc20MetadataSymbol = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readIerc20MetadataTotalSupply = /*#__PURE__*/ createReadContract({
  abi: ierc20MetadataAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const writeIerc20Metadata = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const writeIerc20MetadataApprove = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const writeIerc20MetadataTransfer = /*#__PURE__*/ createWriteContract({
  abi: ierc20MetadataAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc20MetadataTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const simulateIerc20Metadata = /*#__PURE__*/ createSimulateContract({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc20MetadataApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transfer"`
 */
export const simulateIerc20MetadataTransfer =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc20MetadataTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc20MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__
 */
export const watchIerc20MetadataEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ierc20MetadataAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc20MetadataApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc20MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc20MetadataTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc20MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const readIerc20Permit = /*#__PURE__*/ createReadContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readIerc20PermitDomainSeparator = /*#__PURE__*/ createReadContract(
  { abi: ierc20PermitAbi, functionName: 'DOMAIN_SEPARATOR' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"nonces"`
 */
export const readIerc20PermitNonces = /*#__PURE__*/ createReadContract({
  abi: ierc20PermitAbi,
  functionName: 'nonces',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const writeIerc20Permit = /*#__PURE__*/ createWriteContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const writeIerc20PermitPermit = /*#__PURE__*/ createWriteContract({
  abi: ierc20PermitAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__
 */
export const simulateIerc20Permit = /*#__PURE__*/ createSimulateContract({
  abi: ierc20PermitAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc20PermitAbi}__ and `functionName` set to `"permit"`
 */
export const simulateIerc20PermitPermit = /*#__PURE__*/ createSimulateContract({
  abi: ierc20PermitAbi,
  functionName: 'permit',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc5646Abi}__
 */
export const readIerc5646 = /*#__PURE__*/ createReadContract({
  abi: ierc5646Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc5646Abi}__ and `functionName` set to `"getStateFingerprint"`
 */
export const readIerc5646GetStateFingerprint = /*#__PURE__*/ createReadContract(
  { abi: ierc5646Abi, functionName: 'getStateFingerprint' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const readIerc721Metadata = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readIerc721MetadataBalanceOf = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"getApproved"`
 */
export const readIerc721MetadataGetApproved = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readIerc721MetadataIsApprovedForAll =
  /*#__PURE__*/ createReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"name"`
 */
export const readIerc721MetadataName = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readIerc721MetadataOwnerOf = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readIerc721MetadataSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: ierc721MetadataAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"symbol"`
 */
export const readIerc721MetadataSymbol = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readIerc721MetadataTokenUri = /*#__PURE__*/ createReadContract({
  abi: ierc721MetadataAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const writeIerc721Metadata = /*#__PURE__*/ createWriteContract({
  abi: ierc721MetadataAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const writeIerc721MetadataApprove = /*#__PURE__*/ createWriteContract({
  abi: ierc721MetadataAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeIerc721MetadataTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: ierc721MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const simulateIerc721Metadata = /*#__PURE__*/ createSimulateContract({
  abi: ierc721MetadataAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"approve"`
 */
export const simulateIerc721MetadataApprove =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateIerc721MetadataSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateIerc721MetadataSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateIerc721MetadataTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc721MetadataAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__
 */
export const watchIerc721MetadataEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: ierc721MetadataAbi },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Approval"`
 */
export const watchIerc721MetadataApprovalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchIerc721MetadataApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ierc721MetadataAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchIerc721MetadataTransferEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ierc721MetadataAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__
 */
export const writeIerc721Receiver = /*#__PURE__*/ createWriteContract({
  abi: ierc721ReceiverAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const writeIerc721ReceiverOnErc721Received =
  /*#__PURE__*/ createWriteContract({
    abi: ierc721ReceiverAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__
 */
export const simulateIerc721Receiver = /*#__PURE__*/ createSimulateContract({
  abi: ierc721ReceiverAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ierc721ReceiverAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const simulateIerc721ReceiverOnErc721Received =
  /*#__PURE__*/ createSimulateContract({
    abi: ierc721ReceiverAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__
 */
export const readIMultiTokenCategoryRegistry = /*#__PURE__*/ createReadContract(
  { abi: iMultiTokenCategoryRegistryAbi },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__ and `functionName` set to `"registeredCategoryValue"`
 */
export const readIMultiTokenCategoryRegistryRegisteredCategoryValue =
  /*#__PURE__*/ createReadContract({
    abi: iMultiTokenCategoryRegistryAbi,
    functionName: 'registeredCategoryValue',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__
 */
export const writeIMultiTokenCategoryRegistry =
  /*#__PURE__*/ createWriteContract({ abi: iMultiTokenCategoryRegistryAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__ and `functionName` set to `"registerCategoryValue"`
 */
export const writeIMultiTokenCategoryRegistryRegisterCategoryValue =
  /*#__PURE__*/ createWriteContract({
    abi: iMultiTokenCategoryRegistryAbi,
    functionName: 'registerCategoryValue',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__ and `functionName` set to `"unregisterCategoryValue"`
 */
export const writeIMultiTokenCategoryRegistryUnregisterCategoryValue =
  /*#__PURE__*/ createWriteContract({
    abi: iMultiTokenCategoryRegistryAbi,
    functionName: 'unregisterCategoryValue',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__
 */
export const simulateIMultiTokenCategoryRegistry =
  /*#__PURE__*/ createSimulateContract({ abi: iMultiTokenCategoryRegistryAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__ and `functionName` set to `"registerCategoryValue"`
 */
export const simulateIMultiTokenCategoryRegistryRegisterCategoryValue =
  /*#__PURE__*/ createSimulateContract({
    abi: iMultiTokenCategoryRegistryAbi,
    functionName: 'registerCategoryValue',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__ and `functionName` set to `"unregisterCategoryValue"`
 */
export const simulateIMultiTokenCategoryRegistryUnregisterCategoryValue =
  /*#__PURE__*/ createSimulateContract({
    abi: iMultiTokenCategoryRegistryAbi,
    functionName: 'unregisterCategoryValue',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__
 */
export const watchIMultiTokenCategoryRegistryEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iMultiTokenCategoryRegistryAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__ and `eventName` set to `"CategoryRegistered"`
 */
export const watchIMultiTokenCategoryRegistryCategoryRegisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iMultiTokenCategoryRegistryAbi,
    eventName: 'CategoryRegistered',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iMultiTokenCategoryRegistryAbi}__ and `eventName` set to `"CategoryUnregistered"`
 */
export const watchIMultiTokenCategoryRegistryCategoryUnregisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iMultiTokenCategoryRegistryAbi,
    eventName: 'CategoryUnregistered',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const readIMulticall3 = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBasefee"`
 */
export const readIMulticall3GetBasefee = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getBasefee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockHash"`
 */
export const readIMulticall3GetBlockHash = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getBlockHash',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getBlockNumber"`
 */
export const readIMulticall3GetBlockNumber = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getBlockNumber',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getChainId"`
 */
export const readIMulticall3GetChainId = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getChainId',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockCoinbase"`
 */
export const readIMulticall3GetCurrentBlockCoinbase =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockCoinbase',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockDifficulty"`
 */
export const readIMulticall3GetCurrentBlockDifficulty =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockDifficulty',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockGasLimit"`
 */
export const readIMulticall3GetCurrentBlockGasLimit =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockGasLimit',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getCurrentBlockTimestamp"`
 */
export const readIMulticall3GetCurrentBlockTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: iMulticall3Abi,
    functionName: 'getCurrentBlockTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getEthBalance"`
 */
export const readIMulticall3GetEthBalance = /*#__PURE__*/ createReadContract({
  abi: iMulticall3Abi,
  functionName: 'getEthBalance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"getLastBlockHash"`
 */
export const readIMulticall3GetLastBlockHash = /*#__PURE__*/ createReadContract(
  { abi: iMulticall3Abi, functionName: 'getLastBlockHash' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const writeIMulticall3 = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const writeIMulticall3Aggregate = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
  functionName: 'aggregate',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const writeIMulticall3Aggregate3 = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
  functionName: 'aggregate3',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const writeIMulticall3Aggregate3Value =
  /*#__PURE__*/ createWriteContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const writeIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createWriteContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const writeIMulticall3TryAggregate = /*#__PURE__*/ createWriteContract({
  abi: iMulticall3Abi,
  functionName: 'tryAggregate',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const writeIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createWriteContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__
 */
export const simulateIMulticall3 = /*#__PURE__*/ createSimulateContract({
  abi: iMulticall3Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate"`
 */
export const simulateIMulticall3Aggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3"`
 */
export const simulateIMulticall3Aggregate3 =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"aggregate3Value"`
 */
export const simulateIMulticall3Aggregate3Value =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'aggregate3Value',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"blockAndAggregate"`
 */
export const simulateIMulticall3BlockAndAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'blockAndAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryAggregate"`
 */
export const simulateIMulticall3TryAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryAggregate',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iMulticall3Abi}__ and `functionName` set to `"tryBlockAndAggregate"`
 */
export const simulateIMulticall3TryBlockAndAggregate =
  /*#__PURE__*/ createSimulateContract({
    abi: iMulticall3Abi,
    functionName: 'tryBlockAndAggregate',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ipwnDeployerAbi}__
 */
export const readIpwnDeployer = /*#__PURE__*/ createReadContract({
  abi: ipwnDeployerAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ipwnDeployerAbi}__ and `functionName` set to `"computeAddress"`
 */
export const readIpwnDeployerComputeAddress = /*#__PURE__*/ createReadContract({
  abi: ipwnDeployerAbi,
  functionName: 'computeAddress',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ipwnDeployerAbi}__
 */
export const writeIpwnDeployer = /*#__PURE__*/ createWriteContract({
  abi: ipwnDeployerAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ipwnDeployerAbi}__ and `functionName` set to `"deploy"`
 */
export const writeIpwnDeployerDeploy = /*#__PURE__*/ createWriteContract({
  abi: ipwnDeployerAbi,
  functionName: 'deploy',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ipwnDeployerAbi}__ and `functionName` set to `"deployAndTransferOwnership"`
 */
export const writeIpwnDeployerDeployAndTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ipwnDeployerAbi,
    functionName: 'deployAndTransferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ipwnDeployerAbi}__ and `functionName` set to `"owner"`
 */
export const writeIpwnDeployerOwner = /*#__PURE__*/ createWriteContract({
  abi: ipwnDeployerAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ipwnDeployerAbi}__
 */
export const simulateIpwnDeployer = /*#__PURE__*/ createSimulateContract({
  abi: ipwnDeployerAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ipwnDeployerAbi}__ and `functionName` set to `"deploy"`
 */
export const simulateIpwnDeployerDeploy = /*#__PURE__*/ createSimulateContract({
  abi: ipwnDeployerAbi,
  functionName: 'deploy',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ipwnDeployerAbi}__ and `functionName` set to `"deployAndTransferOwnership"`
 */
export const simulateIpwnDeployerDeployAndTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ipwnDeployerAbi,
    functionName: 'deployAndTransferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ipwnDeployerAbi}__ and `functionName` set to `"owner"`
 */
export const simulateIpwnDeployerOwner = /*#__PURE__*/ createSimulateContract({
  abi: ipwnDeployerAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ipwnLoanMetadataProviderAbi}__
 */
export const readIpwnLoanMetadataProvider = /*#__PURE__*/ createReadContract({
  abi: ipwnLoanMetadataProviderAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ipwnLoanMetadataProviderAbi}__ and `functionName` set to `"loanMetadataUri"`
 */
export const readIpwnLoanMetadataProviderLoanMetadataUri =
  /*#__PURE__*/ createReadContract({
    abi: ipwnLoanMetadataProviderAbi,
    functionName: 'loanMetadataUri',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iPoolAdapterAbi}__
 */
export const writeIPoolAdapter = /*#__PURE__*/ createWriteContract({
  abi: iPoolAdapterAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iPoolAdapterAbi}__ and `functionName` set to `"supply"`
 */
export const writeIPoolAdapterSupply = /*#__PURE__*/ createWriteContract({
  abi: iPoolAdapterAbi,
  functionName: 'supply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iPoolAdapterAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeIPoolAdapterWithdraw = /*#__PURE__*/ createWriteContract({
  abi: iPoolAdapterAbi,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iPoolAdapterAbi}__
 */
export const simulateIPoolAdapter = /*#__PURE__*/ createSimulateContract({
  abi: iPoolAdapterAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iPoolAdapterAbi}__ and `functionName` set to `"supply"`
 */
export const simulateIPoolAdapterSupply = /*#__PURE__*/ createSimulateContract({
  abi: iPoolAdapterAbi,
  functionName: 'supply',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iPoolAdapterAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateIPoolAdapterWithdraw =
  /*#__PURE__*/ createSimulateContract({
    abi: iPoolAdapterAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iStateFingerpringComputerAbi}__
 */
export const readIStateFingerpringComputer = /*#__PURE__*/ createReadContract({
  abi: iStateFingerpringComputerAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iStateFingerpringComputerAbi}__ and `functionName` set to `"computeStateFingerprint"`
 */
export const readIStateFingerpringComputerComputeStateFingerprint =
  /*#__PURE__*/ createReadContract({
    abi: iStateFingerpringComputerAbi,
    functionName: 'computeStateFingerprint',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iStateFingerpringComputerAbi}__ and `functionName` set to `"supportsToken"`
 */
export const readIStateFingerpringComputerSupportsToken =
  /*#__PURE__*/ createReadContract({
    abi: iStateFingerpringComputerAbi,
    functionName: 'supportsToken',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__
 */
export const readITransparentUpgradeableProxy =
  /*#__PURE__*/ createReadContract({ abi: iTransparentUpgradeableProxyAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"admin"`
 */
export const readITransparentUpgradeableProxyAdmin =
  /*#__PURE__*/ createReadContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'admin',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"implementation"`
 */
export const readITransparentUpgradeableProxyImplementation =
  /*#__PURE__*/ createReadContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'implementation',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__
 */
export const writeITransparentUpgradeableProxy =
  /*#__PURE__*/ createWriteContract({ abi: iTransparentUpgradeableProxyAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"changeAdmin"`
 */
export const writeITransparentUpgradeableProxyChangeAdmin =
  /*#__PURE__*/ createWriteContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'changeAdmin',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const writeITransparentUpgradeableProxyUpgradeTo =
  /*#__PURE__*/ createWriteContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const writeITransparentUpgradeableProxyUpgradeToAndCall =
  /*#__PURE__*/ createWriteContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__
 */
export const simulateITransparentUpgradeableProxy =
  /*#__PURE__*/ createSimulateContract({ abi: iTransparentUpgradeableProxyAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"changeAdmin"`
 */
export const simulateITransparentUpgradeableProxyChangeAdmin =
  /*#__PURE__*/ createSimulateContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'changeAdmin',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"upgradeTo"`
 */
export const simulateITransparentUpgradeableProxyUpgradeTo =
  /*#__PURE__*/ createSimulateContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'upgradeTo',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `functionName` set to `"upgradeToAndCall"`
 */
export const simulateITransparentUpgradeableProxyUpgradeToAndCall =
  /*#__PURE__*/ createSimulateContract({
    abi: iTransparentUpgradeableProxyAbi,
    functionName: 'upgradeToAndCall',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__
 */
export const watchITransparentUpgradeableProxyEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iTransparentUpgradeableProxyAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const watchITransparentUpgradeableProxyAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iTransparentUpgradeableProxyAbi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const watchITransparentUpgradeableProxyBeaconUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iTransparentUpgradeableProxyAbi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link iTransparentUpgradeableProxyAbi}__ and `eventName` set to `"Upgraded"`
 */
export const watchITransparentUpgradeableProxyUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: iTransparentUpgradeableProxyAbi,
    eventName: 'Upgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link initializableAbi}__
 */
export const watchInitializableEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: initializableAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link initializableAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchInitializableInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: initializableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenAbi}__
 */
export const readMultiToken = /*#__PURE__*/ createReadContract({
  abi: multiTokenAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenAbi}__ and `functionName` set to `"CATEGORY_NOT_REGISTERED"`
 */
export const readMultiTokenCategoryNotRegistered =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenAbi,
    functionName: 'CATEGORY_NOT_REGISTERED',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenAbi}__ and `functionName` set to `"CRYPTO_KITTIES_INTERFACE_ID"`
 */
export const readMultiTokenCryptoKittiesInterfaceId =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenAbi,
    functionName: 'CRYPTO_KITTIES_INTERFACE_ID',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenAbi}__ and `functionName` set to `"ERC1155_INTERFACE_ID"`
 */
export const readMultiTokenErc1155InterfaceId =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenAbi,
    functionName: 'ERC1155_INTERFACE_ID',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenAbi}__ and `functionName` set to `"ERC20_INTERFACE_ID"`
 */
export const readMultiTokenErc20InterfaceId = /*#__PURE__*/ createReadContract({
  abi: multiTokenAbi,
  functionName: 'ERC20_INTERFACE_ID',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenAbi}__ and `functionName` set to `"ERC721_INTERFACE_ID"`
 */
export const readMultiTokenErc721InterfaceId = /*#__PURE__*/ createReadContract(
  { abi: multiTokenAbi, functionName: 'ERC721_INTERFACE_ID' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__
 */
export const readMultiTokenCategoryRegistry = /*#__PURE__*/ createReadContract({
  abi: multiTokenCategoryRegistryAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"CATEGORY_NOT_REGISTERED"`
 */
export const readMultiTokenCategoryRegistryCategoryNotRegistered =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'CATEGORY_NOT_REGISTERED',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"owner"`
 */
export const readMultiTokenCategoryRegistryOwner =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readMultiTokenCategoryRegistryPendingOwner =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"registeredCategoryValue"`
 */
export const readMultiTokenCategoryRegistryRegisteredCategoryValue =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'registeredCategoryValue',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readMultiTokenCategoryRegistrySupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__
 */
export const writeMultiTokenCategoryRegistry =
  /*#__PURE__*/ createWriteContract({ abi: multiTokenCategoryRegistryAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeMultiTokenCategoryRegistryAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"registerCategoryValue"`
 */
export const writeMultiTokenCategoryRegistryRegisterCategoryValue =
  /*#__PURE__*/ createWriteContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'registerCategoryValue',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeMultiTokenCategoryRegistryRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeMultiTokenCategoryRegistryTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"unregisterCategoryValue"`
 */
export const writeMultiTokenCategoryRegistryUnregisterCategoryValue =
  /*#__PURE__*/ createWriteContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'unregisterCategoryValue',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__
 */
export const simulateMultiTokenCategoryRegistry =
  /*#__PURE__*/ createSimulateContract({ abi: multiTokenCategoryRegistryAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateMultiTokenCategoryRegistryAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"registerCategoryValue"`
 */
export const simulateMultiTokenCategoryRegistryRegisterCategoryValue =
  /*#__PURE__*/ createSimulateContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'registerCategoryValue',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateMultiTokenCategoryRegistryRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateMultiTokenCategoryRegistryTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `functionName` set to `"unregisterCategoryValue"`
 */
export const simulateMultiTokenCategoryRegistryUnregisterCategoryValue =
  /*#__PURE__*/ createSimulateContract({
    abi: multiTokenCategoryRegistryAbi,
    functionName: 'unregisterCategoryValue',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__
 */
export const watchMultiTokenCategoryRegistryEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: multiTokenCategoryRegistryAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `eventName` set to `"CategoryRegistered"`
 */
export const watchMultiTokenCategoryRegistryCategoryRegisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: multiTokenCategoryRegistryAbi,
    eventName: 'CategoryRegistered',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `eventName` set to `"CategoryUnregistered"`
 */
export const watchMultiTokenCategoryRegistryCategoryUnregisteredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: multiTokenCategoryRegistryAbi,
    eventName: 'CategoryUnregistered',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchMultiTokenCategoryRegistryOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: multiTokenCategoryRegistryAbi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link multiTokenCategoryRegistryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchMultiTokenCategoryRegistryOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: multiTokenCategoryRegistryAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const readOwnable = /*#__PURE__*/ createReadContract({ abi: ownableAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"owner"`
 */
export const readOwnableOwner = /*#__PURE__*/ createReadContract({
  abi: ownableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const writeOwnable = /*#__PURE__*/ createWriteContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeOwnableRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: ownableAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeOwnableTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: ownableAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__
 */
export const simulateOwnable = /*#__PURE__*/ createSimulateContract({
  abi: ownableAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateOwnableRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateOwnableTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableAbi}__
 */
export const watchOwnableEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ownableAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchOwnableOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownable2StepAbi}__
 */
export const readOwnable2Step = /*#__PURE__*/ createReadContract({
  abi: ownable2StepAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"owner"`
 */
export const readOwnable2StepOwner = /*#__PURE__*/ createReadContract({
  abi: ownable2StepAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readOwnable2StepPendingOwner = /*#__PURE__*/ createReadContract({
  abi: ownable2StepAbi,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepAbi}__
 */
export const writeOwnable2Step = /*#__PURE__*/ createWriteContract({
  abi: ownable2StepAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeOwnable2StepAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownable2StepAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeOwnable2StepRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownable2StepAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeOwnable2StepTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownable2StepAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepAbi}__
 */
export const simulateOwnable2Step = /*#__PURE__*/ createSimulateContract({
  abi: ownable2StepAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateOwnable2StepAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownable2StepAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateOwnable2StepRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownable2StepAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateOwnable2StepTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownable2StepAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownable2StepAbi}__
 */
export const watchOwnable2StepEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: ownable2StepAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownable2StepAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchOwnable2StepOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownable2StepAbi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownable2StepAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchOwnable2StepOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownable2StepAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__
 */
export const readOwnable2StepUpgradeable = /*#__PURE__*/ createReadContract({
  abi: ownable2StepUpgradeableAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"owner"`
 */
export const readOwnable2StepUpgradeableOwner =
  /*#__PURE__*/ createReadContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readOwnable2StepUpgradeablePendingOwner =
  /*#__PURE__*/ createReadContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__
 */
export const writeOwnable2StepUpgradeable = /*#__PURE__*/ createWriteContract({
  abi: ownable2StepUpgradeableAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writeOwnable2StepUpgradeableAcceptOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeOwnable2StepUpgradeableRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeOwnable2StepUpgradeableTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__
 */
export const simulateOwnable2StepUpgradeable =
  /*#__PURE__*/ createSimulateContract({ abi: ownable2StepUpgradeableAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulateOwnable2StepUpgradeableAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateOwnable2StepUpgradeableRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateOwnable2StepUpgradeableTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownable2StepUpgradeableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__
 */
export const watchOwnable2StepUpgradeableEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: ownable2StepUpgradeableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchOwnable2StepUpgradeableInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownable2StepUpgradeableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchOwnable2StepUpgradeableOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownable2StepUpgradeableAbi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownable2StepUpgradeableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchOwnable2StepUpgradeableOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownable2StepUpgradeableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const readOwnableUpgradeable = /*#__PURE__*/ createReadContract({
  abi: ownableUpgradeableAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"owner"`
 */
export const readOwnableUpgradeableOwner = /*#__PURE__*/ createReadContract({
  abi: ownableUpgradeableAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const writeOwnableUpgradeable = /*#__PURE__*/ createWriteContract({
  abi: ownableUpgradeableAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeOwnableUpgradeableRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownableUpgradeableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeOwnableUpgradeableTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: ownableUpgradeableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const simulateOwnableUpgradeable = /*#__PURE__*/ createSimulateContract({
  abi: ownableUpgradeableAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateOwnableUpgradeableRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownableUpgradeableAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateOwnableUpgradeableTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: ownableUpgradeableAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableUpgradeableAbi}__
 */
export const watchOwnableUpgradeableEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: ownableUpgradeableAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchOwnableUpgradeableInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownableUpgradeableAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link ownableUpgradeableAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchOwnableUpgradeableOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: ownableUpgradeableAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__
 */
export const readPwnConfig = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"MAX_FEE"`
 */
export const readPwnConfigMaxFee = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
  functionName: 'MAX_FEE',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"fee"`
 */
export const readPwnConfigFee = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
  functionName: 'fee',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"feeCollector"`
 */
export const readPwnConfigFeeCollector = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
  functionName: 'feeCollector',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"getPoolAdapter"`
 */
export const readPwnConfigGetPoolAdapter = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
  functionName: 'getPoolAdapter',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"getStateFingerprintComputer"`
 */
export const readPwnConfigGetStateFingerprintComputer =
  /*#__PURE__*/ createReadContract({
    abi: pwnConfigAbi,
    functionName: 'getStateFingerprintComputer',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"loanMetadataUri"`
 */
export const readPwnConfigLoanMetadataUri = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
  functionName: 'loanMetadataUri',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"owner"`
 */
export const readPwnConfigOwner = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readPwnConfigPendingOwner = /*#__PURE__*/ createReadContract({
  abi: pwnConfigAbi,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__
 */
export const writePwnConfig = /*#__PURE__*/ createWriteContract({
  abi: pwnConfigAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writePwnConfigAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: pwnConfigAbi,
  functionName: 'acceptOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"initialize"`
 */
export const writePwnConfigInitialize = /*#__PURE__*/ createWriteContract({
  abi: pwnConfigAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"registerPoolAdapter"`
 */
export const writePwnConfigRegisterPoolAdapter =
  /*#__PURE__*/ createWriteContract({
    abi: pwnConfigAbi,
    functionName: 'registerPoolAdapter',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"registerStateFingerprintComputer"`
 */
export const writePwnConfigRegisterStateFingerprintComputer =
  /*#__PURE__*/ createWriteContract({
    abi: pwnConfigAbi,
    functionName: 'registerStateFingerprintComputer',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writePwnConfigRenounceOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: pwnConfigAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setDefaultLOANMetadataUri"`
 */
export const writePwnConfigSetDefaultLoanMetadataUri =
  /*#__PURE__*/ createWriteContract({
    abi: pwnConfigAbi,
    functionName: 'setDefaultLOANMetadataUri',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setFee"`
 */
export const writePwnConfigSetFee = /*#__PURE__*/ createWriteContract({
  abi: pwnConfigAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setFeeCollector"`
 */
export const writePwnConfigSetFeeCollector = /*#__PURE__*/ createWriteContract({
  abi: pwnConfigAbi,
  functionName: 'setFeeCollector',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setLOANMetadataUri"`
 */
export const writePwnConfigSetLoanMetadataUri =
  /*#__PURE__*/ createWriteContract({
    abi: pwnConfigAbi,
    functionName: 'setLOANMetadataUri',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writePwnConfigTransferOwnership =
  /*#__PURE__*/ createWriteContract({
    abi: pwnConfigAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__
 */
export const simulatePwnConfig = /*#__PURE__*/ createSimulateContract({
  abi: pwnConfigAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulatePwnConfigAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"initialize"`
 */
export const simulatePwnConfigInitialize = /*#__PURE__*/ createSimulateContract(
  { abi: pwnConfigAbi, functionName: 'initialize' },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"registerPoolAdapter"`
 */
export const simulatePwnConfigRegisterPoolAdapter =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'registerPoolAdapter',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"registerStateFingerprintComputer"`
 */
export const simulatePwnConfigRegisterStateFingerprintComputer =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'registerStateFingerprintComputer',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulatePwnConfigRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setDefaultLOANMetadataUri"`
 */
export const simulatePwnConfigSetDefaultLoanMetadataUri =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'setDefaultLOANMetadataUri',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setFee"`
 */
export const simulatePwnConfigSetFee = /*#__PURE__*/ createSimulateContract({
  abi: pwnConfigAbi,
  functionName: 'setFee',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setFeeCollector"`
 */
export const simulatePwnConfigSetFeeCollector =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'setFeeCollector',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"setLOANMetadataUri"`
 */
export const simulatePwnConfigSetLoanMetadataUri =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'setLOANMetadataUri',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnConfigAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulatePwnConfigTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnConfigAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__
 */
export const watchPwnConfigEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pwnConfigAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__ and `eventName` set to `"DefaultLOANMetadataUriUpdated"`
 */
export const watchPwnConfigDefaultLoanMetadataUriUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnConfigAbi,
    eventName: 'DefaultLOANMetadataUriUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__ and `eventName` set to `"FeeCollectorUpdated"`
 */
export const watchPwnConfigFeeCollectorUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnConfigAbi,
    eventName: 'FeeCollectorUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__ and `eventName` set to `"FeeUpdated"`
 */
export const watchPwnConfigFeeUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnConfigAbi,
    eventName: 'FeeUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__ and `eventName` set to `"Initialized"`
 */
export const watchPwnConfigInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnConfigAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__ and `eventName` set to `"LOANMetadataUriUpdated"`
 */
export const watchPwnConfigLoanMetadataUriUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnConfigAbi,
    eventName: 'LOANMetadataUriUpdated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchPwnConfigOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnConfigAbi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnConfigAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchPwnConfigOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnConfigAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnHubAbi}__
 */
export const readPwnHub = /*#__PURE__*/ createReadContract({ abi: pwnHubAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"hasTag"`
 */
export const readPwnHubHasTag = /*#__PURE__*/ createReadContract({
  abi: pwnHubAbi,
  functionName: 'hasTag',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"owner"`
 */
export const readPwnHubOwner = /*#__PURE__*/ createReadContract({
  abi: pwnHubAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const readPwnHubPendingOwner = /*#__PURE__*/ createReadContract({
  abi: pwnHubAbi,
  functionName: 'pendingOwner',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnHubAbi}__
 */
export const writePwnHub = /*#__PURE__*/ createWriteContract({ abi: pwnHubAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const writePwnHubAcceptOwnership = /*#__PURE__*/ createWriteContract({
  abi: pwnHubAbi,
  functionName: 'acceptOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writePwnHubRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: pwnHubAbi,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"setTag"`
 */
export const writePwnHubSetTag = /*#__PURE__*/ createWriteContract({
  abi: pwnHubAbi,
  functionName: 'setTag',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"setTags"`
 */
export const writePwnHubSetTags = /*#__PURE__*/ createWriteContract({
  abi: pwnHubAbi,
  functionName: 'setTags',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writePwnHubTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: pwnHubAbi,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnHubAbi}__
 */
export const simulatePwnHub = /*#__PURE__*/ createSimulateContract({
  abi: pwnHubAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"acceptOwnership"`
 */
export const simulatePwnHubAcceptOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnHubAbi,
    functionName: 'acceptOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulatePwnHubRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnHubAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"setTag"`
 */
export const simulatePwnHubSetTag = /*#__PURE__*/ createSimulateContract({
  abi: pwnHubAbi,
  functionName: 'setTag',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"setTags"`
 */
export const simulatePwnHubSetTags = /*#__PURE__*/ createSimulateContract({
  abi: pwnHubAbi,
  functionName: 'setTags',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnHubAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulatePwnHubTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnHubAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnHubAbi}__
 */
export const watchPwnHubEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pwnHubAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnHubAbi}__ and `eventName` set to `"OwnershipTransferStarted"`
 */
export const watchPwnHubOwnershipTransferStartedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnHubAbi,
    eventName: 'OwnershipTransferStarted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnHubAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchPwnHubOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnHubAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnHubAbi}__ and `eventName` set to `"TagSet"`
 */
export const watchPwnHubTagSetEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pwnHubAbi,
  eventName: 'TagSet',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__
 */
export const readPwnloan = /*#__PURE__*/ createReadContract({ abi: pwnloanAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readPwnloanBalanceOf = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"getApproved"`
 */
export const readPwnloanGetApproved = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"getStateFingerprint"`
 */
export const readPwnloanGetStateFingerprint = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'getStateFingerprint',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnloanHub = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'hub',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readPwnloanIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"lastLoanId"`
 */
export const readPwnloanLastLoanId = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'lastLoanId',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"loanContract"`
 */
export const readPwnloanLoanContract = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'loanContract',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"name"`
 */
export const readPwnloanName = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readPwnloanOwnerOf = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readPwnloanSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"symbol"`
 */
export const readPwnloanSymbol = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readPwnloanTokenUri = /*#__PURE__*/ createReadContract({
  abi: pwnloanAbi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnloanAbi}__
 */
export const writePwnloan = /*#__PURE__*/ createWriteContract({
  abi: pwnloanAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"approve"`
 */
export const writePwnloanApprove = /*#__PURE__*/ createWriteContract({
  abi: pwnloanAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"burn"`
 */
export const writePwnloanBurn = /*#__PURE__*/ createWriteContract({
  abi: pwnloanAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"mint"`
 */
export const writePwnloanMint = /*#__PURE__*/ createWriteContract({
  abi: pwnloanAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writePwnloanSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: pwnloanAbi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writePwnloanSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: pwnloanAbi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writePwnloanTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: pwnloanAbi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnloanAbi}__
 */
export const simulatePwnloan = /*#__PURE__*/ createSimulateContract({
  abi: pwnloanAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"approve"`
 */
export const simulatePwnloanApprove = /*#__PURE__*/ createSimulateContract({
  abi: pwnloanAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"burn"`
 */
export const simulatePwnloanBurn = /*#__PURE__*/ createSimulateContract({
  abi: pwnloanAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"mint"`
 */
export const simulatePwnloanMint = /*#__PURE__*/ createSimulateContract({
  abi: pwnloanAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulatePwnloanSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnloanAbi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulatePwnloanSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnloanAbi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnloanAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulatePwnloanTransferFrom = /*#__PURE__*/ createSimulateContract(
  { abi: pwnloanAbi, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnloanAbi}__
 */
export const watchPwnloanEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pwnloanAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnloanAbi}__ and `eventName` set to `"Approval"`
 */
export const watchPwnloanApprovalEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: pwnloanAbi, eventName: 'Approval' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnloanAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchPwnloanApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnloanAbi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnloanAbi}__ and `eventName` set to `"LOANBurned"`
 */
export const watchPwnloanLoanBurnedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnloanAbi,
    eventName: 'LOANBurned',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnloanAbi}__ and `eventName` set to `"LOANMinted"`
 */
export const watchPwnloanLoanMintedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnloanAbi,
    eventName: 'LOANMinted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnloanAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchPwnloanTransferEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: pwnloanAbi, eventName: 'Transfer' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__
 */
export const readPwnRevokedNonce = /*#__PURE__*/ createReadContract({
  abi: pwnRevokedNonceAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"accessTag"`
 */
export const readPwnRevokedNonceAccessTag = /*#__PURE__*/ createReadContract({
  abi: pwnRevokedNonceAbi,
  functionName: 'accessTag',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"currentNonceSpace"`
 */
export const readPwnRevokedNonceCurrentNonceSpace =
  /*#__PURE__*/ createReadContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'currentNonceSpace',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnRevokedNonceHub = /*#__PURE__*/ createReadContract({
  abi: pwnRevokedNonceAbi,
  functionName: 'hub',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"isNonceRevoked"`
 */
export const readPwnRevokedNonceIsNonceRevoked =
  /*#__PURE__*/ createReadContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'isNonceRevoked',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"isNonceUsable"`
 */
export const readPwnRevokedNonceIsNonceUsable =
  /*#__PURE__*/ createReadContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'isNonceUsable',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__
 */
export const writePwnRevokedNonce = /*#__PURE__*/ createWriteContract({
  abi: pwnRevokedNonceAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnRevokedNonceRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"revokeNonceSpace"`
 */
export const writePwnRevokedNonceRevokeNonceSpace =
  /*#__PURE__*/ createWriteContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'revokeNonceSpace',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"revokeNonces"`
 */
export const writePwnRevokedNonceRevokeNonces =
  /*#__PURE__*/ createWriteContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'revokeNonces',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__
 */
export const simulatePwnRevokedNonce = /*#__PURE__*/ createSimulateContract({
  abi: pwnRevokedNonceAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnRevokedNonceRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"revokeNonceSpace"`
 */
export const simulatePwnRevokedNonceRevokeNonceSpace =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'revokeNonceSpace',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `functionName` set to `"revokeNonces"`
 */
export const simulatePwnRevokedNonceRevokeNonces =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnRevokedNonceAbi,
    functionName: 'revokeNonces',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnRevokedNonceAbi}__
 */
export const watchPwnRevokedNonceEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: pwnRevokedNonceAbi },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `eventName` set to `"NonceRevoked"`
 */
export const watchPwnRevokedNonceNonceRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnRevokedNonceAbi,
    eventName: 'NonceRevoked',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnRevokedNonceAbi}__ and `eventName` set to `"NonceSpaceRevoked"`
 */
export const watchPwnRevokedNonceNonceSpaceRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnRevokedNonceAbi,
    eventName: 'NonceSpaceRevoked',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSignatureCheckerHarnessAbi}__
 */
export const readPwnSignatureCheckerHarness = /*#__PURE__*/ createReadContract({
  abi: pwnSignatureCheckerHarnessAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSignatureCheckerHarnessAbi}__ and `functionName` set to `"exposed_isValidSignatureNow"`
 */
export const readPwnSignatureCheckerHarnessExposedIsValidSignatureNow =
  /*#__PURE__*/ createReadContract({
    abi: pwnSignatureCheckerHarnessAbi,
    functionName: 'exposed_isValidSignatureNow',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__
 */
export const readPwnSimpleLoan = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"ACCRUING_INTEREST_APR_DECIMALS"`
 */
export const readPwnSimpleLoanAccruingInterestAprDecimals =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'ACCRUING_INTEREST_APR_DECIMALS',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"ACCRUING_INTEREST_APR_DENOMINATOR"`
 */
export const readPwnSimpleLoanAccruingInterestAprDenominator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'ACCRUING_INTEREST_APR_DENOMINATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"EXTENSION_PROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanExtensionProposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'EXTENSION_PROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"MAX_ACCRUING_INTEREST_APR"`
 */
export const readPwnSimpleLoanMaxAccruingInterestApr =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'MAX_ACCRUING_INTEREST_APR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"MAX_EXTENSION_DURATION"`
 */
export const readPwnSimpleLoanMaxExtensionDuration =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'MAX_EXTENSION_DURATION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"MINUTES_IN_YEAR"`
 */
export const readPwnSimpleLoanMinutesInYear = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'MINUTES_IN_YEAR',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"MIN_EXTENSION_DURATION"`
 */
export const readPwnSimpleLoanMinExtensionDuration =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'MIN_EXTENSION_DURATION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"MIN_LOAN_DURATION"`
 */
export const readPwnSimpleLoanMinLoanDuration =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'MIN_LOAN_DURATION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"VERSION"`
 */
export const readPwnSimpleLoanVersion = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'VERSION',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"categoryRegistry"`
 */
export const readPwnSimpleLoanCategoryRegistry =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'categoryRegistry',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanConfig = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'config',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"extensionProposalsMade"`
 */
export const readPwnSimpleLoanExtensionProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'extensionProposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"getExtensionHash"`
 */
export const readPwnSimpleLoanGetExtensionHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'getExtensionHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"getLOAN"`
 */
export const readPwnSimpleLoanGetLoan = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'getLOAN',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"getLenderSpecHash"`
 */
export const readPwnSimpleLoanGetLenderSpecHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'getLenderSpecHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"getStateFingerprint"`
 */
export const readPwnSimpleLoanGetStateFingerprint =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'getStateFingerprint',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanHub = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'hub',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"isValidAsset"`
 */
export const readPwnSimpleLoanIsValidAsset = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'isValidAsset',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"loanMetadataUri"`
 */
export const readPwnSimpleLoanLoanMetadataUri =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'loanMetadataUri',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"loanRepaymentAmount"`
 */
export const readPwnSimpleLoanLoanRepaymentAmount =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'loanRepaymentAmount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"loanToken"`
 */
export const readPwnSimpleLoanLoanToken = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'loanToken',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const readPwnSimpleLoanOnErc1155BatchReceived =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const readPwnSimpleLoanOnErc1155Received =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const readPwnSimpleLoanOnErc721Received =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanRevokedNonce = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'revokedNonce',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readPwnSimpleLoanSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__
 */
export const writePwnSimpleLoan = /*#__PURE__*/ createWriteContract({
  abi: pwnSimpleLoanAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"claimLOAN"`
 */
export const writePwnSimpleLoanClaimLoan = /*#__PURE__*/ createWriteContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'claimLOAN',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"createLOAN"`
 */
export const writePwnSimpleLoanCreateLoan = /*#__PURE__*/ createWriteContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'createLOAN',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"extendLOAN"`
 */
export const writePwnSimpleLoanExtendLoan = /*#__PURE__*/ createWriteContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'extendLOAN',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"makeExtensionProposal"`
 */
export const writePwnSimpleLoanMakeExtensionProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'makeExtensionProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"repayLOAN"`
 */
export const writePwnSimpleLoanRepayLoan = /*#__PURE__*/ createWriteContract({
  abi: pwnSimpleLoanAbi,
  functionName: 'repayLOAN',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"tryClaimRepaidLOAN"`
 */
export const writePwnSimpleLoanTryClaimRepaidLoan =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'tryClaimRepaidLOAN',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__
 */
export const simulatePwnSimpleLoan = /*#__PURE__*/ createSimulateContract({
  abi: pwnSimpleLoanAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"claimLOAN"`
 */
export const simulatePwnSimpleLoanClaimLoan =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'claimLOAN',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"createLOAN"`
 */
export const simulatePwnSimpleLoanCreateLoan =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'createLOAN',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"extendLOAN"`
 */
export const simulatePwnSimpleLoanExtendLoan =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'extendLOAN',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"makeExtensionProposal"`
 */
export const simulatePwnSimpleLoanMakeExtensionProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'makeExtensionProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"repayLOAN"`
 */
export const simulatePwnSimpleLoanRepayLoan =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'repayLOAN',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `functionName` set to `"tryClaimRepaidLOAN"`
 */
export const simulatePwnSimpleLoanTryClaimRepaidLoan =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanAbi,
    functionName: 'tryClaimRepaidLOAN',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__
 */
export const watchPwnSimpleLoanEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pwnSimpleLoanAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"ExtensionProposalMade"`
 */
export const watchPwnSimpleLoanExtensionProposalMadeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'ExtensionProposalMade',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"LOANClaimed"`
 */
export const watchPwnSimpleLoanLoanClaimedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'LOANClaimed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"LOANCreated"`
 */
export const watchPwnSimpleLoanLoanCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'LOANCreated',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"LOANExtended"`
 */
export const watchPwnSimpleLoanLoanExtendedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'LOANExtended',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"LOANPaidBack"`
 */
export const watchPwnSimpleLoanLoanPaidBackEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'LOANPaidBack',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"PoolSupply"`
 */
export const watchPwnSimpleLoanPoolSupplyEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'PoolSupply',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"PoolWithdraw"`
 */
export const watchPwnSimpleLoanPoolWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'PoolWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"VaultPull"`
 */
export const watchPwnSimpleLoanVaultPullEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'VaultPull',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"VaultPush"`
 */
export const watchPwnSimpleLoanVaultPushEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'VaultPush',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanAbi}__ and `eventName` set to `"VaultPushFrom"`
 */
export const watchPwnSimpleLoanVaultPushFromEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanAbi,
    eventName: 'VaultPushFrom',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__
 */
export const readPwnSimpleLoanDutchAuctionProposal =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanDutchAuctionProposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanDutchAuctionProposalMultiproposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanDutchAuctionProposalMultiproposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'MULTIPROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"PROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanDutchAuctionProposalProposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'PROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"VERSION"`
 */
export const readPwnSimpleLoanDutchAuctionProposalVersion =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'VERSION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanDutchAuctionProposalConfig =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'config',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"decodeProposalData"`
 */
export const readPwnSimpleLoanDutchAuctionProposalDecodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'decodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"encodeProposalData"`
 */
export const readPwnSimpleLoanDutchAuctionProposalEncodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'encodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"getCreditAmount"`
 */
export const readPwnSimpleLoanDutchAuctionProposalGetCreditAmount =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'getCreditAmount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"getMultiproposalHash"`
 */
export const readPwnSimpleLoanDutchAuctionProposalGetMultiproposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'getMultiproposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"getProposalHash"`
 */
export const readPwnSimpleLoanDutchAuctionProposalGetProposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'getProposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanDutchAuctionProposalHub =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'hub',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"proposalsMade"`
 */
export const readPwnSimpleLoanDutchAuctionProposalProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'proposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanDutchAuctionProposalRevokedNonce =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'revokedNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnSimpleLoanDutchAuctionProposalUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__
 */
export const writePwnSimpleLoanDutchAuctionProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const writePwnSimpleLoanDutchAuctionProposalAcceptProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const writePwnSimpleLoanDutchAuctionProposalMakeProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnSimpleLoanDutchAuctionProposalRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__
 */
export const simulatePwnSimpleLoanDutchAuctionProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const simulatePwnSimpleLoanDutchAuctionProposalAcceptProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const simulatePwnSimpleLoanDutchAuctionProposalMakeProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnSimpleLoanDutchAuctionProposalRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__
 */
export const watchPwnSimpleLoanDutchAuctionProposalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanDutchAuctionProposalAbi}__ and `eventName` set to `"ProposalMade"`
 */
export const watchPwnSimpleLoanDutchAuctionProposalProposalMadeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanDutchAuctionProposalAbi,
    eventName: 'ProposalMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__
 */
export const readPwnSimpleLoanElasticChainlinkProposal =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"LOAN_TO_VALUE_DENOMINATOR"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalLoanToValueDenominator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'LOAN_TO_VALUE_DENOMINATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"MAX_INTERMEDIARY_DENOMINATIONS"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalMaxIntermediaryDenominations =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'MAX_INTERMEDIARY_DENOMINATIONS',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalMultiproposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalMultiproposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'MULTIPROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"PROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalProposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'PROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"VERSION"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalVersion =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'VERSION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"WETH"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalWeth =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'WETH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"chainlinkFeedRegistry"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalChainlinkFeedRegistry =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'chainlinkFeedRegistry',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalConfig =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'config',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"decodeProposalData"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalDecodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'decodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"encodeProposalData"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalEncodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'encodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"getCollateralAmount"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalGetCollateralAmount =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'getCollateralAmount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"getMultiproposalHash"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalGetMultiproposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'getMultiproposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"getProposalHash"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalGetProposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'getProposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHub =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'hub',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"l2SequencerUptimeFeed"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalL2SequencerUptimeFeed =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'l2SequencerUptimeFeed',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"proposalsMade"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'proposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalRevokedNonce =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'revokedNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__
 */
export const writePwnSimpleLoanElasticChainlinkProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const writePwnSimpleLoanElasticChainlinkProposalAcceptProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const writePwnSimpleLoanElasticChainlinkProposalMakeProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnSimpleLoanElasticChainlinkProposalRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__
 */
export const simulatePwnSimpleLoanElasticChainlinkProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const simulatePwnSimpleLoanElasticChainlinkProposalAcceptProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const simulatePwnSimpleLoanElasticChainlinkProposalMakeProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnSimpleLoanElasticChainlinkProposalRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__
 */
export const watchPwnSimpleLoanElasticChainlinkProposalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalAbi}__ and `eventName` set to `"ProposalMade"`
 */
export const watchPwnSimpleLoanElasticChainlinkProposalProposalMadeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanElasticChainlinkProposalAbi,
    eventName: 'ProposalMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarness =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"LOAN_TO_VALUE_DENOMINATOR"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessLoanToValueDenominator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'LOAN_TO_VALUE_DENOMINATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"MAX_INTERMEDIARY_DENOMINATIONS"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessMaxIntermediaryDenominations =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'MAX_INTERMEDIARY_DENOMINATIONS',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"MULTIPROPOSAL_DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessMultiproposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"MULTIPROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessMultiproposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'MULTIPROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"PROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessProposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'PROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"VERSION"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessVersion =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'VERSION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"WETH"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessWeth =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'WETH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"chainlinkFeedRegistry"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessChainlinkFeedRegistry =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'chainlinkFeedRegistry',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessConfig =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'config',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"decodeProposalData"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessDecodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'decodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"encodeProposalData"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessEncodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'encodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"exposed_erc712EncodeProposal"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessExposedErc712EncodeProposal =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'exposed_erc712EncodeProposal',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"getCollateralAmount"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessGetCollateralAmount =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'getCollateralAmount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"getMultiproposalHash"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessGetMultiproposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'getMultiproposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"getProposalHash"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessGetProposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'getProposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessHub =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'hub',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"l2SequencerUptimeFeed"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessL2SequencerUptimeFeed =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'l2SequencerUptimeFeed',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"proposalsMade"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'proposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessRevokedNonce =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'revokedNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnSimpleLoanElasticChainlinkProposalHarnessUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__
 */
export const writePwnSimpleLoanElasticChainlinkProposalHarness =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const writePwnSimpleLoanElasticChainlinkProposalHarnessAcceptProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"makeProposal"`
 */
export const writePwnSimpleLoanElasticChainlinkProposalHarnessMakeProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnSimpleLoanElasticChainlinkProposalHarnessRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__
 */
export const simulatePwnSimpleLoanElasticChainlinkProposalHarness =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const simulatePwnSimpleLoanElasticChainlinkProposalHarnessAcceptProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"makeProposal"`
 */
export const simulatePwnSimpleLoanElasticChainlinkProposalHarnessMakeProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnSimpleLoanElasticChainlinkProposalHarnessRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__
 */
export const watchPwnSimpleLoanElasticChainlinkProposalHarnessEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanElasticChainlinkProposalHarnessAbi}__ and `eventName` set to `"ProposalMade"`
 */
export const watchPwnSimpleLoanElasticChainlinkProposalHarnessProposalMadeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanElasticChainlinkProposalHarnessAbi,
    eventName: 'ProposalMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__
 */
export const readPwnSimpleLoanElasticProposal =
  /*#__PURE__*/ createReadContract({ abi: pwnSimpleLoanElasticProposalAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR"`
 */
export const readPwnSimpleLoanElasticProposalCreditPerCollateralUnitDenominator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'CREDIT_PER_COLLATERAL_UNIT_DENOMINATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanElasticProposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanElasticProposalMultiproposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanElasticProposalMultiproposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'MULTIPROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"PROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanElasticProposalProposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'PROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"VERSION"`
 */
export const readPwnSimpleLoanElasticProposalVersion =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'VERSION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanElasticProposalConfig =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'config',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"decodeProposalData"`
 */
export const readPwnSimpleLoanElasticProposalDecodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'decodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"encodeProposalData"`
 */
export const readPwnSimpleLoanElasticProposalEncodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'encodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"getCollateralAmount"`
 */
export const readPwnSimpleLoanElasticProposalGetCollateralAmount =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'getCollateralAmount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"getMultiproposalHash"`
 */
export const readPwnSimpleLoanElasticProposalGetMultiproposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'getMultiproposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"getProposalHash"`
 */
export const readPwnSimpleLoanElasticProposalGetProposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'getProposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanElasticProposalHub =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'hub',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"proposalsMade"`
 */
export const readPwnSimpleLoanElasticProposalProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'proposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanElasticProposalRevokedNonce =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'revokedNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnSimpleLoanElasticProposalUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__
 */
export const writePwnSimpleLoanElasticProposal =
  /*#__PURE__*/ createWriteContract({ abi: pwnSimpleLoanElasticProposalAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const writePwnSimpleLoanElasticProposalAcceptProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const writePwnSimpleLoanElasticProposalMakeProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnSimpleLoanElasticProposalRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__
 */
export const simulatePwnSimpleLoanElasticProposal =
  /*#__PURE__*/ createSimulateContract({ abi: pwnSimpleLoanElasticProposalAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const simulatePwnSimpleLoanElasticProposalAcceptProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const simulatePwnSimpleLoanElasticProposalMakeProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnSimpleLoanElasticProposalRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanElasticProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__
 */
export const watchPwnSimpleLoanElasticProposalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanElasticProposalAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanElasticProposalAbi}__ and `eventName` set to `"ProposalMade"`
 */
export const watchPwnSimpleLoanElasticProposalProposalMadeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanElasticProposalAbi,
    eventName: 'ProposalMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__
 */
export const readPwnSimpleLoanListProposal = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanListProposalAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanListProposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanListProposalMultiproposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanListProposalMultiproposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'MULTIPROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"PROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanListProposalProposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'PROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"VERSION"`
 */
export const readPwnSimpleLoanListProposalVersion =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'VERSION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanListProposalConfig =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'config',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"decodeProposalData"`
 */
export const readPwnSimpleLoanListProposalDecodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'decodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"encodeProposalData"`
 */
export const readPwnSimpleLoanListProposalEncodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'encodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"getMultiproposalHash"`
 */
export const readPwnSimpleLoanListProposalGetMultiproposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'getMultiproposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"getProposalHash"`
 */
export const readPwnSimpleLoanListProposalGetProposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'getProposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanListProposalHub =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'hub',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"proposalsMade"`
 */
export const readPwnSimpleLoanListProposalProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'proposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanListProposalRevokedNonce =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'revokedNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnSimpleLoanListProposalUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__
 */
export const writePwnSimpleLoanListProposal = /*#__PURE__*/ createWriteContract(
  { abi: pwnSimpleLoanListProposalAbi },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const writePwnSimpleLoanListProposalAcceptProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const writePwnSimpleLoanListProposalMakeProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnSimpleLoanListProposalRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__
 */
export const simulatePwnSimpleLoanListProposal =
  /*#__PURE__*/ createSimulateContract({ abi: pwnSimpleLoanListProposalAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const simulatePwnSimpleLoanListProposalAcceptProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const simulatePwnSimpleLoanListProposalMakeProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnSimpleLoanListProposalRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanListProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__
 */
export const watchPwnSimpleLoanListProposalEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: pwnSimpleLoanListProposalAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanListProposalAbi}__ and `eventName` set to `"ProposalMade"`
 */
export const watchPwnSimpleLoanListProposalProposalMadeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanListProposalAbi,
    eventName: 'ProposalMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__
 */
export const readPwnSimpleLoanProposal = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanProposalAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanProposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanProposalMultiproposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanProposalMultiproposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'MULTIPROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanProposalConfig = /*#__PURE__*/ createReadContract(
  { abi: pwnSimpleLoanProposalAbi, functionName: 'config' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"getMultiproposalHash"`
 */
export const readPwnSimpleLoanProposalGetMultiproposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'getMultiproposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanProposalHub = /*#__PURE__*/ createReadContract({
  abi: pwnSimpleLoanProposalAbi,
  functionName: 'hub',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"proposalsMade"`
 */
export const readPwnSimpleLoanProposalProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'proposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanProposalRevokedNonce =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'revokedNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnSimpleLoanProposalUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__
 */
export const writePwnSimpleLoanProposal = /*#__PURE__*/ createWriteContract({
  abi: pwnSimpleLoanProposalAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const writePwnSimpleLoanProposalAcceptProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnSimpleLoanProposalRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__
 */
export const simulatePwnSimpleLoanProposal =
  /*#__PURE__*/ createSimulateContract({ abi: pwnSimpleLoanProposalAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const simulatePwnSimpleLoanProposalAcceptProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnSimpleLoanProposalRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__
 */
export const readPwnSimpleLoanSimpleProposal = /*#__PURE__*/ createReadContract(
  { abi: pwnSimpleLoanSimpleProposalAbi },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanSimpleProposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_DOMAIN_SEPARATOR"`
 */
export const readPwnSimpleLoanSimpleProposalMultiproposalDomainSeparator =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'MULTIPROPOSAL_DOMAIN_SEPARATOR',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"MULTIPROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanSimpleProposalMultiproposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'MULTIPROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"PROPOSAL_TYPEHASH"`
 */
export const readPwnSimpleLoanSimpleProposalProposalTypehash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'PROPOSAL_TYPEHASH',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"VERSION"`
 */
export const readPwnSimpleLoanSimpleProposalVersion =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'VERSION',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"config"`
 */
export const readPwnSimpleLoanSimpleProposalConfig =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'config',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"decodeProposalData"`
 */
export const readPwnSimpleLoanSimpleProposalDecodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'decodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"encodeProposalData"`
 */
export const readPwnSimpleLoanSimpleProposalEncodeProposalData =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'encodeProposalData',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"getMultiproposalHash"`
 */
export const readPwnSimpleLoanSimpleProposalGetMultiproposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'getMultiproposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"getProposalHash"`
 */
export const readPwnSimpleLoanSimpleProposalGetProposalHash =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'getProposalHash',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnSimpleLoanSimpleProposalHub =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'hub',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"proposalsMade"`
 */
export const readPwnSimpleLoanSimpleProposalProposalsMade =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'proposalsMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"revokedNonce"`
 */
export const readPwnSimpleLoanSimpleProposalRevokedNonce =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'revokedNonce',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnSimpleLoanSimpleProposalUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__
 */
export const writePwnSimpleLoanSimpleProposal =
  /*#__PURE__*/ createWriteContract({ abi: pwnSimpleLoanSimpleProposalAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const writePwnSimpleLoanSimpleProposalAcceptProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const writePwnSimpleLoanSimpleProposalMakeProposal =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const writePwnSimpleLoanSimpleProposalRevokeNonce =
  /*#__PURE__*/ createWriteContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__
 */
export const simulatePwnSimpleLoanSimpleProposal =
  /*#__PURE__*/ createSimulateContract({ abi: pwnSimpleLoanSimpleProposalAbi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const simulatePwnSimpleLoanSimpleProposalAcceptProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'acceptProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"makeProposal"`
 */
export const simulatePwnSimpleLoanSimpleProposalMakeProposal =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'makeProposal',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `functionName` set to `"revokeNonce"`
 */
export const simulatePwnSimpleLoanSimpleProposalRevokeNonce =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnSimpleLoanSimpleProposalAbi,
    functionName: 'revokeNonce',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__
 */
export const watchPwnSimpleLoanSimpleProposalEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanSimpleProposalAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnSimpleLoanSimpleProposalAbi}__ and `eventName` set to `"ProposalMade"`
 */
export const watchPwnSimpleLoanSimpleProposalProposalMadeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnSimpleLoanSimpleProposalAbi,
    eventName: 'ProposalMade',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__
 */
export const readPwnUtilizedCredit = /*#__PURE__*/ createReadContract({
  abi: pwnUtilizedCreditAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__ and `functionName` set to `"accessTag"`
 */
export const readPwnUtilizedCreditAccessTag = /*#__PURE__*/ createReadContract({
  abi: pwnUtilizedCreditAbi,
  functionName: 'accessTag',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__ and `functionName` set to `"hub"`
 */
export const readPwnUtilizedCreditHub = /*#__PURE__*/ createReadContract({
  abi: pwnUtilizedCreditAbi,
  functionName: 'hub',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__ and `functionName` set to `"utilizedCredit"`
 */
export const readPwnUtilizedCreditUtilizedCredit =
  /*#__PURE__*/ createReadContract({
    abi: pwnUtilizedCreditAbi,
    functionName: 'utilizedCredit',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__
 */
export const writePwnUtilizedCredit = /*#__PURE__*/ createWriteContract({
  abi: pwnUtilizedCreditAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__ and `functionName` set to `"utilizeCredit"`
 */
export const writePwnUtilizedCreditUtilizeCredit =
  /*#__PURE__*/ createWriteContract({
    abi: pwnUtilizedCreditAbi,
    functionName: 'utilizeCredit',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__
 */
export const simulatePwnUtilizedCredit = /*#__PURE__*/ createSimulateContract({
  abi: pwnUtilizedCreditAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link pwnUtilizedCreditAbi}__ and `functionName` set to `"utilizeCredit"`
 */
export const simulatePwnUtilizedCreditUtilizeCredit =
  /*#__PURE__*/ createSimulateContract({
    abi: pwnUtilizedCreditAbi,
    functionName: 'utilizeCredit',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnVaultAbi}__
 */
export const readPwnVault = /*#__PURE__*/ createReadContract({
  abi: pwnVaultAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnVaultAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const readPwnVaultOnErc1155BatchReceived =
  /*#__PURE__*/ createReadContract({
    abi: pwnVaultAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnVaultAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const readPwnVaultOnErc1155Received = /*#__PURE__*/ createReadContract({
  abi: pwnVaultAbi,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnVaultAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const readPwnVaultOnErc721Received = /*#__PURE__*/ createReadContract({
  abi: pwnVaultAbi,
  functionName: 'onERC721Received',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link pwnVaultAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readPwnVaultSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: pwnVaultAbi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnVaultAbi}__
 */
export const watchPwnVaultEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: pwnVaultAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnVaultAbi}__ and `eventName` set to `"PoolSupply"`
 */
export const watchPwnVaultPoolSupplyEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnVaultAbi,
    eventName: 'PoolSupply',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnVaultAbi}__ and `eventName` set to `"PoolWithdraw"`
 */
export const watchPwnVaultPoolWithdrawEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnVaultAbi,
    eventName: 'PoolWithdraw',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnVaultAbi}__ and `eventName` set to `"VaultPull"`
 */
export const watchPwnVaultVaultPullEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnVaultAbi,
    eventName: 'VaultPull',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnVaultAbi}__ and `eventName` set to `"VaultPush"`
 */
export const watchPwnVaultVaultPushEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnVaultAbi,
    eventName: 'VaultPush',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link pwnVaultAbi}__ and `eventName` set to `"VaultPushFrom"`
 */
export const watchPwnVaultVaultPushFromEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: pwnVaultAbi,
    eventName: 'VaultPushFrom',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t1155Abi}__
 */
export const readT1155 = /*#__PURE__*/ createReadContract({ abi: t1155Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readT1155BalanceOf = /*#__PURE__*/ createReadContract({
  abi: t1155Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const readT1155BalanceOfBatch = /*#__PURE__*/ createReadContract({
  abi: t1155Abi,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readT1155IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: t1155Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readT1155SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: t1155Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"uri"`
 */
export const readT1155Uri = /*#__PURE__*/ createReadContract({
  abi: t1155Abi,
  functionName: 'uri',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t1155Abi}__
 */
export const writeT1155 = /*#__PURE__*/ createWriteContract({ abi: t1155Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"burn"`
 */
export const writeT1155Burn = /*#__PURE__*/ createWriteContract({
  abi: t1155Abi,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"mint"`
 */
export const writeT1155Mint = /*#__PURE__*/ createWriteContract({
  abi: t1155Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const writeT1155SafeBatchTransferFrom =
  /*#__PURE__*/ createWriteContract({
    abi: t1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeT1155SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: t1155Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeT1155SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: t1155Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t1155Abi}__
 */
export const simulateT1155 = /*#__PURE__*/ createSimulateContract({
  abi: t1155Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"burn"`
 */
export const simulateT1155Burn = /*#__PURE__*/ createSimulateContract({
  abi: t1155Abi,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"mint"`
 */
export const simulateT1155Mint = /*#__PURE__*/ createSimulateContract({
  abi: t1155Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const simulateT1155SafeBatchTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: t1155Abi,
    functionName: 'safeBatchTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateT1155SafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: t1155Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t1155Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateT1155SetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: t1155Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t1155Abi}__
 */
export const watchT1155Event = /*#__PURE__*/ createWatchContractEvent({
  abi: t1155Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t1155Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchT1155ApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: t1155Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t1155Abi}__ and `eventName` set to `"TransferBatch"`
 */
export const watchT1155TransferBatchEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: t1155Abi,
    eventName: 'TransferBatch',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t1155Abi}__ and `eventName` set to `"TransferSingle"`
 */
export const watchT1155TransferSingleEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: t1155Abi,
    eventName: 'TransferSingle',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t1155Abi}__ and `eventName` set to `"URI"`
 */
export const watchT1155UriEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: t1155Abi,
  eventName: 'URI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t20Abi}__
 */
export const readT20 = /*#__PURE__*/ createReadContract({ abi: t20Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"allowance"`
 */
export const readT20Allowance = /*#__PURE__*/ createReadContract({
  abi: t20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readT20BalanceOf = /*#__PURE__*/ createReadContract({
  abi: t20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"decimals"`
 */
export const readT20Decimals = /*#__PURE__*/ createReadContract({
  abi: t20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"name"`
 */
export const readT20Name = /*#__PURE__*/ createReadContract({
  abi: t20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"symbol"`
 */
export const readT20Symbol = /*#__PURE__*/ createReadContract({
  abi: t20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const readT20TotalSupply = /*#__PURE__*/ createReadContract({
  abi: t20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__
 */
export const writeT20 = /*#__PURE__*/ createWriteContract({ abi: t20Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"approve"`
 */
export const writeT20Approve = /*#__PURE__*/ createWriteContract({
  abi: t20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"burn"`
 */
export const writeT20Burn = /*#__PURE__*/ createWriteContract({
  abi: t20Abi,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const writeT20DecreaseAllowance = /*#__PURE__*/ createWriteContract({
  abi: t20Abi,
  functionName: 'decreaseAllowance',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const writeT20IncreaseAllowance = /*#__PURE__*/ createWriteContract({
  abi: t20Abi,
  functionName: 'increaseAllowance',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"mint"`
 */
export const writeT20Mint = /*#__PURE__*/ createWriteContract({
  abi: t20Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"transfer"`
 */
export const writeT20Transfer = /*#__PURE__*/ createWriteContract({
  abi: t20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeT20TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: t20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__
 */
export const simulateT20 = /*#__PURE__*/ createSimulateContract({ abi: t20Abi })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"approve"`
 */
export const simulateT20Approve = /*#__PURE__*/ createSimulateContract({
  abi: t20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"burn"`
 */
export const simulateT20Burn = /*#__PURE__*/ createSimulateContract({
  abi: t20Abi,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"decreaseAllowance"`
 */
export const simulateT20DecreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: t20Abi,
    functionName: 'decreaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"increaseAllowance"`
 */
export const simulateT20IncreaseAllowance =
  /*#__PURE__*/ createSimulateContract({
    abi: t20Abi,
    functionName: 'increaseAllowance',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"mint"`
 */
export const simulateT20Mint = /*#__PURE__*/ createSimulateContract({
  abi: t20Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"transfer"`
 */
export const simulateT20Transfer = /*#__PURE__*/ createSimulateContract({
  abi: t20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateT20TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: t20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t20Abi}__
 */
export const watchT20Event = /*#__PURE__*/ createWatchContractEvent({
  abi: t20Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t20Abi}__ and `eventName` set to `"Approval"`
 */
export const watchT20ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: t20Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t20Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchT20TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: t20Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__
 */
export const readT721 = /*#__PURE__*/ createReadContract({ abi: t721Abi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"balanceOf"`
 */
export const readT721BalanceOf = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"getApproved"`
 */
export const readT721GetApproved = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readT721IsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"name"`
 */
export const readT721Name = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"ownerOf"`
 */
export const readT721OwnerOf = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"supportsInterface"`
 */
export const readT721SupportsInterface = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"symbol"`
 */
export const readT721Symbol = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"tokenURI"`
 */
export const readT721TokenUri = /*#__PURE__*/ createReadContract({
  abi: t721Abi,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t721Abi}__
 */
export const writeT721 = /*#__PURE__*/ createWriteContract({ abi: t721Abi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"approve"`
 */
export const writeT721Approve = /*#__PURE__*/ createWriteContract({
  abi: t721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"burn"`
 */
export const writeT721Burn = /*#__PURE__*/ createWriteContract({
  abi: t721Abi,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"mint"`
 */
export const writeT721Mint = /*#__PURE__*/ createWriteContract({
  abi: t721Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeT721SafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: t721Abi,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeT721SetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: t721Abi,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const writeT721TransferFrom = /*#__PURE__*/ createWriteContract({
  abi: t721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t721Abi}__
 */
export const simulateT721 = /*#__PURE__*/ createSimulateContract({
  abi: t721Abi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"approve"`
 */
export const simulateT721Approve = /*#__PURE__*/ createSimulateContract({
  abi: t721Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"burn"`
 */
export const simulateT721Burn = /*#__PURE__*/ createSimulateContract({
  abi: t721Abi,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"mint"`
 */
export const simulateT721Mint = /*#__PURE__*/ createSimulateContract({
  abi: t721Abi,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateT721SafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: t721Abi,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateT721SetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: t721Abi,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link t721Abi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateT721TransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: t721Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t721Abi}__
 */
export const watchT721Event = /*#__PURE__*/ createWatchContractEvent({
  abi: t721Abi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t721Abi}__ and `eventName` set to `"Approval"`
 */
export const watchT721ApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: t721Abi,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t721Abi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchT721ApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: t721Abi,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link t721Abi}__ and `eventName` set to `"Transfer"`
 */
export const watchT721TransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: t721Abi,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__
 */
export const readTest = /*#__PURE__*/ createReadContract({ abi: testAbi })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"IS_TEST"`
 */
export const readTestIsTest = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'IS_TEST',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"excludeArtifacts"`
 */
export const readTestExcludeArtifacts = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'excludeArtifacts',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"excludeContracts"`
 */
export const readTestExcludeContracts = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'excludeContracts',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"excludeSenders"`
 */
export const readTestExcludeSenders = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'excludeSenders',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"targetArtifactSelectors"`
 */
export const readTestTargetArtifactSelectors = /*#__PURE__*/ createReadContract(
  { abi: testAbi, functionName: 'targetArtifactSelectors' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"targetArtifacts"`
 */
export const readTestTargetArtifacts = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'targetArtifacts',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"targetContracts"`
 */
export const readTestTargetContracts = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'targetContracts',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"targetInterfaces"`
 */
export const readTestTargetInterfaces = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'targetInterfaces',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"targetSelectors"`
 */
export const readTestTargetSelectors = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'targetSelectors',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"targetSenders"`
 */
export const readTestTargetSenders = /*#__PURE__*/ createReadContract({
  abi: testAbi,
  functionName: 'targetSenders',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link testAbi}__
 */
export const writeTest = /*#__PURE__*/ createWriteContract({ abi: testAbi })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"failed"`
 */
export const writeTestFailed = /*#__PURE__*/ createWriteContract({
  abi: testAbi,
  functionName: 'failed',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link testAbi}__
 */
export const simulateTest = /*#__PURE__*/ createSimulateContract({
  abi: testAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link testAbi}__ and `functionName` set to `"failed"`
 */
export const simulateTestFailed = /*#__PURE__*/ createSimulateContract({
  abi: testAbi,
  functionName: 'failed',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__
 */
export const watchTestEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log"`
 */
export const watchTestLogEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_address"`
 */
export const watchTestLogAddressEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log_address',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_array"`
 */
export const watchTestLogArrayEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log_array',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_bytes"`
 */
export const watchTestLogBytesEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log_bytes',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_bytes32"`
 */
export const watchTestLogBytes32Event = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log_bytes32',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_int"`
 */
export const watchTestLogIntEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log_int',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_address"`
 */
export const watchTestLogNamedAddressEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_address',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_array"`
 */
export const watchTestLogNamedArrayEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_array',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_bytes"`
 */
export const watchTestLogNamedBytesEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_bytes',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_bytes32"`
 */
export const watchTestLogNamedBytes32Event =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_bytes32',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_decimal_int"`
 */
export const watchTestLogNamedDecimalIntEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_decimal_int',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_decimal_uint"`
 */
export const watchTestLogNamedDecimalUintEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_decimal_uint',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_int"`
 */
export const watchTestLogNamedIntEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: testAbi, eventName: 'log_named_int' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_string"`
 */
export const watchTestLogNamedStringEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_string',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_named_uint"`
 */
export const watchTestLogNamedUintEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: testAbi,
    eventName: 'log_named_uint',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_string"`
 */
export const watchTestLogStringEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log_string',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"log_uint"`
 */
export const watchTestLogUintEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'log_uint',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link testAbi}__ and `eventName` set to `"logs"`
 */
export const watchTestLogsEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: testAbi,
  eventName: 'logs',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__
 */
export const readTimelockController = /*#__PURE__*/ createReadContract({
  abi: timelockControllerAbi,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"CANCELLER_ROLE"`
 */
export const readTimelockControllerCancellerRole =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'CANCELLER_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 */
export const readTimelockControllerDefaultAdminRole =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"EXECUTOR_ROLE"`
 */
export const readTimelockControllerExecutorRole =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'EXECUTOR_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"PROPOSER_ROLE"`
 */
export const readTimelockControllerProposerRole =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'PROPOSER_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"TIMELOCK_ADMIN_ROLE"`
 */
export const readTimelockControllerTimelockAdminRole =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'TIMELOCK_ADMIN_ROLE',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"getMinDelay"`
 */
export const readTimelockControllerGetMinDelay =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'getMinDelay',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"getRoleAdmin"`
 */
export const readTimelockControllerGetRoleAdmin =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'getRoleAdmin',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"getTimestamp"`
 */
export const readTimelockControllerGetTimestamp =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'getTimestamp',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"hasRole"`
 */
export const readTimelockControllerHasRole = /*#__PURE__*/ createReadContract({
  abi: timelockControllerAbi,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"hashOperation"`
 */
export const readTimelockControllerHashOperation =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'hashOperation',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"hashOperationBatch"`
 */
export const readTimelockControllerHashOperationBatch =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'hashOperationBatch',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"isOperation"`
 */
export const readTimelockControllerIsOperation =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'isOperation',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"isOperationDone"`
 */
export const readTimelockControllerIsOperationDone =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'isOperationDone',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"isOperationPending"`
 */
export const readTimelockControllerIsOperationPending =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'isOperationPending',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"isOperationReady"`
 */
export const readTimelockControllerIsOperationReady =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'isOperationReady',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readTimelockControllerSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: timelockControllerAbi,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__
 */
export const writeTimelockController = /*#__PURE__*/ createWriteContract({
  abi: timelockControllerAbi,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"cancel"`
 */
export const writeTimelockControllerCancel = /*#__PURE__*/ createWriteContract({
  abi: timelockControllerAbi,
  functionName: 'cancel',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"execute"`
 */
export const writeTimelockControllerExecute = /*#__PURE__*/ createWriteContract(
  { abi: timelockControllerAbi, functionName: 'execute' },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"executeBatch"`
 */
export const writeTimelockControllerExecuteBatch =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'executeBatch',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"grantRole"`
 */
export const writeTimelockControllerGrantRole =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const writeTimelockControllerOnErc1155BatchReceived =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const writeTimelockControllerOnErc1155Received =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const writeTimelockControllerOnErc721Received =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"renounceRole"`
 */
export const writeTimelockControllerRenounceRole =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"revokeRole"`
 */
export const writeTimelockControllerRevokeRole =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"schedule"`
 */
export const writeTimelockControllerSchedule =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'schedule',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"scheduleBatch"`
 */
export const writeTimelockControllerScheduleBatch =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'scheduleBatch',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"updateDelay"`
 */
export const writeTimelockControllerUpdateDelay =
  /*#__PURE__*/ createWriteContract({
    abi: timelockControllerAbi,
    functionName: 'updateDelay',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__
 */
export const simulateTimelockController = /*#__PURE__*/ createSimulateContract({
  abi: timelockControllerAbi,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"cancel"`
 */
export const simulateTimelockControllerCancel =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'cancel',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"execute"`
 */
export const simulateTimelockControllerExecute =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'execute',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"executeBatch"`
 */
export const simulateTimelockControllerExecuteBatch =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'executeBatch',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"grantRole"`
 */
export const simulateTimelockControllerGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const simulateTimelockControllerOnErc1155BatchReceived =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'onERC1155BatchReceived',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const simulateTimelockControllerOnErc1155Received =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'onERC1155Received',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const simulateTimelockControllerOnErc721Received =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"renounceRole"`
 */
export const simulateTimelockControllerRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"revokeRole"`
 */
export const simulateTimelockControllerRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"schedule"`
 */
export const simulateTimelockControllerSchedule =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'schedule',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"scheduleBatch"`
 */
export const simulateTimelockControllerScheduleBatch =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'scheduleBatch',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link timelockControllerAbi}__ and `functionName` set to `"updateDelay"`
 */
export const simulateTimelockControllerUpdateDelay =
  /*#__PURE__*/ createSimulateContract({
    abi: timelockControllerAbi,
    functionName: 'updateDelay',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__
 */
export const watchTimelockControllerEvent =
  /*#__PURE__*/ createWatchContractEvent({ abi: timelockControllerAbi })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"CallExecuted"`
 */
export const watchTimelockControllerCallExecutedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'CallExecuted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"CallSalt"`
 */
export const watchTimelockControllerCallSaltEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'CallSalt',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"CallScheduled"`
 */
export const watchTimelockControllerCallScheduledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'CallScheduled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"Cancelled"`
 */
export const watchTimelockControllerCancelledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'Cancelled',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"MinDelayChange"`
 */
export const watchTimelockControllerMinDelayChangeEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'MinDelayChange',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"RoleAdminChanged"`
 */
export const watchTimelockControllerRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"RoleGranted"`
 */
export const watchTimelockControllerRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link timelockControllerAbi}__ and `eventName` set to `"RoleRevoked"`
 */
export const watchTimelockControllerRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: timelockControllerAbi,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link transparentUpgradeableProxyAbi}__
 */
export const watchTransparentUpgradeableProxyEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: transparentUpgradeableProxyAbi,
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link transparentUpgradeableProxyAbi}__ and `eventName` set to `"AdminChanged"`
 */
export const watchTransparentUpgradeableProxyAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: transparentUpgradeableProxyAbi,
    eventName: 'AdminChanged',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link transparentUpgradeableProxyAbi}__ and `eventName` set to `"BeaconUpgraded"`
 */
export const watchTransparentUpgradeableProxyBeaconUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: transparentUpgradeableProxyAbi,
    eventName: 'BeaconUpgraded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link transparentUpgradeableProxyAbi}__ and `eventName` set to `"Upgraded"`
 */
export const watchTransparentUpgradeableProxyUpgradedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: transparentUpgradeableProxyAbi,
    eventName: 'Upgraded',
  })
