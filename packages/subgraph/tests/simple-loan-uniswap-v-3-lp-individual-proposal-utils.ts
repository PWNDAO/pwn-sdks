import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address } from "@graphprotocol/graph-ts"
import { ProposalMade } from "../generated/SimpleLoanUniswapV3LPIndividualProposal/SimpleLoanUniswapV3LPIndividualProposal"

export function createProposalMadeEvent(
  proposalHash: Bytes,
  proposer: Address,
  proposal: ethereum.Tuple
): ProposalMade {
  let proposalMadeEvent = changetype<ProposalMade>(newMockEvent())

  proposalMadeEvent.parameters = new Array()

  proposalMadeEvent.parameters.push(
    new ethereum.EventParam(
      "proposalHash",
      ethereum.Value.fromFixedBytes(proposalHash)
    )
  )
  proposalMadeEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  proposalMadeEvent.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposal))
  )

  return proposalMadeEvent
}
