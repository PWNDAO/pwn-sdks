import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  Upgraded,
  DefaultLOANMetadataUriUpdated,
  FeeCollectorUpdated,
  FeeUpdated,
  Initialized,
  LOANMetadataUriUpdated,
  OwnershipTransferStarted,
  OwnershipTransferred
} from "../generated/Config/Config"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createDefaultLOANMetadataUriUpdatedEvent(
  newUri: string
): DefaultLOANMetadataUriUpdated {
  let defaultLoanMetadataUriUpdatedEvent =
    changetype<DefaultLOANMetadataUriUpdated>(newMockEvent())

  defaultLoanMetadataUriUpdatedEvent.parameters = new Array()

  defaultLoanMetadataUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("newUri", ethereum.Value.fromString(newUri))
  )

  return defaultLoanMetadataUriUpdatedEvent
}

export function createFeeCollectorUpdatedEvent(
  oldFeeCollector: Address,
  newFeeCollector: Address
): FeeCollectorUpdated {
  let feeCollectorUpdatedEvent = changetype<FeeCollectorUpdated>(newMockEvent())

  feeCollectorUpdatedEvent.parameters = new Array()

  feeCollectorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldFeeCollector",
      ethereum.Value.fromAddress(oldFeeCollector)
    )
  )
  feeCollectorUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeCollector",
      ethereum.Value.fromAddress(newFeeCollector)
    )
  )

  return feeCollectorUpdatedEvent
}

export function createFeeUpdatedEvent(oldFee: i32, newFee: i32): FeeUpdated {
  let feeUpdatedEvent = changetype<FeeUpdated>(newMockEvent())

  feeUpdatedEvent.parameters = new Array()

  feeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "oldFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(oldFee))
    )
  )
  feeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(newFee))
    )
  )

  return feeUpdatedEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createLOANMetadataUriUpdatedEvent(
  loanContract: Address,
  newUri: string
): LOANMetadataUriUpdated {
  let loanMetadataUriUpdatedEvent =
    changetype<LOANMetadataUriUpdated>(newMockEvent())

  loanMetadataUriUpdatedEvent.parameters = new Array()

  loanMetadataUriUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "loanContract",
      ethereum.Value.fromAddress(loanContract)
    )
  )
  loanMetadataUriUpdatedEvent.parameters.push(
    new ethereum.EventParam("newUri", ethereum.Value.fromString(newUri))
  )

  return loanMetadataUriUpdatedEvent
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
