import React from "react";
import { hot } from "react-hot-loader/root";

import "antd/dist/antd.css";
import "styles/main.sass";

import DefaultLayout from "./layouts/DefaultLayout";
import { Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import pagesRoutes from "routes/pagesRoutes";
import PageRoute from "routes/PageRoute";
import Helmet from "react-helmet";

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet defaultTitle="МАИ Информатика" titleTemplate="%s" />
      <Router history={browserHistory}>
        <DefaultLayout>
          <Switch>
            {pagesRoutes.map(route => (
              <PageRoute key={route.path} {...route} />
            ))}
          </Switch>
        </DefaultLayout>
      </Router>
    </React.Fragment>
  );
};

export default hot(App);
