import React from "react";
import "../styles/PostReview.css";
import { Button, Form, Card, CardImg } from "react-bootstrap";
import StarRating from "./StarRating";

function PostReview() {
  return (
    <Card className="post-review mb-5" style={{ width: "50em" }}>
      <Card.Body>
        <CardImg />
        <Card.Title>User Name</Card.Title>
        <StarRating />
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={5} placeholder="Leave A Review" />
          </Form.Group>
        </Form>
        <Button className="post-button" variant="success">
          Submit Review
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PostReview;
