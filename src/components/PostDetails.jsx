import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchPostDetails = (postId) => {
  return axios.get(`http://localhost:4000/posts/${postId}`);
};

const PostDetails = () => {
  const { postId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostDetails(postId),
  });

  if (isLoading) {
    return <div>Page is Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="post-details-container">
      <div className="post-details-title">{data?.data.title}</div>
      <div className="post-details-body">{data?.data.body}</div>
    </div>
  );
};

export default PostDetails;
