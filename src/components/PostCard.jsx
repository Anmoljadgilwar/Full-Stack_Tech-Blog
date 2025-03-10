import React from "react";
import appwriteService from "../appwrite/config2";
import { Link } from "react-router-dom";

//appwrite
const PostCard = ({ $id, title, featuredImage }) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full rounded-xl bg-gray-100 p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePrevew(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
