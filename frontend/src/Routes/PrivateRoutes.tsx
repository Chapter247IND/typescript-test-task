import { LoadingOutlined } from "@ant-design/icons";
import { message as Toast, Spin } from "antd";
import Axios from "axios";
import FlightPage from "Pages/Flights";
import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
let tokenInterval: any = null;
// taking variable, to prevent unwanted re-renders
let isRefreshingToken = false;
const PrivateRoutes: React.FunctionComponent<any> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const refreshLoginToken = async () => {
    isRefreshingToken = true;
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_ENDPOINT}/users/refresh-token`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "expires",
        `${new Date(new Date().valueOf() + parseInt(data.expires)).valueOf()}`
      );
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      // prepare error message
      let message = "An error occure while completing your request.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }
      Toast.error(message);
      localStorage.removeItem("token");
      localStorage.removeItem("expires");
      setIsLoading(false);
      setIsLoggedIn(false);
    }
    isRefreshingToken = false;
  };
  useEffect(() => {
    if (!localStorage.token) {
      setIsLoading(false);
      setIsLoggedIn(false);
    } else {
      setIsLoading(false);
      setIsLoggedIn(true);
      tokenInterval = setInterval(() => {
        if (
          !isRefreshingToken &&
          parseInt(localStorage.expires) - new Date().valueOf() < 5000
        ) {
          refreshLoginToken();
        }
      }, 1000);
    }
    return () => {
      if (tokenInterval) {
        clearInterval(tokenInterval);
      }
    };
    //eslint-disable-next-line
  }, []);
  return (
    <>
      {isLoading ? (
        <div className='loader-box'>
          <Spin indicator={antIcon} />
        </div>
      ) : isLoggedIn ? (
        <Switch>
          <Route path='/' component={FlightPage} />
        </Switch>
      ) : (
        <Redirect to='/' />
      )}
    </>
  );
};

export default PrivateRoutes;
