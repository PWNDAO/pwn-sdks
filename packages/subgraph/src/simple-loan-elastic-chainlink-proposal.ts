import { ProposalMade as ProposalMadeEvent } from "../generated/SimpleLoanElasticChainlinkProposal/SimpleLoanElasticChainlinkProposal"
import { SimpleLoanElasticChainlinkProposalProposalMade, Proposal } from "../generated/schema"
import { getOrCreateAsset } from "./utils"
import { Bytes, BigInt } from "@graphprotocol/graph-ts"
import { log } from "@graphprotocol/graph-ts"

export function handleProposalMade(event: ProposalMadeEvent): void {
  log.info("aaaaaaaaaaaaaaaaaaa: {}", [event.params.proposalHash.toHexString()])
  // Create the specific event entity
  const eventEntity = new SimpleLoanElasticChainlinkProposalProposalMade(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  eventEntity.proposalHash = event.params.proposalHash
  log.info("bbbbbbbbbbbbbbbbbbbb: {}", [event.params.proposer.toString()])
  log.info("bbbbbbbbbbbbbbbbasddbbbb: {}", [event.params.proposal.proposer.toString()])
  eventEntity.proposer = event.params.proposer
  eventEntity.collateralCategory = event.params.proposal.collateralCategory
  log.info("xx: {}", [event.params.proposal.collateralAddress.toHexString()])
  eventEntity.collateralAddress = event.params.proposal.collateralAddress
  eventEntity.collateralId = event.params.proposal.collateralId
  eventEntity.checkCollateralStateFingerprint =
    event.params.proposal.checkCollateralStateFingerprint
  eventEntity.collateralStateFingerprint =
    event.params.proposal.collateralStateFingerprint
  log.info("dddddddddddddddddd: {}", [event.params.proposal.creditAddress.toHexString()])
  eventEntity.creditAddress = event.params.proposal.creditAddress
  log.info("xczxczxcc", [])
  // log.info("eeeeeeeeeeeeeeeeee: {}", [event.params.proposal.feedIntermediaryDenominations[0].toString()])
  eventEntity.feedIntermediaryDenominations = changetype<Bytes[]>(
    event.params.proposal.feedIntermediaryDenominations,
  )
  eventEntity.feedInvertFlags = event.params.proposal.feedInvertFlags
  eventEntity.loanToValue = event.params.proposal.loanToValue
  eventEntity.minCreditAmount = event.params.proposal.minCreditAmount
  eventEntity.availableCreditLimit =
    event.params.proposal.availableCreditLimit
  log.info("fffffffffffffffffff: {}", [event.params.proposal.utilizedCreditId.toString()])
  eventEntity.utilizedCreditId = event.params.proposal.utilizedCreditId
  eventEntity.fixedInterestAmount =
    event.params.proposal.fixedInterestAmount
  eventEntity.accruingInterestAPR =
    event.params.proposal.accruingInterestAPR
  eventEntity.durationOrDate = event.params.proposal.durationOrDate
  eventEntity.expiration = event.params.proposal.expiration
  log.info("gggggggggggggggggggg: {}", [event.params.proposal.allowedAcceptor.toString()])
  eventEntity.allowedAcceptor = event.params.proposal.allowedAcceptor
  log.info("hhhhhhhhhhhhhhhhhhh: {}", [event.params.proposal.proposer.toString()])
  eventEntity.proposer = event.params.proposal.proposer
  eventEntity.proposerSpecHash = event.params.proposal.proposerSpecHash
  eventEntity.isOffer = event.params.proposal.isOffer
  eventEntity.refinancingLoanId = event.params.proposal.refinancingLoanId
  eventEntity.nonceSpace = event.params.proposal.nonceSpace
  eventEntity.nonce = event.params.proposal.nonce
  log.info("iiiiiiiiiiiiiiiiiiii: {}", [event.params.proposal.loanContract.toString()])
  eventEntity.loanContract = event.params.proposal.loanContract

  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash

  // Create or get the unified Proposal entity
  let proposal = Proposal.load(event.params.proposalHash)
  if (proposal == null) {
    proposal = new Proposal(event.params.proposalHash)
    
    // Set proposal type
    proposal.proposalType = "ElasticChainlink"
    
    // Set common fields
    proposal.proposer = event.params.proposer
    proposal.createdAt = event.block.timestamp
    
    // Create Asset entities
    const collateralAsset = getOrCreateAsset(
      event.params.proposal.collateralAddress,
      event.params.proposal.collateralId,
      event.params.proposal.collateralCategory
    )
    const creditAsset = getOrCreateAsset(
      event.params.proposal.creditAddress,
      BigInt.fromI32(0), // ERC20 tokens use 0 as token ID
      0 // ERC20 tokens are category 0
    )
    
    proposal.credit = creditAsset.id
    proposal.fixedInterestAmount = event.params.proposal.fixedInterestAmount
    proposal.accruingInterestAPR = event.params.proposal.accruingInterestAPR
    proposal.availableCreditLimit = event.params.proposal.availableCreditLimit
    proposal.utilizedCreditId = event.params.proposal.utilizedCreditId
    proposal.durationOrDate = event.params.proposal.durationOrDate
    proposal.expiration = event.params.proposal.expiration
    proposal.proposerSpecHash = event.params.proposal.proposerSpecHash
    proposal.isOffer = event.params.proposal.isOffer
    proposal.refinancingLoanId = event.params.proposal.refinancingLoanId
    proposal.nonceSpace = event.params.proposal.nonceSpace
    proposal.nonce = event.params.proposal.nonce
    proposal.loanContract = event.params.proposal.loanContract
    proposal.status = "Active"
    proposal.blockNumber = event.block.number
    proposal.transactionHash = event.transaction.hash
    
    // Set ElasticChainlink-specific fields
    proposal.collateral = collateralAsset.id
    proposal.checkCollateralStateFingerprint = event.params.proposal.checkCollateralStateFingerprint
    proposal.collateralStateFingerprint = event.params.proposal.collateralStateFingerprint
    proposal.allowedAcceptor = event.params.proposal.allowedAcceptor
    proposal.minCreditAmount = event.params.proposal.minCreditAmount
    proposal.feedIntermediaryDenominations = changetype<Bytes[]>(event.params.proposal.feedIntermediaryDenominations)
    proposal.feedInvertFlags = event.params.proposal.feedInvertFlags
    proposal.loanToValue = event.params.proposal.loanToValue
    
    // Link to raw event entity
    proposal.rawEventElasticChainlink = eventEntity.id
    
    proposal.save()
  }
  
  // Link the event entity to the unified proposal
  eventEntity.proposal = proposal.id
  eventEntity.save()
}
