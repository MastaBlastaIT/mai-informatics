import {
  ROUTE_BFS,
  ROUTE_REGEXP,
  ROUTE_TABLES_AND_CHARTS
} from "constants/routesNames";

const menu = [
  {
    title: "01 - Регулярные выражения",
    icon: "regExp",
    path: ROUTE_REGEXP
  },
  {
    title: "02 - Таблицы и графики",
    icon: "tablesAndCharts",
    path: ROUTE_TABLES_AND_CHARTS
  },
  {
    title: "03 - Поиск в ширину",
    icon: "bfs",
    path: ROUTE_BFS
  }
];

export default menu;
