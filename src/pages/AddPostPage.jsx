import React from "react";
import PostForm from "../components/post-form/PostForm";
import { Container } from "../components";

const AddPostPage = () => {
  return (
    <div className="py-10">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default AddPostPage;
