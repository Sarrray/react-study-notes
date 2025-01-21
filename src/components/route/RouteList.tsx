import Home from "../home/Home";
import MultipleSelectIndex from "../multipleselect/MultipleSelectIndex";
import ProgressbarIndex from "../progress/ProgressbarIndex";

type NavType = {
  key: string;
  title: string;
  url: string;
  element: JSX.Element;
  sort: number;
  defaultpage?: boolean;
};

export const NavLists: NavType[] = [
  {
    key: "home",
    title: "はじめに",
    url: "/home/",
    element: <Home />,
    sort: 1,
    defaultpage: true,
  },
  {
    key: "progressbar",
    title: "プログレスバー",
    url: "/progressbar/",
    element: <ProgressbarIndex />,
    sort: 2,
  },
  {
    key: "multipleselect",
    title: "複数選択可能なselect",
    url: "/multipleselect/",
    element: <MultipleSelectIndex />,
    sort: 3,
  },
];
