import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserPosts, removeExhibit } from "../api/exhibits";
import { Alert, Button, Card, Container, Row, Col } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

const MyPosts: React.FC = () => {
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const currentUser = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const loadMyPosts = async () => {
      try {
        const posts = await fetchUserPosts();
        setMyPosts(posts);
      } catch (error) {
        setErrorMessage("Failed to load posts.");
      }
    };

    loadMyPosts();
  }, [currentUser]);

  const handlePostRemoval = async (postId: string) => {
    try {
      await removeExhibit(postId);
      setMyPosts(myPosts.filter((post) => post.id !== postId));
    } catch (error) {
      setErrorMessage("Failed to remove post.");
    }
  };

  return (
    <Container className="mt-4">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Row xs={1} sm={2} md={3} className="g-4">
        {myPosts.map((post) => (
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
                  Post ID: {post.id}
                </Card.Title>
                <Card.Text>{post.description}</Card.Text>
                <Card.Text>
                  <small className="text-muted">
                    Posted by: {post.user.username}
                  </small>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button
                  variant="outline-danger"
                  onClick={() => handlePostRemoval(post.id)}
                >
                  Delete Post
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyPosts;
