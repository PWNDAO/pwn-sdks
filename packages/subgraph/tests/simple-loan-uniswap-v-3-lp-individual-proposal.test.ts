import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address } from "@graphprotocol/graph-ts"
import { ProposalMade } from "../generated/schema"
import { ProposalMade as ProposalMadeEvent } from "../generated/SimpleLoanUniswapV3LPIndividualProposal/SimpleLoanUniswapV3LPIndividualProposal"
import { handleProposalMade } from "../src/simple-loan-uniswap-v-3-lp-individual-proposal"
import { createProposalMadeEvent } from "./simple-loan-uniswap-v-3-lp-individual-proposal-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let proposalHash = Bytes.fromI32(1234567890)
    let proposer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let proposal = "ethereum.Tuple Not implemented"
    let newProposalMadeEvent = createProposalMadeEvent(
      proposalHash,
      proposer,
      proposal
    )
    handleProposalMade(newProposalMadeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("ProposalMade created and stored", () => {
    assert.entityCount("ProposalMade", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ProposalMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposalHash",
      "1234567890"
    )
    assert.fieldEquals(
      "ProposalMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProposalMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposal",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
