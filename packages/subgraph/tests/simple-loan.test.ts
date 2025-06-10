import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { ExtensionProposalMade } from "../generated/schema"
import { ExtensionProposalMade as ExtensionProposalMadeEvent } from "../generated/SimpleLoan/SimpleLoan"
import { handleExtensionProposalMade } from "../src/simple-loan"
import { createExtensionProposalMadeEvent } from "./simple-loan-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let extensionHash = Bytes.fromI32(1234567890)
    let proposer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let proposal = "ethereum.Tuple Not implemented"
    let newExtensionProposalMadeEvent = createExtensionProposalMadeEvent(
      extensionHash,
      proposer,
      proposal
    )
    handleExtensionProposalMade(newExtensionProposalMadeEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("ExtensionProposalMade created and stored", () => {
    assert.entityCount("ExtensionProposalMade", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ExtensionProposalMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "extensionHash",
      "1234567890"
    )
    assert.fieldEquals(
      "ExtensionProposalMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ExtensionProposalMade",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposal",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
