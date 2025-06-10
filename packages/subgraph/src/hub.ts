import {
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TagSet as TagSetEvent,
} from "../generated/Hub/Hub"
import {
  OwnershipTransferStarted,
  OwnershipTransferred,
  TagSet,
} from "../generated/schema"

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

export function handleTagSet(event: TagSetEvent): void {
  const entity = new TagSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity._address = event.params._address
  entity.tag = event.params.tag
  entity.hasTag = event.params.hasTag

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
