import React from "react";
import { hot } from "react-hot-loader/root";

import "antd/dist/antd.css";
import DefaultLayout from "./layouts/DefaultLayout";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={browserHistory}>
      <DefaultLayout />
    </Router>
  );
};

export default hot(App);
