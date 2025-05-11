import { IoInformationCircle } from "react-icons/io5";
import styled from "styled-components";

export const InfoCard = styled.div`
  padding: 15px 20px;
  background-color: #fafafa;
  box-shadow: 0px 2px 1px #aaaaaa, 0px 1px 1px #aaaaaa, 0px 1px 3px #aaaaaa;
  h3 {
    padding: 0;
    margin: 0 0 10px 0;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    display: flex;
    align-items: center;
    padding: 5px 0px;
  }
`;
export const InfoIcon = styled(IoInformationCircle)`
  color: #aaaaaa;
  font-size: 25px;
  margin-top: 4px;
  margin-right: 10px;
  flex-shrink: 0;
`;
