import { Icon, Layout, Menu, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "./Sidebar.module.sass";
import logo from "assets/mai-logo.svg";

import { Link } from "react-router-dom";
import MenuService from "services/MenuService";

import { ReactComponent as IconTable } from "assets/icons/excel.svg";
import { ReactComponent as IconRegExp } from "assets/icons/regexp.svg";
import { ReactComponent as IconGraph } from "assets/icons/line-chart.svg";
import { ROUTE_MAIN } from "constants/routesNames";

const { Sider } = Layout;

const icons = {
  tablesAndCharts: () => <IconTable />,
  regExp: () => <IconRegExp />,
  bfs: () => <IconGraph />
} as any;

const SwitchLink = ({ path, title, currentPath }: any) => {
  const isCurrent = currentPath === path;

  if (path) {
    if (isCurrent) {
      return <span>{title}</span>;
    }

    return <Link to={path}>{title}</Link>;
  }

  return title;
};

function getMenuItem(
  key: string,
  path: string,
  title: any,
  currentPath: string
) {
  return (
    <Menu.Item
      key={key}
      className={styles.item}
      style={!path ? { opacity: 0.5, color: "red" } : {}}
    >
      <SwitchLink path={path} title={title} currentPath={currentPath} />
    </Menu.Item>
  );
}

function getMenuItems(data: any[], currentPath: string) {
  return data.map((item, k) => {
    const subMenuTitle = (
      <span>
        <Icon
          component={icons[item.icon]}
          className={styles.icon}
          style={{ verticalAlign: "middle" }}
        />
        <span>{item.title}</span>
      </span>
    );

    return getMenuItem(`${k}`, item.path, subMenuTitle, currentPath);
  });
}

interface SidebarProps extends RouteComponentProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = props => {
  const {
    location: { pathname },
    collapsed
  } = props;
  const [menuCollapsed, setMenuCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setMenuCollapsed(collapsed);
  }, [collapsed]);

  const menuData = MenuService.getMenu();

  return (
    <Sider
      width={300}
      collapsible
      collapsed={menuCollapsed}
      trigger={null}
      className={styles.root}
    >
      <div className={styles.logo}>
        <Link to={ROUTE_MAIN}>
          <Tooltip placement="right" title="На главную">
            <img src={logo} alt="MAI" height={70} />
          </Tooltip>
        </Link>
      </div>
      <Menu className={styles.menu} mode="inline">
        {getMenuItems(menuData, pathname)}
      </Menu>
    </Sider>
  );
};

export default withRouter(Sidebar);
