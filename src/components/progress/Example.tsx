import { useState } from "react";
import { exapmleContent } from "./ExampleContent";
import styled from "styled-components";
import Progressbar from "./Progressbar";

const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <div style={{ position: "relative", height: "100%" }}>
      {page <= exapmleContent.length ? (
        <>
          <DivHeader>
            <Progressbar
              width={400}
              height={50}
              linethickness={10}
              max={exapmleContent.length}
              now={page}
            />
          </DivHeader>
          {exapmleContent[page - 1]}
          <DivFooter>
            <Button
              type="button"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={!(page > 1 && exapmleContent.length > 1)}
            >
              前へ戻る
            </Button>
            <Button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!(page < exapmleContent.length)}
            >
              次へ進む
            </Button>
          </DivFooter>
        </>
      ) : (
        <div>error</div>
      )}
    </div>
  );
};

const DivHeader = styled.div`
  width: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: center;
`;

const DivFooter = styled.div`
  display: grid;
  gap: 20px;
  width: 100%;
  position: absolute;
  bottom: 5px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: #13aa52;
  border: none;
  /* border-radius: 4px; */
  color: #ffffff;
  letter-spacing: 1px;

  &:disabled {
    background-color: #aaaaaa;
  }
`;

export default Example;
