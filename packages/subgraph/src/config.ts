// import {
//   AdminChanged as AdminChangedEvent,
//   BeaconUpgraded as BeaconUpgradedEvent,
//   Upgraded as UpgradedEvent,
//   DefaultLOANMetadataUriUpdated as DefaultLOANMetadataUriUpdatedEvent,
//   FeeCollectorUpdated as FeeCollectorUpdatedEvent,
//   FeeUpdated as FeeUpdatedEvent,
//   Initialized as InitializedEvent,
//   LOANMetadataUriUpdated as LOANMetadataUriUpdatedEvent,
//   OwnershipTransferStarted as OwnershipTransferStartedEvent,
//   OwnershipTransferred as OwnershipTransferredEvent,
// } from "../generated/Config/Config"
// import {
//   DefaultLOANMetadataUriUpdated,
//   FeeCollectorUpdated,
//   FeeUpdated,
//   LOANMetadataUriUpdated,
// } from "../generated/schema"

// export function handleAdminChanged(event: AdminChangedEvent): void {
//   const entity = new AdminChanged(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.previousAdmin = event.params.previousAdmin
//   entity.newAdmin = event.params.newAdmin

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
//   const entity = new BeaconUpgraded(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.beacon = event.params.beacon

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleUpgraded(event: UpgradedEvent): void {
//   const entity = new Upgraded(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.implementation = event.params.implementation

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleDefaultLOANMetadataUriUpdated(
//   event: DefaultLOANMetadataUriUpdatedEvent,
// ): void {
//   const entity = new DefaultLOANMetadataUriUpdated(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.newUri = event.params.newUri

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleFeeCollectorUpdated(
//   event: FeeCollectorUpdatedEvent,
// ): void {
//   const entity = new FeeCollectorUpdated(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.oldFeeCollector = event.params.oldFeeCollector
//   entity.newFeeCollector = event.params.newFeeCollector

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleFeeUpdated(event: FeeUpdatedEvent): void {
//   const entity = new FeeUpdated(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.oldFee = event.params.oldFee
//   entity.newFee = event.params.newFee

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleInitialized(event: InitializedEvent): void {
//   const entity = new Initialized(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.version = event.params.version

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleLOANMetadataUriUpdated(
//   event: LOANMetadataUriUpdatedEvent,
// ): void {
//   const entity = new LOANMetadataUriUpdated(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.loanContract = event.params.loanContract
//   entity.newUri = event.params.newUri

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOwnershipTransferStarted(
//   event: OwnershipTransferStartedEvent,
// ): void {
//   const entity = new OwnershipTransferStarted(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.previousOwner = event.params.previousOwner
//   entity.newOwner = event.params.newOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOwnershipTransferred(
//   event: OwnershipTransferredEvent,
// ): void {
//   const entity = new OwnershipTransferred(
//     event.transaction.hash.concatI32(event.logIndex.toI32()),
//   )
//   entity.previousOwner = event.params.previousOwner
//   entity.newOwner = event.params.newOwner

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
