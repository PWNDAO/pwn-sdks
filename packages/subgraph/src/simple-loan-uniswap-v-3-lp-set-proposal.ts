import { ProposalMade as ProposalMadeEvent } from "../generated/SimpleLoanUniswapV3LPSetProposal/SimpleLoanUniswapV3LPSetProposal"
import { SimpleLoanUniswapV3LPSetProposalProposalMade, Proposal } from "../generated/schema"
import { getOrCreateAsset } from "./utils"
import { Bytes } from "@graphprotocol/graph-ts"
import { BigInt } from "@graphprotocol/graph-ts"

export function handleProposalMade(event: ProposalMadeEvent): void {
  // Create the specific event entity
  const eventEntity = new SimpleLoanUniswapV3LPSetProposalProposalMade(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  eventEntity.proposalHash = event.params.proposalHash
  eventEntity.proposer = event.params.proposer
  eventEntity.tokenAAllowlist = changetype<Bytes[]>(
    event.params.proposal.tokenAAllowlist,
  )
  eventEntity.tokenBAllowlist = changetype<Bytes[]>(
    event.params.proposal.tokenBAllowlist,
  )
  eventEntity.creditAddress = event.params.proposal.creditAddress
  eventEntity.feedIntermediaryDenominations = changetype<Bytes[]>(
    event.params.proposal.feedIntermediaryDenominations,
  )
  eventEntity.feedInvertFlags = event.params.proposal.feedInvertFlags
  eventEntity.loanToValue = event.params.proposal.loanToValue
  eventEntity.minCreditAmount = event.params.proposal.minCreditAmount
  eventEntity.availableCreditLimit =
    event.params.proposal.availableCreditLimit
  eventEntity.utilizedCreditId = event.params.proposal.utilizedCreditId
  eventEntity.fixedInterestAmount =
    event.params.proposal.fixedInterestAmount
  eventEntity.accruingInterestAPR =
    event.params.proposal.accruingInterestAPR
  eventEntity.durationOrDate = event.params.proposal.durationOrDate
  eventEntity.expiration = event.params.proposal.expiration
  eventEntity.acceptorController = event.params.proposal.acceptorController
  eventEntity.acceptorControllerData =
    event.params.proposal.acceptorControllerData
  eventEntity.proposer = event.params.proposal.proposer
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
    proposal.proposalType = "UniswapV3LPSet"
    
    // Set common fields
    proposal.proposer = event.params.proposer
    proposal.createdAt = event.block.timestamp
    
    // Create Asset entities
    const collateralAsset = getOrCreateAsset(
      event.params.proposal.collateralAddress,
      BigInt.fromI32(0), // UniswapV3 LP Set doesn't have specific token ID
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
    
    // Set UniswapV3LPSet-specific fields
    proposal.collateral = collateralAsset.id
    proposal.tokenAAllowlist = changetype<Bytes[]>(event.params.proposal.tokenAAllowlist)
    proposal.tokenBAllowlist = changetype<Bytes[]>(event.params.proposal.tokenBAllowlist)
    proposal.feedIntermediaryDenominations = changetype<Bytes[]>(event.params.proposal.feedIntermediaryDenominations)
    proposal.feedInvertFlags = event.params.proposal.feedInvertFlags
    proposal.loanToValue = event.params.proposal.loanToValue
    proposal.minCreditAmount = event.params.proposal.minCreditAmount
    proposal.acceptorController = event.params.proposal.acceptorController
    proposal.acceptorControllerData = event.params.proposal.acceptorControllerData
    
    // Link to raw event entity
    proposal.rawEventUniswapV3LPSet = eventEntity.id
    
    proposal.save()
  }
  
  // Link the event entity to the unified proposal
  eventEntity.proposal = proposal.id
  eventEntity.save()
}
