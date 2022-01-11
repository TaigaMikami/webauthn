import generateRegistrationOptions from "./generateRegistartionOptions";
jest.mock("../helpers/generateChallenge");

test ("generate credential request optios suitable for sending", () => {
  const rpID = "webauthn.example";
  const userID = "123456789";
  const userDisplayName = "TaigaMikami";
  const timeout = 1;
  const attestationType = "indirect";

  const options = generateRegistrationOptions({
    rpID,
    userID,
    userDisplayName,
    challenge: "randomrandomrandome",
    timeout,
    attestationType
  });

  expect(options).toEqual({
    rp: {
      id: rpID
    },
    user: {
      id: userID,
      displayName: userDisplayName
    },
    challenge: "cmFuZG9tcmFuZG9tcmFuZG9tZQ",
    pubKeyCredParams: [
      { alg: -7, type: 'public-key' },
      { alg: -8, type: 'public-key' },
      { alg: -36, type: 'public-key' },
      { alg: -37, type: 'public-key' },
      { alg: -38, type: 'public-key' },
      { alg: -39, type: 'public-key' },
      { alg: -257, type: 'public-key' },
      { alg: -258, type: 'public-key' },
      { alg: -259, type: 'public-key' }
    ],
    timeout,
    attestation: attestationType,
    excludeCredentials: [],
    authenticatorSelection: {
      requireResidentKey: false,
      userVerification: 'preferred',
    }
  })
})

test('should generate a challenge if one is not provided', () => {
  const options = generateRegistrationOptions({
    rpID: 'not.real',
    userID: '1234'
  });

  // base64url-encoded 16-byte buffer from mocked `generateChallenge()`
  expect(options.challenge).toEqual('AQIDBAUGBwgJCgsMDQ4PEA');
});
