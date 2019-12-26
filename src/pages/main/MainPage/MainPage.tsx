import React from "react";
import { RouteComponentProps } from "react-router";
import PageLayout from "layouts/PageLayout";
import { Redirect } from "react-router-dom";
import { ROUTE_MAIN } from "constants/routesNames";

const MainPage: React.FC<RouteComponentProps> = props => {
  return props.location.pathname === "/" ? (
    <Redirect to={ROUTE_MAIN} />
  ) : (
    <PageLayout title="Информатика - лабораторные работы" />
  );
};

export default MainPage;
