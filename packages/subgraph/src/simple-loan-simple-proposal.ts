import { ProposalMade as ProposalMadeEvent } from "../generated/SimpleLoanSimpleProposal/SimpleLoanSimpleProposal"
import { ProposalMade } from "../generated/schema"

export function handleProposalMade(event: ProposalMadeEvent): void {
  const entity = new ProposalMade(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.proposalHash = event.params.proposalHash
  entity.proposer = event.params.proposer
  entity.proposal_collateralCategory = event.params.proposal.collateralCategory
  entity.proposal_collateralAddress = event.params.proposal.collateralAddress
  entity.proposal_collateralId = event.params.proposal.collateralId
  entity.proposal_collateralAmount = event.params.proposal.collateralAmount
  entity.proposal_checkCollateralStateFingerprint =
    event.params.proposal.checkCollateralStateFingerprint
  entity.proposal_collateralStateFingerprint =
    event.params.proposal.collateralStateFingerprint
  entity.proposal_creditAddress = event.params.proposal.creditAddress
  entity.proposal_creditAmount = event.params.proposal.creditAmount
  entity.proposal_availableCreditLimit =
    event.params.proposal.availableCreditLimit
  entity.proposal_utilizedCreditId = event.params.proposal.utilizedCreditId
  entity.proposal_fixedInterestAmount =
    event.params.proposal.fixedInterestAmount
  entity.proposal_accruingInterestAPR =
    event.params.proposal.accruingInterestAPR
  entity.proposal_durationOrDate = event.params.proposal.durationOrDate
  entity.proposal_expiration = event.params.proposal.expiration
  entity.proposal_allowedAcceptor = event.params.proposal.allowedAcceptor
  entity.proposal_proposer = event.params.proposal.proposer
  entity.proposal_proposerSpecHash = event.params.proposal.proposerSpecHash
  entity.proposal_isOffer = event.params.proposal.isOffer
  entity.proposal_refinancingLoanId = event.params.proposal.refinancingLoanId
  entity.proposal_nonceSpace = event.params.proposal.nonceSpace
  entity.proposal_nonce = event.params.proposal.nonce
  entity.proposal_loanContract = event.params.proposal.loanContract

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
