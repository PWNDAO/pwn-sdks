import type { PassportProfile } from "./passport-profile";
import type { PassportSocial } from "./passport-social";
import type { PassportUser } from "./passport-user";
/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * OpenAPI spec version: 0.0.0
 */
import type { TalentPassportLastCalculatedAt } from "./talent-passport-last-calculated-at";
import type { TalentPassportMainWallet } from "./talent-passport-main-wallet";
import type { TalentPassportMainWalletChangedAt } from "./talent-passport-main-wallet-changed-at";
import type { TalentPassportPassportId } from "./talent-passport-passport-id";

/**
 * Schema for OpenAPI documentation
 */
export interface TalentPassport {
	activityScore: number;
	calculatingScore: boolean;
	createdAt: string;
	humanCheckmark: boolean;
	identityScore: number;
	lastCalculatedAt?: TalentPassportLastCalculatedAt;
	mainWallet?: TalentPassportMainWallet;
	mainWalletChangedAt?: TalentPassportMainWalletChangedAt;
	merged: boolean;
	nominationsReceivedCount: number;
	passportId: TalentPassportPassportId;
	passportProfile: PassportProfile;
	passportSocials: PassportSocial[];
	pendingKyc: boolean;
	score: number;
	skillsScore: number;
	socialsCalculatedAt: string;
	user: PassportUser;
	verified: boolean;
	verifiedWallets: string[];
}
