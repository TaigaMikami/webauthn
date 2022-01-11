import base64URLStringToBuffer from "client/helpers/base64URLStringToBuffer";
import { browserSupportsWebAuthn } from "client/helpers/browserSupportsWebAuthn";
import toPublicKeyCredentialDescriptor from "client/helpers/toPublicKeyCredentialDescriptor";
import utf8StringToBuffer from "client/helpers/utf8StringToBuffer";
import { PublicKeyCredentialCreationOptionsJSON } from "types";

export default function startRegistration(
  optionsJson: PublicKeyCredentialCreationOptionsJSON
) {
  if (!browserSupportsWebAuthn()) {
    throw new Error("WebAuthn is not supported in this browser");
  }

  const publicKey: PublicKeyCredentialCreationOptions = {
    ...optionsJson,
    challenge: base64URLStringToBuffer(optionsJson.challenge),
    user: {
      ...optionsJson.user,
      id: utf8StringToBuffer(optionsJson.user.id)
    },
    excludeCredentials: optionsJson.excludeCredentials.map(toPublicKeyCredentialDescriptor)
  }
}
