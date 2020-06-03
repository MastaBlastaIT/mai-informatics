import { hot } from "react-hot-loader/root";
import { createBrowserHistory } from "history";
import React from "react";

import "antd/dist/antd.css";
import "styles/main.sass";

import DefaultLayout from "./layouts/DefaultLayout";
import { Switch, Route, Router } from "react-router-dom";
import pagesRoutes from "routes/pagesRoutes";
import PageRoute from "routes/PageRoute";
import Helmet from "react-helmet";
import MainPage from "pages/MainPage";

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet defaultTitle="МАИ Информатика" titleTemplate="%s" />
      <Router history={browserHistory}>
        <DefaultLayout>
          <Route exact key="/" path="/" component={MainPage} />
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
