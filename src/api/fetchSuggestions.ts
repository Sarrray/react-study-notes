import {
  IRecipeSuggestionsRequest,
  IRecipeSuggestionsResponse,
} from "../types/api";

const mockSuggestions: Record<string, string[]> = {
  "卵,キャベツ,ウィンナー": [
    "オムライス",
    "キャベツの炒め物",
    "ウィンナーとキャベツのスープ",
  ],
  "豆腐,わかめ,ねぎ": ["味噌汁", "冷ややっこ", "豆腐とわかめのサラダ"],
  "カレールー,玉ねぎ,にんじん,じゃがいも,豚肉": [
    "カレーライス",
    "肉じゃが",
    "ポトフ",
  ],
  "ごはん,卵,玉ねぎ,鶏もも肉": ["オムライス", "親子丼", "チキンライス"],
  "トマト,玉ねぎ,にんにく": [
    "トマトソースパスタ",
    "トマトスープ",
    "トマトサラダ",
  ],
  "鶏もも肉,にんにく,しょうが": ["から揚げ", "チキンソテー", "チキンカレー"],
  "鮭,レモン,バター": ["鮭のムニエル", "鮭のホイル焼き", "鮭のバター焼き"],
  "豚肉,しょうが,にんにく": ["生姜焼き", "豚の角煮", "豚のしょうが焼き"],
  "牛肉,玉ねぎ,ピーマン": [
    "牛丼",
    "ビーフストロガノフ",
    "牛肉のオイスターソース炒め",
  ],
  "なす,ピーマン,トマト": [
    "ラタトゥイユ",
    "なすの味噌炒め",
    "なすとピーマンの炒め物",
  ],
};

export async function fetchSuggestions(
  request: IRecipeSuggestionsRequest
): Promise<IRecipeSuggestionsResponse> {
  // モックモードの場合はモックデータを返す
  if (import.meta.env.VITE_USE_MOCK === "true" && import.meta.env.DEV) {
    console.log("モックモード: 料理候補を返します");
    // 部分一致で検索
    const partialMatches = Object.entries(mockSuggestions)
      .filter(([key]) =>
        request.ingredients.some((ingredient) => key.includes(ingredient))
      )
      .map(([_, suggestions]) => suggestions)
      .flat()
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    if (partialMatches.length > 0) {
      return {
        candidates: [...new Set(partialMatches)],
      };
    }

    return { candidates: [] };
  }

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_SERVER_URL}/suggestions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      }
    );

    if (!res.ok) throw new Error("料理候補の取得に失敗しました");

    const data = (await res.json()) as IRecipeSuggestionsResponse;
    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error("API呼び出しに失敗しました:", e.message);
      throw e;
    }
    const errorMessage =
      typeof e === "string" ? e : "不明なエラーが発生しました";
    console.error("予期せぬエラーが発生しました:", e);
    throw new Error(errorMessage);
  }
}
