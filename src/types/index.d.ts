import { AttestationConveyancePreference, PublicKeyCredentialType, COSEAlgorithmIdentifier, AuthenticatorAttachment, ResidentKeyRequirement, UserVerificationRequirement, AuthenticationExtensionsClientInputs, PublicKeyCredentialDescriptor } from "./dom";

export type GenerateRegistrationOptionsOpts = {
  rpID: string;
  userID: string;
  userDisplayName?: string;
  challenge?: string | Buffer;
  timeout?: number;
  attestationType?: AttestationConveyancePreference;
  excludeCredentials?: PublicKeyCredentialDescriptor[];
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  extensions?: AuthenticationExtensionsClientInputs
};

export interface PublicKeyCredentialParameters {
  type: PublicKeyCredentialType;
  alg: COSEAlgorithmIdentifier;
}

export interface AuthenticatorSelectionCriteria {
  residentKey?: ResidentKeyRequirement;
  authenticatorAttachment?: AuthenticatorAttachment;
  requireResidentKey?: boolean;
  userVerification?: UserVerificationRequirement;
}
