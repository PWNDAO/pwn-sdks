import { Address, BigInt, ByteArray, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { ProposalMade } from "../generated/SimpleLoanSimpleProposal/SimpleLoanSimpleProposal"
import { ProposalMade as ListProposalMade } from "../generated/SimpleLoanListProposal/SimpleLoanListProposal"
import { ProposalMade as ElasticProposalMade } from "../generated/SimpleLoanElasticProposal/SimpleLoanElasticProposal"
import { ProposalMade as ElasticChainlinkProposalMade } from "../generated/SimpleLoanElasticChainlinkProposal/SimpleLoanElasticChainlinkProposal"
import { ProposalMade as UniswapV3LPIndividualProposalMade } from "../generated/SimpleLoanUniswapV3LPIndividualProposal/SimpleLoanUniswapV3LPIndividualProposal"
import { ProposalMade as UniswapV3LPSetProposalMade } from "../generated/SimpleLoanUniswapV3LPSetProposal/SimpleLoanUniswapV3LPSetProposal"
import { assert, test, newMockEvent, dataSourceMock } from 'matchstick-as/assembly/index'

export function createSimpleProposalMadeEvent(
  proposalHash: Bytes,
  proposer: Address,
  collateralCategory: i32,
  collateralAddress: Address,
  collateralId: BigInt,
  collateralAmount: BigInt,
  checkCollateralStateFingerprint: boolean,
  collateralStateFingerprint: Bytes,
  creditAddress: Address,
  creditAmount: BigInt,
  availableCreditLimit: BigInt,
  utilizedCreditId: Bytes,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  durationOrDate: BigInt,
  expiration: BigInt,
  allowedAcceptor: Address,
  proposerSpecHash: Bytes,
  isOffer: boolean,
  refinancingLoanId: BigInt,
  nonceSpace: BigInt,
  nonce: BigInt,
  loanContract: Address
): ProposalMade {
  let event = changetype<ProposalMade>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("proposalHash", ethereum.Value.fromBytes(proposalHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  
  let proposalTuple = new ethereum.Tuple()
  proposalTuple.push(ethereum.Value.fromI32(collateralCategory))
  proposalTuple.push(ethereum.Value.fromAddress(collateralAddress))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(collateralAmount))
  proposalTuple.push(ethereum.Value.fromBoolean(checkCollateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromBytes(collateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromAddress(creditAddress))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(creditAmount))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(availableCreditLimit))
  proposalTuple.push(ethereum.Value.fromBytes(utilizedCreditId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(fixedInterestAmount))
  proposalTuple.push(ethereum.Value.fromI32(accruingInterestAPR))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(durationOrDate))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(expiration))
  proposalTuple.push(ethereum.Value.fromAddress(allowedAcceptor))
  proposalTuple.push(ethereum.Value.fromAddress(proposer))
  proposalTuple.push(ethereum.Value.fromBytes(proposerSpecHash))
  proposalTuple.push(ethereum.Value.fromBoolean(isOffer))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(refinancingLoanId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonceSpace))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonce))
  proposalTuple.push(ethereum.Value.fromAddress(loanContract))
  
  event.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposalTuple))
  )
  
  event.address = loanContract
  
  return event
}

