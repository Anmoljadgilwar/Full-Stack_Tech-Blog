### Environmental

variables are used to store sensitive information such as database URIs, API keys, and secret key

---

In Appwrite, **Query** allow you to filter, sort, and search for documents stored in a database collection. Queries help you retrieve only the data you need instead of fetching everything.
✅ Filtering → equal(), contains(), greaterThan(), etc.
✅ Sorting → orderAsc(), orderDesc()
✅ Pagination → limit(), offset()
✅ Combining Queries → Pass multiple queries in an array

# RTE component

This React component, `RTE`, is a reusable **Rich Text Editor (RTE)** built using the **TinyMCE editor** and integrated with **react-hook-form** for form control. Let's break it down step by step:

### 1. **Imports**

- `React` for building the component.
- `Editor` from `@tinymce/tinymce-react` for the rich text editor functionality.
- `Controller` from `react-hook-form` to manage form state and integrate TinyMCE.

### 2. **Component Props**

- `name`: The name of the field (default is `"content"`).
- `control`: The control object from `react-hook-form` for managing form state.
- `label`: Optional label for the editor.
- `defaultValue`: Initial content for the editor (default is an empty string).

### 3. **Rendering**

- If a `label` is provided, it's displayed above the editor.
- `Controller` is used to connect TinyMCE with `react-hook-form`.
- Inside `Controller.render()`, the TinyMCE `Editor` component is configured.

### 4. **TinyMCE Configuration** (`init` object)

- `height: 500` → Sets the editor height to 500px.
- `menubar: true` → Enables the top menu bar.
- `plugins`: Includes features like image upload, lists, tables, code blocks, search, and word count.
- `toolbar`: Defines toolbar options (undo, redo, text formatting, alignment, lists, etc.).
- `content_style`: Sets the default font style inside the editor.

### 5. **Handling Editor Changes**

- `onEditorChange={onChange}` ensures that any changes in the editor update the form state.

### 6. **Exporting the Component**

- `export default RTE;` allows it to be imported and used in other files.

### **Usage Example**

```jsx
import { useForm } from "react-hook-form";
import RTE from "./RTE";

const MyForm = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RTE name="description" control={control} label="Description" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

Here, `RTE` is used inside a form, and its content is managed by `react-hook-form`.

### **Conclusion**

This component is a **customizable and form-integrated** rich text editor using **TinyMCE**. It allows users to format text, insert images, and manage content within a controlled form setup. 🚀
