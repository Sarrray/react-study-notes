import styled from "styled-components";

const DivContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const p1 = (
  <>
    <DivContent>1ページ目</DivContent>
  </>
);

const p2 = (
  <>
    <DivContent>2ページ目</DivContent>
  </>
);

const p3 = (
  <>
    <DivContent>3ページ目</DivContent>
  </>
);

const p4 = (
  <>
    <DivContent>4ページ目</DivContent>
  </>
);

const p5 = (
  <>
    <DivContent>5ページ目</DivContent>
  </>
);

const p6 = (
  <>
    <DivContent>6ページ目</DivContent>
  </>
);

export const exapmleContent: JSX.Element[] = [p1, p2, p3, p4, p5, p6];
