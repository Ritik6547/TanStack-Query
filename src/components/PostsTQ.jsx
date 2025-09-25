import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const PostsTQ = () => {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts");
    },
    // staleTime: 1000 * 30,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    // cacheTime: 1000 * 60 * 10,
    enabled: false,
  });

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="post-list">
      <button onClick={refetch}>Fetch Posts</button>
      {data?.data.map((post) => {
        return (
          <Link to={`/tq-posts/${post.id}`} key={post.id}>
            <div className="post-item">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-body">{post.body}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostsTQ;
