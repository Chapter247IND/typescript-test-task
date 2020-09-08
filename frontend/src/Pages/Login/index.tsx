import { message as Toast } from "antd";
import Axios from "axios";
import LoginForm, { ILoginUser } from "Components/Login/LoginForm";
import React, { useState } from "react";
import { useHistory } from "react-router";

const LoginPage = () => {
  const history = useHistory();
  if (localStorage.token) {
    history.push("/flights");
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onLogin = async (user: ILoginUser) => {
    setIsLoading(true);
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/users/login`,
        user
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "expires",
        `${new Date(new Date().valueOf() + parseInt(data.expires)).valueOf()}`
      );
      Toast.success("Logged in successfully!");
      history.push("/flights");
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
    }
    setIsLoading(false);
  };
  return (
    <div className='login-box'>
      <LoginForm onLogin={onLogin} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;