export function createListProposalMadeEvent(
  proposalHash: Bytes,
  proposer: Address,
  collateralCategory: i32,
  collateralAddress: Address,
  collateralIdsWhitelistMerkleRoot: Bytes,
  collateralAmount: BigInt,
  checkCollateralStateFingerprint: boolean,
  collateralStateFingerprint: Bytes,
  creditAddress: Address,
  creditAmount: BigInt,
  availableCreditLimit: BigInt,
  utilizedCreditId: Bytes,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  durationOrDate: BigInt,
  expiration: BigInt,
  allowedAcceptor: Address,
  proposerSpecHash: Bytes,
  isOffer: boolean,
  refinancingLoanId: BigInt,
  nonceSpace: BigInt,
  nonce: BigInt,
  loanContract: Address
): ListProposalMade {
  let event = changetype<ListProposalMade>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("proposalHash", ethereum.Value.fromBytes(proposalHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  
  let proposalTuple = new ethereum.Tuple()
  proposalTuple.push(ethereum.Value.fromI32(collateralCategory))
  proposalTuple.push(ethereum.Value.fromAddress(collateralAddress))
  proposalTuple.push(ethereum.Value.fromBytes(collateralIdsWhitelistMerkleRoot))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(collateralAmount))
  proposalTuple.push(ethereum.Value.fromBoolean(checkCollateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromBytes(collateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromAddress(creditAddress))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(creditAmount))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(availableCreditLimit))
  proposalTuple.push(ethereum.Value.fromBytes(utilizedCreditId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(fixedInterestAmount))
  proposalTuple.push(ethereum.Value.fromI32(accruingInterestAPR))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(durationOrDate))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(expiration))
  proposalTuple.push(ethereum.Value.fromAddress(allowedAcceptor))
  proposalTuple.push(ethereum.Value.fromAddress(proposer))
  proposalTuple.push(ethereum.Value.fromBytes(proposerSpecHash))
  proposalTuple.push(ethereum.Value.fromBoolean(isOffer))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(refinancingLoanId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonceSpace))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonce))
  proposalTuple.push(ethereum.Value.fromAddress(loanContract))
  
  event.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposalTuple))
  )
  
  event.address = loanContract
  
  return event
}

export function createElasticProposalMadeEvent(
  proposalHash: Bytes,
  proposer: Address,
  collateralCategory: i32,
  collateralAddress: Address,
  collateralId: BigInt,
  checkCollateralStateFingerprint: boolean,
  collateralStateFingerprint: Bytes,
  creditAddress: Address,
  creditPerCollateralUnit: BigInt,
  minCreditAmount: BigInt,
  availableCreditLimit: BigInt,
  utilizedCreditId: Bytes,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  durationOrDate: BigInt,
  expiration: BigInt,
  allowedAcceptor: Address,
  proposerSpecHash: Bytes,
  isOffer: boolean,
  refinancingLoanId: BigInt,
  nonceSpace: BigInt,
  nonce: BigInt,
  loanContract: Address
): ElasticProposalMade {
  let event = changetype<ElasticProposalMade>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("proposalHash", ethereum.Value.fromBytes(proposalHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  
  let proposalTuple = new ethereum.Tuple()
  proposalTuple.push(ethereum.Value.fromI32(collateralCategory))
  proposalTuple.push(ethereum.Value.fromAddress(collateralAddress))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(collateralId))
  proposalTuple.push(ethereum.Value.fromBoolean(checkCollateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromBytes(collateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromAddress(creditAddress))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(creditPerCollateralUnit))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(minCreditAmount))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(availableCreditLimit))
  proposalTuple.push(ethereum.Value.fromBytes(utilizedCreditId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(fixedInterestAmount))
  proposalTuple.push(ethereum.Value.fromI32(accruingInterestAPR))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(durationOrDate))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(expiration))
  proposalTuple.push(ethereum.Value.fromAddress(allowedAcceptor))
  proposalTuple.push(ethereum.Value.fromAddress(proposer))
  proposalTuple.push(ethereum.Value.fromBytes(proposerSpecHash))
  proposalTuple.push(ethereum.Value.fromBoolean(isOffer))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(refinancingLoanId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonceSpace))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonce))
  proposalTuple.push(ethereum.Value.fromAddress(loanContract))
  
  event.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposalTuple))
  )
  
  event.address = loanContract
  
  return event
}

