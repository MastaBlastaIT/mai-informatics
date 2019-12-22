import { Icon, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "./Sidebar.module.sass";
import logo from "../../assets/mai-logo.svg";

const { Sider, Header } = Layout;

interface SidebarProps extends RouteComponentProps {
  collapsed: boolean;
  onCollapse: any;
}

const Sidebar: React.FC<SidebarProps> = props => {
  const { collapsed, onCollapse } = props;
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setMenuCollapsed(collapsed);
  }, [collapsed]);

  return (
    <Layout>
      <Sider
        width={200}
        collapsible
        collapsed={menuCollapsed}
        trigger={null}
        className={styles.root}
      >
        <div className={styles.logo}>
          <img src={logo} alt="MAI" height={70} />
        </div>
        <Menu className={styles.menu} defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Icon
            className={styles.trigger}
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={onCollapse}
          />
        </Header>
      </Layout>
    </Layout>
  );
};

export default withRouter(Sidebar);
