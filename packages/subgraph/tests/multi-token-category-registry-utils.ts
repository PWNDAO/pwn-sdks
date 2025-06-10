import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  CategoryRegistered,
  CategoryUnregistered,
  OwnershipTransferStarted,
  OwnershipTransferred
} from "../generated/MultiTokenCategoryRegistry/MultiTokenCategoryRegistry"

export function createCategoryRegisteredEvent(
  assetAddress: Address,
  category: i32
): CategoryRegistered {
  let categoryRegisteredEvent = changetype<CategoryRegistered>(newMockEvent())

  categoryRegisteredEvent.parameters = new Array()

  categoryRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "assetAddress",
      ethereum.Value.fromAddress(assetAddress)
    )
  )
  categoryRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "category",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(category))
    )
  )

  return categoryRegisteredEvent
}

export function createCategoryUnregisteredEvent(
  assetAddress: Address
): CategoryUnregistered {
  let categoryUnregisteredEvent =
    changetype<CategoryUnregistered>(newMockEvent())

  categoryUnregisteredEvent.parameters = new Array()

  categoryUnregisteredEvent.parameters.push(
    new ethereum.EventParam(
      "assetAddress",
      ethereum.Value.fromAddress(assetAddress)
    )
  )

  return categoryUnregisteredEvent
}

export function createOwnershipTransferStartedEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferStarted {
  let ownershipTransferStartedEvent =
    changetype<OwnershipTransferStarted>(newMockEvent())

  ownershipTransferStartedEvent.parameters = new Array()

  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferStartedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferStartedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
