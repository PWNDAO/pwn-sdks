/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */

/**
 * * `error` - Error
 * `danger` - Warning
 * `success` - Success
 * `info` - Info
 * `pending` - Pending
 */
export type NotificationTypeEnum =
	(typeof NotificationTypeEnum)[keyof typeof NotificationTypeEnum];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const NotificationTypeEnum = {
	error: "error",
	danger: "danger",
	success: "success",
	info: "info",
	pending: "pending",
} as const;
