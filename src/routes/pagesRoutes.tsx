import {
  ROUTE_BFS,
  ROUTE_REGEXP,
  ROUTE_TABLES_AND_CHARTS
} from "constants/routesNames";
import TablesAndCharts from "pages/tablesandcharts/TablesAndCharts";
import BFSPage from "pages/bfs/BFSPage";
import RegExp from "pages/regexp/RegExp";

const routes = [
  {
    path: ROUTE_REGEXP,
    component: RegExp,
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
