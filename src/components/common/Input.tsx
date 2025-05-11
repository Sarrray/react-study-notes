import * as S from "./Input.style";

interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const Input = ({ value, onChange, placeholder }: IInputProps) => {
  return (
    <S.Input
      type="text"
      value={value}
      onChange={onChange}
      {...(placeholder && { placeholder: placeholder })}
    />
  );
};

export default Input;
