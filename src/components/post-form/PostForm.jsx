import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = () => {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

    const navigate = useNavigate();
    const userData = useSelector(state=>state.user.userData);

    const submit = async (data) => {
      if (post) {
         data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

         if(file){   
            appwriteService.deleteFile(post.featuredImage)
         };
         
         const dpPost = await appwriteService.updatePost(post.$id,{...data,
         featuredImage: file ? file.$id : undefined 

         
         });
         if(dbPost){
            navigate(`/post/${dbPost.$id}`)
         }else{
         const file = await appwriteService.uploadFile(data.image[0]);

         if(file){
            const fileId = file.$id;
            data.featureImage = fileId;
            await appwriteService.createPost(data);
         }
         }
    }
         

  return <div>PostForm</div>;
};

export default PostForm;
