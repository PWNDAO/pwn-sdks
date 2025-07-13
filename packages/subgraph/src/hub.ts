import {
  TagSet as TagSetEvent,
} from "../generated/Hub/Hub"
import {
  TagSetEvent as TagSetEventEntity,
} from "../generated/schema"

export function handleTagSet(event: TagSetEvent): void {
  const entity = new TagSetEventEntity(
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
