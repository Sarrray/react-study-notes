import {
  IfetchRecipeDetailRequest,
  IfetchRecipeDetailResponse,
} from "../types/api";

const mockRecipeDetails: Record<string, IfetchRecipeDetailResponse> = {
  カレーライス: {
    title: "カレーライス",
    ingredients: [
      "カレールー 100g",
      "玉ねぎ 2個",
      "にんじん 1本",
      "じゃがいも 2個",
      "豚肉 300g",
      "水 800ml",
      "サラダ油 大さじ1",
      "塩 少々",
      "こしょう 少々",
    ],
    steps: [
      "玉ねぎ、にんじん、じゃがいもを一口大に切る",
      "豚肉を一口大に切る",
      "鍋にサラダ油を熱し、豚肉を炒める",
      "玉ねぎ、にんじん、じゃがいもを加えて炒める",
      "水を加えて沸騰したら弱火にし、アクを取りながら20分煮込む",
      "野菜が柔らかくなったらカレールーを溶かし入れる",
      "とろみがつくまで5分程度煮込む",
      "塩こしょうで味を調える",
    ],
  },
  オムライス: {
    title: "オムライス",
    ingredients: [
      "ごはん 2人分",
      "卵 4個",
      "玉ねぎ 1/2個",
      "鶏もも肉 200g",
      "ケチャップ 大さじ3",
      "バター 20g",
      "塩 少々",
      "こしょう 少々",
    ],
    steps: [
      "玉ねぎをみじん切りにする",
      "鶏もも肉を一口大に切る",
      "フライパンにバターを溶かし、玉ねぎを炒める",
      "鶏もも肉を加えて炒める",
      "ごはんを加えて炒め、ケチャップで味付けする",
      "別のフライパンで卵を炒り卵にする",
      "炒り卵をケチャップライスの上にのせる",
    ],
  },
  味噌汁: {
    title: "味噌汁",
    ingredients: [
      "豆腐 1丁",
      "わかめ 適量",
      "味噌 大さじ2",
      "だし汁 800ml",
      "ねぎ 1本",
    ],
    steps: [
      "豆腐をさいの目に切る",
      "わかめは水で戻しておく",
      "ねぎを小口切りにする",
      "鍋にだし汁を入れ、沸騰したら豆腐を加える",
      "豆腐が温まったら味噌を溶かし入れる",
      "わかめを加え、一煮立ちさせる",
      "器に盛り、ねぎを散らす",
    ],
  },
};

export async function fetchRecipeDetail(
  request: IfetchRecipeDetailRequest
): Promise<IfetchRecipeDetailResponse> {
  // モックモードの場合はモックデータを返す
  if (import.meta.env.VITE_USE_MOCK === "true" && import.meta.env.DEV) {
    console.log("モックモード: レシピ詳細を返します");
    const mockData = mockRecipeDetails[request.recipeName];
    if (mockData) {
      return mockData;
    }
    throw new Error("指定されたレシピが見つかりません");
  }

  const cacheKey = `recipe_${request.recipeName}`;

  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {
    console.warn("セッションストレージからの読み込みに失敗しました");
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_SERVER_URL}/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!res.ok) throw new Error("レシピ詳細の取得に失敗しました");

    const data = await res.json();

    try {
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
    } catch {
      console.warn("セッションストレージへの書き込みに失敗しました");
    }

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
