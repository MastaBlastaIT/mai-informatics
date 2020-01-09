import { TableRequestData, TableRowsData } from "models/excel";
import axios from "axios";

export default class TablesAndChartsService {
  static getTableRows(params: TableRequestData): Promise<TableRowsData> {
    const formData = new FormData();
    formData.set("cols_count", params.cols_count.toString());
    formData.set("rows_count", params.rows_count.toString());
    formData.set("variable", params.variable.toString());
    formData.set("exponent", params.exponent.toString());
    params.initials_array?.length &&
      formData.set("layout_css", JSON.stringify(params.initials_array));

    return axios
      .post("https://mastablastait.pythonanywhere.com/set_table", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(res => res.data);
  }
}
