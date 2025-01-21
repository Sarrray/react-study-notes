import { useState } from "react";
import MultipleSelect, { TMultipleSelectOptions } from "./MultipleSelect";
import styled from "styled-components";

const optionlist: TMultipleSelectOptions = [
  { value: "strawberry", label: "いちご" },
  { value: "apple", label: "りんご" },
  { value: "orange", label: "みかん" },
  { value: "grapes", label: "ぶどう" },
];

const MultipleSelectIndex = () => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <UlDescription>
        <li>selectタグのmultipleをtrueにする</li>
        <li>
          CtrlキーまたはShiftキーを押しながら選択することで、複数の項目を選択可（Ctrlキー：複数選択、Shiftキー：範囲選択）
        </li>
        <li>選択値はe.target.selectedOptionsのvalueに格納されている</li>
        <li>
          選択解除は実装が必要 ⇒
          ここではセレクトボックス外が選択された場合に選択解除とした
        </li>
      </UlDescription>

      <div style={{ padding: 5, paddingLeft: 20 }}>
        {/* 複数選択可能なselect */}
        <MultipleSelect
          options={optionlist}
          selectStyle={{ fontSize: "1.2rem" }}
          optionStyle={{ paddingRight: 20 }}
          setSelected={setSelected}
        />

        {/* select結果を出力 */}
        <div style={{ marginTop: 10 }}>
          <h2 style={{ marginBottom: 0 }}>選択値</h2>
          {selected.length > 0 && (
            <ul style={{ marginTop: 5 }}>
              {selected.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
          {selected.length <= 0 && (
            <p style={{ marginTop: 5, marginLeft: 10 }}>選択項目なし</p>
          )}
        </div>
      </div>
    </>
  );
};
const UlDescription = styled.ul`
  margin-top: 0;
  margin-bottom: 20px;
  list-style: square;

  & > li {
    padding-top: 4px;
    padding-bottom: 4px;
  }
`;

export default MultipleSelectIndex;
