import React from "react";
import { Route, Redirect } from "react-router-dom";
import ManagerHome from "./Managers/Home";
import WFMHome from "./WFM/Home";



const ProtectedRoute = ({ children, ...rest }:any) => {
  const token= localStorage.getItem("token");
const usertype =  localStorage.getItem("usertype")
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token? usertype==="manager"?(
          <ManagerHome/>
        ):(<WFMHome/>) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
