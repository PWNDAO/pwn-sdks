import {
	type AddressString,
	MultiTokenCategory,
	SupportedChain,
	ZERO_ADDRESS,
	ZERO_FINGERPRINT,
	getLoanContractAddress,
	getUniqueCreditCollateralKey,
} from "@pwndao/sdk-core";
import {
	generateAddress,
	getMockPoolToken,
	getMockToken,
	getMockUserWithNonceManager,
} from "@pwndao/sdk-core";
import { SupportedProtocol } from "@pwndao/sdk-core";
import { LBTC, PYUSD } from "../addresses.js";
import { ChainLinkProposal } from "../models/proposals/chainlink-proposal.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import { convertNameIntoDenominator } from "../utils/chainlink-feeds.js";
import { makeProposal } from "./make-proposal.js";

describe("Test make proposal", () => {
	const collateralAddress = LBTC[SupportedChain.Ethereum] as AddressString;
	const creditAddress = PYUSD[SupportedChain.Ethereum] as AddressString;

	const user_address = generateAddress();
	const date = new Date("2025-02-01T00:00:00.000Z");

	beforeEach(() => {
		// Reset timers before setting up fake timers again
		vi.useRealTimers();

		vi.useFakeTimers();
		vi.setSystemTime(date);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	const durationDays = 30;
	const expirationDays = 30;
	const creditAmount = 1n * 10n ** 18n;
	const ltv = 6969n;
	const apr = 1000;

	const proposerSpecHash = generateAddress();

	it("should assemble elastic proposal", async () => {
		const contractMock = {
			createProposal: vi.fn().mockImplementation((p) => p),
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			createOnChainProposal: vi.fn().mockImplementation((p) => p),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
			createMultiProposal: vi.fn().mockImplementation((p) => p),
		};

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const proposal = await makeProposal<ProposalType.Elastic>(
			getMockUserWithNonceManager(user_address),
			ProposalType.Elastic,
			{
				collateral: getMockToken(SupportedChain.Ethereum, collateralAddress),
				credit: getMockToken(SupportedChain.Ethereum, creditAddress),
				creditAmount,
				ltv: {
					[getUniqueCreditCollateralKey(
						getMockToken(SupportedChain.Ethereum, creditAddress),
						getMockToken(SupportedChain.Ethereum, collateralAddress),
					)]: Number(ltv),
				},
				apr: {
					[getUniqueCreditCollateralKey(
						getMockToken(SupportedChain.Ethereum, creditAddress),
						getMockToken(SupportedChain.Ethereum, collateralAddress),
					)]: apr,
				},
				duration: {
					days: durationDays,
					date: undefined,
				},
				expirationDays,
				utilizedCreditId: generateAddress(), // Utilized credit is essentialy 32 bytes
				minCreditAmountPercentage: 3,
				relatedStrategyId: "1",
				isOffer: true,
				sourceOfFunds: user_address,
			},
			{
				api: {
					getAssetUsdUnitPrice: async () => 1000000000000000000n,
					persistProposal: vi.fn().mockImplementation((p) => p),
					persistProposals: vi.fn().mockImplementation((p) => p),
					updateNonces: vi.fn().mockImplementation((p) => p),
				},
				contract: contractMock,
				loanContract: loanContractMock,
			},
		);

		expect(contractMock.createProposal).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalledWith(
			{
				sourceOfFunds: user_address,
			},
			SupportedChain.Ethereum,
		);

		expect(proposal).toBeDefined();
		expect(proposal.proposerSpecHash).toBe(proposerSpecHash);
		expect(proposal.collateralAddress).toBe(collateralAddress);
		expect(proposal.creditAddress).toBe(creditAddress);
		expect(proposal.availableCreditLimit).toBe(1n * 10n ** 18n);
		expect(proposal.minCreditAmount).toBe(3n * 10n ** (18n - 2n)); // 3% of credit amount
		expect(proposal.accruingInterestAPR).toBe(apr);
		expect(proposal.durationOrDate).toBe(durationDays * 24 * 60 * 60);
		// Verify expiration calculation: current timestamp + expirationDays * 24 * 60 * 60
		const expectedExpiration =
			Math.floor(date.getTime() / 1000) + expirationDays * 24 * 60 * 60;
		expect(proposal.expiration).toBe(expectedExpiration);
		expect(expectedExpiration).toBe(1740960000);

		expect(proposal.collateralCategory).toBe(MultiTokenCategory.ERC20);
		expect(proposal.collateralId).toBe(0n);
		expect(proposal.checkCollateralStateFingerprint).toBe(false);
		expect(proposal.collateralStateFingerprint).toBe(ZERO_FINGERPRINT);
		expect(proposal.allowedAcceptor).toBe(ZERO_ADDRESS);
		expect(proposal.proposer).toBe(user_address);
		expect(proposal.isOffer).toBe(true);
		expect(proposal.refinancingLoanId).toBe(0n);
		expect(proposal.nonceSpace).toBe(0n);
		expect(proposal.nonce).toBe(0n);
		expect(proposal.loanContract).toBe(
			getLoanContractAddress(SupportedChain.Ethereum),
		);
	});

	it("should assemble elastic chainlink proposal", async () => {
		const contractMock = {
			createProposal: vi.fn().mockImplementation((p) => p),
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			createOnChainProposal: vi.fn().mockImplementation((p) => p),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
			createMultiProposal: vi.fn().mockImplementation((p) => p),
		};

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const user = getMockUserWithNonceManager(user_address);

		expect(user.nonces[SupportedChain.Ethereum]?.[0]).toBe(0n);

		const proposal = await makeProposal<ProposalType.ChainLink>(
			user,
			ProposalType.ChainLink,
			{
				collateral: getMockToken(SupportedChain.Ethereum, collateralAddress),
				credit: getMockToken(SupportedChain.Ethereum, creditAddress),
				creditAmount,
				ltv: {
					[getUniqueCreditCollateralKey(
						getMockToken(SupportedChain.Ethereum, creditAddress),
						getMockToken(SupportedChain.Ethereum, collateralAddress),
					)]: Number(ltv),
				},
				apr: {
					[getUniqueCreditCollateralKey(
						getMockToken(SupportedChain.Ethereum, creditAddress),
						getMockToken(SupportedChain.Ethereum, collateralAddress),
					)]: apr,
				},
				duration: {
					days: durationDays,
					date: undefined,
				},
				expirationDays,
				utilizedCreditId: generateAddress(), // Utilized credit is essentialy 32 bytes
				minCreditAmountPercentage: 3,
				relatedStrategyId: "1",
				isOffer: true,
				sourceOfFunds: user_address,
			},
			{
				api: {
					persistProposal: vi.fn().mockImplementation((p) => p),
					persistProposals: vi.fn().mockImplementation((p) => p),
					updateNonces: vi.fn().mockImplementation((p) => p),
				},
				contract: contractMock,
				loanContract: loanContractMock,
			},
		);

		expect(contractMock.createProposal).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalledWith(
			{
				sourceOfFunds: user_address,
			},
			SupportedChain.Ethereum,
		);

		expect(proposal).toBeDefined();

		if (!(proposal instanceof ChainLinkProposal)) {
			throw new Error("Proposal is not a ChainLinkProposal");
		}

		expect(proposal.feedIntermediaryDenominations).toHaveLength(2);
		expect(proposal.feedInvertFlags).toHaveLength(3);

		expect(proposal.feedIntermediaryDenominations[0]).toBe(
			convertNameIntoDenominator("USD"),
		);
		expect(proposal.feedIntermediaryDenominations[1]).toBe(
			convertNameIntoDenominator("BTC"),
		);

		expect(proposal.feedInvertFlags[0]).toBe(false);
		expect(proposal.feedInvertFlags[1]).toBe(true);
		expect(proposal.feedInvertFlags[2]).toBe(true);

		expect(proposal.proposerSpecHash).toBe(proposerSpecHash);
		expect(proposal.collateralAddress).toBe(collateralAddress);
		expect(proposal.creditAddress).toBe(creditAddress);
		expect(proposal.availableCreditLimit).toBe(1n * 10n ** 18n);
		expect(proposal.minCreditAmount).toBe(3n * 10n ** (18n - 2n)); // 3% of credit amount
		expect(proposal.accruingInterestAPR).toBe(apr);
		expect(proposal.durationOrDate).toBe(durationDays * 24 * 60 * 60);
		// Verify expiration calculation: current timestamp + expirationDays * 24 * 60 * 60
		const expectedExpiration =
			Math.floor(date.getTime() / 1000) + expirationDays * 24 * 60 * 60;
		expect(proposal.expiration).toBe(expectedExpiration);
		expect(expectedExpiration).toBe(1740960000);

		expect(proposal.collateralCategory).toBe(MultiTokenCategory.ERC20);
		expect(proposal.collateralId).toBe(0n);
		expect(proposal.checkCollateralStateFingerprint).toBe(false);
		expect(proposal.collateralStateFingerprint).toBe(ZERO_FINGERPRINT);
		expect(proposal.allowedAcceptor).toBe(ZERO_ADDRESS);
		expect(proposal.proposer).toBe(user_address);
		expect(proposal.isOffer).toBe(true);
		expect(proposal.refinancingLoanId).toBe(0n);
		expect(proposal.nonceSpace).toBe(0n);
		expect(proposal.nonce).toBe(0n);
		expect(proposal.loanContract).toBe(
			getLoanContractAddress(SupportedChain.Ethereum),
		);
		expect(proposal.relatedStrategyId).toBe("1");
	});

	it("should assemble elastic proposal with token that has underlyingAddress property", async () => {
		const contractMock = {
			createProposal: vi.fn().mockImplementation((p) => p),
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			createOnChainProposal: vi.fn().mockImplementation((p) => p),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
			createMultiProposal: vi.fn().mockImplementation((p) => p),
		};

		const poolTokenAddress = generateAddress();

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const credit = getMockPoolToken(
			creditAddress,
			SupportedProtocol.AAVE,
			SupportedChain.Ethereum,
			poolTokenAddress,
		);

		const user = getMockUserWithNonceManager(user_address);

		expect(user.nonces[SupportedChain.Ethereum]?.[0]).toBe(0n);

		const proposal = await makeProposal<ProposalType.Elastic>(
			user,
			ProposalType.Elastic,
			{
				collateral: getMockToken(SupportedChain.Ethereum, collateralAddress),
				credit,
				creditAmount,
				ltv: {
					[getUniqueCreditCollateralKey(
						credit,
						getMockToken(SupportedChain.Ethereum, collateralAddress),
					)]: Number(ltv),
				},
				apr: {
					[getUniqueCreditCollateralKey(
						credit,
						getMockToken(SupportedChain.Ethereum, collateralAddress),
					)]: apr,
				},
				duration: {
					days: durationDays,
					date: undefined,
				},
				expirationDays,
				utilizedCreditId: generateAddress(),
				minCreditAmountPercentage: 3,
				relatedStrategyId: "1",
				isOffer: true,
				sourceOfFunds: user_address,
			},
			{
				api: {
					getAssetUsdUnitPrice: async () => 1000000000000000000n,
					persistProposal: vi.fn().mockImplementation((p) => p),
					persistProposals: vi.fn().mockImplementation((p) => p),
					updateNonces: vi.fn().mockImplementation((p) => p),
				},
				contract: contractMock,
				loanContract: loanContractMock,
			},
		);

		// Verify the proposal is created correctly
		expect(contractMock.createProposal).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalled();
		// It should use underlyingAddress instead of user_address when calling getLenderSpecHash
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalledWith(
			{
				sourceOfFunds: poolTokenAddress,
			},
			SupportedChain.Ethereum,
		);

		expect(proposal).toBeDefined();
		expect(proposal.proposerSpecHash).toBe(proposerSpecHash);
		expect(proposal.collateralAddress).toBe(collateralAddress);
		expect(proposal.creditAddress).toBe(creditAddress);
		expect(proposal.availableCreditLimit).toBe(1n * 10n ** 18n);
		expect(proposal.minCreditAmount).toBe(3n * 10n ** (18n - 2n)); // 3% of credit amount
	});
});
