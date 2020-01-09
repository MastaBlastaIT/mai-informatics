import { ReactText } from "react";
import { isNil } from "lodash";
import { TableRow } from "models/excel";
import { ColDef } from "ag-grid-community";

export function toNum(strNum: string | ReactText | undefined): number {
  return isNil(strNum) ? NaN : +strNum;
}

export function randomDataSet(
  dataSetSize: number,
  minValue: number,
  maxValue: number
): Array<number> {
  return new Array(dataSetSize).fill(0).map(() => {
    const getRandomValue = Math.random() * maxValue + minValue;
    return toNum(
      Math.round(Math.random())
        ? Math.round(getRandomValue)
        : getRandomValue.toFixed(2)
    );
  });
}

export function createColumnDefs(count: number) {
  return new Array(count).fill(0).map((v, i) => {
    return {
      headerName: "a" + i,
      field: "a" + i
    };
  });
}

export function createRowData(
  rowsCount: number,
  columnDefs: Array<ColDef>,
  diagram: any,
  dataSet: Array<number>
) {
  return new Array(rowsCount).fill(0).map((v, i) => {
    const resRowData: TableRow = {};
    resRowData["a0"] = dataSet[i];

    columnDefs.slice(1).forEach((v, i) => {
      if (v.field) {
        const prevValue = resRowData[v.field[0] + i];
        resRowData[v.field] =
          (prevValue +
            diagram.variable / Math.pow(prevValue, diagram.exponent - 1)) /
          2;
      }
    });

    return resRowData;
  });
}
