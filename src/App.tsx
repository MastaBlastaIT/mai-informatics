import { hot } from "react-hot-loader/root";
import React from "react";

import "antd/dist/antd.css";
import "styles/main.sass";

import DefaultLayout from "./layouts/DefaultLayout";
import { HashRouter, Switch, Route } from "react-router-dom";
import pagesRoutes from "routes/pagesRoutes";
import PageRoute from "routes/PageRoute";
import Helmet from "react-helmet";
import MainPage from "pages/main/MainPage";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet defaultTitle="МАИ Информатика" titleTemplate="%s" />
      <HashRouter basename="/" hashType="noslash">
        <DefaultLayout>
          <Route exact key="/" path="/" component={MainPage} />
          <Switch>
            {pagesRoutes.map(route => (
              <PageRoute key={route.path} {...route} />
            ))}
          </Switch>
        </DefaultLayout>
      </HashRouter>
    </React.Fragment>
  );
};

export default hot(App);
