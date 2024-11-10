import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";

const Pagination: React.FC<{
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, lastPage, onPageChange }) => {
  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
        </Col>
        <Col xs="auto" className="d-flex align-items-center">
          <span>
            Page {currentPage} of {lastPage}
          </span>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Pagination;
