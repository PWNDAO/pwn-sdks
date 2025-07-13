import { assert, describe, test, clearStore, beforeEach, afterEach } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { handleLOANPaidBack, handleLOANClaimed, handleLOANExtended, handleExtensionProposalMade, getLoanId } from "../src/simple-loan"
import { createTestLoan, createLOANPaidBackEvent, createLOANClaimedEvent, createLOANExtendedEvent, createExtensionProposalMadeEvent, TestLoanParams } from "./simple-loan-utils"
import { log } from "matchstick-as/assembly/log"

describe("SimpleLoan", () => {
  beforeEach(() => {
    clearStore()
  })

  afterEach(() => {
    clearStore()
  })

  test("handleLOANCreated - creates a new Loan entity", () => {
    const loanId = BigInt.fromI32(1)
    const loanTokenAddress = Address.fromString("0x0000000000000000000000000000000000000006")
    const loanContractAddress = Address.fromString("0x0000000000000000000000000000000000000007")
    
    // Create test parameters with explicit values we want to test
    const params = new TestLoanParams()
    params.proposalHash = Bytes.fromHexString("0x1234")
    params.lender = Address.fromString("0x0000000000000000000000000000000000000002")
    params.borrower = Address.fromString("0x0000000000000000000000000000000000000003")
    params.duration = BigInt.fromI32(30)
    params.createdAt = BigInt.fromI32(1234567890)
    params.loanContractAddress = loanContractAddress
    params.loanTokenAddress = loanTokenAddress
    
    const loan = createTestLoan(loanId, params)

    const loanEntityId = getLoanId(loanContractAddress, loanId).toHexString()
    assert.entityCount("Loan", 1)
    assert.fieldEquals("Loan", loanEntityId, "loanId", loanId.toString())
    assert.fieldEquals("Loan", loanEntityId, "proposalHash", params.proposalHash.toHexString())
    assert.fieldEquals("Loan", loanEntityId, "originalLender", params.lender.toHexString())
    assert.fieldEquals("Loan", loanEntityId, "borrower", params.borrower.toHexString())
    assert.fieldEquals("Loan", loanEntityId, "duration", params.duration.toString())
    assert.fieldEquals("Loan", loanEntityId, "createdAt", params.createdAt.toString())
    assert.fieldEquals("Loan", loanEntityId, "status", "Active")
    assert.fieldEquals("Loan", loanEntityId, "loanTokenAddress", loanTokenAddress.toHexString())
    assert.fieldEquals("Loan", loanEntityId, "loanType", "SimpleLoan")
  })

  test("handleLOANPaidBack - updates Loan status to Repaid", () => {
    const loanId = BigInt.fromI32(1)
    
    // Create test parameters with explicit values
    const params = new TestLoanParams()
    params.createdAt = BigInt.fromI32(1234567890)
    
    // Create the loan
    createTestLoan(loanId, params)

    // Then pay it back
    const paidBackAt = BigInt.fromI32(1234567891)
    const payBackEvent = createLOANPaidBackEvent(loanId, paidBackAt, params.loanContractAddress)
    handleLOANPaidBack(payBackEvent)

    const loanIdBytes = params.loanContractAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(loanId)))
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "status", "Repaid")
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "repaidAt", paidBackAt.toString())
  })

  test("handleLOANClaimed - updates Loan status to Claimed", () => {
    const loanId = BigInt.fromI32(1)
    
    // Create test parameters with explicit values
    const params = new TestLoanParams()
    params.createdAt = BigInt.fromI32(1234567890)
    
    // Create the loan
    createTestLoan(loanId, params)

    // Then claim it
    const defaulted = true
    const claimEvent = createLOANClaimedEvent(loanId, defaulted, params.loanContractAddress)
    handleLOANClaimed(claimEvent)

    const loanEntityId = getLoanId(params.loanContractAddress, loanId).toHexString()

    assert.fieldEquals("Loan", loanEntityId, "status", "Claimed")
    assert.fieldEquals("Loan", loanEntityId, "hasDefaulted", defaulted.toString())
  })

  test("handleLOANExtended - extends loan duration and updates default date", () => {
    const loanId = BigInt.fromI32(1)
    const loanContractAddress = Address.fromString("0x0000000000000000000000000000000000000006")
    
    // Create test parameters with explicit values
    const params = new TestLoanParams()
    params.createdAt = BigInt.fromI32(1234567890)
    params.duration = BigInt.fromI32(30)
    params.loanContractAddress = loanContractAddress
    
    // Create the loan
    createTestLoan(loanId, params)

    // Then extend it
    const originalDefaultTimestamp = params.createdAt.plus(params.duration) // createdAt + duration
    const extendedDefaultTimestamp = originalDefaultTimestamp.plus(BigInt.fromI32(30)) // originalDefaultTimestamp + 30
    const extendEvent = createLOANExtendedEvent(
      loanId,
      originalDefaultTimestamp,
      extendedDefaultTimestamp,
      loanContractAddress
    )
    handleLOANExtended(extendEvent)

    const loanEntityId = getLoanId(loanContractAddress, loanId).toHexString()
    assert.fieldEquals("Loan", loanEntityId, "defaultDate", extendedDefaultTimestamp.toString())

    assert.entityCount("LoanExtendedEvent", 1)
    const eventId = extendEvent.transaction.hash.concatI32(extendEvent.logIndex.toI32())
    assert.fieldEquals("LoanExtendedEvent", eventId.toHexString(), "loanId", loanId.toString())
    assert.fieldEquals("LoanExtendedEvent", eventId.toHexString(), "originalDefaultTimestamp", originalDefaultTimestamp.toString())
    assert.fieldEquals("LoanExtendedEvent", eventId.toHexString(), "extendedDefaultTimestamp", extendedDefaultTimestamp.toString())
  })

  test("handleExtensionProposalMade - creates a new ExtensionProposal entity", () => {
    const loanId = BigInt.fromI32(1)
    const loanContractAddress = Address.fromString("0x0000000000000000000000000000000000000006")
    
    // Create test parameters with explicit values
    const params = new TestLoanParams()
    params.createdAt = BigInt.fromI32(1234567890)
    params.loanContractAddress = loanContractAddress

    // Create the loan
    createTestLoan(loanId, params)

    // Then create an extension proposal
    const extensionHash = Bytes.fromHexString("0xabcd")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000008")
    const compensationAddress = Address.fromString("0x0000000000000000000000000000000000000009")
    const compensationAmount = BigInt.fromI32(100)
    const duration = BigInt.fromI32(30)
    const expiration = BigInt.fromI32(1234567899)
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)

    const proposalEvent = createExtensionProposalMadeEvent(
      extensionHash,
      proposer,
      loanId,
      compensationAddress,
      compensationAmount,
      duration,
      expiration,
      nonceSpace,
      nonce,
      loanContractAddress
    )
    handleExtensionProposalMade(proposalEvent)

    const loanEntityId = getLoanId(loanContractAddress, loanId).toHexString()
    const proposalId = extensionHash.toHexString()
    assert.entityCount("ExtensionProposal", 1)
    assert.fieldEquals("ExtensionProposal", proposalId, "loan", loanEntityId)
    assert.fieldEquals("ExtensionProposal", proposalId, "proposer", proposer.toHexString())
    assert.fieldEquals("ExtensionProposal", proposalId, "compensationAssetAddress", compensationAddress.toHexString())
    assert.fieldEquals("ExtensionProposal", proposalId, "compensationAmount", compensationAmount.toString())
    assert.fieldEquals("ExtensionProposal", proposalId, "durationToExtend", duration.toString())
    assert.fieldEquals("ExtensionProposal", proposalId, "proposalExpiration", expiration.toString())
    assert.fieldEquals("ExtensionProposal", proposalId, "nonceSpace", nonceSpace.toString())
    assert.fieldEquals("ExtensionProposal", proposalId, "nonce", nonce.toString())
  })
}) 