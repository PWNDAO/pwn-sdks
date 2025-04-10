import {
	PoolToken,
	SupportedChain,
	SupportedProtocol,
	generateAddress,
	getMockToken,
} from "@pwndao/sdk-core";
import { expect, vi } from "vitest";
import { issueApproval } from "./issue-approval.js";

describe("Test issue approval", async () => {
	const collateralAddress = generateAddress();
	const collateral = getMockToken(SupportedChain.Ethereum, collateralAddress);

	const creditAddress = generateAddress();
	const credit = getMockToken(SupportedChain.Ethereum, creditAddress);

	const owner = generateAddress();
	const spender = generateAddress();

	it("Should not issue approval as it's sufficient", async () => {
		const amount = BigInt(1 * 10 ** collateral.decimals);

		const deps = {
			issueAllowance: vi.fn(),
			readAllowance: vi.fn(async () => amount),
		};

		await issueApproval(collateral, spender, owner, deps, amount);

		expect(deps.readAllowance).toHaveBeenCalledWith(
			collateral,
			spender,
            owner
		);
		expect(deps.issueAllowance).not.toHaveBeenCalled();
	});

	it("Should not issue approval for pool token", async () => {
		const aTokenAddress = generateAddress();
		const aToken = new PoolToken(
			SupportedChain.Ethereum,
			aTokenAddress,
			credit.address,
			credit.decimals,
			SupportedProtocol.MORPHO,
		);
		const amount = BigInt(1 * 10 ** aToken.decimals);

		const deps = {
			issueAllowance: vi.fn(),
			readAllowance: vi.fn(async () => amount),
		};

		await issueApproval(aToken, spender, owner, deps, amount);

		expect(deps.readAllowance).toHaveBeenCalledWith(
			aToken,
			spender,
			owner,
		);
		expect(deps.issueAllowance).not.toHaveBeenCalled();
	});

	it("Should not issue approval for credit", async () => {
		const amount = BigInt(1 * 10 ** credit.decimals);

		const deps = {
			issueAllowance: vi.fn(),
			readAllowance: vi.fn(async () => amount),
		};

		await issueApproval(credit, spender, owner, deps, amount);

		expect(deps.readAllowance).toHaveBeenCalledWith(
			credit,
			spender,
			owner,
		);
		expect(deps.issueAllowance).not.toHaveBeenCalled();
	});

	it("Should issue approval for collateral", async () => {
		const amount = BigInt(1 * 10 ** collateral.decimals);

		const deps = {
			issueAllowance: vi.fn(),
			readAllowance: vi.fn(async () => amount),
		};

		await issueApproval(collateral, spender, owner, deps, amount + 1n);

		expect(deps.readAllowance).toHaveBeenCalledWith(
			collateral,
            spender,
			owner,
		);
		expect(deps.issueAllowance).toHaveBeenCalledWith(collateral, spender, owner, amount + 1n);
	});

    it("should issue approval for credit", async () => {
		const amount = BigInt(1 * 10 ** collateral.decimals);

		const deps = {
			issueAllowance: vi.fn(),
			readAllowance: vi.fn(async () => amount),
		};

		await issueApproval(credit, spender, owner, deps, amount + 1n);

		expect(deps.readAllowance).toHaveBeenCalledWith(
			credit,
            spender,
			owner,
		);
		expect(deps.issueAllowance).toHaveBeenCalledWith(credit, spender, owner, amount + 1n);
    })

    it("should issue approval for pool token", async () => {
		const amount = BigInt(1 * 10 ** collateral.decimals);
        const token = new PoolToken(SupportedChain.Ethereum, generateAddress(), credit.address, credit.decimals, SupportedProtocol.MORPHO)

		const deps = {
			issueAllowance: vi.fn(),
			readAllowance: vi.fn(async () => amount),
		};

		await issueApproval(token, spender, owner, deps, amount + 1n);

		expect(deps.readAllowance).toHaveBeenCalledWith(
			token,
            spender,
			owner,
		);
		expect(deps.issueAllowance).toHaveBeenCalledWith(token, spender, owner, amount + 1n);
    })
});
