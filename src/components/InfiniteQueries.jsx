import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const fetchFruits = ({ pageParam }) => {
  return axios.get(`http://localhost:4000/fruits?_limit=12&_page=${pageParam}`);
};

const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["fruits"],
    queryFn: fetchFruits,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (allPages.length < 5) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="container">
      {data?.pages.map((page) => {
        return page?.data.map((item) => {
          return (
            <div key={item.id} className="fruit-item">
              {item.name}
            </div>
          );
        });
      })}
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};

export default InfiniteQueries;
