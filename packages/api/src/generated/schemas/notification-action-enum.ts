/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */

/**
 * * `PROPOSAL_CREATED` - Offer created
 * `PROPOSAL_REVOKED` - Offer revoked
 * `PROPOSAL_UNAVAILABLE` - Offer become unavailable
 * `PROPOSAL_BACK_AVAILABLE` - Offer is back available
 * `LENDER_COMMITTED_TO_THESIS` - Lender committed funds to thesis
 * `LOAN_CREATED` - Loan created
 * `LOAN_PAID_BACK` - Loan paid back
 * `LOAN_PAYMENT_CLAIMED` - Loan payment claimed
 * `LOAN_COLLATERAL_CLAIMED` - Loan collateral claimed
 * `LOAN_DEFAULTED` - Loan defaulted
 * `LOAN_EXTENDED` - Loan extended
 * `LOAN_EXTENSION_REQUESTED` - Loan extension requested
 * `LOAN_EXTENSION_REQUEST_CANCELLED` - Loan extension request cancelled
 * `LOAN_EXTENSION_REQUEST_IGNORED` - Loan extension request ignored
 * `NEW_COUNTER_PROPOSAL` - New counter offer that you might be interested in
 * `THESIS_TERMS_CHANGED` - Thesis terms has been changed! you have to revoke your commitment and commit again with new terms
 * `FIRST_BORROWER_CLOSE_TO_DEFAULT` - Loan is getting close to default
 * `SECOND_BORROWER_CLOSE_TO_DEFAULT` - Loan is getting close to default
 * `APPROVAL_INSUFFICIENT` - Approval insufficient
 * `INFO` - Info
 * `REFERRAL_ASSIGNED` - Someone used your referral!
 * `REFERRAL_REWARDED` - You got a rep points for your referral!
 */
export type NotificationActionEnum =
	(typeof NotificationActionEnum)[keyof typeof NotificationActionEnum];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NotificationActionEnum = {
	PROPOSAL_CREATED: "PROPOSAL_CREATED",
	PROPOSAL_REVOKED: "PROPOSAL_REVOKED",
	PROPOSAL_UNAVAILABLE: "PROPOSAL_UNAVAILABLE",
	PROPOSAL_BACK_AVAILABLE: "PROPOSAL_BACK_AVAILABLE",
	LENDER_COMMITTED_TO_THESIS: "LENDER_COMMITTED_TO_THESIS",
	LOAN_CREATED: "LOAN_CREATED",
	LOAN_PAID_BACK: "LOAN_PAID_BACK",
	LOAN_PAYMENT_CLAIMED: "LOAN_PAYMENT_CLAIMED",
	LOAN_COLLATERAL_CLAIMED: "LOAN_COLLATERAL_CLAIMED",
	LOAN_DEFAULTED: "LOAN_DEFAULTED",
	LOAN_EXTENDED: "LOAN_EXTENDED",
	LOAN_EXTENSION_REQUESTED: "LOAN_EXTENSION_REQUESTED",
	LOAN_EXTENSION_REQUEST_CANCELLED: "LOAN_EXTENSION_REQUEST_CANCELLED",
	LOAN_EXTENSION_REQUEST_IGNORED: "LOAN_EXTENSION_REQUEST_IGNORED",
	NEW_COUNTER_PROPOSAL: "NEW_COUNTER_PROPOSAL",
	THESIS_TERMS_CHANGED: "THESIS_TERMS_CHANGED",
	FIRST_BORROWER_CLOSE_TO_DEFAULT: "FIRST_BORROWER_CLOSE_TO_DEFAULT",
	SECOND_BORROWER_CLOSE_TO_DEFAULT: "SECOND_BORROWER_CLOSE_TO_DEFAULT",
	APPROVAL_INSUFFICIENT: "APPROVAL_INSUFFICIENT",
	INFO: "INFO",
	REFERRAL_ASSIGNED: "REFERRAL_ASSIGNED",
	REFERRAL_REWARDED: "REFERRAL_REWARDED",
} as const;
