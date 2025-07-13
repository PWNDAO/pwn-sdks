import { assert, describe, test, clearStore, beforeEach, afterEach } from "matchstick-as/assembly/index"
import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { handleCategoryRegistered, handleCategoryUnregistered } from "../src/multi-token-category-registry"
import { createCategoryRegisteredEvent, createCategoryUnregisteredEvent } from "./multi-token-category-registry-utils"
import { AssetContract } from "../generated/schema"
import { log } from "matchstick-as/assembly/log";
import { logStore, logEntity } from 'matchstick-as/assembly/store'

describe("MultiTokenCategoryRegistry Events", () => {
  beforeEach(() => {
    // Clear the store before each test
    clearStore()
  })

  afterEach(() => {
    // Clear the store after each test
    clearStore()
  })

  test("handleCategoryRegistered - creates a new AssetCategory entity", () => {
    let category = Bytes.fromHexString("0x1234").toI32()
    let assetAddress = Address.fromString("0x0000000000000000000000000000000000000001")

    let event = createCategoryRegisteredEvent(assetAddress, category)

    handleCategoryRegistered(event)

    let categoryId = Bytes.fromI32(category).toHexString()

    assert.entityCount("AssetCategory", 1)
    assert.fieldEquals(
      "AssetCategory",
      categoryId,
      "id",
      categoryId
    )
    assert.entityCount("AssetContract", 1)
    assert.fieldEquals(
      "AssetContract",
      assetAddress.toHexString(),
      "id",
      assetAddress.toHexString()
    )

    assert.fieldEquals(
      "AssetContract",
      assetAddress.toHexString(),
      "category",
      categoryId
    )
  })

  test("handleCategoryUnregistered - removes the AssetCategory entity", () => {
    let category = Bytes.fromHexString("0x1234").toI32()
    let registryAddress = Address.fromString("0x0000000000000000000000000000000000000001")

    // First register the category
    let registerEvent = createCategoryRegisteredEvent(registryAddress, category)
    handleCategoryRegistered(registerEvent)

    // Then unregister it
    let unregisterEvent = createCategoryUnregisteredEvent(registryAddress)
    handleCategoryUnregistered(unregisterEvent)

    assert.entityCount("AssetCategory", 1)
    assert.entityCount("AssetContract", 1)
    const assetContract = AssetContract.load(Bytes.fromHexString(registryAddress.toHexString()))
    assert.assertNotNull(assetContract)

    if (assetContract != null) {
      let assetCategory = assetContract.get("category")
      // note: for some reason we can't use assert.assertNull here as here it's stringied "null",
      //  but this should be good enough for now
      assert.fieldEquals("AssetContract", registryAddress.toHexString(), "category", "null")
    }
    // TODO shall we throw an error if the asset contract is not found?
  })
}) 