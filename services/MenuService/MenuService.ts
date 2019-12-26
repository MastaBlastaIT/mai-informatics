import menuItems from "./menuItems";

interface MenuItem {
  title: string;
  path?: string;
  icon?: string;
}

export default class MenuService {
  static getMenu(): MenuItem[] {
    return menuItems;
  }
}
