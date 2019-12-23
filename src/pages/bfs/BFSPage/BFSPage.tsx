import React from "react";
import { RouteComponentProps } from "react-router";
import PageLayout from "layouts/PageLayout";

const BFSPage: React.FC<RouteComponentProps> = () => {
  return <PageLayout title="Поиск в ширину" />;
};

export default BFSPage;