export function createElasticChainlinkProposalMadeEvent(
  proposalHash: Bytes,
  proposer: Address,
  collateralCategory: i32,
  collateralAddress: Address,
  collateralId: BigInt,
  checkCollateralStateFingerprint: boolean,
  collateralStateFingerprint: Bytes,
  creditAddress: Address,
  feedIntermediaryDenominations: Bytes[],
  feedInvertFlags: boolean[],
  loanToValue: BigInt,
  minCreditAmount: BigInt,
  availableCreditLimit: BigInt,
  utilizedCreditId: Bytes,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  durationOrDate: BigInt,
  expiration: BigInt,
  allowedAcceptor: Address,
  proposerSpecHash: Bytes,
  isOffer: boolean,
  refinancingLoanId: BigInt,
  nonceSpace: BigInt,
  nonce: BigInt,
  loanContract: Address
): ElasticChainlinkProposalMade {
  let event = changetype<ElasticChainlinkProposalMade>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("proposalHash", ethereum.Value.fromBytes(proposalHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  
  let proposalTuple = new ethereum.Tuple()
  proposalTuple.push(ethereum.Value.fromI32(collateralCategory))
  proposalTuple.push(ethereum.Value.fromAddress(collateralAddress))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(collateralId))
  proposalTuple.push(ethereum.Value.fromBoolean(checkCollateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromBytes(collateralStateFingerprint))
  proposalTuple.push(ethereum.Value.fromAddress(creditAddress))
  
  let feedDenominationsArray = new Array<ethereum.Value>()
  for (let i = 0; i < feedIntermediaryDenominations.length; i++) {
    feedDenominationsArray.push(ethereum.Value.fromBytes(feedIntermediaryDenominations[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(feedDenominationsArray))
  
  let feedFlagsArray = new Array<ethereum.Value>()
  for (let i = 0; i < feedInvertFlags.length; i++) {
    feedFlagsArray.push(ethereum.Value.fromBoolean(feedInvertFlags[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(feedFlagsArray))
  
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(loanToValue))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(minCreditAmount))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(availableCreditLimit))
  proposalTuple.push(ethereum.Value.fromBytes(utilizedCreditId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(fixedInterestAmount))
  proposalTuple.push(ethereum.Value.fromI32(accruingInterestAPR))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(durationOrDate))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(expiration))
  proposalTuple.push(ethereum.Value.fromAddress(allowedAcceptor))
  proposalTuple.push(ethereum.Value.fromAddress(proposer))
  proposalTuple.push(ethereum.Value.fromBytes(proposerSpecHash))
  proposalTuple.push(ethereum.Value.fromBoolean(isOffer))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(refinancingLoanId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonceSpace))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonce))
  proposalTuple.push(ethereum.Value.fromAddress(loanContract))
  
  event.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposalTuple))
  )
  
  event.address = loanContract
  
  return event
}

export function createUniswapV3LPIndividualProposalMadeEvent(
  proposalHash: Bytes,
  proposer: Address,
  collateralId: BigInt,
  token0Denominator: Address,
  creditAddress: Address,
  feedIntermediaryDenominations: Bytes[],
  feedInvertFlags: boolean[],
  loanToValue: BigInt,
  minCreditAmount: BigInt,
  availableCreditLimit: BigInt,
  utilizedCreditId: Bytes,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  durationOrDate: BigInt,
  expiration: BigInt,
  acceptorController: Address,
  acceptorControllerData: Bytes,
  proposerSpecHash: Bytes,
  isOffer: boolean,
  refinancingLoanId: BigInt,
  nonceSpace: BigInt,
  nonce: BigInt,
  loanContract: Address
): UniswapV3LPIndividualProposalMade {
  let event = changetype<UniswapV3LPIndividualProposalMade>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("proposalHash", ethereum.Value.fromBytes(proposalHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  
  let proposalTuple = new ethereum.Tuple()
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(collateralId))
  proposalTuple.push(ethereum.Value.fromBoolean(isOffer))
  proposalTuple.push(ethereum.Value.fromAddress(token0Denominator))
  
  let feedDenominationsArray = new Array<ethereum.Value>()
  for (let i = 0; i < feedIntermediaryDenominations.length; i++) {
    feedDenominationsArray.push(ethereum.Value.fromBytes(feedIntermediaryDenominations[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(feedDenominationsArray))
  
  let feedFlagsArray = new Array<ethereum.Value>()
  for (let i = 0; i < feedInvertFlags.length; i++) {
    feedFlagsArray.push(ethereum.Value.fromBoolean(feedInvertFlags[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(feedFlagsArray))
  
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(loanToValue))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(minCreditAmount))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(availableCreditLimit))
  proposalTuple.push(ethereum.Value.fromBytes(utilizedCreditId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(fixedInterestAmount))
  proposalTuple.push(ethereum.Value.fromI32(accruingInterestAPR))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(durationOrDate))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(expiration))
  proposalTuple.push(ethereum.Value.fromAddress(acceptorController))
  proposalTuple.push(ethereum.Value.fromBytes(acceptorControllerData))
  proposalTuple.push(ethereum.Value.fromAddress(proposer))
  proposalTuple.push(ethereum.Value.fromBytes(proposerSpecHash))
  proposalTuple.push(ethereum.Value.fromBoolean(isOffer))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(refinancingLoanId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonceSpace))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonce))
  proposalTuple.push(ethereum.Value.fromAddress(loanContract))
  
  event.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposalTuple))
  )
  
  event.address = loanContract
  
  return event
}

