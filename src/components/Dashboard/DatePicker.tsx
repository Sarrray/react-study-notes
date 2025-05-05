import dailySalesData from "../../data/dailySales.json";
import { IDailySales } from "../../types/sales";
import { formatDate } from "../../utils/formatDate";
import * as S from "./styles";

interface IDatePickerProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const DatePicker = ({ value, onChange }: IDatePickerProps) => {
  // 日付データの取得（データが存在する日付のみ）
  const availableDates = (dailySalesData as IDailySales[]).map((data) =>
    formatDate(data.date, "slash-yyyyMMdd")
  );

  return (
    <>
      <S.Select value={value} onChange={onChange}>
        {availableDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </S.Select>
    </>
  );
};

export default DatePicker;
