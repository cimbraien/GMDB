import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getReview } from "../store/actions/review";
import { addReview } from "../store/actions/submitReview";
import "../styles/PostReview.css";
import { Button, Form, Card } from "react-bootstrap";
import StarRating from "./StarRating";
import ChangeReview from "./ChangeReview";
import { useParams } from "react-router-dom";

function AllReview({ ...props }) {
  const { idMovie } = props;
  const dispatch = useDispatch();
  const { review, loading } = useSelector((state) => state.reducerReview);
  const [reviews, setReviews] = useState("");
  const [rating, setRating] = useState(0.0);
  const [headline, setHeadline] = useState("");
  const currentUser = useSelector((state) => state.reducerUser.user.data);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getReview(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const token = localStorage.getItem("Token");
  useEffect(() => {
    dispatch(getReview(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeInput = (e) => {
    setReviews(e.target.value);
  };
  const onSubmitReview = async (e) => {
    e.preventDefault();
    if (reviews) {
      await dispatch(
        addReview(
          {
            id,
            token,
            reviews: reviews,
            isDone: false,
            rating,
            headline,
          },
          (response) => {
            if (response.data.code === 201) {
              dispatch(getReview(idMovie));
            }
          }
        )
      );
    }
  };
  const ratingInput = (rate) => {
    setRating(rate);
  };
  return (
    <div>
      <div className="card-review">
        {currentUser ? (
          <Card className="post-review" style={{ width: "100%" }}>
            <Card.Body>
              <Card.Title>{currentUser?.username}</Card.Title>
              <StarRating
                name="main-rating"
                value={rating}
                setValue={ratingInput}
              />
              <Form className="m-3" onSubmit={onSubmitReview}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    onChange={(e) => setHeadline(e.target.value)}
                    value={headline}
                    // as="text"
                    rows={3}
                    placeholder="Headline"
                  />
                  <Form.Control
                    onChange={changeInput}
                    value={reviews}
                    as="textarea"
                    rows={5}
                    placeholder="Leave A Review"
                  />
                </Form.Group>
                <Button type="submit" className="post-button" variant="success">
                  Submit Review
                </Button>
              </Form>
            </Card.Body>
          </Card>
        ) : null}
      </div>
      <div className="list-review">
        <h3>All Reviews </h3>
        <div className="review-item">
          {loading
            ? "loading..."
            : review.map((item, index) => {
                return (
                  <div key={index}>
                    <Card className="m-3">
                      <Card.Header>{item?.user?.username}</Card.Header>
                      <Card.Header>{item?.headline}</Card.Header>
                      <Card.Body>
                        <Card.Title>{item?.rating}</Card.Title>
                        <Card.Text>{item?.content}</Card.Text>
                        {currentUser && currentUser?.id === item?.user?.id ? (
                          <ChangeReview
                            id={item.id}
                            headline={item.headline}
                            content={item.content}
                            rating={item.rating}
                          />
                        ) : null}
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default AllReview;
