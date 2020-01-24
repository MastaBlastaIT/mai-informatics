import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import PageLayout from "layouts/PageLayout";
import { LineColors, NumberRoot, TableData } from "models/excel";
import TablesAndChartsService from "services/TablesAndChartsService";
import Loading from "components/Loading";
import ComputationalTable from "pages/tablesandcharts/TablesAndCharts/ComputationalTable";
import { createColumnDefs, toInitialsArray, toNum } from "helpers/helpers";
import InitialValuesForm from "pages/tablesandcharts/TablesAndCharts/InitialValuesForm/InitialValuesForm";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { ColDef } from "ag-grid-community";
import {
  VictoryAxis,
  VictoryChart,
  VictoryContainer,
  VictoryLine,
  VictoryScatter,
  VictoryTheme
} from "victory";

let initialForm: NumberRoot = {
  variable: 729,
  exponent: 3,
  cols_count: 6
};

const TablesAndCharts: React.FC<RouteComponentProps> = () => {
  const [form, setForm] = useState<WrappedFormUtils>();
  const [tableData, setTableData] = useState<TableData>({
    y_tick_values: [],
    charts: [],
    rows_count: 0,
    table_rows: []
  });
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
      setTableData(rows);
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
          initials_array: toInitialsArray(tableData.table_rows)
        }).then(rows => {
          setTableData(rows);
          setColDef(createColumnDefs(toNum(formFields.cols_count)));
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
          color: "green"
        }}
      >
        Строка начальных предположений редактируется
      </div>
      <InitialValuesForm
        diagram={initialForm}
        onInit={setForm}
        handleSubmit={handleSubmit}
      />

      {(() => {
        if (loading) {
          return <Loading />;
        }
        return (
          tableData && (
            <>
              <div>
                <VictoryChart
                  containerComponent={<VictoryContainer responsive={false} />}
                  theme={VictoryTheme.material}
                  padding={{ left: 50, right: 50, top: 20, bottom: 50 }}
                  width={850}
                  height={600}
                >
                  <VictoryAxis
                    label="Шаг"
                    tickValues={new Array(tableData.rows_count)
                      .fill(0)
                      .map((item, index) => index)}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickValues={tableData.y_tick_values}
                  />
                  {tableData.charts.map((item, ind) => (
                    <VictoryLine
                      key={`line_${ind}`}
                      interpolation="cardinal"
                      style={{ data: { stroke: LineColors[ind] } }}
                      data={item}
                      x="step_index"
                      y="step_value"
                    />
                  ))}

                  {tableData.charts.map((item, ind) => (
                    <VictoryScatter
                      key={`scatter_${ind}`}
                      style={{ data: { fill: LineColors[ind] } }}
                      size={5}
                      data={item}
                      x="step_index"
                      y="step_value"
                    />
                  ))}
                </VictoryChart>
              </div>
              <ComputationalTable
                rowsCount={tableData.rows_count}
                diagram={initialForm}
                colDef={colDef}
                rowData={tableData.table_rows}
                handleSubmit={handleSubmit}
                form={form}
              />
            </>
          )
        );
      })()}
    </PageLayout>
  );
};

export default TablesAndCharts;
