import axios from "axios";
import { useEffect, useState } from "react";

const PostsPlain = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");
      setPosts(res.data);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>Error has occurred...</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => {
        return (
          <div className="post-item" key={post.id}>
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostsPlain;
