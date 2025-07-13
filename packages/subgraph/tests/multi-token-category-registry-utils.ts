import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { CategoryRegistered, CategoryUnregistered } from "../generated/MultiTokenCategoryRegistry/MultiTokenCategoryRegistry"
import { assert, test, newMockEvent } from 'matchstick-as/assembly/index'

export function createCategoryRegisteredEvent(
  asset: Address,
  category: i32
): CategoryRegistered {
  let event = changetype<CategoryRegistered>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("assetAddress", ethereum.Value.fromAddress(asset))
  )
  event.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromI32(category))
  )
  
  event.address = Address.fromString("0x0000000000000000000000000000000000000001")
  
  return event
}

export function createCategoryUnregisteredEvent(
  asset: Address
): CategoryUnregistered {
  let event = changetype<CategoryUnregistered>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("assetAddress", ethereum.Value.fromAddress(asset))
  )
  
  event.address = Address.fromString("0x0000000000000000000000000000000000000001")
  
  return event
} 