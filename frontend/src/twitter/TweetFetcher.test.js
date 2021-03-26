import fetchMock from "jest-fetch-mock";
import TweetFetcher from "./TweetFetcher";

fetchMock.enableMocks();
beforeEach(() => {
  fetchMock.resetMocks();
});

test("getTweets calls fetch once", async () => {
  fetch.mockResponseOnce(JSON.stringify([{ id: 1 }, { id: 2 }]));

  const fetcher = new TweetFetcher();

  let result = await fetcher.getTweets("alice");
  expect(result).toEqual([{ id: 1 }, { id: 2 }]);
  expect(fetch).toHaveBeenCalledWith("/alice");

  fetchMock.resetMocks();
  // if we call fetch again this should fail
  result = await fetcher.getTweets("alice");
  expect(result).toEqual([{ id: 1 }, { id: 2 }]);

  fetch.mockResponseOnce(JSON.stringify([{ id: 3 }, { id: 4 }]));

  result = await fetcher.getTweets("doorknob");
  expect(result).toEqual([{ id: 3 }, { id: 4 }]);

  fetchMock.resetMocks();
  // if we call fetch again this should fail
  result = await fetcher.getTweets("alice");
  expect(result).toEqual([{ id: 1 }, { id: 2 }]);
});

test("moreTweets calls fetch again", async () => {
  fetch.mockResponseOnce(JSON.stringify([{ id_str: "4" }, { id_str: "3" }]));
  fetch.mockResponseOnce(
    JSON.stringify([{ id_str: "3" }, { id_str: "2" }, { id_str: "1" }])
  );

  const fetcher = new TweetFetcher();

  let result = await fetcher.getTweets("alice");
  expect(result).toEqual([{ id_str: "4" }, { id_str: "3" }]);
  expect(fetch).toHaveBeenCalledWith("/alice");

  result = await fetcher.moreTweets("alice");
  expect(result).toEqual([
    { id_str: "4" },
    { id_str: "3" },
    { id_str: "2" },
    { id_str: "1" },
  ]);
  expect(fetch).toHaveBeenCalledWith("/alice?max_id=3");

  // getTweets gets the cumulative tweets we have so far
  fetch.resetMocks();
  result = await fetcher.getTweets("alice");
  expect(result).toEqual([
    { id_str: "4" },
    { id_str: "3" },
    { id_str: "2" },
    { id_str: "1" },
  ]);
});
