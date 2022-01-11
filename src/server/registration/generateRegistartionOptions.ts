import base64url from "base64url";
import generateChallenge from "../helpers/generateChallenge";
import type { GenerateRegistrationOptionsOpts, PublicKeyCredentialCreationOptionsJSON } from "types";

export const supportedCOSEAlgorithmIdentifiers: COSEAlgorithmIdentifier[] = [
  // ECDSA w/ SHA-256
  -7,
  // EdDSA
  -8,
  // ECDSA w/ SHA-512
  -36,
  // RSASSA-PSS w/ SHA-256
  -37,
  // RSASSA-PSS w/ SHA-384
  -38,
  // RSASSA-PSS w/ SHA-512
  -39,
  // RSASSA-PKCS1-v1_5 w/ SHA-256
  -257,
  // RSASSA-PKCS1-v1_5 w/ SHA-384
  -258,
  // RSASSA-PKCS1-v1_5 w/ SHA-512
  -259,
  // RSASSA-PKCS1-v1_5 w/ SHA-1 (Deprecated; here for legacy support)
  -65535,
];

const defaultSupportedAlgorithmIDs = supportedCOSEAlgorithmIdentifiers.filter(id => id !== -65535);

const defaultAuthenticatorSelection: AuthenticatorSelectionCriteria = {
  requireResidentKey: false,
  userVerification: 'preferred',
};

export default function generateRegistrationOptions(
  options: GenerateRegistrationOptionsOpts
): PublicKeyCredentialCreationOptionsJSON {
  const {
    rpID,
    rpName,
    userID,
    userName,
    userDisplayName,
    challenge = generateChallenge(),
    timeout = 60000,
    attestationType = "none",
    excludeCredentials = [],
    authenticatorSelection = defaultAuthenticatorSelection,
    extensions,
  } = options;

  const supportedAlgorithmIDs = defaultSupportedAlgorithmIDs
  const pubKeyCredParams: PublicKeyCredentialParameters[] = supportedAlgorithmIDs.map(id => ({
    alg: id,
    type: "public-key"
  }));

  if (authenticatorSelection.residentKey === 'required') {
    authenticatorSelection.requireResidentKey = true;
  } else {
    authenticatorSelection.requireResidentKey = false;
  }

  return {
    rp: {
      id: rpID,
      name: rpName
    },
    user: {
      id: userID,
      name: userName,
      displayName: userDisplayName
    },
    challenge: base64url.encode(challenge),
    pubKeyCredParams,
    timeout,
    excludeCredentials: excludeCredentials.map(cred => ({
      ...cred,
      id: base64url.encode(cred.id as Buffer)
    })),
    authenticatorSelection,
    attestation: attestationType,
    extensions
  }
}
