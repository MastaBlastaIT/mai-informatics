import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import PageLayout from "layouts/PageLayout";
import { NumberRoot, TableRow } from "models/excel";
import TablesAndChartsService from "services/TablesAndChartsService";
import Loading from "components/Loading";
import ComputationalTable from "pages/tablesandcharts/TablesAndCharts/ComputationalTable";
import {
  createColumnDefs,
  toInitialsArray,
  toNum,
  toNumberRoot
} from "helpers/helpers";
import InitialValuesForm from "pages/tablesandcharts/TablesAndCharts/InitialValuesForm/InitialValuesForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { ColDef } from "ag-grid-community";

let initialForm: NumberRoot = {
  variable: 729,
  exponent: 3,
  cols_count: 6
};

const TablesAndCharts: React.FC<RouteComponentProps> = () => {
  const [form, setForm] = useState<WrappedFormUtils>();
  const [tableRows, setTabeRows] = useState<TableRow[]>([]);
  const [rowsCount, setRowsCount] = useState<number>(0);
  const [diagram, setDiagram] = useState<NumberRoot>(initialForm);
  const [colDef, setColDef] = useState<Array<ColDef>>([{}]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    TablesAndChartsService.getTableRows({
      cols_count: initialForm.cols_count,
      variable: initialForm.variable,
      exponent: initialForm.exponent
    }).then(rows => {
      if (unmounted) {
        return;
      }
      setTabeRows(rows.table_rows);
      setRowsCount(rows.rows_count);
      setColDef(createColumnDefs(initialForm.cols_count));
      setLoading(false);
    });
    return () => {
      unmounted = true;
    };
  }, []);

  const handleSubmit = () => {
    form &&
      form.validateFields(errors => {
        if (errors) {
          return null;
        }
        setLoading(true);
        const formFields = form.getFieldsValue();
        TablesAndChartsService.getTableRows({
          variable: toNum(formFields.variable),
          exponent: toNum(formFields.exponent),
          cols_count: toNum(formFields.cols_count),
          initials_array: toInitialsArray(tableRows)
        }).then(rows => {
          setDiagram(toNumberRoot(formFields));
          setTabeRows(rows.table_rows);
          setRowsCount(rows.rows_count);
          setColDef(createColumnDefs(toNum(formFields.cols_count)));
          form.resetFields();
          setLoading(false);
        });
        return 1;
      });
  };

  return (
    <PageLayout title="Таблицы и графики">
      <div>Алгоритм нахождения корня n-ной степени</div>
      <div
        style={{
          fontSize: 11.5,
          color: "red"
        }}
      >
        Строка нач. предположений редактируется
      </div>
      <InitialValuesForm
        diagram={diagram}
        onInit={setForm}
        handleSubmit={handleSubmit}
      />

      {(() => {
        if (loading) {
          return <Loading />;
        }
        return (
          <ComputationalTable
            rowsCount={rowsCount}
            diagram={diagram}
            colDef={colDef}
            rowData={tableRows}
            handleSubmit={handleSubmit}
            form={form}
          />
        );
      })()}
    </PageLayout>
  );
};

export default TablesAndCharts;
