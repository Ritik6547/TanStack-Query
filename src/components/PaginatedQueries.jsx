import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const fetchFruits = (pageId) => {
  return axios.get(`http://localhost:4000/fruits?_limit=5&_page=${pageId}`);
};

const PaginatedQueries = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["fruits", page],
    queryFn: () => fetchFruits(page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container">
      {data?.data.map((item) => {
        return (
          <div key={item.id} className="fruit-label">
            {item.name}
          </div>
        );
      })}
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1 ? true : false}>
        Prev Page
      </button>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page === 12 ? true : false}>
        Next Page
      </button>
    </div>
  );
};

export default PaginatedQueries;
