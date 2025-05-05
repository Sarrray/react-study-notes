type FormatType =
  | "jp-yyyyM"
  | "jp-yyyyMd"
  | "jp-Md"
  | "slash-yyyyMMdd"
  | "yyyyMMdd"
  | "hyphen-yyyyMMdd";

// 文字列の日付形式（yyyyMMdd、yyyyMM、yyyy/M/d、yyyy/MM/dd、yyyy-MM-dd、yyyy-M-d）を指定した形式で返す
export const formatDate = (
  dateString: string,
  formatType: FormatType
): string => {
  const [year, month, day] = splitDateString(dateString);
  switch (formatType) {
    case "jp-yyyyM":
      return `${year}年${month}月`;
    case "jp-yyyyMd":
      return `${year}年${month}月${day}日`;
    case "jp-Md":
      return `${month}月${day}日`;
    case "slash-yyyyMMdd":
      return `${year}/${month.toString().padStart(2, "0")}/${day
        .toString()
        .padStart(2, "0")}`;
    case "hyphen-yyyyMMdd":
      return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
    case "yyyyMMdd":
    default:
      return `${year}${month.toString().padStart(2, "0")}${day
        .toString()
        .padStart(2, "0")}`;
  }
};

const splitDateString = (dateStr: string): [number, number, number] => {
  if (/^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split(/[/-]/);
    return [Number(year), Number(month), Number(day)];
  } else if (/^\d{6,8}$/.test(dateStr)) {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return [Number(year), Number(month), Number(day)];
  } else {
    throw new Error(`不正な日付：${dateStr}`);
  }
};
