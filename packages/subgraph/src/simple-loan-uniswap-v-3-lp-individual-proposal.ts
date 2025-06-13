import { ProposalMade as ProposalMadeEvent } from "../generated/SimpleLoanUniswapV3LPIndividualProposal/SimpleLoanUniswapV3LPIndividualProposal"
import { SimpleLoanUniswapV3LPIndividualProposalProposalMade, Proposal } from "../generated/schema"
import { getOrCreateAsset } from "./utils"
import { Bytes, BigInt } from "@graphprotocol/graph-ts"

export function handleProposalMade(event: ProposalMadeEvent): void {
  // Create the specific event entity
  const eventEntity = new SimpleLoanUniswapV3LPIndividualProposalProposalMade(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  eventEntity.proposalHash = event.params.proposalHash
  eventEntity.proposer = event.params.proposer
  eventEntity.collateralId = event.params.proposal.collateralId
  eventEntity.token0Denominator = event.params.proposal.token0Denominator
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
    proposal.proposalType = "UniswapV3LPIndividual"
    
    // Set common fields
    proposal.proposer = event.params.proposer
    proposal.createdAt = event.block.timestamp
    
    // Create Asset entities
    const collateralAsset = getOrCreateAsset(
      // TODO will this differ on chains? this one is uniswap v3 positions manager nft contract for sepolia 
      Bytes.fromHexString("0x1238536071E1c677A632429e3655c799b22cDA52"),
      event.params.proposal.collateralId,
      1 // ERC721
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
    
    // Set UniswapV3LPIndividual-specific fields
    proposal.collateral = collateralAsset.id
    proposal.collateralId = event.params.proposal.collateralId
    proposal.token0Denominator = event.params.proposal.token0Denominator
    proposal.feedIntermediaryDenominations = changetype<Bytes[]>(event.params.proposal.feedIntermediaryDenominations)
    proposal.feedInvertFlags = event.params.proposal.feedInvertFlags
    proposal.loanToValue = event.params.proposal.loanToValue
    proposal.minCreditAmount = event.params.proposal.minCreditAmount
    proposal.acceptorController = event.params.proposal.acceptorController
    proposal.acceptorControllerData = event.params.proposal.acceptorControllerData
    
    // Link to raw event entity
    proposal.rawEventUniswapV3LPIndividual = eventEntity.id
    
    proposal.save()
  }
  
  // Link the event entity to the unified proposal
  eventEntity.proposal = proposal.id
  eventEntity.save()
}
