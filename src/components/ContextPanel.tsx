"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Info, Flag, Users, MessageSquare, Quote } from "lucide-react";

interface ContextData {
    goal: string;
    relation: string;
    names: string;
    topic: string;
}

const GOAL_PRESETS_JA = ["雑談を続ける", "デートに誘う", "電話する", "告白の準備"];
const GOAL_PRESETS_EN = ["Keep Chatting", "Ask on Date", "Make a Call", "Prepare Confession"];

interface ContextPanelProps {
    initialGoal: string;
    onUpdate: (data: ContextData) => void;
    className?: string;
    lang: "ja" | "en";
}

export default function ContextPanel({ initialGoal, onUpdate, className = "", lang }: ContextPanelProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [data, setData] = useState<ContextData>({
        goal: initialGoal,
        relation: "",
        names: "",
        topic: "",
    });

    // Notify parent whenever data changes
    useEffect(() => {
        onUpdate(data);
    }, [data, onUpdate]);

    const handleChange = (field: keyof ContextData, value: string) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className={`bg-white/60 backdrop-blur-md rounded-3xl shadow-sm border border-white/40 overflow-hidden ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/40 hover:bg-white/60 transition-colors"
            >
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                    <Info className="w-5 h-5 text-rose-500" />
                    <span>{lang === "ja" ? "分析コンテキスト設定" : "Analysis Context"}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100"
                    >
                        <div className="p-5 space-y-4">

                            {/* GOAL */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                                    <Flag className="w-4 h-4 text-purple-500" />
                                    {lang === "ja" ? "今回の目標" : "Current Goal"}
                                </label>

                                {/* Preset Buttons */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {(lang === "ja" ? GOAL_PRESETS_JA : GOAL_PRESETS_EN).map((preset) => (
                                        <button
                                            key={preset}
                                            onClick={() => handleChange("goal", preset)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${data.goal === preset
                                                ? "bg-rose-100 text-rose-600 border-rose-200"
                                                : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                                                }`}
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => handleChange("goal", "")}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${!(lang === "ja" ? GOAL_PRESETS_JA : GOAL_PRESETS_EN).includes(data.goal) && data.goal !== ""
                                            ? "bg-rose-100 text-rose-600 border-rose-200"
                                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        {lang === "ja" ? "その他（自由入力）" : "Other (Custom)"}
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    value={data.goal}
                                    onChange={(e) => handleChange("goal", e.target.value)}
                                    placeholder={lang === "ja" ? "例：今度の日曜日にカフェデートに誘いたい" : "e.g. Invite for a coffee date this Sunday"}
                                    className="w-full p-3 text-sm bg-white/50 border border-white/60 rounded-xl focus:ring-2 focus:ring-rose-200 focus:bg-white/80 outline-none transition-all shadow-inner placeholder-gray-400"
                                />
                            </div>

                            {/* RELATION & NAMES */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                                        <Users className="w-4 h-4 text-blue-500" />
                                        {lang === "ja" ? "関係性・背景" : "Relation / Background"}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.relation}
                                        onChange={(e) => handleChange("relation", e.target.value)}
                                        placeholder={lang === "ja" ? "例：マッチングアプリで3日前にマッチ" : "e.g. Matched 3 days ago on app"}
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                                        <Quote className="w-4 h-4 text-green-500" />
                                        {lang === "ja" ? "呼び方 (自分 / 相手)" : "Names (Me / Partner)"}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.names}
                                        onChange={(e) => handleChange("names", e.target.value)}
                                        placeholder={lang === "ja" ? "例：俺 / ○○ちゃん" : "e.g. Me / Sarah"}
                                        className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
                                    />
                                </div>
                            </div>

                            {/* CURRENT TOPIC */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                                    <MessageSquare className="w-4 h-4 text-orange-500" />
                                    {lang === "ja" ? "現在の話題 (任意)" : "Current Topic (Optional)"}
                                </label>
                                <input
                                    type="text"
                                    value={data.topic}
                                    onChange={(e) => handleChange("topic", e.target.value)}
                                    placeholder={lang === "ja" ? "例：休日の過ごし方について話している最中" : "e.g. Talking about weekend plans"}
                                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-200 outline-none"
                                />
                            </div>

                            <p className="text-xs text-right text-gray-400">
                                {lang === "ja" ? "※詳しく書くほど分析精度が向上します" : "* Detailed context improves analysis accuracy"}
                            </p>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
