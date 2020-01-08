import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import PageLayout from "layouts/PageLayout";
import InitialValuesForm from "pages/tablesandcharts/TablesAndCharts/InitialValuesForm/InitialValuesForm";
import ComputationalTable from "pages/tablesandcharts/TablesAndCharts/ComputationalTable";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { NumberRoot } from "models/excel";
import {
  createColumnDefs,
  createRowData,
  randomDataSet
} from "helpers/helpers";

const rowsCount = 8;
const stepsToFinish = 8;
const rDataSet = randomDataSet(rowsCount, 0.2, 50);

const TablesAndCharts: React.FC<RouteComponentProps> = () => {
  const [form, setForm] = useState<WrappedFormUtils>();

  const diagram: NumberRoot = {
    variable: 125,
    exponent: 3
  };

  const colDef = createColumnDefs(stepsToFinish);

  const rData = createRowData(rowsCount, colDef, diagram, rDataSet);

  const [rowData, setRowData] = useState<any>(rData);

  const processButtonHandler = () => {
    if (form && form.isFieldsTouched()) {
      const qq = createRowData(
        rowsCount,
        colDef,
        form.getFieldsValue(),
        rDataSet
      );
      setRowData(qq);
    }
  };

  return (
    <PageLayout title="Таблицы и графики">
      <div>Алгоритм нахождения корня n-ной степени</div>
      <InitialValuesForm diagram={diagram} onInit={setForm} />
      <ComputationalTable
        rowsCount={rowsCount}
        stepsToFinish={stepsToFinish}
        diagram={diagram}
        colDef={colDef}
        newRowData={rowData}
      />
    </PageLayout>
  );
};

export default TablesAndCharts;
