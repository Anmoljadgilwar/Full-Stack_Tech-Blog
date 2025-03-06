import React from "react";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE editor component
import { Controller } from "react-hook-form"; // Import Controller from react-hook-form for form handling

// Rich Text Editor (RTE) component
const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <div className="w-full">
      {/* Display label if provided */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* Use react-hook-form Controller to manage form state */}
      <Controller
        name={name || "content"} // Default name if not provided
        control={control} // Form control object from react-hook-form
        render={({ field: { onChange } }) => {
          return (
            <Editor
              initialValue={defaultValue} // Set default value in the editor
              init={{
                height: 500, // Editor height in pixels
                menubar: true, // Show menu bar

                // List of enabled plugins
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],

                // Toolbar buttons for editor functions
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",

                // Custom styling for the editor content
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              // Handle content change and update form state
              onEditorChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};

export default RTE; // Export the RTE component
