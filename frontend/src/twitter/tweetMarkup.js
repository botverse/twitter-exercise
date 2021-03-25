// really basic replacement of urls, @-mentions, and hashtags with links
function tweetMarkup(tweet) {
  const html = tweet.full_text
    .replace(/http(s?:\/\/\S+)/g, '<a href="http$1" target="_blank">http$1</a>')
    .replace(
      /@(\w+)/g,
      '<a href="https://twitter.com/$1" target="_blank">@$1</a>'
    )
    .replace(
      /#(\w+)/g,
      '<a href="https://twitter.com/hashtag/$1" target="_blank">#$1</a>'
    );
  return html;
}

export default tweetMarkup;
