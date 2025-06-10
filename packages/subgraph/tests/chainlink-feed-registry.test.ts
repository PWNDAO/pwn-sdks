import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { AccessControllerSet } from "../generated/schema"
import { AccessControllerSet as AccessControllerSetEvent } from "../generated/ChainlinkFeedRegistry/ChainlinkFeedRegistry"
import { handleAccessControllerSet } from "../src/chainlink-feed-registry"
import { createAccessControllerSetEvent } from "./chainlink-feed-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let accessController = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let sender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAccessControllerSetEvent = createAccessControllerSetEvent(
      accessController,
      sender
    )
    handleAccessControllerSet(newAccessControllerSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("AccessControllerSet created and stored", () => {
    assert.entityCount("AccessControllerSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AccessControllerSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "accessController",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AccessControllerSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sender",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
