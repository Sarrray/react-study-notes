import * as S from "./Checkbox.style";

interface ICheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}
const Checkbox = ({ label, checked, onChange }: ICheckboxProps) => {
  return (
    <S.CheckBox>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
        <div></div>
      </label>
    </S.CheckBox>
  );
};

export default Checkbox;
