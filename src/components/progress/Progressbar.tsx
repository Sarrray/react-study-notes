import { IoMdCheckmark } from "react-icons/io";
import * as S from "./Style";

type ProgressbarProps = {
  width: number;
  height: number;
  linethickness: number;
  max: number;
  now: number;
};

const Progressbar = ({
  width,
  height,
  linethickness,
  max,
  now,
}: ProgressbarProps) => {
  const circleSize = height - 10;
  const circlePosY = height / 2 - circleSize / 2;

  return (
    <>
      <div
        style={{
          position: "relative",
          height: height,
          width: width,
          display: "flex",
          alignItems: "center",
        }}
      >
        {max > 1 && (
          <S.divProgressbar $linethickness={linethickness}>
            <S.divProgressbarInner
              $progress={((now - 1) / (max - 1)) * width}
            ></S.divProgressbarInner>
          </S.divProgressbar>
        )}
        {[...Array(max)].map((_, index) => (
          <S.divCircle
            key={index + 1}
            $size={circleSize}
            style={{
              top: circlePosY,
              left:
                max > 1
                  ? ((width - circleSize) / (max - 1)) * index
                  : width / 2 - circleSize / 2,
            }}
            $done={index + 1 <= now}
          >
            {index + 1 < now ? <IoMdCheckmark /> : index + 1}
          </S.divCircle>
        ))}
      </div>
    </>
  );
};

export default Progressbar;
