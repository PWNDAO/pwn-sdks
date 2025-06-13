import { assert, describe, test, clearStore, beforeEach, afterEach } from "matchstick-as/assembly/index"
import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { handleTagSet } from "../src/hub"
import { createTagSetEvent } from "./hub-utils"

describe("Hub Events", () => {
  beforeEach(() => {
    // Clear the store before each test
    clearStore()
  })

  afterEach(() => {
    // Clear the store after each test
    clearStore()
  })

  test("handleTagSet - creates a new Tag entity", () => {
    let tag = Bytes.fromHexString("0x1234")
    let value = true
    let contractAddress = Address.fromString("0x0000000000000000000000000000000000000001")

    let event = createTagSetEvent(contractAddress, tag, value)

    handleTagSet(event)

    const tagSetId: Bytes = event.transaction.hash.concatI32(event.logIndex.toI32())

    assert.entityCount("TagSetEvent", 1)
    assert.fieldEquals(
      "TagSetEvent",
      tagSetId.toHexString(),
      "tag",
      tag.toHexString()
    )
    assert.fieldEquals(
      "TagSetEvent",
      tagSetId.toHexString(),
      "hasTag",
      value.toString(),
    )
    assert.fieldEquals(
      "TagSetEvent",
      tagSetId.toHexString(),
      "_address",
      contractAddress.toHexString()
    )
  })
}) 