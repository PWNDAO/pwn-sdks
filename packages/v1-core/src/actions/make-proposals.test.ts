import {
	type AddressString,
	SupportedChain,
	type UserWithNonceManager,
	ZERO_ADDRESS,
	ZERO_FINGERPRINT,
	getLoanContractAddress,
	getUniqueCreditCollateralKey,
} from "@pwndao/sdk-core";
import {
	generateAddress,
	getMockToken,
	getMockUserWithNonceManager,
} from "@pwndao/sdk-core";
import type { Config } from "@wagmi/core";
import { LBTC, PYUSD } from "../addresses.js";
import type { CreateElasticProposalParams } from "../factories/create-elastic-proposal.js";
import type { ProposalWithSignature } from "../index.js";
import { ChainLinkProposal } from "../models/proposals/chainlink-proposal.js";
import { ProposalType } from "../models/proposals/proposal-base.js";
import { convertNameIntoDenominator } from "../utils/chainlink-feeds.js";
import { makeProposals } from "./make-proposals.js";
import type {
	ImplementedProposalTypes,
	ProposalParamWithDeps,
} from "./types.js";

describe("Test make proposals", () => {
	const collateralAddress = LBTC[SupportedChain.Ethereum] as AddressString;
	const collateralAddress2 = PYUSD[SupportedChain.Ethereum] as AddressString;
	const creditAddress = PYUSD[SupportedChain.Ethereum] as AddressString;

	const user_address = generateAddress();
	const date = new Date("2025-02-01T00:00:00.000Z");

	beforeEach(() => {
		vi.useRealTimers();
		vi.useFakeTimers();
		vi.setSystemTime(date);
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.resetAllMocks();
	});

	const durationDays = 30;
	const expirationDays = 30;
	const creditAmount = 1n * 10n ** 18n;
	const ltv = 6969n;
	const apr = 1000;
	const proposerSpecHash = generateAddress();

	it("should create multiple elastic proposals", async () => {
		const contractMock = {
			createProposal: vi.fn().mockImplementation((p) => p),
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			createOnChainProposal: vi.fn().mockImplementation((p) => p),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
			createMultiProposal: vi.fn().mockImplementation((proposals) =>
				proposals.map((p: Record<string, unknown>) => ({
					...p,
					signature: "0x456",
				})),
			),
		};

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const user = getMockUserWithNonceManager(user_address);
		const config = {} as Config;

		const proposalParams: ProposalParamWithDeps<ProposalType.Elastic>[] = [
			{
				type: ProposalType.Elastic,
				params: {
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
					utilizedCreditId: generateAddress(),
					minCreditAmountPercentage: 3,
					relatedStrategyId: "1",
					isOffer: true,
				},
				deps: {
					api: {
						getAssetUsdUnitPrice: async () => 1000000000000000000n,
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
			// Second proposal with different credit amount
			{
				type: ProposalType.Elastic,
				params: {
					collateral: getMockToken(SupportedChain.Ethereum, collateralAddress),
					credit: getMockToken(SupportedChain.Ethereum, creditAddress),
					creditAmount: creditAmount * 2n,
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
					utilizedCreditId: generateAddress(),
					minCreditAmountPercentage: 3,
					relatedStrategyId: "1",
					isOffer: true,
				},
				deps: {
					api: {
						getAssetUsdUnitPrice: async () => 1000000000000000000n,
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
		];

		const proposals = await makeProposals(config, proposalParams, user);

		expect(proposals).toHaveLength(2);
		expect(contractMock.createMultiProposal).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalledTimes(2);

		// Verify first proposal
		expect(proposals[0].proposerSpecHash).toBe(proposerSpecHash);
		expect(proposals[0].collateralAddress).toBe(collateralAddress);
		expect(proposals[0].creditAddress).toBe(creditAddress);
		expect(proposals[0].availableCreditLimit).toBe(creditAmount);
		expect(proposals[0].minCreditAmount).toBe(3n * 10n ** (18n - 2n));
		expect(proposals[0].accruingInterestAPR).toBe(apr);
		expect(proposals[0].signature).toBe("0x456");
		expect(proposals[0].nonce).toBe(0n);

		// Verify second proposal
		expect(proposals[1].proposerSpecHash).toBe(proposerSpecHash);
		expect(proposals[1].collateralAddress).toBe(collateralAddress);
		expect(proposals[1].creditAddress).toBe(creditAddress);
		expect(proposals[1].availableCreditLimit).toBe(creditAmount * 2n);
		expect(proposals[1].minCreditAmount).toBe(3n * 2n * 10n ** (18n - 2n));
		expect(proposals[1].accruingInterestAPR).toBe(apr);
		expect(proposals[1].signature).toBe("0x456");
		expect(proposals[1].nonce).toBe(1n);
	});

	it("should create multiple chainlink proposals", async () => {
		const contractMock = {
			createProposal: vi.fn().mockImplementation((p) => p),
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			createOnChainProposal: vi.fn().mockImplementation((p) => p),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
			createMultiProposal: vi.fn().mockImplementation((proposals) =>
				proposals.map((p: Record<string, unknown>) => ({
					...p,
					signature: "0x456",
				})),
			),
		};

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const user = getMockUserWithNonceManager(user_address);
		const config = {} as Config;

		const proposalParams: ProposalParamWithDeps<ProposalType.ChainLink>[] = [
			{
				type: ProposalType.ChainLink,
				params: {
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
					utilizedCreditId: generateAddress(),
					minCreditAmountPercentage: 3,
					relatedStrategyId: "1",
					sourceOfFunds: null,
					isOffer: true,
				},
				deps: {
					api: {
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
			// Second proposal with different credit amount
			{
				type: ProposalType.ChainLink,
				params: {
					collateral: getMockToken(SupportedChain.Ethereum, collateralAddress),
					credit: getMockToken(SupportedChain.Ethereum, creditAddress),
					creditAmount: creditAmount * 2n,
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
					utilizedCreditId: generateAddress(),
					minCreditAmountPercentage: 3,
					relatedStrategyId: "1",
					sourceOfFunds: null,
					isOffer: true,
				},
				deps: {
					api: {
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
		];

		const proposals = await makeProposals(config, proposalParams, user);

		expect(proposals).toHaveLength(2);
		expect(contractMock.createMultiProposal).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalledTimes(2);

		// Verify first proposal
		expect(proposals[0].proposerSpecHash).toBe(proposerSpecHash);
		expect(proposals[0].collateralAddress).toBe(collateralAddress);
		expect(proposals[0].creditAddress).toBe(creditAddress);
		expect(proposals[0].availableCreditLimit).toBe(creditAmount);
		expect(proposals[0].minCreditAmount).toBe(3n * 10n ** (18n - 2n));
		expect(proposals[0].accruingInterestAPR).toBe(apr);
		expect(proposals[0].signature).toBe("0x456");
		expect(proposals[0].nonce).toBe(0n);

		// Verify second proposal
		expect(proposals[1].proposerSpecHash).toBe(proposerSpecHash);
		expect(proposals[1].collateralAddress).toBe(collateralAddress);
		expect(proposals[1].creditAddress).toBe(creditAddress);
		expect(proposals[1].availableCreditLimit).toBe(creditAmount * 2n);
		expect(proposals[1].minCreditAmount).toBe(3n * 2n * 10n ** (18n - 2n));
		expect(proposals[1].accruingInterestAPR).toBe(apr);
		expect(proposals[1].signature).toBe("0x456");
		expect(proposals[1].nonce).toBe(1n);

		// Verify ChainLink specific fields
		for (const proposal of proposals) {
			if (proposal instanceof ChainLinkProposal) {
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
			}
		}
	});

	it("should create chainlink proposals with minCreditAmount from strategy", async () => {
		const contractMock = {
			createProposal: vi.fn().mockImplementation((p) => p),
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			createOnChainProposal: vi.fn().mockImplementation((p) => p),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
			createMultiProposal: vi.fn().mockImplementation((proposals) =>
				proposals.map((p: Record<string, unknown>) => ({
					...p,
					signature: "0x456",
				})),
			),
		};

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const user = getMockUserWithNonceManager(user_address);
		const config = {} as Config;

		// Create a specific minCreditAmount for the credit token
		const specificMinCreditAmount = 5n * 10n ** 18n; // 5 tokens
		const creditToken = getMockToken(SupportedChain.Ethereum, creditAddress);

		const proposalParams: ProposalParamWithDeps<ProposalType.ChainLink>[] = [
			{
				type: ProposalType.ChainLink,
				params: {
					collateral: getMockToken(SupportedChain.Ethereum, collateralAddress),
					credit: creditToken,
					creditAmount,
					ltv: {
						[getUniqueCreditCollateralKey(
							creditToken,
							getMockToken(SupportedChain.Ethereum, collateralAddress),
						)]: Number(ltv),
					},
					apr: {
						[getUniqueCreditCollateralKey(
							creditToken,
							getMockToken(SupportedChain.Ethereum, collateralAddress),
						)]: apr,
					},
					duration: {
						days: durationDays,
						date: undefined,
					},
					expirationDays,
					utilizedCreditId: generateAddress(),
					minCreditAmountPercentage: 0,
					minCreditAmount: specificMinCreditAmount, // Use the specific minCreditAmount
					relatedStrategyId: "1",
					sourceOfFunds: null,
					isOffer: true,
				},
				deps: {
					api: {
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
			{
				type: ProposalType.ChainLink,
				params: {
					collateral: getMockToken(SupportedChain.Ethereum, collateralAddress2),
					credit: creditToken,
					creditAmount,
					ltv: {
						[getUniqueCreditCollateralKey(
							creditToken,
							getMockToken(SupportedChain.Ethereum, collateralAddress2),
						)]: Number(ltv),
					},
					apr: {
						[getUniqueCreditCollateralKey(
							creditToken,
							getMockToken(SupportedChain.Ethereum, collateralAddress2),
						)]: apr,
					},
					duration: {
						days: durationDays,
						date: undefined,
					},
					expirationDays,
					utilizedCreditId: generateAddress(),
					minCreditAmountPercentage: 0,
					minCreditAmount: specificMinCreditAmount, // Use the specific minCreditAmount
					relatedStrategyId: "1",
					sourceOfFunds: null,
					isOffer: true,
				},
				deps: {
					api: {
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
		];

		const proposals = await makeProposals(config, proposalParams, user);

		expect(proposals).toHaveLength(2);
		expect(contractMock.createMultiProposal).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalledTimes(1);

		// Verify that the proposal uses the specific minCreditAmount
		const proposal = proposals?.[0];
		expect(proposal.minCreditAmount).toBe(specificMinCreditAmount);
		expect(proposal.proposerSpecHash).toBe(proposerSpecHash);
		expect(proposal.collateralAddress).toBe(collateralAddress);
		expect(proposal.creditAddress).toBe(creditAddress);
		expect(proposal.availableCreditLimit).toBe(creditAmount);
		expect(proposal.accruingInterestAPR).toBe(apr);
		expect(proposal.signature).toBe("0x456");
		expect(proposal.nonce).toBe(0n);

		// Verify ChainLink specific fields
		if (proposal instanceof ChainLinkProposal) {
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
		}
	});

	it("should throw error for empty proposal params", async () => {
		const user = getMockUserWithNonceManager(user_address);
		const config = {} as Config;

		await expect(makeProposals(config, [], user)).rejects.toThrow(
			"Proposal params are required",
		);
	});

	it("should throw error for missing config", async () => {
		const user = getMockUserWithNonceManager(user_address);
		const proposalParams: ProposalParamWithDeps<ProposalType.Elastic>[] = [];

		await expect(
			makeProposals(undefined as unknown as Config, proposalParams, user),
		).rejects.toThrow("Config is required");
	});

	it("should throw error for unsupported proposal type", async () => {
		const user = getMockUserWithNonceManager(user_address);
		const config = {} as Config;

		const proposalParams = [
			{
				type: "UnsupportedType" as ProposalType,
				params: {
					proposalType: "UnsupportedType",
					credit: getMockToken(SupportedChain.Ethereum, creditAddress),
					collateral: getMockToken(SupportedChain.Ethereum, collateralAddress),
				},
				deps: {},
			},
		] as unknown as ProposalParamWithDeps<ImplementedProposalTypes>[];

		await expect(makeProposals(config, proposalParams, user)).rejects.toThrow(
			"Proposal type UnsupportedType not found",
		);
	});

	it("should create proposals with isOffer = false (requests)", async () => {
		const contractMock = {
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			createOnChainProposal: vi.fn().mockImplementation((p) => p),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
			createMultiProposal: vi.fn().mockImplementation((proposals) => {
				for (const proposal of proposals) {
					Object.assign(proposal, {
						signature: "0x456",
					});
				}
				return proposals;
			}),
			createProposal: vi.fn().mockImplementation((p) => p),
		};

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const user = getMockUserWithNonceManager(user_address);
		const config = {} as Config;

		const proposalParams: ProposalParamWithDeps<ProposalType.ChainLink>[] = [
			{
				type: ProposalType.ChainLink,
				params: {
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
					utilizedCreditId: generateAddress(),
					minCreditAmountPercentage: 3,
					relatedStrategyId: "1",
					isOffer: false, // This is a request, not an offer
					sourceOfFunds: null,
				},
				deps: {
					api: {
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
			{
				type: ProposalType.ChainLink,
				params: {
					collateral: getMockToken(SupportedChain.Ethereum, collateralAddress2),
					credit: getMockToken(SupportedChain.Ethereum, creditAddress),
					creditAmount,
					ltv: {
						[getUniqueCreditCollateralKey(
							getMockToken(SupportedChain.Ethereum, creditAddress),
							getMockToken(SupportedChain.Ethereum, collateralAddress2),
						)]: Number(ltv),
					},
					apr: {
						[getUniqueCreditCollateralKey(
							getMockToken(SupportedChain.Ethereum, creditAddress),
							getMockToken(SupportedChain.Ethereum, collateralAddress2),
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
					isOffer: false, // This is a request, not an offer
					sourceOfFunds: null,
				},
				deps: {
					api: {
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
		];

		const proposals = await makeProposals(config, proposalParams, user);

		expect(proposals).toHaveLength(2);
		expect(contractMock.createMultiProposal).toHaveBeenCalled();
		expect(loanContractMock.getLenderSpecHash).toHaveBeenCalledTimes(0);

		// @ts-expect-error - ProposalWithSignature is not assignable to ChainLinkProposal
		const proposal: Extract<ProposalWithSignature, ChainLinkProposal> =
			proposals[0];
		expect(proposal.proposerSpecHash).toBe(ZERO_FINGERPRINT);
		expect(proposal.collateralAddress).toBe(collateralAddress);
		expect(proposal.creditAddress).toBe(creditAddress);
		expect(proposal.availableCreditLimit).toBe(creditAmount);
		expect(proposal.minCreditAmount).toBe(3n * 10n ** (18n - 2n));
		expect(proposal.accruingInterestAPR).toBe(apr);
		expect(proposal.signature).toBe("0x456");
		expect(proposal.nonce).toBe(0n);
		expect(proposal.isOffer).toBe(false);

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
	});

	it("should fallback to makeProposal for single proposal", async () => {
		const contractMock = {
			createProposal: vi.fn().mockImplementation((p) => {
				return {
					...p,
					signature: "0x456",
				};
			}),
			getCollateralAmount: vi.fn().mockImplementation(() => 0n),
			getProposalHash: vi.fn().mockImplementation(() => "0x123"),
		};

		const loanContractMock = {
			getLenderSpecHash: vi
				.fn()
				.mockImplementation(() => Promise.resolve(proposerSpecHash)),
		};

		const user = getMockUserWithNonceManager(user_address);
		const config = {} as Config;

		const elasticParams: CreateElasticProposalParams = {
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
			utilizedCreditId: generateAddress(),
			minCreditAmountPercentage: 3,
			relatedStrategyId: "1",
			isOffer: true,
			sourceOfFunds: null,
		};

		const proposalParams: ProposalParamWithDeps<ProposalType.Elastic>[] = [
			{
				type: ProposalType.Elastic,
				params: elasticParams,
				deps: {
					api: {
						getAssetUsdUnitPrice: async () => 1000000000000000000n,
						persistProposal: vi.fn().mockImplementation((p) => p),
						persistProposals: vi.fn().mockImplementation((p) => p),
						updateNonces: vi.fn().mockImplementation((p) => p),
					},
					contract: contractMock,
					loanContract: loanContractMock,
				},
			},
		];

		const result = await makeProposals(config, proposalParams, user);

		const proposal = result[0] as ProposalWithSignature;

		expect(proposal).toBeDefined();
		expect(proposal.proposerSpecHash).toBe(proposerSpecHash);
		expect(proposal.collateralAddress).toBe(collateralAddress);
		expect(proposal.creditAddress).toBe(creditAddress);
		expect(proposal.availableCreditLimit).toBe(creditAmount);
		expect(proposal.minCreditAmount).toBe(3n * 10n ** (18n - 2n));
		expect(proposal.accruingInterestAPR).toBe(apr);
		expect(proposal.signature).toBe("0x456");
	});
});
