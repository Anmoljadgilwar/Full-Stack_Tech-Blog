import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config2";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  // State to store the post data
  const [post, setPost] = useState(null);
  // State to handle the loading state
  const [loading, setLoading] = useState(true);
  // Get the slug (post ID) from the URL parameters
  const { slug } = useParams();
  // Hook for navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // Fetch the post data using the slug
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) {
            setPost(post); // Set post data if found
          } else {
            navigate("/"); // Redirect to home if post is not found
          }
          setLoading(false); // Stop loading once request is complete
        })
        .catch(() => {
          navigate("/"); // Redirect if there's an error fetching the post
        });
    } else {
      navigate("/"); // Redirect if slug is missing
    }
  }, [slug, navigate]);

  // Show a loading message while the post data is being fetched
  if (loading) {
    return <p className="text-center py-10">Loading post...</p>;
  }

  // Render the form if post data is available
  return post ? (
    <div className="py-10">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
