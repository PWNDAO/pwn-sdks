import {
  FeedConfirmed as FeedConfirmedEvent,
} from "../generated/ChainlinkFeedRegistry/ChainlinkFeedRegistry"
import {
  ChainlinkFeed,
} from "../generated/schema"
import { Bytes } from "@graphprotocol/graph-ts"

function getChainlinkFeedId(event: FeedConfirmedEvent): Bytes {
  return event.params.asset.concatI32(event.params.denomination.toI32())
}

export function handleFeedConfirmed(event: FeedConfirmedEvent): void {
  const chainlinkFeedId = getChainlinkFeedId(event)
  let chainlinkFeed = ChainlinkFeed.load(chainlinkFeedId)
  if (chainlinkFeed == null) {
    chainlinkFeed = new ChainlinkFeed(chainlinkFeedId)
  }

  chainlinkFeed.asset = event.params.asset
  chainlinkFeed.denomination = event.params.denomination
  chainlinkFeed.aggregator = event.params.latestAggregator
  chainlinkFeed.save()

  // const entity = new FeedConfirmed(
  //   event.transaction.hash.concatI32(event.logIndex.toI32()),
  // )
  // entity.asset = event.params.asset
  // entity.denomination = event.params.denomination
  // entity.latestAggregator = event.params.latestAggregator
  // entity.previousAggregator = event.params.previousAggregator
  // entity.nextPhaseId = event.params.nextPhaseId
  // entity.sender = event.params.sender

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
}

// export function handleFeedProposed(event: FeedProposedEvent): void {
//   const entity = new FeedProposed(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.asset = event.params.asset
//   entity.denomination = event.params.denomination
//   entity.proposedAggregator = event.params.proposedAggregator
//   entity.currentAggregator = event.params.currentAggregator
//   entity.sender = event.params.sender

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

