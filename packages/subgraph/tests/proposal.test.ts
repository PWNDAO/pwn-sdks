import { assert, describe, test, clearStore, beforeEach, afterEach } from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { handleProposalMade as handleSimpleProposalMade } from "../src/simple-loan-simple-proposal"
import { handleProposalMade as handleListProposalMade } from "../src/simple-loan-list-proposal"
import { handleProposalMade as handleElasticProposalMade } from "../src/simple-loan-elastic-proposal"
import { handleProposalMade as handleElasticChainlinkProposalMade } from "../src/simple-loan-elastic-chainlink-proposal"
import { handleProposalMade as handleUniswapV3LPIndividualProposalMade } from "../src/simple-loan-uniswap-v-3-lp-individual-proposal"
import { handleProposalMade as handleUniswapV3LPSetProposalMade } from "../src/simple-loan-uniswap-v-3-lp-set-proposal"
import { createSimpleProposalMadeEvent, createListProposalMadeEvent, createElasticProposalMadeEvent, createElasticChainlinkProposalMadeEvent, createUniswapV3LPIndividualProposalMadeEvent, createUniswapV3LPSetProposalMadeEvent } from "./proposal-utils"

describe("Proposal Events", () => {
  beforeEach(() => {
    clearStore()
  })

  afterEach(() => {
    clearStore()
  })

  test("handleSimpleProposalMade - creates a new Proposal entity", () => {
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000001")
    const collateralCategory = 1
    const collateralAddress = Address.fromString("0x0000000000000000000000000000000000000002")
    const collateralId = BigInt.fromI32(1)
    const collateralAmount = BigInt.fromI32(100)
    const checkCollateralStateFingerprint = true
    const collateralStateFingerprint = Bytes.fromHexString("0x5678")
    const creditAddress = Address.fromString("0x0000000000000000000000000000000000000003")
    const creditAmount = BigInt.fromI32(1000)
    const availableCreditLimit = BigInt.fromI32(2000)
    const utilizedCreditId = Bytes.fromHexString("0x9abc")
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const durationOrDate = BigInt.fromI32(30)
    const expiration = BigInt.fromI32(1234567890)
    const allowedAcceptor = Address.fromString("0x0000000000000000000000000000000000000004")
    const proposerSpecHash = Bytes.fromHexString("0xdef0")
    const isOffer = true
    const refinancingLoanId = BigInt.fromI32(0)
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)
    const loanContract = Address.fromString("0x0000000000000000000000000000000000000005")

    const event = createSimpleProposalMadeEvent(
      proposalHash,
      proposer,
      collateralCategory,
      collateralAddress,
      collateralId,
      collateralAmount,
      checkCollateralStateFingerprint,
      collateralStateFingerprint,
      creditAddress,
      creditAmount,
      availableCreditLimit,
      utilizedCreditId,
      fixedInterestAmount,
      accruingInterestAPR,
      durationOrDate,
      expiration,
      allowedAcceptor,
      proposerSpecHash,
      isOffer,
      refinancingLoanId,
      nonceSpace,
      nonce,
      loanContract
    )

    handleSimpleProposalMade(event)

    // Verify the Proposal entity was created
    assert.entityCount("Proposal", 1)
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposalType", "Simple")
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposer", proposer.toHexString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "collateralAmount", collateralAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "creditAmount", creditAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "status", "Active")

    // Verify the SimpleLoanSimpleProposalMade entity was created
    assert.entityCount("SimpleLoanSimpleProposalMade", 1)
    const eventId = event.transaction.hash.concatI32(event.logIndex.toI32())
    assert.fieldEquals("SimpleLoanSimpleProposalMade", eventId.toHexString(), "proposalHash", proposalHash.toHexString())
    assert.fieldEquals("SimpleLoanSimpleProposalMade", eventId.toHexString(), "proposer", proposer.toHexString())
  })

  test("handleListProposalMade - creates a new Proposal entity", () => {
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000001")
    const collateralCategory = 1
    const collateralAddress = Address.fromString("0x0000000000000000000000000000000000000002")
    const collateralIdsWhitelistMerkleRoot = Bytes.fromHexString("0x5678")
    const collateralAmount = BigInt.fromI32(100)
    const checkCollateralStateFingerprint = true
    const collateralStateFingerprint = Bytes.fromHexString("0x9abc")
    const creditAddress = Address.fromString("0x0000000000000000000000000000000000000003")
    const creditAmount = BigInt.fromI32(1000)
    const availableCreditLimit = BigInt.fromI32(2000)
    const utilizedCreditId = Bytes.fromHexString("0xdef0")
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const durationOrDate = BigInt.fromI32(30)
    const expiration = BigInt.fromI32(1234567890)
    const allowedAcceptor = Address.fromString("0x0000000000000000000000000000000000000004")
    const proposerSpecHash = Bytes.fromHexString("0x1234")
    const isOffer = true
    const refinancingLoanId = BigInt.fromI32(0)
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)
    const loanContract = Address.fromString("0x0000000000000000000000000000000000000005")

    const event = createListProposalMadeEvent(
      proposalHash,
      proposer,
      collateralCategory,
      collateralAddress,
      collateralIdsWhitelistMerkleRoot,
      collateralAmount,
      checkCollateralStateFingerprint,
      collateralStateFingerprint,
      creditAddress,
      creditAmount,
      availableCreditLimit,
      utilizedCreditId,
      fixedInterestAmount,
      accruingInterestAPR,
      durationOrDate,
      expiration,
      allowedAcceptor,
      proposerSpecHash,
      isOffer,
      refinancingLoanId,
      nonceSpace,
      nonce,
      loanContract
    )

    handleListProposalMade(event)

    // Verify the Proposal entity was created
    assert.entityCount("Proposal", 1)
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposalType", "List")
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposer", proposer.toHexString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "collateralAmount", collateralAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "creditAmount", creditAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "status", "Active")

    // Verify the SimpleLoanListProposalProposalMade entity was created
    assert.entityCount("SimpleLoanListProposalProposalMade", 1)
    const eventId = event.transaction.hash.concatI32(event.logIndex.toI32())
    assert.fieldEquals("SimpleLoanListProposalProposalMade", eventId.toHexString(), "proposalHash", proposalHash.toHexString())
    assert.fieldEquals("SimpleLoanListProposalProposalMade", eventId.toHexString(), "proposer", proposer.toHexString())
  })

  test("handleElasticProposalMade - creates a new Proposal entity", () => {
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000001")
    const collateralCategory = 1
    const collateralAddress = Address.fromString("0x0000000000000000000000000000000000000002")
    const collateralId = BigInt.fromI32(1)
    const checkCollateralStateFingerprint = true
    const collateralStateFingerprint = Bytes.fromHexString("0x5678")
    const creditAddress = Address.fromString("0x0000000000000000000000000000000000000003")
    const creditPerCollateralUnit = BigInt.fromI32(10)
    const minCreditAmount = BigInt.fromI32(100)
    const availableCreditLimit = BigInt.fromI32(2000)
    const utilizedCreditId = Bytes.fromHexString("0x9abc")
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const durationOrDate = BigInt.fromI32(30)
    const expiration = BigInt.fromI32(1234567890)
    const allowedAcceptor = Address.fromString("0x0000000000000000000000000000000000000004")
    const proposerSpecHash = Bytes.fromHexString("0xdef0")
    const isOffer = true
    const refinancingLoanId = BigInt.fromI32(0)
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)
    const loanContract = Address.fromString("0x0000000000000000000000000000000000000005")

    const event = createElasticProposalMadeEvent(
      proposalHash,
      proposer,
      collateralCategory,
      collateralAddress,
      collateralId,
      checkCollateralStateFingerprint,
      collateralStateFingerprint,
      creditAddress,
      creditPerCollateralUnit,
      minCreditAmount,
      availableCreditLimit,
      utilizedCreditId,
      fixedInterestAmount,
      accruingInterestAPR,
      durationOrDate,
      expiration,
      allowedAcceptor,
      proposerSpecHash,
      isOffer,
      refinancingLoanId,
      nonceSpace,
      nonce,
      loanContract
    )

    handleElasticProposalMade(event)

    // Verify the Proposal entity was created
    assert.entityCount("Proposal", 1)
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposalType", "Elastic")
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposer", proposer.toHexString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "creditPerCollateralUnit", creditPerCollateralUnit.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "minCreditAmount", minCreditAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "status", "Active")

    // Verify the SimpleLoanElasticProposalProposalMade entity was created
    assert.entityCount("SimpleLoanElasticProposalProposalMade", 1)
    const eventId = event.transaction.hash.concatI32(event.logIndex.toI32())
    assert.fieldEquals("SimpleLoanElasticProposalProposalMade", eventId.toHexString(), "proposalHash", proposalHash.toHexString())
    assert.fieldEquals("SimpleLoanElasticProposalProposalMade", eventId.toHexString(), "proposer", proposer.toHexString())
  })

  test("handleElasticChainlinkProposalMade - creates a new Proposal entity", () => {
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000001")
    const collateralCategory = 1
    const collateralAddress = Address.fromString("0x0000000000000000000000000000000000000002")
    const collateralId = BigInt.fromI32(1)
    const checkCollateralStateFingerprint = true
    const collateralStateFingerprint = Bytes.fromHexString("0x5678")
    const creditAddress = Address.fromString("0x0000000000000000000000000000000000000003")
    const feedIntermediaryDenominations = [Address.fromString("0x0000000000000000000000000000000000000023")]
    const feedInvertFlags = [true]
    const loanToValue = BigInt.fromI32(80)
    const minCreditAmount = BigInt.fromI32(100)
    const availableCreditLimit = BigInt.fromI32(2000)
    const utilizedCreditId = Bytes.fromHexString("0xdef0")
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const durationOrDate = BigInt.fromI32(30)
    const expiration = BigInt.fromI32(1234567890)
    const allowedAcceptor = Address.fromString("0x0000000000000000000000000000000000000004")
    const proposerSpecHash = Bytes.fromHexString("0x1234")
    const isOffer = true
    const refinancingLoanId = BigInt.fromI32(0)
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)
    const loanContract = Address.fromString("0x0000000000000000000000000000000000000005")

    const event = createElasticChainlinkProposalMadeEvent(
      proposalHash,
      proposer,
      collateralCategory,
      collateralAddress,
      collateralId,
      checkCollateralStateFingerprint,
      collateralStateFingerprint,
      creditAddress,
      feedIntermediaryDenominations,
      feedInvertFlags,
      loanToValue,
      minCreditAmount,
      availableCreditLimit,
      utilizedCreditId,
      fixedInterestAmount,
      accruingInterestAPR,
      durationOrDate,
      expiration,
      allowedAcceptor,
      proposerSpecHash,
      isOffer,
      refinancingLoanId,
      nonceSpace,
      nonce,
      loanContract
    )

    handleElasticChainlinkProposalMade(event)

    // Verify the Proposal entity was created
    assert.entityCount("Proposal", 1)
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposalType", "ElasticChainlink")
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposer", proposer.toHexString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "loanToValue", loanToValue.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "minCreditAmount", minCreditAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "status", "Active")

    // Verify the SimpleLoanElasticChainlinkProposalProposalMade entity was created
    assert.entityCount("SimpleLoanElasticChainlinkProposalProposalMade", 1)
    const eventId = event.transaction.hash.concatI32(event.logIndex.toI32())
    assert.fieldEquals("SimpleLoanElasticChainlinkProposalProposalMade", eventId.toHexString(), "proposalHash", proposalHash.toHexString())
    assert.fieldEquals("SimpleLoanElasticChainlinkProposalProposalMade", eventId.toHexString(), "proposer", proposer.toHexString())
  })

  test("handleUniswapV3LPIndividualProposalMade - creates a new Proposal entity", () => {
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000001")
    const collateralId = BigInt.fromI32(1)
    const token0Denominator = Address.fromString("0x0000000000000000000000000000000000000002")
    const creditAddress = Address.fromString("0x0000000000000000000000000000000000000003")
    const feedIntermediaryDenominations = [Address.fromString("0x0000000000000000000000000000000000000023")]
    const feedInvertFlags = [true]
    const loanToValue = BigInt.fromI32(80)
    const minCreditAmount = BigInt.fromI32(100)
    const availableCreditLimit = BigInt.fromI32(2000)
    const utilizedCreditId = Bytes.fromHexString("0x9abc")
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const durationOrDate = BigInt.fromI32(30)
    const expiration = BigInt.fromI32(1234567890)
    const acceptorController = Address.fromString("0x0000000000000000000000000000000000000004")
    const acceptorControllerData = Bytes.fromHexString("0xdef0")
    const proposerSpecHash = Bytes.fromHexString("0x1234")
    const isOffer = true
    const refinancingLoanId = BigInt.fromI32(0)
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)
    const loanContract = Address.fromString("0x0000000000000000000000000000000000000005")

    const event = createUniswapV3LPIndividualProposalMadeEvent(
      proposalHash,
      proposer,
      collateralId,
      token0Denominator,
      creditAddress,
      feedIntermediaryDenominations,
      feedInvertFlags,
      loanToValue,
      minCreditAmount,
      availableCreditLimit,
      utilizedCreditId,
      fixedInterestAmount,
      accruingInterestAPR,
      durationOrDate,
      expiration,
      acceptorController,
      acceptorControllerData,
      proposerSpecHash,
      isOffer,
      refinancingLoanId,
      nonceSpace,
      nonce,
      loanContract
    )

    handleUniswapV3LPIndividualProposalMade(event)

    // Verify the Proposal entity was created
    assert.entityCount("Proposal", 1)
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposalType", "UniswapV3LPIndividual")
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposer", proposer.toHexString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "loanToValue", loanToValue.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "minCreditAmount", minCreditAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "status", "Active")

    // Verify the SimpleLoanUniswapV3LPIndividualProposalProposalMade entity was created
    assert.entityCount("SimpleLoanUniswapV3LPIndividualProposalProposalMade", 1)
    const eventId = event.transaction.hash.concatI32(event.logIndex.toI32())
    assert.fieldEquals("SimpleLoanUniswapV3LPIndividualProposalProposalMade", eventId.toHexString(), "proposalHash", proposalHash.toHexString())
    assert.fieldEquals("SimpleLoanUniswapV3LPIndividualProposalProposalMade", eventId.toHexString(), "proposer", proposer.toHexString())
  })

  test("handleUniswapV3LPSetProposalMade - creates a new Proposal entity", () => {
    const proposalHash = Bytes.fromHexString("0x1234")
    const proposer = Address.fromString("0x0000000000000000000000000000000000000001")
    const tokenAAllowlist = [Address.fromString("0x0000000000000000000000000000000000000033")]
    const tokenBAllowlist = [Address.fromString("0x0000000000000000000000000000000000000043")]
    const creditAddress = Address.fromString("0x0000000000000000000000000000000000000002")
    const feedIntermediaryDenominations = [Address.fromString("0x0000000000000000000000000000000000000023")]
    const feedInvertFlags = [true]
    const loanToValue = BigInt.fromI32(80)
    const minCreditAmount = BigInt.fromI32(100)
    const availableCreditLimit = BigInt.fromI32(2000)
    const utilizedCreditId = Bytes.fromHexString("0x1234")
    const fixedInterestAmount = BigInt.fromI32(50)
    const accruingInterestAPR = 1000
    const durationOrDate = BigInt.fromI32(30)
    const expiration = BigInt.fromI32(1234567890)
    const acceptorController = Address.fromString("0x0000000000000000000000000000000000000003")
    const acceptorControllerData = Bytes.fromHexString("0x5678")
    const proposerSpecHash = Bytes.fromHexString("0x9abc")
    const isOffer = true
    const refinancingLoanId = BigInt.fromI32(0)
    const nonceSpace = BigInt.fromI32(1)
    const nonce = BigInt.fromI32(1)
    const loanContract = Address.fromString("0x0000000000000000000000000000000000000004")

    const event = createUniswapV3LPSetProposalMadeEvent(
      proposalHash,
      proposer,
      tokenAAllowlist,
      tokenBAllowlist,
      creditAddress,
      feedIntermediaryDenominations,
      feedInvertFlags,
      loanToValue,
      minCreditAmount,
      availableCreditLimit,
      utilizedCreditId,
      fixedInterestAmount,
      accruingInterestAPR,
      durationOrDate,
      expiration,
      acceptorController,
      acceptorControllerData,
      proposerSpecHash,
      isOffer,
      refinancingLoanId,
      nonceSpace,
      nonce,
      loanContract
    )

    handleUniswapV3LPSetProposalMade(event)

    // Verify the Proposal entity was created
    assert.entityCount("Proposal", 1)
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposalType", "UniswapV3LPSet")
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "proposer", proposer.toHexString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "loanToValue", loanToValue.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "minCreditAmount", minCreditAmount.toString())
    assert.fieldEquals("Proposal", proposalHash.toHexString(), "status", "Active")

    // Verify the SimpleLoanUniswapV3LPSetProposalProposalMade entity was created
    assert.entityCount("SimpleLoanUniswapV3LPSetProposalProposalMade", 1)
    const eventId = event.transaction.hash.concatI32(event.logIndex.toI32())
    assert.fieldEquals("SimpleLoanUniswapV3LPSetProposalProposalMade", eventId.toHexString(), "proposalHash", proposalHash.toHexString())
    assert.fieldEquals("SimpleLoanUniswapV3LPSetProposalProposalMade", eventId.toHexString(), "proposer", proposer.toHexString())
  })
}) 