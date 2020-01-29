import { ReactText } from "react";
import { isNil } from "lodash";
import {
  FormFields,
  NumberRoot,
  TableRow,
  ValidationRules
} from "models/excel";

export function toNum(strNum: string | ReactText | undefined): number {
  return isNil(strNum) ? NaN : +strNum;
}

export function validateChartsFormItem(
  value: string,
  checkIfInteger: boolean
): ValidationRules {
  if (value.length === 0)
    return {
      message: "Поле пустое",
      valid: false
    };

  const convertedValue = toNum(value);

  if (isNaN(convertedValue))
    return {
      message: "Введено не число",
      valid: false
    };

  if (convertedValue === 0)
    return {
      message: "Введен ноль",
      valid: false
    };

  if (checkIfInteger && !Number.isInteger(convertedValue))
    return {
      message: "Не целое число",
      valid: false
    };

  return {
    message: "",
    valid: true
  };
}

function createColumnsNames(count: number) {
  return new Array(count).fill(0).map((v, i) => {
    const pref = Math.floor(i / 26);
    const prefLetter = pref === 0 ? "" : String.fromCharCode(pref + 64);
    return prefLetter + String.fromCharCode((i % 26) + 65);
  });
}

export function createColumnDefs(count: number) {
  return createColumnsNames(count).map(v => {
    return {
      headerName: v,
      field: v,
      cellClassRules: {
        "rag-red": function(params: any) {
          const checkVar = toNum(params.value);
          return params.value !== null && (isNaN(checkVar) || checkVar === 0);
        }
      }
    };
  });
}

export function toNumberRoot(formFields: FormFields): NumberRoot {
  return {
    variable: formFields.variable,
    exponent: formFields.exponent,
    cols_count: formFields.cols_count
  };
}

export function toInitialsArray(tableRows: TableRow[]): Array<number> {
  const resArray = Object.values(tableRows[0]).map(v => toNum(v));
  return resArray.filter(v => isNaN(v) || v === 0).length > 0 ? [] : resArray;
}
