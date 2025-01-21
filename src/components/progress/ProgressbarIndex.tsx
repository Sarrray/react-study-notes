import styled from "styled-components";
import Progressbar from "./Progressbar";
import ProgressbarBase from "./ProgressbarBase";
import Example from "./Example";

const ProgressbarIndex = () => {
  return (
    <>
      <UlDescription>
        <li>
          <H3>基本</H3>
          <ProgressbarBase />
        </li>
        <li>
          <H3>丸付き+進捗数・度合が変数に対応</H3>
          <Progressbar
            width={400}
            height={50}
            linethickness={10}
            max={4}
            now={2}
          />
        </li>
        <li>
          <H3>実例</H3>
          <DivExample>
            <Example />
          </DivExample>
        </li>
      </UlDescription>
    </>
  );
};

const H3 = styled.h3`
  margin: 0;
`;

const UlDescription = styled.ul`
  margin-top: 0;
  list-style: square;

  & > li {
    padding-top: 10px;
    padding-bottom: 20px;
  }
`;

const DivExample = styled.div`
  width: 500px;
  height: 300px;
  border: 1px solid #000000;
`;

export default ProgressbarIndex;
