import { NavType } from "../../types/nav";
import * as S from "./Style";
import { MdChat, MdDashboard, MdHome, MdSchool, MdSync } from "react-icons/md";

export const NavLists: NavType[] = [
  {
    key: "home",
    title: "はじめに",
    url: "/home",
    icon: <MdHome {...S.NavIconAttr} />,
  },
  {
    key: "dashboard",
    title: "ダッシュボード",
    url: "/dashboard",
    icon: <MdDashboard {...S.NavIconAttr} />,
  },
  {
    key: "chat",
    title: "チャット",
    url: "/chat",
    icon: <MdChat {...S.NavIconAttr} />,
  },
  {
    key: "signalrindex",
    title: "リアルタイム通信",
    url: "/signalrindex",
    icon: <MdSync {...S.NavIconAttr} />,
  },
  {
    key: "progressbar",
    title: "プログレスバー",
    url: "/progressbar",
    icon: <MdSchool {...S.NavIconAttr} />,
  },
];
