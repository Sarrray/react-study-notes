import Home from "../home/Home";
import MultipleSelectIndex from "../multipleselect/MultipleSelectIndex";
import ProgressbarIndex from "../progress/ProgressbarIndex";
import SignalRIndex from "../SignalR/SignalRIndex";

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
    key: "signalrindex",
    title: "サーバーからのリアルタイム通信",
    url: "/signalrindex/",
    element: <SignalRIndex />,
    sort: 2,
  },
  {
    key: "progressbar",
    title: "プログレスバー",
    url: "/progressbar/",
    element: <ProgressbarIndex />,
    sort: 3,
  },
  {
    key: "multipleselect",
    title: "複数選択可能なselect",
    url: "/multipleselect/",
    element: <MultipleSelectIndex />,
    sort: 4,
  },
];
