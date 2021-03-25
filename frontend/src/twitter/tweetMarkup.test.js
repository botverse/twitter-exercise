import tweetMarkup from "./tweetMarkup";
test("renders @, #, and links", () => {
  const tweet = {
    full_text: `Test @testuser #testtag http://example.com/test?a=1 https://example.com/test?a=1`,
  };
  const output = tweetMarkup(tweet);
  const expectedOutput = `Test <a href="https://twitter.com/testuser" target="_blank">@testuser</a> <a href="https://twitter.com/hashtag/testtag" target="_blank">#testtag</a> <a href="http://example.com/test?a=1" target="_blank">http://example.com/test?a=1</a> <a href="https://example.com/test?a=1" target="_blank">https://example.com/test?a=1</a>`;
  expect(output).toBe(expectedOutput);
});
