import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  ExtensionProposalMade as ExtensionProposalMadeEvent,
  LOANClaimed as LOANClaimedEvent,
  LOANCreated as LOANCreatedEvent,
  LOANExtended as LOANExtendedEvent,
  LOANPaidBack as LOANPaidBackEvent,
  SimpleLoan,
} from "../generated/SimpleLoan/SimpleLoan"
import {
  ExtensionProposal,
  LOANExtended,
  Loan,
} from "../generated/schema"
import { getOrCreateAccount } from "./helpers"
import { getOrCreateAsset } from "./utils"
import { log } from "matchstick-as/assembly/log"

export function getLoanId(loanContractAddress: Address, loanId: BigInt): Bytes {
  return loanContractAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(loanId)))
}

export function handleLOANCreated(event: LOANCreatedEvent): Loan {
  const loanId = getLoanId(event.address, event.params.loanId)
  const loan = new Loan(loanId)
  loan.loanId = event.params.loanId
  loan.contractAddress = event.address
  loan.proposalHash = event.params.proposalHash
  loan.proposalContract = event.params.proposalContract
  loan.refinancingLoanId = event.params.refinancingLoanId
  loan.originalLender = getOrCreateAccount(event.params.terms.lender).id
  loan.loanOwner = getOrCreateAccount(event.params.terms.lender).id
  loan.borrower = getOrCreateAccount(event.params.terms.borrower).id
  loan.duration = event.params.terms.duration

  log.info("loan.duration", [])

  loan.createdAt = event.block.timestamp

  loan.collateral = getOrCreateAsset(event.params.terms.collateral.assetAddress, event.params.terms.collateral.id, event.params.terms.collateral.category).id
  loan.collateralAmount = event.params.terms.collateral.amount

  log.info("loan.collateralAmount", [])

  loan.credit = getOrCreateAsset(event.params.terms.credit.assetAddress, event.params.terms.credit.id, event.params.terms.credit.category).id
  loan.creditAmount = event.params.terms.credit.amount

  log.info("loan.collateral", [])

  loan.status = "Active"

  loan.fixedInterestAmount = event.params.terms.fixedInterestAmount
  loan.accruingInterestAPR = event.params.terms.accruingInterestAPR

  log.info("loan.accruingInterestAPR", [])

  loan.lenderSpecHash = event.params.terms.lenderSpecHash
  loan.borrowerSpecHash = event.params.terms.borrowerSpecHash

  log.info("loan.sourceOfFunds", [])
  loan.sourceOfFunds = event.params.lenderSpec.sourceOfFunds

  log.info("loan.aasda", [])

  loan.defaultDate = event.params.terms.duration.plus(loan.createdAt)

  loan.extra = event.params.extra

  log.info("before contract call", [])

  const simpleLoanContract = SimpleLoan.bind(Address.fromBytes(loan.contractAddress))
  loan.loanTokenAddress = simpleLoanContract.loanToken()

  loan.hasDefaulted = false

  loan.save()

  return loan
}

export function handleLOANPaidBack(event: LOANPaidBackEvent): void {
  const loanId = getLoanId(event.address, event.params.loanId)
  const loan = Loan.load(loanId)
  if (!loan) {
    // TODO what to do in this case?
    return
  }

  loan.status = "Repaid"
  loan.repaidAt = event.block.timestamp
  loan.save()

	// TODO: Update the linked Proposal entity status
}

export function handleLOANClaimed(event: LOANClaimedEvent): void {
  const loanId = getLoanId(event.address, event.params.loanId)
  const loan = Loan.load(loanId)
  if (!loan) {
    // TODO what to do in this case?
    return
  }

  loan.status = "Claimed"
  loan.claimedAt = event.block.timestamp
  loan.hasDefaulted = event.params.defaulted
  loan.save()

	// TODO: Update the linked Proposal entity status
}

