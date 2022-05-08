import { useEffect, useState, useCallback, useRef } from "react";
import Airline from "./components/Airline";
import Container from "./components/Container";
import PersonInfo from "./components/PersonInfo";

export default function InfiniteScroll() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const handleLastPersonElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, pageSize]
  );

  const fetchPassengers = async () => {
    setLoading(true);
    const response = await fetch(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${pageSize}`
    );
    const passengers = await response.json();
    const data = passengers.data;
    setHasMore(data.length > 0);
    setPeople([...people, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    if (page <= 20) {
      fetchPassengers();
    }
  }, [page]);

  return (
    <main className="py-14 ">
      <Container>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {people.map((person, index) => {
            if (people.length === index + 1) {
              return (
                <article
                  ref={handleLastPersonElement}
                  key={person._id}
                  className="mx-auto shadow-lg mb-14 pb-14"
                >
                  <PersonInfo name={person.name} trips={person.trips} />
                  <Airline person={person} />
                </article>
              );
            } else {
              return (
                <article
                  key={person._id}
                  className="mx-auto shadow-lg mb-14 pb-14"
                >
                  <PersonInfo name={person.name} trips={person.trips} />
                  <Airline person={person} />
                </article>
              );
            }
          })}
        </div>
        <div className="flex items-center justify-center">
          {loading && (
            <button
              onClick={() => setPage(page + 1)}
              className="rounded-md text-md font-light shadow-lg border-2 px-4 py-2 mx-auto"
            >
              loading....
            </button>
          )}
        </div>
      </Container>
    </main>
  );
}
