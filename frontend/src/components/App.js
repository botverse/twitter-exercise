import "./App.css";
import { useState, useEffect, useRef } from "react";
import { TweetFetcher } from "../twitter";
import { Container, Row, Col, Navbar, Nav, NavItem } from "reactstrap";
import LoadScroller from "./LoadScroller";
import ErrorLabel from "./ErrorLabel";
import Tweets from "./Tweets";
import UsernameSelector from "./UsernameSelector";

const STARTING_USERNAMES = ["@POTUS", "@elonmusk"];

const tweetFetcherSingle = new TweetFetcher();

function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tweets, setTweets] = useState([]);

  const usernameRef = useRef(username);
  const loadingRef = useRef(loading);

  const onScrolled = () => {
    if (loadingRef.current || !usernameRef.current) {
      return;
    }

    setLoading(true);
    fetchMore();
  };

  const fetchMore = async () => {
    try {
      const newestTweets = await tweetFetcherSingle.moreTweets(
        usernameRef.current
      );
      setTweets(newestTweets);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTweets = async (username) => {
    try {
      const tweets = await tweetFetcherSingle.getTweets(username);
      setTweets(tweets);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onNameChange = (selecteValue) => {
    setUsername(selecteValue);
  };

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    usernameRef.current = username;
    setTweets([]);
    setError(null);

    if (username === "") {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchTweets(username);
  }, [username]);

  return (
    <div className="App">
      <Navbar className="nav" fixed="top">
        <Nav>
          <NavItem>
            <UsernameSelector
              usernames={STARTING_USERNAMES}
              onChange={onNameChange}
            />
          </NavItem>
        </Nav>
      </Navbar>
      <Container className="results">
        <Row>
          <Col>
            <ErrorLabel error={error} />
          </Col>
        </Row>
        <Row className="tweets">
          <Col>
            <Tweets tweets={tweets} />
          </Col>
        </Row>
        <Row>
          <Col>
            <LoadScroller onScrolledTo={onScrolled} loading={loading} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
