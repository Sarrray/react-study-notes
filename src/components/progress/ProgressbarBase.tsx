import * as S from "./StyleProgressbarBase";

const ProgressbarBase = () => {
  return (
    <div style={{ width: 300 }}>
      <S.divProgressbarBase>
        <S.divProgressbarInnerBase $progress={40}></S.divProgressbarInnerBase>
      </S.divProgressbarBase>
    </div>
  );
};

export default ProgressbarBase;
