import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Sidebar from "../components/Sidebar";

class DefaultLayout extends Component<RouteComponentProps, any> {
  state = { collapsed: false };

  toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  public render() {
    const { collapsed } = this.state;

    return <Sidebar collapsed={collapsed} onCollapse={this.toggleCollapse} />;
  }
}

export default withRouter(DefaultLayout);
