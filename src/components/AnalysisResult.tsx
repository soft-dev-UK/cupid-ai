"use client";

import { motion } from "framer-motion";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
} from "recharts";
import { Check, Copy, RefreshCw, Heart, Sparkles, Zap, RotateCcw } from "lucide-react";
import { useState } from "react";

interface Suggestion {
    type?: string;
    text: string;
    explanation: string;
}

interface AnalysisData {
    score: number;
    metrics: {
        enthusiasm: number;
        synchronicity: number;
        balance: number;
        future: number;
        intimacy: number;
    };
    analysis: string;
    suggestions: Suggestion[];
    advice: string;
}

interface AnalysisResultProps {
    data: AnalysisData;
    onReset: () => void;
    lang: "ja" | "en";
}

const TRANSLATIONS = {
    ja: {
        scoreTitle: "診断結果",
        pulseScore: "脈あり度",
        chartTitle: "分析チャート",
        chartDesc: "6つの指標でバランスを分析",
        suggestionsTitle: "AI参謀の返信案",
        planPrefix: "プラン",
        copyTitle: "コピー",
        adviceTitle: "ワンポイントアドバイス",
        retry: "もう一度分析する",
        axes: {
            score: "脈あり度",
            enthusiasm: "熱量",
            synchronicity: "同調性",
            balance: "均衡度",
            future: "未来志向",
            intimacy: "親密度",
        }
    },
    en: {
        scoreTitle: "Analysis Result",
        pulseScore: "Pulse Score",
        chartTitle: "Analysis Chart",
        chartDesc: "Balance analysis with 6 metrics",
        suggestionsTitle: "AI Suggestions",
        planPrefix: "Plan",
        copyTitle: "Copy",
        adviceTitle: "Key Advice",
        retry: "Analyze Again",
        axes: {
            score: "Score",
            enthusiasm: "Enthusiasm",
            synchronicity: "Sync",
            balance: "Balance",
            future: "Future",
            intimacy: "Intimacy",
        }
    }
};

export default function AnalysisResult({ data, onReset, lang }: AnalysisResultProps) {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const t = TRANSLATIONS[lang];

    const chartData = [
        {
            subject: t.axes.score,
            A: data.score,
            fullMark: 100,
        },
        {
            subject: t.axes.enthusiasm,
            A: data.metrics.enthusiasm,
            fullMark: 100,
        },
        {
            subject: t.axes.synchronicity,
            A: data.metrics.synchronicity,
            fullMark: 100,
        },
        {
            subject: t.axes.balance,
            A: data.metrics.balance,
            fullMark: 100,
        },
        {
            subject: t.axes.future,
            A: data.metrics.future,
            fullMark: 100,
        },
        {
            subject: t.axes.intimacy,
            A: data.metrics.intimacy,
            fullMark: 100,
        },
    ];

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto w-full space-y-6">

            {/* Score Card */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-blue-400" />
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{t.scoreTitle}</h2>
                <div className="flex items-center justify-center gap-4 mb-6">
                    <Heart className={`w-8 h-8 ${data.score >= 70 ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`} />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                        {t.pulseScore} <span
                            className={`bg-clip-text text-transparent bg-gradient-to-r ${data.score >= 80 ? "from-rose-500 to-pink-600" :
                                data.score >= 50 ? "from-purple-500 to-blue-500" :
                                    "from-gray-500 to-gray-700"
                                }`}
                        >
                            {data.score}%
                        </span>
                    </h1>
                </div>
                <div className="w-full bg-white/50 rounded-full h-4 mb-6 overflow-hidden shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data.score}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${data.score >= 80 ? "from-rose-400 to-pink-500" :
                            data.score >= 50 ? "from-purple-400 to-blue-400" :
                                "from-gray-400 to-gray-500"
                            }`}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Radar Chart */}
                <div className="md:col-span-2 bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg flex flex-col items-center justify-center min-h-[300px]">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <div className="w-2 h-6 bg-blue-400 rounded-full" /> {t.chartTitle}
                    </h3>
                    {/* Recharts responsive container needs explicit height in parent */}
                    <div className="w-full h-[250px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Score"
                                    dataKey="A"
                                    stroke="#F472B6"
                                    strokeWidth={3}
                                    fill="#FBCFE8"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{t.chartDesc}</p>
                </div>

                {/* Suggestions */}
                <div className="md:col-span-3 space-y-4">
                    <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            {t.suggestionsTitle}
                        </h3>
                        <div className="space-y-4">
                            {data.suggestions.map((suggestion, idx) => (
                                <div key={idx} className="bg-white/60 border border-white/50 rounded-2xl p-4 transition-all hover:bg-white/80 hover:shadow-md group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${idx === 0 ? "bg-rose-100 text-rose-600" :
                                            idx === 1 ? "bg-blue-100 text-blue-600" :
                                                "bg-green-100 text-green-600"
                                            }`}>
                                            {suggestion.type || `${t.planPrefix} ${idx + 1}`}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(suggestion.text, idx)}
                                            className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title={t.copyTitle}
                                        >
                                            {copiedIndex === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed">{suggestion.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Psychological Advice */}
                    <div className="bg-gradient-to-br from-rose-50/80 to-purple-50/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
                        <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-purple-500" />
                            {t.adviceTitle}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                            {data.advice}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center pt-6 pb-12">
                <button
                    onClick={onReset}
                    className="group flex items-center gap-2 bg-white/50 hover:bg-white text-gray-600 px-6 py-3 rounded-full font-bold shadow-sm hover:shadow-md transition-all border border-white/60"
                >
                    <RotateCcw className="w-4 h-4 group-hover:-rotate-180 transition-transform duration-500" />
                    {t.retry}
                </button>
            </div>
        </div>
    );
}
