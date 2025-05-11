import * as S from "./Button.style";

interface IButtonProps {
  onClick: () => void;
  disabled: boolean;
}
const Button = ({ onClick, disabled }: IButtonProps) => {
  return <S.Button onClick={onClick} disabled={disabled} />;
};

export default Button;
