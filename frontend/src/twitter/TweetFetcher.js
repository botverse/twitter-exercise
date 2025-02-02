// a fetcher / cache for tweets
class TweetFetcher {
  nameToTweetsMap = {};
  async fetchTweets(username, maxId = "") {
    let url = `/${username}`;
    if (maxId !== "") {
      url = `${url}?max_id=${maxId}`;
    }
    try {
      const response = await fetch(url);
      const tweets = await response.json();
      let existingTweets = this.nameToTweetsMap[username];
      if (!existingTweets) {
        this.nameToTweetsMap[username] = existingTweets = [];
      }
      // filter out the max_id matching the last element;
      if (
        maxId !== "" &&
        existingTweets.length > 0 &&
        tweets.length > 0 &&
        existingTweets[existingTweets.length - 1].id_str === tweets[0].id_str
      ) {
        tweets.shift();
      }
      // mutate to trigger update
      this.nameToTweetsMap[username] = existingTweets = [
        ...existingTweets,
        ...tweets,
      ];
      return existingTweets;
    } catch (e) {
      console.error(e);
      throw new Error(`Could not fetch tweets for ${username}`);
    }
  }

  async getTweets(username) {
    const tweets = this.nameToTweetsMap[username];
    if (tweets) {
      return tweets;
    }
    return await this.fetchTweets(username);
  }

  async moreTweets(username) {
    const tweets = this.nameToTweetsMap[username];
    if (!tweets) {
      return this.getTweets(username);
    }
    return await this.fetchTweets(username, this.getOldestId(username));
  }

  getOldestId(username) {
    const tweets = this.nameToTweetsMap[username];
    if (!tweets) {
      return "0";
    }
    return tweets[tweets.length - 1].id_str;
  }
}

export default TweetFetcher;
