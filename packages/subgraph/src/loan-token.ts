import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  LOANBurned as LOANBurnedEvent,
  LOANMinted as LOANMintedEvent,
  Transfer as TransferEvent,
} from "../generated/LoanToken/LoanToken"
import {
  Approval,
  ApprovalForAll,
  LOANBurned,
  LOANMinted,
  Transfer,
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  const entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  const entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLOANBurned(event: LOANBurnedEvent): void {
  const entity = new LOANBurned(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.loanId = event.params.loanId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLOANMinted(event: LOANMintedEvent): void {
  const entity = new LOANMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.loanId = event.params.loanId
  entity.loanContract = event.params.loanContract
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  const entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
