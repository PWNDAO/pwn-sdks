import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ExtensionProposalMade,
  LOANClaimed,
  LOANCreated,
  LOANExtended,
  LOANPaidBack,
  PoolSupply,
  PoolWithdraw,
  VaultPull,
  VaultPush,
  VaultPushFrom
} from "../generated/SimpleLoan/SimpleLoan"

export function createExtensionProposalMadeEvent(
  extensionHash: Bytes,
  proposer: Address,
  proposal: ethereum.Tuple
): ExtensionProposalMade {
  let extensionProposalMadeEvent =
    changetype<ExtensionProposalMade>(newMockEvent())

  extensionProposalMadeEvent.parameters = new Array()

  extensionProposalMadeEvent.parameters.push(
    new ethereum.EventParam(
      "extensionHash",
      ethereum.Value.fromFixedBytes(extensionHash)
    )
  )
  extensionProposalMadeEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  extensionProposalMadeEvent.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromTuple(proposal))
  )

  return extensionProposalMadeEvent
}

export function createLOANClaimedEvent(
  loanId: BigInt,
  defaulted: boolean
): LOANClaimed {
  let loanClaimedEvent = changetype<LOANClaimed>(newMockEvent())

  loanClaimedEvent.parameters = new Array()

  loanClaimedEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  loanClaimedEvent.parameters.push(
    new ethereum.EventParam("defaulted", ethereum.Value.fromBoolean(defaulted))
  )

  return loanClaimedEvent
}

export function createLOANCreatedEvent(
  loanId: BigInt,
  proposalHash: Bytes,
  proposalContract: Address,
  refinancingLoanId: BigInt,
  terms: ethereum.Tuple,
  lenderSpec: ethereum.Tuple,
  extra: Bytes
): LOANCreated {
  let loanCreatedEvent = changetype<LOANCreated>(newMockEvent())

  loanCreatedEvent.parameters = new Array()

  loanCreatedEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalHash",
      ethereum.Value.fromFixedBytes(proposalHash)
    )
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalContract",
      ethereum.Value.fromAddress(proposalContract)
    )
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "refinancingLoanId",
      ethereum.Value.fromUnsignedBigInt(refinancingLoanId)
    )
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam("terms", ethereum.Value.fromTuple(terms))
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam("lenderSpec", ethereum.Value.fromTuple(lenderSpec))
  )
  loanCreatedEvent.parameters.push(
    new ethereum.EventParam("extra", ethereum.Value.fromBytes(extra))
  )

  return loanCreatedEvent
}

export function createLOANExtendedEvent(
  loanId: BigInt,
  originalDefaultTimestamp: BigInt,
  extendedDefaultTimestamp: BigInt
): LOANExtended {
  let loanExtendedEvent = changetype<LOANExtended>(newMockEvent())

  loanExtendedEvent.parameters = new Array()

  loanExtendedEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )
  loanExtendedEvent.parameters.push(
    new ethereum.EventParam(
      "originalDefaultTimestamp",
      ethereum.Value.fromUnsignedBigInt(originalDefaultTimestamp)
    )
  )
  loanExtendedEvent.parameters.push(
    new ethereum.EventParam(
      "extendedDefaultTimestamp",
      ethereum.Value.fromUnsignedBigInt(extendedDefaultTimestamp)
    )
  )

  return loanExtendedEvent
}

export function createLOANPaidBackEvent(loanId: BigInt): LOANPaidBack {
  let loanPaidBackEvent = changetype<LOANPaidBack>(newMockEvent())

  loanPaidBackEvent.parameters = new Array()

  loanPaidBackEvent.parameters.push(
    new ethereum.EventParam("loanId", ethereum.Value.fromUnsignedBigInt(loanId))
  )

  return loanPaidBackEvent
}

export function createPoolSupplyEvent(
  asset: ethereum.Tuple,
  poolAdapter: Address,
  pool: Address,
  owner: Address
): PoolSupply {
  let poolSupplyEvent = changetype<PoolSupply>(newMockEvent())

  poolSupplyEvent.parameters = new Array()

  poolSupplyEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromTuple(asset))
  )
  poolSupplyEvent.parameters.push(
    new ethereum.EventParam(
      "poolAdapter",
      ethereum.Value.fromAddress(poolAdapter)
    )
  )
  poolSupplyEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  poolSupplyEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return poolSupplyEvent
}

export function createPoolWithdrawEvent(
  asset: ethereum.Tuple,
  poolAdapter: Address,
  pool: Address,
  owner: Address
): PoolWithdraw {
  let poolWithdrawEvent = changetype<PoolWithdraw>(newMockEvent())

  poolWithdrawEvent.parameters = new Array()

  poolWithdrawEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromTuple(asset))
  )
  poolWithdrawEvent.parameters.push(
    new ethereum.EventParam(
      "poolAdapter",
      ethereum.Value.fromAddress(poolAdapter)
    )
  )
  poolWithdrawEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )
  poolWithdrawEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return poolWithdrawEvent
}

export function createVaultPullEvent(
  asset: ethereum.Tuple,
  origin: Address
): VaultPull {
  let vaultPullEvent = changetype<VaultPull>(newMockEvent())

  vaultPullEvent.parameters = new Array()

  vaultPullEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromTuple(asset))
  )
  vaultPullEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )

  return vaultPullEvent
}

export function createVaultPushEvent(
  asset: ethereum.Tuple,
  beneficiary: Address
): VaultPush {
  let vaultPushEvent = changetype<VaultPush>(newMockEvent())

  vaultPushEvent.parameters = new Array()

  vaultPushEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromTuple(asset))
  )
  vaultPushEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )

  return vaultPushEvent
}

export function createVaultPushFromEvent(
  asset: ethereum.Tuple,
  origin: Address,
  beneficiary: Address
): VaultPushFrom {
  let vaultPushFromEvent = changetype<VaultPushFrom>(newMockEvent())

  vaultPushFromEvent.parameters = new Array()

  vaultPushFromEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromTuple(asset))
  )
  vaultPushFromEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromAddress(origin))
  )
  vaultPushFromEvent.parameters.push(
    new ethereum.EventParam(
      "beneficiary",
      ethereum.Value.fromAddress(beneficiary)
    )
  )

  return vaultPushFromEvent
}
