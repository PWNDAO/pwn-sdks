/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { UserProfileSerializerAuthenticatedRequestEmail } from "./user-profile-serializer-authenticated-request-email";

export interface UserProfileSerializerAuthenticatedRequest {
	description?: string;
	/** @maxLength 19 */
	discord_user_id?: string;
	email?: UserProfileSerializerAuthenticatedRequestEmail;
	is_email_verified?: boolean;
}
