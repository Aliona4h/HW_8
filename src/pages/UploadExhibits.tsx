import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadExhibit } from "../api/exhibits";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UploadExhibit: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) setImage(files[0]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) return setError("Please select an image to upload.");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try {
      await uploadExhibit(formData);
      navigate("/");
    } catch {
      setError("Faild to upload. Please try again.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Upload New Exhibit</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Select Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write an exhibit description"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Upload Exhibit
        </Button>
      </Form>
    </Container>
  );
};

export default UploadExhibit;
