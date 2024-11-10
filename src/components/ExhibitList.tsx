import React, { useEffect, useState } from "react";
import { Container, Alert, Spinner } from "react-bootstrap";
import ExhibitCard from "./ExhibitCard";
import Pagination from "./Pagination";
import { fetchExhibits } from "../api/exhibits";
import { useSelector } from "react-redux";
import { Exhibit } from "../types/types";

const ExhibitList: React.FC = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const loadExhibits = async () => {
      setLoading(true);
      try {
        const { data, lastPage } = await fetchExhibits(currentPage);
        setExhibits(data);
        setLastPage(lastPage);
      } catch (error) {
        setError("Failed to load exhibits");
      } finally {
        setLoading(false);
      }
    };
    loadExhibits();
  }, [currentPage]);

  return (
    <Container
      className="my-5 d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <span className="ms-3">Loading...</span>
        </div>
      ) : (
        <>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {exhibits.map((exhibit) => (
              <ExhibitCard
                key={exhibit.id}
                exhibit={exhibit}
                user={user}
                onRemove={() => {}}
              />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Container>
  );
};

export default ExhibitList;
