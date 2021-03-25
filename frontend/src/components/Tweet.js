import {
  Card,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { tweetMarkup } from "../twitter";
import "./Tweet.css";

function Tweet({ tweet }) {
  return (
    <Card className="tweet" key={tweet.id}>
      <CardBody>
        <CardTitle tag="h5">
          <span className="avatar-image">
            <img src={tweet.user.profile_image_url} alt="Avatar" />
          </span>
          <span className="username">{tweet.user.name}</span>
          <span className="verified">
            {tweet.user.verified ? (
              <i className="bi bi-check-circle-fill"></i>
            ) : null}
          </span>
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          @{tweet.user.screen_name}
        </CardSubtitle>
        <CardText
          dangerouslySetInnerHTML={{ __html: tweetMarkup(tweet) }}
        ></CardText>
        {tweet.entities.media?.map((media) => (
          <p key={media.id} className="tweet-image">
            {media.type === "photo" ? (
              <img src={media.media_url} alt="Media" />
            ) : null}
          </p>
        ))}
        <CardText>{new Date(tweet.created_at).toLocaleString()}</CardText>
        <Row className="counters">
          <Col>
            <i className="bi bi-heart"></i>
            {tweet.favorite_count}
          </Col>
          <Col>
            <i className="bi bi-arrow-repeat"></i>
            {tweet.retweet_count}
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default Tweet;
