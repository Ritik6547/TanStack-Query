import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const fetchPosts = () => {
  return axios.get("http://localhost:4000/posts");
};

const addPost = (post) => {
  return axios.post("http://localhost:4000/posts", post);
};

const PostsTQ = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // staleTime: 1000 * 30,
    // refetchInterval: 1000,
    // refetchIntervalInBackground: true,
    // cacheTime: 1000 * 60 * 10,
    // enabled: false,
  });

  const { mutate: addPostMutation } = useMutation({
    mutationFn: addPost,
    onSuccess: (newData) => {
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["posts"], (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, newData.data],
        };
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    const post = { title, body };
    addPostMutation(post);
    setTitle("");
    setBody("");
  };

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="post-list">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Enter post title"
        />
        <input
          onChange={(e) => setBody(e.target.value)}
          type="text"
          value={body}
          placeholder="Enter post body"
        />
        <button type="submit">Post</button>
      </form>
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
      {/* <button onClick={refetch}>Fetch Posts</button> */}
    </div>
  );
};

export default PostsTQ;
