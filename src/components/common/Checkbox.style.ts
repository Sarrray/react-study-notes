import styled from "styled-components";

export const CheckBox = styled.div`
  label {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    user-select: none;
  }

  input[type="checkbox"] {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  div {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid #000000;
  }

  input[type="checkbox"]:checked ~ div {
    background: #0e647d;
  }

  div::after {
    content: "";
    position: absolute;
    display: none;
  }

  input[type="checkbox"]:checked ~ div::after {
    display: block;
  }

  div::after {
    left: 8px;
    top: 4px;
    width: 3px;
    height: 8px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
