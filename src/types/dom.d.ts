export declare type AttestationConveyancePreference = "direct" | "enterprise" | "indirect" | "none";
// references https://www.w3.org/TR/webauthn/#enumdef-attestationconveyancepreference

export interface AuthenticationExtensionsClientInputs {
  appid?: string;
  appidExclude?: string;
  credProps?: boolean;
  uvm?: boolean;
}

export interface PublicKeyCredentialDescriptor {
  id: BufferSource;
  transports?: AuthenticatorTransport[];
  type: PublicKeyCredentialType;
}

export declare type PublicKeyCredentialType = "public-key";
export declare type COSEAlgorithmIdentifier = number;
export declare type AuthenticatorAttachment = "cross-platform" | "platform";
export declare type AuthenticatorTransport = "ble" | "internal" | "nfc" | "usb";
export declare type UserVerificationRequirement = "discouraged" | "preferred" | "required";
export declare type ResidentKeyRequirement = "discouraged" | "preferred" | "required";
export declare type BufferSource = ArrayBufferView | ArrayBuffer;
