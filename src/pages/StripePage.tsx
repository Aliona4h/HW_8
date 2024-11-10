import React from "react";
import ExhibitList from "../components/ExhibitList";
import { Container } from "react-bootstrap";

const StripePage: React.FC = () => {
  return (
    <Container className="my-5">
      <ExhibitList />
    </Container>
  );
};

export default StripePage;
