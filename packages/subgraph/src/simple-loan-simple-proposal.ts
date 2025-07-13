import { ProposalMade as ProposalMadeEvent } from "../generated/SimpleLoanSimpleProposal/SimpleLoanSimpleProposal"
import { SimpleLoanSimpleProposalMade, Proposal } from "../generated/schema"
import { getOrCreateAsset } from "./utils"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleProposalMade(event: ProposalMadeEvent): void {
  // Create the specific event entity
  const eventEntity = new SimpleLoanSimpleProposalMade(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  eventEntity.proposalHash = event.params.proposalHash
  eventEntity.proposer = event.params.proposer
  eventEntity.collateralCategory = event.params.proposal.collateralCategory
  eventEntity.collateralAddress = event.params.proposal.collateralAddress
  eventEntity.collateralId = event.params.proposal.collateralId
  eventEntity.collateralAmount = event.params.proposal.collateralAmount
  eventEntity.checkCollateralStateFingerprint =
    event.params.proposal.checkCollateralStateFingerprint
  eventEntity.collateralStateFingerprint =
    event.params.proposal.collateralStateFingerprint
  eventEntity.creditAddress = event.params.proposal.creditAddress
  eventEntity.creditAmount = event.params.proposal.creditAmount
  eventEntity.availableCreditLimit =
    event.params.proposal.availableCreditLimit
  eventEntity.utilizedCreditId = event.params.proposal.utilizedCreditId
  eventEntity.fixedInterestAmount =
    event.params.proposal.fixedInterestAmount
  eventEntity.accruingInterestAPR =
    event.params.proposal.accruingInterestAPR
  eventEntity.durationOrDate = event.params.proposal.durationOrDate
  eventEntity.expiration = event.params.proposal.expiration
  eventEntity.allowedAcceptor = event.params.proposal.allowedAcceptor
  eventEntity.proposerSpecHash = event.params.proposal.proposerSpecHash
  eventEntity.isOffer = event.params.proposal.isOffer
  eventEntity.refinancingLoanId = event.params.proposal.refinancingLoanId
  eventEntity.nonceSpace = event.params.proposal.nonceSpace
  eventEntity.nonce = event.params.proposal.nonce
  eventEntity.loanContract = event.params.proposal.loanContract

  eventEntity.blockNumber = event.block.number
  eventEntity.blockTimestamp = event.block.timestamp
  eventEntity.transactionHash = event.transaction.hash

  // Create or get the unified Proposal entity
  let proposal = Proposal.load(event.params.proposalHash)
  if (proposal == null) {
    proposal = new Proposal(event.params.proposalHash)
    
    // Set proposal type
    proposal.proposalType = "Simple"
    
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
    
    // Set Simple-specific fields
    proposal.collateral = collateralAsset.id
    proposal.collateralAmount = event.params.proposal.collateralAmount
    proposal.creditAmount = event.params.proposal.creditAmount
    proposal.allowedAcceptor = event.params.proposal.allowedAcceptor
    proposal.checkCollateralStateFingerprint = event.params.proposal.checkCollateralStateFingerprint
    proposal.collateralStateFingerprint = event.params.proposal.collateralStateFingerprint
    
    // Link to raw event entity
    proposal.rawEventSimple = eventEntity.id
    
    proposal.save()
  }
  
  // Link the event entity to the unified proposal
  eventEntity.proposal = proposal.id
  eventEntity.save()
}
