import {
  ROUTE_BFS,
  ROUTE_REGEX,
  ROUTE_TABLES_AND_CHARTS
} from "constants/routesNames";
import TablesAndCharts from "pages/tablesandcharts/TablesAndCharts";
import RegEx from "pages/regex/TablesAndCharts";
import BFSPage from "pages/bfs/BFSPage";

const routes = [
  {
    path: ROUTE_REGEX,
    component: RegEx,
    exact: true
  },
  {
    path: ROUTE_TABLES_AND_CHARTS,
    component: TablesAndCharts,
    exact: true
  },
  {
    path: ROUTE_BFS,
    component: BFSPage,
    exact: true
  }
];

export default routes;
