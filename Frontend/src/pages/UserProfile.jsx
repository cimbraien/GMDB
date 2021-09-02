import React from "react";
import { Card, ListGroup, Container, Col, Row } from "react-bootstrap";

function UserProfile() {
  return (
    <div>
      <h1>Hello, User</h1>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>Your Name</ListGroup.Item>
                <ListGroup.Item>Your Email</ListGroup.Item>
                <ListGroup.Item>Your Review</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "18rem" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>Your Name</ListGroup.Item>
                <ListGroup.Item>Your Email</ListGroup.Item>
                <ListGroup.Item>Your Review</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserProfile;
