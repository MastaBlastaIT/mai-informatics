import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Sidebar from "components/Sidebar";
import { Icon, Layout } from "antd";
import styles from "components/Sidebar/Sidebar.module.sass";

const { Header } = Layout;

class DefaultLayout extends Component<RouteComponentProps, any> {
  state = { collapsed: false };

  toggleCollapse = () => {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  };

  public render() {
    const { children } = this.props;
    const { collapsed } = this.state;

    return (
      <Layout>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggleCollapse}
            />
          </Header>
          {children}
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(DefaultLayout);
