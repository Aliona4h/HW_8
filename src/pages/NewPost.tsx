import React from "react";
import UploadExhibit from "./UploadExhibits";
import { Container, Row, Col, Card } from "react-bootstrap";

const NewPost: React.FC = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg">
            <Card.Body>
              <Card.Title className="text-center mb-3">
                Create a New Post
              </Card.Title>
              <UploadExhibit />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NewPost;
