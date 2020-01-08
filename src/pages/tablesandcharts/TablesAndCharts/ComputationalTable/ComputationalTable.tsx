import React, { Component } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import { ColDef, Column } from "ag-grid-community";
import { NumberRoot } from "models/excel";

const colWidth = 100;
const rowHeight = 35;

declare interface ComputationalTableProps {
  rowsCount: number;
  stepsToFinish: number;
  diagram: NumberRoot;
  colDef: Array<ColDef>;
  newRowData: any;
}

class ComputationalTable extends Component<ComputationalTableProps, any> {
  public gridApi: any;
  public gridColumnApi: any;

  constructor(props: any) {
    super(props);

    this.state = {
      columnDefs: this.props.colDef,
      rowData: this.props.newRowData
    };
  }

  onGridReady = (params: any) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const cols = params.columnApi.getAllColumns();
    cols.forEach(function(col: Column) {
      //const colDef = col.getUserProvidedColDef();
    });
  };

  public render() {
    const { rowsCount, stepsToFinish } = this.props;
    const tableWidth = colWidth * stepsToFinish + 2;
    const calcHeight = (count: number = 1) => rowHeight * (rowsCount + count);
    return (
      <div
        style={{
          height: calcHeight(),
          width: tableWidth,
          marginTop: "10px"
        }}
        className="ag-theme-balham"
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowHeight={rowHeight}
          colWidth={colWidth}
          onGridReady={this.onGridReady}
        />
      </div>
    );
  }
}

export default ComputationalTable;
