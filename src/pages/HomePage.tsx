import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchAllExhibits } from "../api/exhibits";
import { Alert, Card, Container, Row, Col } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

const HomePage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadAllPosts = async () => {
      try {
        const posts = await fetchAllExhibits();
        setAllPosts(posts);
      } catch (error) {
        setErrorMessage("Failed to load posts.");
      }
    };

    loadAllPosts();
  }, []);

  return (
    <Container className="mt-4">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {allPosts.map((post) => (
          <Col key={post.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`${axiosInstance.defaults.baseURL}${post.imageUrl}`}
                alt={post.description}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="text-primary">
                  {post.description}
                </Card.Title>
                <Card.Text>
                  <small className="text-muted">
                    Posted by: {post.user.username}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
