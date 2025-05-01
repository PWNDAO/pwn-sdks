import type { ExtractAbiFunction } from "abitype";
import type { AbiParameterToPrimitiveType } from "viem";
import type {
	pwnSimpleLoanDutchAuctionProposalAbi,
	pwnSimpleLoanElasticChainlinkProposalAbi,
	pwnSimpleLoanElasticProposalAbi,
	pwnSimpleLoanListProposalAbi,
	pwnSimpleLoanSimpleProposalAbi,
	pwnSimpleLoanUniswapV3LPSetProposalAbi,
} from "./generated.js";

// V1.3
type _V1_3SimpleLoanDutchAuctionProposalEncodeFn = ExtractAbiFunction<
	typeof pwnSimpleLoanDutchAuctionProposalAbi,
	"encodeProposalData"
>;
export type V1_3SimpleLoanDutchAuctionProposalStruct =
	AbiParameterToPrimitiveType<
		_V1_3SimpleLoanDutchAuctionProposalEncodeFn["inputs"][0]
	>;

type _V1_3SimpleLoanSimpleProposalEncodeFn = ExtractAbiFunction<
	typeof pwnSimpleLoanSimpleProposalAbi,
	"encodeProposalData"
>;
export type V1_3SimpleLoanSimpleProposalStruct = AbiParameterToPrimitiveType<
	_V1_3SimpleLoanSimpleProposalEncodeFn["inputs"][0]
>;

type _V1_3SimpleLoanListProposalEncodeFn = ExtractAbiFunction<
	typeof pwnSimpleLoanListProposalAbi,
	"encodeProposalData"
>;
export type V1_3SimpleLoanListProposalStruct = AbiParameterToPrimitiveType<
	_V1_3SimpleLoanListProposalEncodeFn["inputs"][0]
>;

type _V1_3SimpleLoanElasticProposalEncodeFn = ExtractAbiFunction<
	typeof pwnSimpleLoanElasticProposalAbi,
	"encodeProposalData"
>;
export type V1_3SimpleLoanElasticProposalStruct = AbiParameterToPrimitiveType<
	_V1_3SimpleLoanElasticProposalEncodeFn["inputs"][0]
>;

type _V1_3SimpleLoanElasticChainlinkProposalEncodeFn = ExtractAbiFunction<
	typeof pwnSimpleLoanElasticChainlinkProposalAbi,
	"encodeProposalData"
>;
export type V1_3SimpleLoanElasticChainlinkProposalStruct =
	AbiParameterToPrimitiveType<
		_V1_3SimpleLoanElasticChainlinkProposalEncodeFn["inputs"][0]
	>;

type _V1_4SimpleLoanUniswapV3LpSetProposalEncodeFn = ExtractAbiFunction<
	typeof pwnSimpleLoanUniswapV3LPSetProposalAbi[0],
	"encodeProposalData"
>;
export type V1_4SimpleLoanUniswapV3LpSetProposalStruct = AbiParameterToPrimitiveType<
	_V1_4SimpleLoanUniswapV3LpSetProposalEncodeFn["inputs"][0]
>;