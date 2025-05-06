import { Outlet, useLocation } from "react-router";
import * as S from "./Style";
import Sidebar from "../Sidebar/Sidebar";
import { NavLists } from "../Sidebar/NavLists";

const Layout = () => {
  const location = useLocation();
  const accessPage = NavLists.find((d) => {
    if (location.pathname.startsWith("/chat")) {
      const pattern = new RegExp(`^/chat(/.*)?$`);
      return pattern.test(d.url);
    } else {
      return d.url === location.pathname.replace(/\/+$/, "");
    }
  });

  return (
    <>
      <S.divContainer>
        <S.divContainerLeft>
          <Sidebar />
        </S.divContainerLeft>
        <S.divContainerRight>
          <S.hTitle>{accessPage?.title}</S.hTitle>
          <S.divOutlet>
            <Outlet />
          </S.divOutlet>
        </S.divContainerRight>
      </S.divContainer>
    </>
  );
};

export default Layout;
