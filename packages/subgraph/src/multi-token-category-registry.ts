import {
  CategoryRegistered as CategoryRegisteredEvent,
  CategoryUnregistered as CategoryUnregisteredEvent,
} from "../generated/MultiTokenCategoryRegistry/MultiTokenCategoryRegistry"
import {
  AssetInCategory,
  Category,
} from "../generated/schema"
import { store } from '@graphprotocol/graph-ts'
import { Bytes } from "@graphprotocol/graph-ts"

export function handleCategoryRegistered(event: CategoryRegisteredEvent): void {
  const categoryId = Bytes.fromI32(event.params.category)
  let category = Category.load(categoryId)
  if (category == null) {
    category = new Category(categoryId)
    category.save()
  }
  let assetCategory = AssetInCategory.load(event.params.assetAddress)
  if (assetCategory == null) {
    assetCategory = new AssetInCategory(event.params.assetAddress)
  }

  assetCategory.category = event.params.category
  assetCategory.save()
 
  // TODO shall we save also the raw event?
  // const entity = new CategoryRegistered(
  //   event.transaction.hash.concatI32(event.logIndex.toI32()),
  // )
  // entity.assetAddress = event.params.assetAddress
  // entity.category = event.params.category

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

export function handleCategoryUnregistered(
  event: CategoryUnregisteredEvent,
): void {
  const assetInCategory = AssetInCategory.load(event.params.assetAddress)
  if (assetInCategory == null) {
    // no need to do anything here
    return
  }
  store.remove("AssetInCategory", event.params.assetAddress)

  // TODO shall we save also the raw event?
  // const entity = new CategoryUnregistered(
  //   event.transaction.hash.concatI32(event.logIndex.toI32()),
  // )
  // entity.assetAddress = event.params.assetAddress

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}
