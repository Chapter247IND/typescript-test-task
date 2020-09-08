import React from "react";
import "scss/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const HomePage = React.lazy(() => import("Pages/Home"));
const LoginPage = React.lazy(() => import("Pages/Login"));
const PrivateRoutes = React.lazy(() => import("Routes/PrivateRoutes"));
// can be converted to new component
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
  return (
    <div className={"container"}>
      <BrowserRouter>
        <React.Suspense
          fallback={
            <div className='loader-box'>
              <Spin indicator={antIcon} />
            </div>
          }>
          <Switch>
            <Route path={"/"} exact component={LoginPage} />
            <Route path={"/whether"} component={HomePage} />
            <Route path={"/flights"} component={PrivateRoutes} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
