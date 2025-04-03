import type { ThesisCreateUpdateSchemaRequestAprMax } from "./thesis-create-update-schema-request-apr-max";
import type { ThesisCreateUpdateSchemaRequestAprMin } from "./thesis-create-update-schema-request-apr-min";
import type { ThesisCreateUpdateSchemaRequestChainId } from "./thesis-create-update-schema-request-chain-id";
import type { ThesisCreateUpdateSchemaRequestCollateralAllocationPercentagesItem } from "./thesis-create-update-schema-request-collateral-allocation-percentages-item";
import type { ThesisCreateUpdateSchemaRequestCollateralAprsItem } from "./thesis-create-update-schema-request-collateral-aprs-item";
import type { ThesisCreateUpdateSchemaRequestCollateralLtvsItem } from "./thesis-create-update-schema-request-collateral-ltvs-item";
import type { ThesisCreateUpdateSchemaRequestCreditAprsItem } from "./thesis-create-update-schema-request-credit-aprs-item";
import type { ThesisCreateUpdateSchemaRequestCuratorName } from "./thesis-create-update-schema-request-curator-name";
import type { ThesisCreateUpdateSchemaRequestCustomAprCollateralAddresses } from "./thesis-create-update-schema-request-custom-apr-collateral-addresses";
import type { ThesisCreateUpdateSchemaRequestCustomAprCollateralChainIds } from "./thesis-create-update-schema-request-custom-apr-collateral-chain-ids";
import type { ThesisCreateUpdateSchemaRequestCustomAprCreditAddresses } from "./thesis-create-update-schema-request-custom-apr-credit-addresses";
import type { ThesisCreateUpdateSchemaRequestCustomAprCreditChainIds } from "./thesis-create-update-schema-request-custom-apr-credit-chain-ids";
import type { ThesisCreateUpdateSchemaRequestCustomAprValues } from "./thesis-create-update-schema-request-custom-apr-values";
import type { ThesisCreateUpdateSchemaRequestDescription } from "./thesis-create-update-schema-request-description";
import type { ThesisCreateUpdateSchemaRequestIsActive } from "./thesis-create-update-schema-request-is-active";
import type { ThesisCreateUpdateSchemaRequestIsHidden } from "./thesis-create-update-schema-request-is-hidden";
import type { ThesisCreateUpdateSchemaRequestIsUtilizedCredit } from "./thesis-create-update-schema-request-is-utilized-credit";
/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { ThesisCreateUpdateSchemaRequestLtv } from "./thesis-create-update-schema-request-ltv";
import type { ThesisCreateUpdateSchemaRequestMinAllowedBorrowPercentage } from "./thesis-create-update-schema-request-min-allowed-borrow-percentage";
import type { ThesisCreateUpdateSchemaRequestThesisType } from "./thesis-create-update-schema-request-thesis-type";

export interface ThesisCreateUpdateSchemaRequest {
	title: string;
	ltv: ThesisCreateUpdateSchemaRequestLtv;
	apr_min: ThesisCreateUpdateSchemaRequestAprMin;
	apr_max: ThesisCreateUpdateSchemaRequestAprMax;
	min_allowed_borrow_percentage: ThesisCreateUpdateSchemaRequestMinAllowedBorrowPercentage;
	loan_duration_days: number;
	proposal_expiration_days: number;
	description?: ThesisCreateUpdateSchemaRequestDescription;
	is_active?: ThesisCreateUpdateSchemaRequestIsActive;
	is_hidden?: ThesisCreateUpdateSchemaRequestIsHidden;
	is_utilized_credit?: ThesisCreateUpdateSchemaRequestIsUtilizedCredit;
	chain_id?: ThesisCreateUpdateSchemaRequestChainId;
	collateral_chain_ids: number[];
	collateral_contract_addresses: string[];
	collateral_allocation_percentages: ThesisCreateUpdateSchemaRequestCollateralAllocationPercentagesItem[];
	collateral_ltvs: ThesisCreateUpdateSchemaRequestCollateralLtvsItem[];
	collateral_aprs: ThesisCreateUpdateSchemaRequestCollateralAprsItem[];
	credit_chain_ids: number[];
	credit_contract_addresses: string[];
	credit_aprs: ThesisCreateUpdateSchemaRequestCreditAprsItem[];
	curator_name?: ThesisCreateUpdateSchemaRequestCuratorName;
	custom_apr_collateral_chain_ids?: ThesisCreateUpdateSchemaRequestCustomAprCollateralChainIds;
	custom_apr_collateral_addresses?: ThesisCreateUpdateSchemaRequestCustomAprCollateralAddresses;
	custom_apr_credit_chain_ids?: ThesisCreateUpdateSchemaRequestCustomAprCreditChainIds;
	custom_apr_credit_addresses?: ThesisCreateUpdateSchemaRequestCustomAprCreditAddresses;
	custom_apr_values?: ThesisCreateUpdateSchemaRequestCustomAprValues;
	thesis_type?: ThesisCreateUpdateSchemaRequestThesisType;
}
