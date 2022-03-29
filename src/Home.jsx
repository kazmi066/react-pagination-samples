import { useEffect, useState, useCallback } from "react";
import Airline from "./components/Airline";
import Container from "./components/Container";
import PersonInfo from "./components/PersonInfo";
import Pagination from "./components/Pagination";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  // For the pagination
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const incrementPage = () => {
    setPage(page + 1);
    if (page + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const decrementPage = () => {
    setPage(page - 1);
    if ((page - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    if (page - 1 === 0) {
      return null;
    }
  };

  useEffect(() => {
    const fetchPassengers = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`
      );
      const passengers = await response.json();
      const data = passengers.data;
      setPeople([...data]);
      setLoading(false);
    };

    fetchPassengers();
  }, [page]);

  // To be fetched from Server (TotalPages)
  const totalPages = 20;

  return (
    <main className="py-14 ">
      <Container>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {loading ? (
            <div className="text-2xl font-bold text-center pt-14">
              Loading...
            </div>
          ) : (
            people.map((person, index) => (
              <article
                key={person._id}
                className="mx-auto shadow-lg mb-14 pb-14"
              >
                <PersonInfo name={person.name} trips={person.trips} />
                <Airline person={person} />
              </article>
            ))
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          pageSize={pageSize}
          page={page}
          changePage={changePage}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          pageNumberLimit={pageNumberLimit}
          minPageNumberLimit={minPageNumberLimit}
          maxPageNumberLimit={maxPageNumberLimit}
        />
      </Container>
    </main>
  );
}
