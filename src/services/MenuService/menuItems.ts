import {
  ROUTE_BFS,
  ROUTE_REGEX,
  ROUTE_TABLES_AND_CHARTS
} from "constants/routesNames";

const menu = [
  {
    title: "01 - Регулярные выражения",
    icon: "regEx",
    path: ROUTE_REGEX
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
