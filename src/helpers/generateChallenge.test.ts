import generateChallenge from "./generateChallenge";

test("return a buffer 32bytes", () => {
  const challenge = generateChallenge();
  expect(challenge.byteLength).toEqual(32); 
})

test("return random bytes on each execution", () => {
  const challenge1 = generateChallenge();
  const challenge2 = generateChallenge();

  expect(challenge1).not.toEqual(challenge2);
})
