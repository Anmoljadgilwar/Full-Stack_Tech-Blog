// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { Provider } from "react-redux";
// import store from "./store/store.js";
// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { AuthLayout, Login } from "./components/index.js";

// import Home from "./pages/Home.jsx";
// import AddPost from "./pages/AddPostPage";
// import Signup from "./pages/SignupPage";
// import EditPost from "./pages/EditPost";
// import Post from "./pages/Post";
// import AllPosts from "./pages/AllPosts";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthLayout authentication={true}>
//             <Login />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/signup",
//         element: (
//           <AuthLayout authentication={true}>
//             <Signup />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/all-posts",
//         element: (
//           <AuthLayout authentication>
//             <AllPosts />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/add-post",
//         element: (
//           <AuthLayout authentication>
//             <AddPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/edit-post/:slug",
//         element: (
//           <AuthLayout authentication>
//             <EditPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </React.StrictMode>
// );

//
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, Login } from "./components/index.js";

import Home from "./pages/Home.jsx";
import AddPost from "./pages/AddPostPage";
import Signup from "./pages/SignupPage";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={true}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={true}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          // Changed: Explicitly set authentication to true
          <AuthLayout authentication={true}>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          // Changed: Explicitly set authentication to true
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          // Changed: Explicitly set authentication to true
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ],
  },
]);

// Added: Try-catch block for error handling
try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
} catch (error) {
  // Added: Error logging
  console.error("Error rendering the application:", error);
}
