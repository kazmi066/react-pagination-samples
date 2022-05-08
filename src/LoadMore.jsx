import { useEffect, useState, useCallback } from "react";
import Airline from "./components/Airline";
import Container from "./components/Container";
import PersonInfo from "./components/PersonInfo";

export default function LoadMore() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPassengers = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`
      );
      const passengers = await response.json();
      const data = passengers.data;
      setPeople([...people, ...data]);
      setLoading(false);
    };

    fetchPassengers();
  }, [page]);

  return (
    <main className="py-14 ">
      <Container>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {people &&
            people.map((person, index) => {
              return (
                <article
                  key={person._id}
                  className="mx-auto shadow-lg mb-14 pb-14"
                >
                  <PersonInfo name={person.name} trips={person.trips} />
                  <Airline person={person} />
                </article>
              );
            })}
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setPage(page + 1)}
            className="rounded-md text-md font-light shadow-lg border-2 px-4 py-2 mx-auto"
          >
            {loading ? "loading...." : "Load more"}
          </button>
        </div>
      </Container>
    </main>
  );
}
