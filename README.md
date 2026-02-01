# Cupid Agent 💘

**Psychology × AI Strategist (恋愛心理学 × AI参謀)**

> 恋愛の駆け引きや繊細なメッセージ表現に疲れた現代人に送るAIサイト。
> 自分の口調などを学習したAIが、デートに繋げる最高の返信を考えます。
> ちょっと奥手なあなたにも最高の体験を。

An AI platform dedicated to modern people exhausted by the subtleties and mind games of dating. Our AI learns from your tone and style to craft the perfect replies that help lead to a date. We provide a supportive and empowering experience, even for the shyest among us.

## ✨ Features

- **❤️ Pulse Check (脈あり診断)**
  - Analyzes specific chat messages or screenshots to quantify interest levels (0-100%).
  - テキストや画像から相手の感情分析を行い、興味の度合いを可視化します。

- **💬 AI Reply Generation (返信自動生成)**
  - Generates optimal reply options tailored to the situation to keep the conversation flowing.
  - 状況に合わせて、今すぐ送れる最適な返信メッセージを3パターン提案します。

- **🧠 Psychological Approach (心理学的アプローチ)**
  - Offers advice based on psychological principles like the Zeigarnik effect and Mirroring.
  - ザイガンスーク効果やミラーリングなど、心理学に基づいた具体的なアドバイスを提供します。

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **AI Model**: [Google Gemini Pro](https://deepmind.google/technologies/gemini/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/soft-dev-UK/cupid-ai.git
   cd cupid-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Gemini API key.
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser.
