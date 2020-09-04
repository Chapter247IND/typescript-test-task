import React from "react";
import "scss/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";

const HomePage = React.lazy(() => import("Pages/Home"));
const LoginPage = React.lazy(() => import("Pages/Login"));
const FlightsPage = React.lazy(() => import("Pages/Flights"));

function App() {
  return (
    <div className={"container"}>
      <BrowserRouter>
        <React.Suspense fallback={<>Loading...</>}>
          <Switch>
            <Route path={"/"} exact component={LoginPage} />
            <Route path={"/whether"} component={HomePage} />
            <Route path={"/flights"} component={FlightsPage} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
