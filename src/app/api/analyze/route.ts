import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { EXPERT_KNOWLEDGE } from "@/lib/knowledge";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server Configuration Error: GEMINI_API_KEY is missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const formData = await req.formData();
    const text = formData.get("text") as string;
    const image = formData.get("image") as File | null;

    // New Context Fields
    const goal = formData.get("goal") as string; // Now can be custom text
    const relation = formData.get("relation") as string;
    const names = formData.get("names") as string;
    const topic = formData.get("topic") as string;
    const language = (formData.get("language") as string) || "ja";

    // console.log("API Request:", { text: text?.substring(0, 50), image: !!image, goal });

    if (!text && !image) {
      return NextResponse.json(
        { error: "Text or image is required" },
        { status: 400 }
      );
    }

    let promptParts: (string | { inlineData: { data: string; mimeType: string } })[] = [];

    const systemPrompt = `
      あなたは恋愛心理学のプロフェッショナル「Cupid Agent」です。
      
      ${EXPERT_KNOWLEDGE}

      ## 分析対象のコンテキスト
      - **ユーザーの目標**: ${goal}
      - **二人の関係性/背景**: ${relation || "不明"}
      - **呼び方 (自分/相手)**: ${names || "不明"}
      - **現在の話題**: ${topic || "不明"}

      提供されたチャットの履歴（テキストまたは画像）を分析し、以下の情報をJSON形式で出力してください。
      
      必ず純粋なJSONのみを出力してください。Markdownのコードブロックや説明文は一切不要です。
      
      アドバイスセクションでは、提供された「専門知識」に含まれる心理学用語や法則（例：ベン・フランクリン効果、ハイパーパーソナル・モデルなど）を**必ず1つ以上**引用して、なぜそのアドバイスになるのかを論理的に解説してください。

      重要: 分析結果、サジェスト、アドバイスのすべてにおいて、必ず「${language === "en" ? "英語 (English)" : "日本語 (Japanese)"}」で出力してください。

      出力スキーマ:
      {
        "score": number, // 0-100 (脈あり度総合指標: 他の5つの軸を統合した、最終的な期待値)
        "metrics": {
          "enthusiasm": number, // 0-100 (熱量・積極性: 返信速度、メッセージの平均文字数、スタンプの頻度)
          "synchronicity": number, // 0-100 (同調性・波長の一致: 語尾、絵文字の傾向、返信のリズムの類似性)
          "balance": number, // 0-100 (均衡度・関係の健全性: 送信比率が5:5に近いか、一方が追いかけていないか)
          "future": number, // 0-100 (未来志向・進展可能性: 「今度」「行きたい」「楽しみ」など、次回の接触への言及)
          "intimacy": number // 0-100 (親密度・精神的距離: 事務連絡ではなく、悩み相談や過去の話など「自己開示」の深さ)
        },
        "analysis": string,
        "suggestions": [
          // 以下の3つのタイプの返信案を必ず提案すること
          { "type": "攻め（好意を伝える）", "text": string, "explanation": string },
          { "type": "バランス（相手に合わせる）", "text": string, "explanation": string },
          { "type": "引き（あえて引く/質問する）", "text": string, "explanation": string }
        ],
        "advice": string // 専門知識・心理学に基づいた詳細な戦略アドバイス（300文字程度）
      }
    `;

    promptParts.push(systemPrompt);

    if (text) promptParts.push(`\n\nチャットテキスト:\n${text}`);

    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString("base64");
      promptParts.push({
        inlineData: {
          data: base64,
          mimeType: image.type,
        },
      });
    }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const textResponse = response.text();

    // console.log("Gemini Raw Response:", textResponse);

    // More robust JSON cleaning: find the first { and last }
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", textResponse);
      throw new Error("Invalid response format");
    }

    const cleanJson = jsonMatch[0];

    try {
      const jsonResponse = JSON.parse(cleanJson);
      return NextResponse.json(jsonResponse);
    } catch (e) {
      console.error("JSON Parse Error:", e, "Cleaned JSON:", cleanJson);
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error("API Error Detail:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
