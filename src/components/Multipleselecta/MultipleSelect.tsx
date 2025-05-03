import { useEffect, useRef } from "react";

export type TMultipleSelectOptions = { value: string; label: string }[];

type MultipleSelectProps = {
  options: TMultipleSelectOptions;
  selectStyle?: React.CSSProperties;
  optionStyle?: React.CSSProperties;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const MultipleSelect = ({
  options,
  selectStyle,
  optionStyle,
  setSelected,
}: MultipleSelectProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    // セレクトボックス外が選択された場合は、選択解除
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setSelected([]);
        selectRef.current.selectedIndex = -1;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSelected]);

  return (
    <>
      <select
        ref={selectRef}
        multiple={true}
        onChange={(e) =>
          setSelected(Array.from(e.target.selectedOptions, (x) => x.value))
        }
        style={selectStyle}
      >
        {options.map((x) => (
          <option key={x.value} value={x.value} style={optionStyle}>
            {x.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default MultipleSelect;
