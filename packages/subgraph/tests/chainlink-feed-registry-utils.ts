import { Address, BigInt, ethereum, Bytes } from "@graphprotocol/graph-ts"
import { FeedConfirmed } from "../generated/ChainlinkFeedRegistry/ChainlinkFeedRegistry"
import { assert, test, newMockEvent, dataSourceMock } from 'matchstick-as/assembly/index'

export function createFeedConfirmedEvent(
  asset: Address,
  denomination: Address,
  latestAggregator: Address
): FeedConfirmed {
  let event = changetype<FeedConfirmed>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  event.parameters.push(
    new ethereum.EventParam("denomination", ethereum.Value.fromAddress(denomination))
  )
  event.parameters.push(
    new ethereum.EventParam("latestAggregator", ethereum.Value.fromAddress(latestAggregator))
  )

  return event
}
