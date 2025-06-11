import { assert, describe, test, clearStore, beforeEach, afterEach } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { handleLOANCreated, handleLOANPaidBack, handleLOANClaimed, handleLOANExtended, handleExtensionProposalMade } from "../src/simple-loan"
import { createLOANCreatedEvent, createLOANPaidBackEvent, createLOANClaimedEvent, createLOANExtendedEvent, createExtensionProposalMadeEvent } from "./simple-loan-utils"

describe("SimpleLoan", () => {
  beforeEach(() => {
    clearStore()
  })

  afterEach(() => {
    clearStore()
  })

  test("handleLOANCreated - creates a new Loan entity", () => {
    const loanId = BigInt.fromI32(1)
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposalContract = Address.fromString("0x0000000000000000000000000000000000000001")
    const refinancingLoanId = BigInt.fromI32(0)
    const lender = Address.fromString("0x0000000000000000000000000000000000000002")
    const borrower = Address.fromString("0x0000000000000000000000000000000000000003")
    const duration = BigInt.fromI32(30)
    const createdAt = BigInt.fromI32(1234567890)
    const collateralAssetAddress = Address.fromString("0x0000000000000000000000000000000000000004")
    const collateralId = BigInt.fromI32(1)
    const collateralCategory = 1
    const collateralAmount = BigInt.fromI32(100)
    const creditAssetAddress = Address.fromString("0x0000000000000000000000000000000000000005")
    const creditId = BigInt.fromI32(0)
    const creditCategory = 0
    const creditAmount = BigInt.fromI32(1000)
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const lenderSpecHash = Bytes.fromHexString("0x5678")
    const borrowerSpecHash = Bytes.fromHexString("0x9abc")
    const sourceOfFunds = Address.fromString("0x0000000000000000000000000000000000000003")
    const extra = Bytes.fromHexString("0x1234")
    const loanTokenAddress = Address.fromString("0x0000000000000000000000000000000000000006")

    const event = createLOANCreatedEvent(
      loanId,
      proposalHash,
      proposalContract,
      refinancingLoanId,
      lender,
      borrower,
      duration,
      createdAt,
      collateralAssetAddress,
      collateralId,
      collateralCategory,
      collateralAmount,
      creditAssetAddress,
      creditId,
      creditCategory,
      creditAmount,
      fixedInterestAmount,
      accruingInterestAPR,
      lenderSpecHash,
      borrowerSpecHash,
      sourceOfFunds,
      extra,
      loanTokenAddress
    )

    handleLOANCreated(event)

    const loanIdBytes = loanTokenAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(loanId)))
    assert.entityCount("Loan", 1)
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "loanId", loanId.toString())
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "proposalHash", proposalHash.toHexString())
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "originalLender", lender.toHexString())
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "borrower", borrower.toHexString())
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "duration", duration.toString())
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "createdAt", createdAt.toString())
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "status", "Active")
  })

  test("handleLOANPaidBack - updates Loan status to Repaid", () => {
    // First create a loan
    const loanId = BigInt.fromI32(1)
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposalContract = Address.fromString("0x0000000000000000000000000000000000000001")
    const refinancingLoanId = BigInt.fromI32(0)
    const lender = Address.fromString("0x0000000000000000000000000000000000000002")
    const borrower = Address.fromString("0x0000000000000000000000000000000000000003")
    const duration = BigInt.fromI32(30)
    const createdAt = BigInt.fromI32(1234567890)
    const collateralAssetAddress = Address.fromString("0x0000000000000000000000000000000000000004")
    const collateralId = BigInt.fromI32(1)
    const collateralCategory = 1
    const collateralAmount = BigInt.fromI32(100)
    const creditAssetAddress = Address.fromString("0x0000000000000000000000000000000000000005")
    const creditId = BigInt.fromI32(0)
    const creditCategory = 0
    const creditAmount = BigInt.fromI32(1000)
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const lenderSpecHash = Bytes.fromHexString("0x5678")
    const borrowerSpecHash = Bytes.fromHexString("0x9abc")
    const sourceOfFunds = Address.fromString("0x0000000000000000000000000000000000000003")
    const extra = Bytes.fromHexString("0x1234")
    const loanTokenAddress = Address.fromString("0x0000000000000000000000000000000000000006")

    const createEvent = createLOANCreatedEvent(
      loanId,
      proposalHash,
      proposalContract,
      refinancingLoanId,
      lender,
      borrower,
      duration,
      createdAt,
      collateralAssetAddress,
      collateralId,
      collateralCategory,
      collateralAmount,
      creditAssetAddress,
      creditId,
      creditCategory,
      creditAmount,
      fixedInterestAmount,
      accruingInterestAPR,
      lenderSpecHash,
      borrowerSpecHash,
      sourceOfFunds,
      extra,
      loanTokenAddress
    )

    handleLOANCreated(createEvent)

    // Then pay it back
    const paidBackAt = BigInt.fromI32(1234567891)
    const payBackEvent = createLOANPaidBackEvent(loanId, paidBackAt, loanTokenAddress)
    handleLOANPaidBack(payBackEvent)

    const loanIdBytes = loanTokenAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(loanId)))
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "status", "Repaid")
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "repaidAt", paidBackAt.toString())
  })

  test("handleLOANClaimed - updates Loan status to Claimed", () => {
    // First create a loan
    const loanId = BigInt.fromI32(1)
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposalContract = Address.fromString("0x0000000000000000000000000000000000000001")
    const refinancingLoanId = BigInt.fromI32(0)
    const lender = Address.fromString("0x0000000000000000000000000000000000000002")
    const borrower = Address.fromString("0x0000000000000000000000000000000000000003")
    const duration = BigInt.fromI32(30)
    const createdAt = BigInt.fromI32(1234567890)
    const collateralAssetAddress = Address.fromString("0x0000000000000000000000000000000000000004")
    const collateralId = BigInt.fromI32(1)
    const collateralCategory = 1
    const collateralAmount = BigInt.fromI32(100)
    const creditAssetAddress = Address.fromString("0x0000000000000000000000000000000000000005")
    const creditId = BigInt.fromI32(0)
    const creditCategory = 0
    const creditAmount = BigInt.fromI32(1000)
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const lenderSpecHash = Bytes.fromHexString("0x5678")
    const borrowerSpecHash = Bytes.fromHexString("0x9abc")
    const sourceOfFunds = Address.fromString("0x0000000000000000000000000000000000000003")
    const extra = Bytes.fromHexString("0x1234")
    const loanTokenAddress = Address.fromString("0x0000000000000000000000000000000000000006")

    const createEvent = createLOANCreatedEvent(
      loanId,
      proposalHash,
      proposalContract,
      refinancingLoanId,
      lender,
      borrower,
      duration,
      createdAt,
      collateralAssetAddress,
      collateralId,
      collateralCategory,
      collateralAmount,
      creditAssetAddress,
      creditId,
      creditCategory,
      creditAmount,
      fixedInterestAmount,
      accruingInterestAPR,
      lenderSpecHash,
      borrowerSpecHash,
      sourceOfFunds,
      extra,
      loanTokenAddress
    )

    handleLOANCreated(createEvent)

    // Then claim it
    const defaulted = true
    const claimEvent = createLOANClaimedEvent(loanId, defaulted, loanTokenAddress)
    handleLOANClaimed(claimEvent)

    const loanIdBytes = loanTokenAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(loanId)))
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "status", "Claimed")
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "hasDefaulted", defaulted.toString())
  })

  test("handleLOANExtended - extends loan duration and updates default date", () => {
    // First create a loan
    const loanId = BigInt.fromI32(1)
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposalContract = Address.fromString("0x0000000000000000000000000000000000000001")
    const refinancingLoanId = BigInt.fromI32(0)
    const lender = Address.fromString("0x0000000000000000000000000000000000000002")
    const borrower = Address.fromString("0x0000000000000000000000000000000000000003")
    const duration = BigInt.fromI32(30)
    const createdAt = BigInt.fromI32(1234567890)
    const collateralAssetAddress = Address.fromString("0x0000000000000000000000000000000000000004")
    const collateralId = BigInt.fromI32(1)
    const collateralCategory = 1
    const collateralAmount = BigInt.fromI32(100)
    const creditAssetAddress = Address.fromString("0x0000000000000000000000000000000000000005")
    const creditId = BigInt.fromI32(0)
    const creditCategory = 0
    const creditAmount = BigInt.fromI32(1000)
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const lenderSpecHash = Bytes.fromHexString("0x5678")
    const borrowerSpecHash = Bytes.fromHexString("0x9abc")
    const sourceOfFunds = Address.fromString("0x0000000000000000000000000000000000000003")
    const extra = Bytes.fromHexString("0x1234")
    const loanTokenAddress = Address.fromString("0x0000000000000000000000000000000000000006")

    const createEvent = createLOANCreatedEvent(
      loanId,
      proposalHash,
      proposalContract,
      refinancingLoanId,
      lender,
      borrower,
      duration,
      createdAt,
      collateralAssetAddress,
      collateralId,
      collateralCategory,
      collateralAmount,
      creditAssetAddress,
      creditId,
      creditCategory,
      creditAmount,
      fixedInterestAmount,
      accruingInterestAPR,
      lenderSpecHash,
      borrowerSpecHash,
      sourceOfFunds,
      extra,
      loanTokenAddress
    )

    handleLOANCreated(createEvent)

    // Then extend it
    const originalDefaultTimestamp = BigInt.fromI32(1234567920) // 30 days after creation
    const extendedDefaultTimestamp = BigInt.fromI32(1234567920 + 15) // 15 more days
    const extendEvent = createLOANExtendedEvent(
      loanId,
      originalDefaultTimestamp,
      extendedDefaultTimestamp,
      loanTokenAddress
    )
    handleLOANExtended(extendEvent)

    const loanIdBytes = loanTokenAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(loanId)))
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "duration", "45") // 30 + 15 days
    assert.fieldEquals("Loan", loanIdBytes.toHexString(), "defaultDate", extendedDefaultTimestamp.toString())

    // Also verify the LOANExtended entity was created
    const extendedEventId = extendEvent.transaction.hash.concatI32(extendEvent.logIndex.toI32())
    assert.entityCount("LOANExtended", 1)
    assert.fieldEquals("LOANExtended", extendedEventId.toHexString(), "loanId", loanId.toString())
    assert.fieldEquals("LOANExtended", extendedEventId.toHexString(), "originalDefaultTimestamp", originalDefaultTimestamp.toString())
    assert.fieldEquals("LOANExtended", extendedEventId.toHexString(), "extendedDefaultTimestamp", extendedDefaultTimestamp.toString())
  })

  test("handleExtensionProposalMade - creates a new ExtensionProposal entity", () => {
    // First create a loan
    const loanId = BigInt.fromI32(1)
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposalContract = Address.fromString("0x0000000000000000000000000000000000000001")
    const refinancingLoanId = BigInt.fromI32(0)
    const lender = Address.fromString("0x0000000000000000000000000000000000000002")
    const borrower = Address.fromString("0x0000000000000000000000000000000000000003")
    const duration = BigInt.fromI32(30)
    const createdAt = BigInt.fromI32(1234567890)
    const collateralAssetAddress = Address.fromString("0x0000000000000000000000000000000000000004")
    const collateralId = BigInt.fromI32(1)
    const collateralCategory = 1
    const collateralAmount = BigInt.fromI32(100)
    const creditAssetAddress = Address.fromString("0x0000000000000000000000000000000000000005")
    const creditId = BigInt.fromI32(0)
    const creditCategory = 0
    const creditAmount = BigInt.fromI32(1000)
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const lenderSpecHash = Bytes.fromHexString("0x5678")
    const borrowerSpecHash = Bytes.fromHexString("0x9abc")
    const sourceOfFunds = Address.fromString("0x0000000000000000000000000000000000000003")
    const extra = Bytes.fromHexString("0x1234")
    const loanTokenAddress = Address.fromString("0x0000000000000000000000000000000000000006")

    const createEvent = createLOANCreatedEvent(
      loanId,
      proposalHash,
      proposalContract,
      refinancingLoanId,
      lender,
      borrower,
      duration,
      createdAt,
      collateralAssetAddress,
      collateralId,
      collateralCategory,
      collateralAmount,
      creditAssetAddress,
      creditId,
      creditCategory,
      creditAmount,
      fixedInterestAmount,
      accruingInterestAPR,
      lenderSpecHash,
      borrowerSpecHash,
      sourceOfFunds,
      extra,
      loanTokenAddress
    )

    handleLOANCreated(createEvent)

    // Then create an extension proposal
    const extensionHash = Bytes.fromHexString("0xabcd")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000007")
    const compensationAddress = Address.fromString("0x0000000000000000000000000000000000000008")
    const compensationAmount = BigInt.fromI32(100)
    const extensionDuration = BigInt.fromI32(15)
    const expiration = BigInt.fromI32(1234567890 + 7) // 7 days from now
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)

    const extensionEvent = createExtensionProposalMadeEvent(
      extensionHash,
      proposer,
      loanId,
      compensationAddress,
      compensationAmount,
      extensionDuration,
      expiration,
      nonceSpace,
      nonce,
      loanTokenAddress
    )
    handleExtensionProposalMade(extensionEvent)

    // Verify the ExtensionProposal entity was created
    assert.entityCount("ExtensionProposal", 1)
    assert.fieldEquals("ExtensionProposal", extensionHash.toHexString(), "proposer", proposer.toHexString())
    assert.fieldEquals("ExtensionProposal", extensionHash.toHexString(), "compensationAssetAddress", compensationAddress.toHexString())
    assert.fieldEquals("ExtensionProposal", extensionHash.toHexString(), "compensationAmount", compensationAmount.toString())
    assert.fieldEquals("ExtensionProposal", extensionHash.toHexString(), "durationToExtend", extensionDuration.toString())
    assert.fieldEquals("ExtensionProposal", extensionHash.toHexString(), "proposalExpiration", expiration.toString())
    assert.fieldEquals("ExtensionProposal", extensionHash.toHexString(), "nonceSpace", nonceSpace.toString())
    assert.fieldEquals("ExtensionProposal", extensionHash.toHexString(), "nonce", nonce.toString())
  })
}) 