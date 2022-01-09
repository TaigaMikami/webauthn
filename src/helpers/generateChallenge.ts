import crypto from "crypto";

export default function generateChallenge(): Buffer {
  return crypto.randomBytes(32);
}
