import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { Transfer } from "../generated/LoanToken/LoanToken"
import { assert, test, newMockEvent } from 'matchstick-as/assembly/index'

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt,
  loanTokenAddress: Address
): Transfer {
  let event = changetype<Transfer>(newMockEvent())
  
  event.parameters = new Array()
  
  event.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  event.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  event.parameters.push(
    new ethereum.EventParam("tokenId", ethereum.Value.fromUnsignedBigInt(tokenId))
  )
  
  event.address = loanTokenAddress
  
  return event
} 