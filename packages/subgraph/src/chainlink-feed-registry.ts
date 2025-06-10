import {
  AccessControllerSet as AccessControllerSetEvent,
  FeedConfirmed as FeedConfirmedEvent,
  FeedProposed as FeedProposedEvent,
  OwnershipTransferRequested as OwnershipTransferRequestedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/ChainlinkFeedRegistry/ChainlinkFeedRegistry"
import {
  AccessControllerSet,
  FeedConfirmed,
  FeedProposed,
  OwnershipTransferRequested,
  OwnershipTransferred,
} from "../generated/schema"

export function handleAccessControllerSet(
  event: AccessControllerSetEvent,
): void {
  const entity = new AccessControllerSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.accessController = event.params.accessController
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeedConfirmed(event: FeedConfirmedEvent): void {
  const entity = new FeedConfirmed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.asset = event.params.asset
  entity.denomination = event.params.denomination
  entity.latestAggregator = event.params.latestAggregator
  entity.previousAggregator = event.params.previousAggregator
  entity.nextPhaseId = event.params.nextPhaseId
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeedProposed(event: FeedProposedEvent): void {
  const entity = new FeedProposed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.asset = event.params.asset
  entity.denomination = event.params.denomination
  entity.proposedAggregator = event.params.proposedAggregator
  entity.currentAggregator = event.params.currentAggregator
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferRequested(
  event: OwnershipTransferRequestedEvent,
): void {
  const entity = new OwnershipTransferRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to

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
  entity.from = event.params.from
  entity.to = event.params.to

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
