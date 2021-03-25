import waitFor from "./waitFor";

test("waitFor", async () => {
  const ts = Date.now();
  await waitFor(200);
  expect(Date.now() - ts).toBeGreaterThanOrEqual(200);
});
