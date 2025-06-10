import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { CategoryRegistered } from "../generated/schema"
import { CategoryRegistered as CategoryRegisteredEvent } from "../generated/MultiTokenCategoryRegistry/MultiTokenCategoryRegistry"
import { handleCategoryRegistered } from "../src/multi-token-category-registry"
import { createCategoryRegisteredEvent } from "./multi-token-category-registry-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let assetAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let category = 123
    let newCategoryRegisteredEvent = createCategoryRegisteredEvent(
      assetAddress,
      category
    )
    handleCategoryRegistered(newCategoryRegisteredEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("CategoryRegistered created and stored", () => {
    assert.entityCount("CategoryRegistered", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CategoryRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "assetAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CategoryRegistered",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "category",
      "123"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
