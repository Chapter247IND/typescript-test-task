import React from "react";
import "scss/main.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
const HomePage = React.lazy(() => import("Pages/Home"));

function App() {
  return (
    <div className={"container"}>
      <BrowserRouter>
        <React.Suspense fallback={<>Loading...</>}>
          <Switch>
            <Route path={"/"} component={HomePage} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
