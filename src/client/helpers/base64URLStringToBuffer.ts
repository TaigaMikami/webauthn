import base64url from "base64url";

export default function base64URLStringToBuffer(base64URLString: string): ArrayBuffer {
  return base64url.toBuffer(base64URLString)
}
