import styled from "styled-components";

const divContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 230px 1fr;
`;

const divContainerLeft = styled.div`
  height: 100%;
  background-color: #efebeb;
`;

const divContainerRight = styled.div`
  height: 100%;
`;

const navList = styled.nav`
  position: sticky;
  top: 5px;

  ul {
    display: flex;
    flex-flow: column;
    margin: 0;
    padding: 0;
    padding-left: 3px;
    padding-top: 10px;
  }

  li {
    display: flex;
    height: 40px;
    list-style-type: none;
    margin: 0;

    &:hover {
      background-color: #dfdbdb;
    }

    a {
      align-items: center;
      display: grid;
      height: 100%;
      width: 100%;
      text-decoration: none;
      color: #333333;
      padding-left: 15px;

      &.active {
        background-color: #e5e5e5;
        box-shadow: inset 8px 0 #434f60;
        font-weight: bold;
      }
    }
  }
`;

export { divContainer, divContainerLeft, divContainerRight, navList };
