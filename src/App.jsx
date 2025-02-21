import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";

const App = () => {
  // console.log(import.meta.env.VITE_TECHBLOG_APPWRITE);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      AuthService.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login({ userData }));
          } else {
            dispatch(logout());
          }
        })
        .finally()
    );
  }, [dispatch]);

  return (
    <>
      <h1>A blog App in Appwrite</h1>
    </>
  );
  return !loading ? (
    <div className="App bg-orange-400">
      <h1>A blog App in Appwrite</h1>
    </div>
  ) : (
    <div>Loading</div>
  );
};

export default App;

//  <button onClick={() => setCount((val) => val + 1)}>
// count is {count}
// </button>
