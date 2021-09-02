import { Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import StarRating from "./StarRating";
import { useDispatch } from "react-redux";
import { changeReview } from "../store/actions/changeReview";
import { getReview } from "../store/actions/review";

function Example(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState(props.content);
  const [rating, setRating] = useState(props.rating);
  const [headline, setHeadline] = useState(props.headline);

  const ratingInput = (rate) => {
    setRating(rate);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = { content: reviews, headline, rating };
    setShow(false);
    if (reviews) {
      dispatch(changeReview({ id: props.id, isDone: false, ...data }));
      dispatch(getReview());
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Change Review
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change My Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <StarRating
              name="second-rating"
              value={rating}
              setValue={ratingInput}
            />
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                onChange={(e) => setHeadline(e.target.value)}
                value={headline}
                rows={3}
                placeholder="Headline"
              />
              <Form.Control
                onChange={(e) => setReviews(e.target.value)}
                value={reviews}
                as="textarea"
                rows={5}
                placeholder="Leave A Review"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
