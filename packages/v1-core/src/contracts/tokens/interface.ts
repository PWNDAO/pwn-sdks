import type { AddressString, BaseAsset } from "@pwndao/sdk-core";

export interface IApprovableToSpend {
    readAllowance(
        token: BaseAsset,
        spender: AddressString,
        owner: AddressString,
    ): Promise<bigint>

    issueAllowance(
        token: BaseAsset,
        spender: AddressString,
        owner: AddressString,
        amount: bigint,
    ): Promise<void>
}