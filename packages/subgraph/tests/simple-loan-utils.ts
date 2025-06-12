import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { LOANCreated, LOANPaidBack, LOANClaimed, LOANExtended, ExtensionProposalMade } from "../generated/SimpleLoan/SimpleLoan"
import { assert, test, newMockEvent, dataSourceMock, createMockedFunction } from 'matchstick-as/assembly/index'
import { handleLOANCreated } from "../src/simple-loan"
import { Loan } from "../generated/schema";

// Define a class to hold the parameters
export class TestLoanParams {
  proposalHash: Bytes = Bytes.fromHexString("0x1234");
  proposalContract: Address = Address.fromString("0x0000000000000000000000000000000000000001");
  refinancingLoanId: BigInt = BigInt.fromI32(0);
  lender: Address = Address.fromString("0x0000000000000000000000000000000000000002");
  borrower: Address = Address.fromString("0x0000000000000000000000000000000000000003");
  duration: BigInt = BigInt.fromI32(30);
  createdAt: BigInt = BigInt.fromI32(1234567890);
  collateralAssetAddress: Address = Address.fromString("0x0000000000000000000000000000000000000004");
  collateralId: BigInt = BigInt.fromI32(1);
  collateralCategory: i32 = 1;
  collateralAmount: BigInt = BigInt.fromI32(100);
  creditAssetAddress: Address = Address.fromString("0x0000000000000000000000000000000000000005");
  creditId: BigInt = BigInt.fromI32(0);
  creditCategory: i32 = 0;
  creditAmount: BigInt = BigInt.fromI32(1000);
  fixedInterestAmount: BigInt = BigInt.fromI32(50);
  accruingInterestAPR: i32 = 1000;
  lenderSpecHash: Bytes = Bytes.fromHexString("0x5678");
  borrowerSpecHash: Bytes = Bytes.fromHexString("0x9abc");
  sourceOfFunds: Address = Address.fromString("0x0000000000000000000000000000000000000003");
  extra: Bytes = Bytes.fromHexString("0x1234");
  loanTokenAddress: Address = Address.fromString("0x0000000000000000000000000000000000000006");
  loanContractAddress: Address = Address.fromString("0x0000000000000000000000000000000000000007");
}

export function createTestLoan(loanId: BigInt, params: TestLoanParams | null = null): Loan {
  // Use default params if none provided
  const p = params ? params : new TestLoanParams();
  
  const createEvent = createLOANCreatedEvent(
    loanId,
    p.proposalHash,
    p.proposalContract,
    p.refinancingLoanId,
    p.lender,
    p.borrower,
    p.duration,
    p.createdAt,
    p.collateralAssetAddress,
    p.collateralId,
    p.collateralCategory,
    p.collateralAmount,
    p.creditAssetAddress,
    p.creditId,
    p.creditCategory,
    p.creditAmount,
    p.fixedInterestAmount,
    p.accruingInterestAPR,
    p.lenderSpecHash,
    p.borrowerSpecHash,
    p.sourceOfFunds,
    p.extra,
    p.loanContractAddress
  );

  createMockedFunction(p.loanContractAddress, 'loanToken', 'loanToken():(address)')
    .returns([ethereum.Value.fromAddress(p.loanTokenAddress)])

  const loan = handleLOANCreated(createEvent);
  return loan;
}

