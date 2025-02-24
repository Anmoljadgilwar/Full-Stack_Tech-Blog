import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import "./App.css";

const App = () => {
  // console.log(import.meta.env.VITE_TECHBLOG_APPWRITE);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      authService
        .getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        })
        .finally()
    );
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {" "}
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
};

export default App;

//  <button onClick={() => setCount((val) => val + 1)}>
// count is {count}
// </button>
