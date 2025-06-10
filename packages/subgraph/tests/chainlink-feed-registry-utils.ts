import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AccessControllerSet,
  FeedConfirmed,
  FeedProposed,
  OwnershipTransferRequested,
  OwnershipTransferred
} from "../generated/ChainlinkFeedRegistry/ChainlinkFeedRegistry"

export function createAccessControllerSetEvent(
  accessController: Address,
  sender: Address
): AccessControllerSet {
  let accessControllerSetEvent = changetype<AccessControllerSet>(newMockEvent())

  accessControllerSetEvent.parameters = new Array()

  accessControllerSetEvent.parameters.push(
    new ethereum.EventParam(
      "accessController",
      ethereum.Value.fromAddress(accessController)
    )
  )
  accessControllerSetEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return accessControllerSetEvent
}

export function createFeedConfirmedEvent(
  asset: Address,
  denomination: Address,
  latestAggregator: Address,
  previousAggregator: Address,
  nextPhaseId: i32,
  sender: Address
): FeedConfirmed {
  let feedConfirmedEvent = changetype<FeedConfirmed>(newMockEvent())

  feedConfirmedEvent.parameters = new Array()

  feedConfirmedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  feedConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "denomination",
      ethereum.Value.fromAddress(denomination)
    )
  )
  feedConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "latestAggregator",
      ethereum.Value.fromAddress(latestAggregator)
    )
  )
  feedConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAggregator",
      ethereum.Value.fromAddress(previousAggregator)
    )
  )
  feedConfirmedEvent.parameters.push(
    new ethereum.EventParam(
      "nextPhaseId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(nextPhaseId))
    )
  )
  feedConfirmedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return feedConfirmedEvent
}

export function createFeedProposedEvent(
  asset: Address,
  denomination: Address,
  proposedAggregator: Address,
  currentAggregator: Address,
  sender: Address
): FeedProposed {
  let feedProposedEvent = changetype<FeedProposed>(newMockEvent())

  feedProposedEvent.parameters = new Array()

  feedProposedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )
  feedProposedEvent.parameters.push(
    new ethereum.EventParam(
      "denomination",
      ethereum.Value.fromAddress(denomination)
    )
  )
  feedProposedEvent.parameters.push(
    new ethereum.EventParam(
      "proposedAggregator",
      ethereum.Value.fromAddress(proposedAggregator)
    )
  )
  feedProposedEvent.parameters.push(
    new ethereum.EventParam(
      "currentAggregator",
      ethereum.Value.fromAddress(currentAggregator)
    )
  )
  feedProposedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return feedProposedEvent
}

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent =
    changetype<OwnershipTransferRequested>(newMockEvent())

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}