export function createLOANCreatedEvent(
  loanId: BigInt,
  proposalHash: Bytes,
  proposalContract: Address,
  refinancingLoanId: BigInt,
  lender: Address,
  borrower: Address,
  duration: BigInt,
  createdAt: BigInt,
  collateralAssetAddress: Address,
  collateralId: BigInt,
  collateralCategory: i32,
  collateralAmount: BigInt,
  creditAssetAddress: Address,
  creditId: BigInt,
  creditCategory: i32,
  creditAmount: BigInt,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  lenderSpecHash: Bytes,
  borrowerSpecHash: Bytes,
  sourceOfFunds: Address,
  extra: Bytes,
  loanContractAddress: Address
): LOANCreated {
  let event = changetype<LOANCreated>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  event.parameters.push(
    new ethereum.EventParam("proposalHash", ethereum.Value.fromBytes(proposalHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposalContract", ethereum.Value.fromAddress(proposalContract))
  )
  event.parameters.push(
    new ethereum.EventParam("refinancingLoanId", ethereum.Value.fromUnsignedBigInt(refinancingLoanId))
  )
  event.parameters.push(
    new ethereum.EventParam("terms", ethereum.Value.fromTuple(createTermsTuple(
      lender,
      borrower,
      duration,
      collateralAssetAddress,
      collateralId,
      collateralCategory,
      collateralAmount,
      creditAssetAddress,
      creditId,
      creditCategory,
      creditAmount,
      fixedInterestAmount,
      accruingInterestAPR,
      lenderSpecHash,
      borrowerSpecHash
    )))
  )
  event.parameters.push(
    new ethereum.EventParam("lenderSpec", ethereum.Value.fromTuple(createLenderSpecTuple(
      sourceOfFunds
    )))
  )
  event.parameters.push(
    new ethereum.EventParam("extra", ethereum.Value.fromBytes(extra))
  )

  event.block.timestamp = createdAt

  event.address = loanContractAddress

  return event
}

function createTermsTuple(
  lender: Address,
  borrower: Address,
  duration: BigInt,
  collateralAssetAddress: Address,
  collateralId: BigInt,
  collateralCategory: i32,
  collateralAmount: BigInt,
  creditAssetAddress: Address,
  creditId: BigInt,
  creditCategory: i32,
  creditAmount: BigInt,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  lenderSpecHash: Bytes,
  borrowerSpecHash: Bytes
): ethereum.Tuple {
  let tuple = new ethereum.Tuple()
  tuple.push(ethereum.Value.fromAddress(lender))
  tuple.push(ethereum.Value.fromAddress(borrower))
  tuple.push(ethereum.Value.fromUnsignedBigInt(duration))
  tuple.push(ethereum.Value.fromTuple(createAssetTuple(
    collateralAssetAddress,
    collateralId,
    collateralCategory,
    collateralAmount
  )))
  tuple.push(ethereum.Value.fromTuple(createAssetTuple(
    creditAssetAddress,
    creditId,
    creditCategory,
    creditAmount
  )))
  tuple.push(ethereum.Value.fromUnsignedBigInt(fixedInterestAmount))
  tuple.push(ethereum.Value.fromI32(accruingInterestAPR))
  tuple.push(ethereum.Value.fromBytes(lenderSpecHash))
  tuple.push(ethereum.Value.fromBytes(borrowerSpecHash))
  return tuple
}

function createAssetTuple(
  assetAddress: Address,
  id: BigInt,
  category: i32,
  amount: BigInt
): ethereum.Tuple {
  let tuple = new ethereum.Tuple()
  tuple.push(ethereum.Value.fromI32(category))
  tuple.push(ethereum.Value.fromAddress(assetAddress))
  tuple.push(ethereum.Value.fromUnsignedBigInt(id))
  tuple.push(ethereum.Value.fromUnsignedBigInt(amount))
  return tuple
}

function createLenderSpecTuple(
  sourceOfFunds: Address
): ethereum.Tuple {
  let tuple = new ethereum.Tuple()
  tuple.push(ethereum.Value.fromAddress(sourceOfFunds))
  return tuple
}

export function createLOANClaimedEvent(
  loanId: BigInt,
  defaulted: boolean,
  loanContractAddress: Address
): LOANClaimed {
  let event = changetype<LOANClaimed>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  event.parameters.push(
    new ethereum.EventParam("defaulted", ethereum.Value.fromBoolean(defaulted))
  )

  // Mock the loanToken() call
  event.address = loanContractAddress

  return event
}

export function createLOANExtendedEvent(
  loanId: BigInt,
  originalDefaultTimestamp: BigInt,
  extendedDefaultTimestamp: BigInt,
  loanTokenAddress: Address
): LOANExtended {
  let event = changetype<LOANExtended>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  event.parameters.push(
    new ethereum.EventParam("originalDefaultTimestamp", ethereum.Value.fromUnsignedBigInt(originalDefaultTimestamp))
  )
  event.parameters.push(
    new ethereum.EventParam("extendedDefaultTimestamp", ethereum.Value.fromUnsignedBigInt(extendedDefaultTimestamp))
  )

  // Mock the loanToken() call
  event.address = loanTokenAddress

  return event
}

export function createExtensionProposalMadeEvent(
  extensionHash: Bytes,
  proposer: Address,
  loanId: BigInt,
  compensationAddress: Address,
  compensationAmount: BigInt,
  duration: BigInt,
  expiration: BigInt,
  nonceSpace: BigInt,
  nonce: BigInt,
  loanTokenAddress: Address
): ExtensionProposalMade {
  let event = changetype<ExtensionProposalMade>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("extensionHash", ethereum.Value.fromBytes(extensionHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  event.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(createExtensionProposalTuple(
      loanId,
      compensationAddress,
      compensationAmount,
      duration,
      expiration,
      proposer,
      nonceSpace,
      nonce
    )))
  )

  // Mock the loanToken() call
  event.address = loanTokenAddress

  return event
}

function createExtensionProposalTuple(
  loanId: BigInt,
  compensationAddress: Address,
  compensationAmount: BigInt,
  duration: BigInt,
  expiration: BigInt,
  proposer: Address,
  nonceSpace: BigInt,
  nonce: BigInt
): ethereum.Tuple {
  let tuple = new ethereum.Tuple()
  tuple.push(ethereum.Value.fromUnsignedBigInt(loanId))
  tuple.push(ethereum.Value.fromAddress(compensationAddress))
  tuple.push(ethereum.Value.fromUnsignedBigInt(compensationAmount))
  tuple.push(ethereum.Value.fromUnsignedBigInt(duration))
  tuple.push(ethereum.Value.fromUnsignedBigInt(expiration))
  tuple.push(ethereum.Value.fromAddress(proposer))
  tuple.push(ethereum.Value.fromUnsignedBigInt(nonceSpace))
  tuple.push(ethereum.Value.fromUnsignedBigInt(nonce))
  return tuple
}


export function createLOANPaidBackEvent(
    loanId: BigInt,
    paidBackAt: BigInt,
    loanContractAddress: Address
  ): LOANPaidBack {
    let event = changetype<LOANPaidBack>(newMockEvent())
    
    event.parameters = new Array()
    
    event.parameters.push(
      new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
    )
    event.parameters.push(
      new ethereum.EventParam("paidBackAt", ethereum.Value.fromUnsignedBigInt(paidBackAt))
    )

    event.block.timestamp = paidBackAt
  
    event.address = loanContractAddress
  
    return event
  }
  