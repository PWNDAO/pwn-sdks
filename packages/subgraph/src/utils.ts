import { Asset, AssetContract, AssetCategory, Account } from "../generated/schema"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"

// Helper function to create or get Asset entity
export function getOrCreateAsset(contractAddress: Bytes, tokenId: BigInt, category: i32): Asset {
  const assetId = contractAddress.concat(Bytes.fromByteArray(Bytes.fromBigInt(tokenId)))
  let asset = Asset.load(assetId)
  
  if (asset == null) {
    let assetContract = AssetContract.load(contractAddress)
    if (assetContract == null) {
      // Create or get the category
      let categoryEntity = AssetCategory.load(Bytes.fromI32(category))
      if (categoryEntity == null) {
        categoryEntity = new AssetCategory(Bytes.fromI32(category))
        categoryEntity.save()
      }
      
      assetContract = new AssetContract(contractAddress)
      assetContract.category = categoryEntity.id
      assetContract.save()
    }
    
    asset = new Asset(assetId)
    asset.contract = assetContract.id
    asset.tokenId = tokenId
    asset.save()
  }
  
  return asset
}

// Helper function to create or get Account entity
export function getOrCreateAccount(address: Bytes): Account {
  let account = Account.load(address)
  if (account == null) {
    account = new Account(address)
    account.save()
  }
  return account
}

// Helper function to extract proposal parameters for function calls
// This removes the "proposal_" prefix from field names
export function extractProposalParams(proposalEvent: any): Map<string, any> {
  const params = new Map<string, any>()
  
  // Common parameters (available in all proposal types)
  if (proposalEvent.proposal_collateralCategory !== undefined) params.set("collateralCategory", proposalEvent.proposal_collateralCategory)
  if (proposalEvent.proposal_collateralAddress !== undefined) params.set("collateralAddress", proposalEvent.proposal_collateralAddress)
  if (proposalEvent.proposal_collateralId !== undefined) params.set("collateralId", proposalEvent.proposal_collateralId)
  if (proposalEvent.proposal_collateralAmount !== undefined) params.set("collateralAmount", proposalEvent.proposal_collateralAmount)
  if (proposalEvent.proposal_checkCollateralStateFingerprint !== undefined) params.set("checkCollateralStateFingerprint", proposalEvent.proposal_checkCollateralStateFingerprint)
  if (proposalEvent.proposal_collateralStateFingerprint !== undefined) params.set("collateralStateFingerprint", proposalEvent.proposal_collateralStateFingerprint)
  if (proposalEvent.proposal_creditAddress !== undefined) params.set("creditAddress", proposalEvent.proposal_creditAddress)
  if (proposalEvent.proposal_creditAmount !== undefined) params.set("creditAmount", proposalEvent.proposal_creditAmount)
  if (proposalEvent.proposal_availableCreditLimit !== undefined) params.set("availableCreditLimit", proposalEvent.proposal_availableCreditLimit)
  if (proposalEvent.proposal_utilizedCreditId !== undefined) params.set("utilizedCreditId", proposalEvent.proposal_utilizedCreditId)
  if (proposalEvent.proposal_fixedInterestAmount !== undefined) params.set("fixedInterestAmount", proposalEvent.proposal_fixedInterestAmount)
  if (proposalEvent.proposal_accruingInterestAPR !== undefined) params.set("accruingInterestAPR", proposalEvent.proposal_accruingInterestAPR)
  if (proposalEvent.proposal_durationOrDate !== undefined) params.set("durationOrDate", proposalEvent.proposal_durationOrDate)
  if (proposalEvent.proposal_expiration !== undefined) params.set("expiration", proposalEvent.proposal_expiration)
  if (proposalEvent.proposal_allowedAcceptor !== undefined) params.set("allowedAcceptor", proposalEvent.proposal_allowedAcceptor)
  if (proposalEvent.proposal_proposer !== undefined) params.set("proposer", proposalEvent.proposal_proposer)
  if (proposalEvent.proposal_proposerSpecHash !== undefined) params.set("proposerSpecHash", proposalEvent.proposal_proposerSpecHash)
  if (proposalEvent.proposal_isOffer !== undefined) params.set("isOffer", proposalEvent.proposal_isOffer)
  if (proposalEvent.proposal_refinancingLoanId !== undefined) params.set("refinancingLoanId", proposalEvent.proposal_refinancingLoanId)
  if (proposalEvent.proposal_nonceSpace !== undefined) params.set("nonceSpace", proposalEvent.proposal_nonceSpace)
  if (proposalEvent.proposal_nonce !== undefined) params.set("nonce", proposalEvent.proposal_nonce)
  if (proposalEvent.proposal_loanContract !== undefined) params.set("loanContract", proposalEvent.proposal_loanContract)
  
  // Type-specific parameters
  if (proposalEvent.proposal_collateralIdsWhitelistMerkleRoot !== undefined) params.set("collateralIdsWhitelistMerkleRoot", proposalEvent.proposal_collateralIdsWhitelistMerkleRoot)
  if (proposalEvent.proposal_creditPerCollateralUnit !== undefined) params.set("creditPerCollateralUnit", proposalEvent.proposal_creditPerCollateralUnit)
  if (proposalEvent.proposal_minCreditAmount !== undefined) params.set("minCreditAmount", proposalEvent.proposal_minCreditAmount)
  if (proposalEvent.proposal_feedIntermediaryDenominations !== undefined) params.set("feedIntermediaryDenominations", proposalEvent.proposal_feedIntermediaryDenominations)
  if (proposalEvent.proposal_feedInvertFlags !== undefined) params.set("feedInvertFlags", proposalEvent.proposal_feedInvertFlags)
  if (proposalEvent.proposal_loanToValue !== undefined) params.set("loanToValue", proposalEvent.proposal_loanToValue)
  if (proposalEvent.proposal_token0Denominator !== undefined) params.set("token0Denominator", proposalEvent.proposal_token0Denominator)
  if (proposalEvent.proposal_acceptorController !== undefined) params.set("acceptorController", proposalEvent.proposal_acceptorController)
  if (proposalEvent.proposal_acceptorControllerData !== undefined) params.set("acceptorControllerData", proposalEvent.proposal_acceptorControllerData)
  if (proposalEvent.proposal_tokenAAllowlist !== undefined) params.set("tokenAAllowlist", proposalEvent.proposal_tokenAAllowlist)
  if (proposalEvent.proposal_tokenBAllowlist !== undefined) params.set("tokenBAllowlist", proposalEvent.proposal_tokenBAllowlist)
  
  return params
} 