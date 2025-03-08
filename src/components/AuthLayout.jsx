import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  // useEffect(() => {
  //   if (authentication && !authStatus !== authentication) {
  //     navigate("/login");
  //   } else if (!authentication && authStatus !== authentication) {
  //     navigate("/");
  //   }
  //   setLoader(false);
  // }, [authStatus, navigate, authentication]);

  //
  // In Easy way 1
  // if (authStatus === true) {
  //   navigate("/");
  // }else if(authStatus === false){
  //   navigate("/login");
  // }

  //In Easy way2
  useEffect(() => {
    if (authentication !== authStatus) {
      navigate(authentication ? "/" : "/login");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  //easy way 3
  //let authValue = authStatus === true ? true : false;

  return loader ? <h1>Loading... </h1> : <> {children} </>;
}
