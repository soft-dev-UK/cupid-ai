"use client";

import { motion } from "framer-motion";
import { Heart, MessageCircle, Sparkles, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

interface LandingPageProps {
    onStart: () => void;
    onGoalSelect: (goal: "date" | "call" | "chat" | "confess") => void; // Added missing prop from page.tsx usage
    lang: "ja" | "en";
}

const translations = {
    ja: {
        subtitle1: "恋愛心理学 × AI参謀",
        subtitle2: "あなたのそのメッセージ、AIが",
        pulseCheck: "脈あり診断",
        reply: "最適な返信",
        subtitle3: "を作成します。",
        start: "分析を始める",
        feature1Title: "脈あり度を可視化",
        feature1Desc: "テキストや画像から相手の感情分析を行い、興味の度合いを0〜100%で算出します。",
        feature2Title: "心理学アプローチ",
        feature2Desc: "ザイガンス効果やミラーリングなど、心理学に基づいた具体的なアドバイスを提供します。",
        feature3Title: "返信案を自動生成",
        feature3Desc: "状況に合わせて、今すぐ送れる最適な返信メッセージを3パターン提案します。",
        freeTitle: "毎日無料で使えます",
        freeDesc: "1日10回まで無料で分析が可能です。\nまずはあなたのチャット履歴を入力して、AIの実力を試してみてください。",
        noAccount: "アカウント登録不要",
        anonymous: "完全匿名で安心",
    },
    en: {
        subtitle1: "Psychology × AI Strategist",
        subtitle2: "AI analyzes your chat and creates",
        pulseCheck: "Pulse Check",
        reply: "Best Reply",
        subtitle3: ".",
        start: "Start Analysis",
        feature1Title: "Visualize Interest",
        feature1Desc: "Analyzes emotions from text/images and calculates interest level from 0-100%.",
        feature2Title: "Psychological Approach",
        feature2Desc: "Provides concrete advice based on psychology like Zeigarnik effect and Mirroring.",
        feature3Title: "Auto-Generate Replies",
        feature3Desc: "Proposes 3 optimal reply patterns tailored to the situation.",
        freeTitle: "Free to Use Daily",
        freeDesc: "Analyze up to 10 times a day for free.\nTry it now and see what AI can do.",
        noAccount: "No Account Needed",
        anonymous: "100% Anonymous",
    }
};

export default function LandingPage({ onStart, lang }: LandingPageProps) {
    const t = translations[lang];
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto space-y-8">

            {/* Hero Section */}
            <div className="text-center space-y-6 pt-10 pb-6">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center mb-4"
                >
                    <div className="bg-white/40 p-4 rounded-full backdrop-blur-md border border-white/50 shadow-inner">
                        <div className="bg-gradient-to-tr from-rose-300 to-blue-300 p-3 rounded-full shadow-lg">
                            <Heart className="w-12 h-12 text-white fill-white/90" />
                        </div>
                    </div>
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm select-none">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-blue-500 drop-shadow-sm">
                        Cupid Agent
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed">
                    {t.subtitle1}<br />
                    {t.subtitle2}<span className="text-rose-400 font-bold">{t.pulseCheck}</span> ＆ <span className="text-blue-400 font-bold">{t.reply}</span>{t.subtitle3}
                </p>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(253 164 175 / 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-400 to-blue-400 text-white px-10 py-4 rounded-full text-xl font-bold shadow-lg shadow-rose-200 transition-all"
                >
                    <span className="flex items-center gap-2">
                        {t.start} <ArrowRight className="w-6 h-6" />
                    </span>
                </motion.button>
            </div>

            {/* Features Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
                {[
                    {
                        icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
                        title: t.feature1Title,
                        desc: t.feature1Desc,
                        bg: "bg-blue-50"
                    },
                    {
                        icon: <Zap className="w-6 h-6 text-yellow-500" />,
                        title: t.feature2Title,
                        desc: t.feature2Desc,
                        bg: "bg-yellow-50"
                    },
                    {
                        icon: <Sparkles className="w-6 h-6 text-rose-500" />,
                        title: t.feature3Title,
                        desc: t.feature3Desc,
                        bg: "bg-rose-50"
                    }
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/60 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                    >
                        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20 transition-transform group-hover:scale-110 ${feature.bg.replace('50', '200')}`}></div>
                        <div className={`w-12 h-12 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 shadow-inner`}>
                            {feature.icon}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Pricing / Trust */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-3xl bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-6 text-center shadow-sm mx-4"
            >
                <div className="flex flex-col items-center justify-center gap-2 text-gray-700">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        {t.freeTitle}
                    </h3>
                    <p className="text-sm text-gray-500 whitespace-pre-wrap">
                        {t.freeDesc}
                    </p>
                    <div className="mt-4 flex gap-4 text-xs text-gray-400 font-medium">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-400 rounded-full"></div> {t.noAccount}</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> {t.anonymous}</span>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
