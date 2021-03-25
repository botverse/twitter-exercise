import Tweet from "./Tweet";

function Tweets({ tweets }) {
  return tweets.map((tweet) => <Tweet tweet={tweet} key={tweet.id_str} />);
}

export default Tweets;
