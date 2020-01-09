import React, { Component } from "react";

import { Spin } from "antd";

class Loading extends Component<any, any> {
  public render() {
    return (
      <div className="b-centered b-fit">
        <Spin size="large" tip="Загрузка..." />
      </div>
    );
  }
}

export default Loading;
