import {
  CategoryRegistered as CategoryRegisteredEvent,
  CategoryUnregistered as CategoryUnregisteredEvent,
} from "../generated/MultiTokenCategoryRegistry/MultiTokenCategoryRegistry"
import {
  AssetContract,
  AssetCategory,
} from "../generated/schema"
import { Bytes } from "@graphprotocol/graph-ts"

export function handleCategoryRegistered(event: CategoryRegisteredEvent): void {
  const categoryId = Bytes.fromI32(event.params.category)
  let category = AssetCategory.load(categoryId)
  if (category == null) {
    category = new AssetCategory(categoryId)
    category.save()
  }
  let assetContract = AssetContract.load(event.params.assetAddress)
  if (assetContract == null) {
    assetContract = new AssetContract(event.params.assetAddress)
  }

  assetContract.category = category.id
  assetContract.save()
 
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
  // TODO this does not amek sense probably
  const assetInCategory = AssetContract.load(event.params.assetAddress)
  if (assetInCategory == null) {
    // no need to do anything here
    return
  }
  assetInCategory.category = null
  assetInCategory.save()

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