export function handleLOANExtended(event: LOANExtendedEvent): void {
  const loanId = getLoanId(event.address, event.params.loanId)
  const loan = Loan.load(loanId)
  if (!loan) {
    // TODO what to do in this case?
    return
  }

	const extensionDuration = event.params.extendedDefaultTimestamp.minus(loan.defaultDate);
  loan.duration = loan.duration.plus(extensionDuration);

  loan.defaultDate = event.params.extendedDefaultTimestamp
  loan.save()

  // save the event as well
  const entity = new LOANExtended(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.loanId = event.params.loanId
  entity.originalDefaultTimestamp = event.params.originalDefaultTimestamp
  entity.extendedDefaultTimestamp = event.params.extendedDefaultTimestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExtensionProposalMade(
  event: ExtensionProposalMadeEvent,
): void {
  const extensionProposal = new ExtensionProposal(event.params.extensionHash)
  extensionProposal.proposer = event.params.proposer
  const loanId = getLoanId(event.address, event.params.proposal.loanId)
  const loan = Loan.load(loanId)
  if (!loan) {
    // TODO what to do in this case?
    return
  }
  extensionProposal.loan = loan.id
  extensionProposal.compensationAssetAddress = event.params.proposal.compensationAddress
  extensionProposal.compensationAmount = event.params.proposal.compensationAmount
  extensionProposal.durationToExtend = event.params.proposal.duration
  extensionProposal.proposalExpiration = event.params.proposal.expiration
  extensionProposal.nonceSpace = event.params.proposal.nonceSpace
  extensionProposal.nonce = event.params.proposal.nonce
  extensionProposal.createdAt = event.block.timestamp
  extensionProposal.save()

  // const entity = new ExtensionProposalMade(
  //   event.transaction.hash.concatI32(event.logIndex.toI32()),
  // )
  // entity.extensionHash = event.params.extensionHash
  // entity.proposer = event.params.proposer
  // entity.proposal_loanId = event.params.proposal.loanId
  // entity.proposal_compensationAddress =
  //   event.params.proposal.compensationAddress
  // entity.proposal_compensationAmount = event.params.proposal.compensationAmount
  // entity.proposal_duration = event.params.proposal.duration
  // entity.proposal_expiration = event.params.proposal.expiration
  // entity.proposal_proposer = event.params.proposal.proposer
  // entity.proposal_nonceSpace = event.params.proposal.nonceSpace
  // entity.proposal_nonce = event.params.proposal.nonce

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

// ====== UNUSED CODE

// export function handleLOANClaimed(event: LOANClaimedEvent): void {
//   const entity = new LOANClaimed(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.loanId = event.params.loanId
//   entity.defaulted = event.params.defaulted

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleLOANExtended(event: LOANExtendedEvent): void {
//   const entity = new LOANExtended(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.loanId = event.params.loanId
//   entity.originalDefaultTimestamp = event.params.originalDefaultTimestamp
//   entity.extendedDefaultTimestamp = event.params.extendedDefaultTimestamp

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleExtensionProposalMade(
//   event: ExtensionProposalMadeEvent,
// ): void {
//   const entity = new ExtensionProposalMade(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.extensionHash = event.params.extensionHash
//   entity.proposer = event.params.proposer
//   entity.proposal_loanId = event.params.proposal.loanId
//   entity.proposal_compensationAddress =
//     event.params.proposal.compensationAddress
//   entity.proposal_compensationAmount = event.params.proposal.compensationAmount
//   entity.proposal_duration = event.params.proposal.duration
//   entity.proposal_expiration = event.params.proposal.expiration
//   entity.proposal_proposer = event.params.proposal.proposer
//   entity.proposal_nonceSpace = event.params.proposal.nonceSpace
//   entity.proposal_nonce = event.params.proposal.nonce

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handlePoolSupply(event: PoolSupplyEvent): void {
//   const entity = new PoolSupply(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.asset_category = event.params.asset.category
//   entity.asset_assetAddress = event.params.asset.assetAddress
//   entity.asset_id = event.params.asset.id
//   entity.asset_amount = event.params.asset.amount
//   entity.poolAdapter = event.params.poolAdapter
//   entity.pool = event.params.pool
//   entity.owner = event.params.owner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handlePoolWithdraw(event: PoolWithdrawEvent): void {
//   const entity = new PoolWithdraw(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.asset_category = event.params.asset.category
//   entity.asset_assetAddress = event.params.asset.assetAddress
//   entity.asset_id = event.params.asset.id
//   entity.asset_amount = event.params.asset.amount
//   entity.poolAdapter = event.params.poolAdapter
//   entity.pool = event.params.pool
//   entity.owner = event.params.owner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleVaultPull(event: VaultPullEvent): void {
//   const entity = new VaultPull(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.asset_category = event.params.asset.category
//   entity.asset_assetAddress = event.params.asset.assetAddress
//   entity.asset_id = event.params.asset.id
//   entity.asset_amount = event.params.asset.amount
//   entity.origin = event.params.origin

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleVaultPush(event: VaultPushEvent): void {
//   const entity = new VaultPush(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.asset_category = event.params.asset.category
//   entity.asset_assetAddress = event.params.asset.assetAddress
//   entity.asset_id = event.params.asset.id
//   entity.asset_amount = event.params.asset.amount
//   entity.beneficiary = event.params.beneficiary

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleVaultPushFrom(event: VaultPushFromEvent): void {
//   const entity = new VaultPushFrom(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.asset_category = event.params.asset.category
//   entity.asset_assetAddress = event.params.asset.assetAddress
//   entity.asset_id = event.params.asset.id
//   entity.asset_amount = event.params.asset.amount
//   entity.origin = event.params.origin
//   entity.beneficiary = event.params.beneficiary

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// handleLoanClaimed:
// const entity = new LOANCreated(
//   event.transaction.hash.concatI32(event.logIndex.toI32()),
// )
// entity.loanId = event.params.loanId
// entity.proposalHash = event.params.proposalHash
// entity.proposalContract = event.params.proposalContract
// entity.refinancingLoanId = event.params.refinancingLoanId
// entity.terms_lender = event.params.terms.lender
// entity.terms_borrower = event.params.terms.borrower
// entity.terms_duration = event.params.terms.duration
// entity.terms_collateral_category = event.params.terms.collateral.category
// entity.terms_collateral_assetAddress =
//   event.params.terms.collateral.assetAddress
// entity.terms_collateral_id = event.params.terms.collateral.id
// entity.terms_collateral_amount = event.params.terms.collateral.amount
// entity.terms_credit_category = event.params.terms.credit.category
// entity.terms_credit_assetAddress = event.params.terms.credit.assetAddress
// entity.terms_credit_id = event.params.terms.credit.id
// entity.terms_credit_amount = event.params.terms.credit.amount
// entity.terms_fixedInterestAmount = event.params.terms.fixedInterestAmount
// entity.terms_accruingInterestAPR = event.params.terms.accruingInterestAPR
// entity.terms_lenderSpecHash = event.params.terms.lenderSpecHash
// entity.terms_borrowerSpecHash = event.params.terms.borrowerSpecHash
// entity.lenderSpec_sourceOfFunds = event.params.lenderSpec.sourceOfFunds
// entity.extra = event.params.extra

// entity.blockNumber = event.block.number
// entity.blockTimestamp = event.block.timestamp
// entity.transactionHash = event.transaction.hash

// entity.save()

// export function handleLOANPaidBack(event: LOANPaidBackEvent): void {
//   const entity = new LOANPaidBack(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.loanId = event.params.loanId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }