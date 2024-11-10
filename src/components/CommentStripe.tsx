import React, { useState, useEffect } from "react";
import { Button, Form, ListGroup, Alert } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { addComment, fetchComments, deleteComment } from "../api/comments";
import { Comment } from "../types/types";
import { getUserProfile } from "../api/userAction";
import { useNavigate } from "react-router-dom";

interface CommentStripeProps {
  exhibitId: string;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ exhibitId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("User is not authenticated, delete functionality limited.");
      return;
    }

    const fetchUserId = async () => {
      try {
        const user = await getUserProfile();
        setUserId(user.id);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserId(null);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const data = await fetchComments(exhibitId);
        setComments(data);
      } catch {
        setError("Failed to fetch comments.");
      }
    };
    fetchCommentsData();
  }, [exhibitId]);

  const handleAddComment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in to add a comment.");
      navigate("/login");
      return;
    }

    if (!newComment.trim()) {
      return setError("Comment cannot be empty.");
    }

    try {
      const data = await addComment(exhibitId, newComment);
      setComments((prev) => [...prev, data]);
      setNewComment("");
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Failed to add comment:", error.message);
        setError("Failed to add comment.");
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(exhibitId, commentId);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch {
      setError("Failed to delete comment.");
    }
  };

  return (
    <div className="mt-4">
      <ListGroup className="mt-3">
        {comments.map((comment) => {
          const isOwner = userId === comment.user?.id;

          return (
            <ListGroup.Item
              key={comment.id}
              className="d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{comment.user?.username ?? "Anonymous"}:</strong>{" "}
                {comment.text}
              </span>

              {isOwner && (
                <Button
                  variant="cc-danger"
                  style={{ display: "inline-flex", alignItems: "center" }}
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  <Trash size={16} />
                </Button>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      <Form className="mt-3">
        <Form.Control
          as="input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <Button
          variant="primary"
          className="mt-2 w-100"
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </Form>
    </div>
  );
};

export default CommentStripe;
