import React from "react";
import { RouteComponentProps } from "react-router";
import PageLayout from "layouts/PageLayout";
import InitialValuesForm from "pages/tablesandcharts/TablesAndCharts/InitialValuesForm/InitialValuesForm";

const TablesAndCharts: React.FC<RouteComponentProps> = () => {
  return (
    <PageLayout title="Таблицы и графики">
      <div>Алгоритм нахождения корня n-ной степени</div>
      <InitialValuesForm />
    </PageLayout>
  );
};

export default TablesAndCharts;
