// Import necessary dependencies
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index"; // Custom form components
import appwriteService from "../../appwrite/config2"; // Appwrite service for backend interactions
import { useNavigate } from "react-router-dom"; // For navigating between routes
import { useSelector } from "react-redux"; // To access user data from Redux store

// Define the PostForm component
const PostForm = () => {
  // Initialize the form with default values using React Hook Form
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      // Default form values; uses post data if available, otherwise empty strings or default status
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  // Get the navigate function for routing
  const navigate = useNavigate();

  // Retrieve user data from the Redux store
  const userData = useSelector((state) => state.user.userData);

  // Define the form submission handler
  const submit = async (data) => {
    // Check if editing an existing post
    if (post) {
      // Upload a new image if provided
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      // Delete the old featured image if a new one is uploaded
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      // Update the post with new data
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      // Navigate to the updated post's page if successful
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      } else {
        // This block seems unnecessary and might be a bug.
        // It attempts to create a new post if updating fails, but it doesn't handle the case correctly.
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featureImage = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <>
      {/* Form to create or update a post */}
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        {/* Left section: Title, Slug, and Content fields */}
        <div className="w-2/3 px-2">
          {/* Title input field */}
          <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
          />

          {/* Slug input field - automatically transforms based on the title */}
          <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />

          {/* Rich Text Editor for post content */}
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* Right section: Image upload, status selection, and submit button */}
        <div className="w-1/3 px-2">
          {/* File input for uploading a featured image */}
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })} // Required if creating a new post
          />

          {/* Display the current featured image when editing a post */}
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}

          {/* Dropdown select for post status (active/inactive) */}
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />

          {/* Submit button: changes color if updating an existing post */}
          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined} // Green button for updating
            className="w-full"
          >
            {post ? "Update" : "Submit"} {/* Text changes based on action */}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PostForm;
