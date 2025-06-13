import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { TagSet } from "../generated/Hub/Hub"
import { assert, test, newMockEvent } from 'matchstick-as/assembly/index'

export function createTagSetEvent(
  contractAddress: Address,
  tag: Bytes,
  hasTag: boolean
): TagSet {
  let event = changetype<TagSet>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("_address", ethereum.Value.fromAddress(contractAddress))
  )
  event.parameters.push(
    new ethereum.EventParam("tag", ethereum.Value.fromBytes(tag))
  )
  event.parameters.push(
    new ethereum.EventParam("hasTag", ethereum.Value.fromBoolean(hasTag))
  )
  
  event.address = Address.fromString("0x0000000000000000000000000000000000000001")
  
  return event
} 