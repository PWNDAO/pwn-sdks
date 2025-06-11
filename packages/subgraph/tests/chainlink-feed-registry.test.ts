import { assert, describe, test, clearStore, beforeEach, afterEach } from "matchstick-as/assembly/index"
import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { handleFeedConfirmed } from "../src/chainlink-feed-registry"
import { createFeedConfirmedEvent } from "./chainlink-feed-registry-utils"

describe("ChainlinkFeedRegistry", () => {
  beforeEach(() => {
    clearStore()
  })

  afterEach(() => {
    clearStore()
  })

  test("handleFeedConfirmed - creates a new ChainlinkFeed entity", () => {
    // Create test data
    const asset = Address.fromString("0x0000000000000000000000000000000000000001")
    const denomination = Address.fromString("0x0000000000000000000000000000000000000002")
    const latestAggregator = Address.fromString("0x0000000000000000000000000000000000000003")
    
    // Create the event
    const event = createFeedConfirmedEvent(
      asset,
      denomination,
      latestAggregator
    )

    // Handle the event
    handleFeedConfirmed(event)

    // Get the expected ID
    const chainlinkFeedId = asset.concat(denomination)

    // Assert the ChainlinkFeed entity was created with correct data
    assert.entityCount("ChainlinkFeed", 1)
    assert.fieldEquals(
      "ChainlinkFeed",
      chainlinkFeedId.toHexString(),
      "asset",
      asset.toHexString()
    )
    assert.fieldEquals(
      "ChainlinkFeed",
      chainlinkFeedId.toHexString(),
      "denomination",
      denomination.toHexString()
    )
    assert.fieldEquals(
      "ChainlinkFeed",
      chainlinkFeedId.toHexString(),
      "aggregator",
      latestAggregator.toHexString()
    )
  })
}) 