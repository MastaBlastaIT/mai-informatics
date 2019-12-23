import React, { Component } from "react";

import { Layout } from "antd";
import Helmet from "react-helmet";

class PageLayout extends Component<any, any> {
  public render() {
    let { title, back, style } = this.props;

    back = back || "#fff";

    return (
      <Layout
        style={{
          padding: (!title ? "24px" : "0") + " 24px 24px",
          height: "calc(100vh - 201px)",
          overflowY: "auto",
          backgroundColor: back,
          ...style
        }}
      >
        <Helmet title={title} />

        {title ? <h1 className="b-title">{title}</h1> : null}
      </Layout>
    );
  }
}

export default PageLayout;
