import React, { Component } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import { ColDef } from "ag-grid-community";
import { NumberRoot } from "models/excel";
import { toInitialsArray, toNum } from "helpers/helpers";
import localeText from "configs/agGrid-ru.json";
import { WrappedFormUtils } from "antd/lib/form/Form";
import { notification } from "antd";

const colWidth = 130;
const rowHeight = 35;

declare interface ComputationalTableProps {
  rowsCount: number;
  diagram: NumberRoot;
  colDef: Array<ColDef>;
  rowData: any;
  handleSubmit: (arr?: Array<number>) => void;
  form?: WrappedFormUtils;
}

class ComputationalTable extends Component<ComputationalTableProps, any> {
  public gridApi: any;
  public gridColumnApi: any;

  checkIfEditable(params: any) {
    return toNum(params.node.id) === 0;
  }

  constructor(props: any) {
    super(props);

    this.state = {
      modules: AllModules,
      columnDefs: this.props.colDef,
      rowData: this.props.rowData,
      defaultColDef: {
        editable: this.checkIfEditable.bind(this),
        resizable: true
      }
    };
  }

  onGridReady = (params: any) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  public render() {
    const { diagram, rowsCount, form, handleSubmit } = this.props;
    const tableWidth =
      diagram.cols_count <= 9 ? colWidth * diagram.cols_count + 2 : "70vw";

    function onCellEditingStopped(event: any) {
      if (form) {
        const errors = Object.values(form.getFieldsError()).reduce(
          (res, item) => {
            return res + (item ? item.toString().length : 0);
          },
          0
        );
        const resArr = toInitialsArray([event.data]);
        !errors && resArr.length === 0
          ? notification.error({
              message: "Ошибка",
              description: "Некорректные данные в строке",
              duration: 1
            })
          : handleSubmit(resArr);
      }
    }

    return (
      <div
        style={{
          height: (rowsCount + 1) * rowHeight + 1,
          width: tableWidth,
          marginTop: "10px"
        }}
        className="ag-theme-balham"
      >
        <AgGridReact
          modules={this.state.modules}
          columnDefs={this.state.columnDefs}
          defaultColDef={this.state.defaultColDef}
          enableRangeSelection={true}
          stopEditingWhenGridLosesFocus={true}
          onGridReady={this.onGridReady}
          rowData={this.state.rowData}
          rowHeight={rowHeight}
          colWidth={colWidth}
          localeText={localeText}
          onCellEditingStopped={onCellEditingStopped}
        />
      </div>
    );
  }
}

export default ComputationalTable;
