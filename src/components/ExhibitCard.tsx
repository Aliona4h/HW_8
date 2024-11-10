import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import CommentStripe from "./CommentStripe";
import axiosInstance from "../api/axiosInstance";

type ExhibitCardProps = {
  exhibit: any;
  user: any;
  onRemove: (exhibitId: string) => void;
};

const ExhibitCard: React.FC<ExhibitCardProps> = ({ exhibit, user }) => {
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleComments = () => setIsCommentsExpanded(!isCommentsExpanded);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const userInitial = exhibit.user?.username
    ? exhibit.user.username.charAt(0).toUpperCase()
    : "U";

  return (
    <>
      <Card className="mb-4" style={{ maxWidth: "500px" }}>
        <Card.Body className="d-flex align-items-center">
          <div
            className="user-avatar"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#007bff",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.2em",
              marginRight: "10px",
            }}
          >
            {userInitial}
          </div>

          <div>
            <strong>{exhibit.user?.username || "Unknown User"}</strong>
            <div className="text-muted">
              {new Date(exhibit.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              {new Date(exhibit.createdAt).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
          </div>
        </Card.Body>

        <div>
          <Card.Img
            variant="top"
            src={`${axiosInstance.defaults.baseURL}${exhibit.imageUrl}`}
            alt={exhibit.description}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              cursor: "pointer",
              display: "block",
              marginBottom: "15px",
            }}
            onClick={handleShowModal}
          />
        </div>

        <Card.Body>
          <Card.Title>{exhibit.description}</Card.Title>
          <Button onClick={toggleComments}>
            {isCommentsExpanded ? <ChevronUp /> : <ChevronDown />} Comments
          </Button>
        </Card.Body>
        {isCommentsExpanded && <CommentStripe exhibitId={exhibit.id} />}
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={`${axiosInstance.defaults.baseURL}${exhibit.imageUrl}`}
            alt={exhibit.description}
            style={{ width: "100%", height: "auto" }}
          />
          <p className="mt-3">{exhibit.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ExhibitCard;
