import { NavLink } from "react-router-dom";
import * as S from "./Style";
import TitleIcon from "./TitleIcon";
import { NavLists } from "./NavLists";

const Sidebar = () => {
  return (
    <S.navList>
      <TitleIcon />
      <ul>
        {NavLists.map((d) => {
          return (
            <li key={d.key}>
              <NavLink to={d.url}>{d.title}</NavLink>
            </li>
          );
        })}
      </ul>
    </S.navList>
  );
};

export default Sidebar;
