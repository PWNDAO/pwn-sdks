import {
  CategoryRegistered as CategoryRegisteredEvent,
  CategoryUnregistered as CategoryUnregisteredEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/MultiTokenCategoryRegistry/MultiTokenCategoryRegistry"
import {
  CategoryRegistered,
  CategoryUnregistered,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Category,
  AssetCategory,
} from "../generated/schema"
import { store } from '@graphprotocol/graph-ts'

export function handleCategoryRegistered(event: CategoryRegisteredEvent): void {
  let category = Category.load(event.params.category)
  if (category == null) {
    category = new Category(event.params.category)
    category.save()
  }
  let assetCategory = Category.load()
  
  const entity = new CategoryRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.assetAddress = event.params.assetAddress
  entity.category = event.params.category

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCategoryUnregistered(
  event: CategoryUnregisteredEvent,
): void {
  const entity = new CategoryUnregistered(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.assetAddress = event.params.assetAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent,
): void {
  const entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  const entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