export function createUniswapV3LPSetProposalMadeEvent(
  proposalHash: Bytes,
  proposer: Address,
  tokenAAllowlist: Bytes[],
  tokenBAllowlist: Bytes[],
  creditAddress: Address,
  feedIntermediaryDenominations: Bytes[],
  feedInvertFlags: boolean[],
  loanToValue: BigInt,
  minCreditAmount: BigInt,
  availableCreditLimit: BigInt,
  utilizedCreditId: Bytes,
  fixedInterestAmount: BigInt,
  accruingInterestAPR: i32,
  durationOrDate: BigInt,
  expiration: BigInt,
  acceptorController: Address,
  acceptorControllerData: Bytes,
  proposerSpecHash: Bytes,
  isOffer: boolean,
  refinancingLoanId: BigInt,
  nonceSpace: BigInt,
  nonce: BigInt,
  loanContract: Address
): UniswapV3LPSetProposalMade {
  let event = changetype<UniswapV3LPSetProposalMade>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("proposalHash", ethereum.Value.fromBytes(proposalHash))
  )
  event.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  
  let proposalTuple = new ethereum.Tuple()
  
  let tokenAArray = new Array<ethereum.Value>()
  for (let i = 0; i < tokenAAllowlist.length; i++) {
    tokenAArray.push(ethereum.Value.fromBytes(tokenAAllowlist[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(tokenAArray))
  
  let tokenBArray = new Array<ethereum.Value>()
  for (let i = 0; i < tokenBAllowlist.length; i++) {
    tokenBArray.push(ethereum.Value.fromBytes(tokenBAllowlist[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(tokenBArray))
  
  proposalTuple.push(ethereum.Value.fromAddress(creditAddress))
  
  let feedDenominationsArray = new Array<ethereum.Value>()
  for (let i = 0; i < feedIntermediaryDenominations.length; i++) {
    feedDenominationsArray.push(ethereum.Value.fromBytes(feedIntermediaryDenominations[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(feedDenominationsArray))
  
  let feedFlagsArray = new Array<ethereum.Value>()
  for (let i = 0; i < feedInvertFlags.length; i++) {
    feedFlagsArray.push(ethereum.Value.fromBoolean(feedInvertFlags[i]))
  }
  proposalTuple.push(ethereum.Value.fromArray(feedFlagsArray))
  
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(loanToValue))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(minCreditAmount))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(availableCreditLimit))
  proposalTuple.push(ethereum.Value.fromBytes(utilizedCreditId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(fixedInterestAmount))
  proposalTuple.push(ethereum.Value.fromI32(accruingInterestAPR))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(durationOrDate))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(expiration))
  proposalTuple.push(ethereum.Value.fromAddress(acceptorController))
  proposalTuple.push(ethereum.Value.fromBytes(acceptorControllerData))
  proposalTuple.push(ethereum.Value.fromAddress(proposer))
  proposalTuple.push(ethereum.Value.fromBytes(proposerSpecHash))
  proposalTuple.push(ethereum.Value.fromBoolean(isOffer))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(refinancingLoanId))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonceSpace))
  proposalTuple.push(ethereum.Value.fromUnsignedBigInt(nonce))
  proposalTuple.push(ethereum.Value.fromAddress(loanContract))
  
  event.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposalTuple))
  )
  
  event.address = loanContract
  
  return event
} 