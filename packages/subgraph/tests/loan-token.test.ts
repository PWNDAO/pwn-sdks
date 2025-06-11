import { assert, describe, test, clearStore, beforeEach, afterEach, createMockedFunction } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { handleTransfer } from "../src/loan-token"
import { createTransferEvent } from "./loan-token-utils"
import { getLoanId } from "../src/simple-loan"
import { Loan } from "../generated/schema"
import { createDefaultTestLoan, TestLoanParams } from "./simple-loan-utils"
import { log } from "matchstick-as/assembly/log"

describe("LoanToken Events", () => {
  beforeEach(() => {
    // Clear the store before each test
    clearStore()
  })

  afterEach(() => {
    // Clear the store after each test
    clearStore()
  })

  test("handleTransfer - creates a new Transfer entity", () => {
    let from = Address.fromString("0x0000000000000000000000000000000000000001")
    let to = Address.fromString("0x0000000000000000000000000000000000000002")
    let tokenId = BigInt.fromI32(100)
    let loanTokenAddress = Address.fromString("0x0000000000000000000000000000000000000003")
    // default address used in mocks in matchstick-as/assembly/defaults.ts
    let loanContractAddress = Address.fromString("0xA16081F360e3847006dB660bae1c6d1b2e17eC2A")

    // create mock loan entity
    const loanId = getLoanId(loanContractAddress, tokenId)
    const loanParams = new TestLoanParams()
    loanParams.loanTokenAddress = loanTokenAddress
    loanParams.lender = from

    createMockedFunction(loanContractAddress, 'loanToken', 'loanToken():(address)')
      .returns([ethereum.Value.fromAddress(loanTokenAddress)])

    log.info("before createDefaultTestLoan", [])
    createDefaultTestLoan(tokenId, loanParams)
    log.info("after createDefaultTestLoan", [])
    assert.fieldEquals("Loan", loanId.toHexString(), "loanOwner", from.toHexString())

    log.info("before createTransferEvent", [])
    let event = createTransferEvent(from, to, tokenId, loanTokenAddress)
    log.info("after createTransferEvent", [])
    const transferEventId = event.transaction.hash.concatI32(event.logIndex.toI32())

    createMockedFunction(loanTokenAddress, 'loanContract', 'loanContract(uint256):(address)')
      .withArgs([ethereum.Value.fromUnsignedBigInt(event.params.tokenId)])
      .returns([ethereum.Value.fromAddress(loanContractAddress)])

    log.info("before handleTransfer", [])
    handleTransfer(event)

    log.info("after handleTransfer", [])

    assert.fieldEquals("Loan", loanId.toHexString(), "loanOwner", to.toHexString())

    assert.entityCount("LoanTokenTransfer", 1)
    assert.fieldEquals(
      "LoanTokenTransfer",
      transferEventId.toHexString(),
      "from",
      from.toHexString()
    )
    assert.fieldEquals(
      "LoanTokenTransfer",
      transferEventId.toHexString(),
      "to",
      to.toHexString()
    )
    assert.fieldEquals(
      "LoanTokenTransfer",
      transferEventId.toHexString(),
      "tokenId",
      tokenId.toString()
    )
    assert.fieldEquals(
      "LoanTokenTransfer",
      transferEventId.toHexString(),
      "contractAddress",
      loanTokenAddress.toHexString()
    )
  })
}) 