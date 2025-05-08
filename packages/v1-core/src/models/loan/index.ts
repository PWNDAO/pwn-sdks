import type { SupportedChain } from "@pwndao/sdk-core";

export class Loan {
    constructor(
        public loanId: bigint,
        public chainId: SupportedChain,
    ) {

    }

}