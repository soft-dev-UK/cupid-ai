"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Coffee, Heart } from "lucide-react";

type GoalType = "date" | "call" | "chat" | "confess";

interface GoalSelectorProps {
    onSelect: (goal: GoalType) => void;
    lang: "ja" | "en";
}

export default function GoalSelector({ onSelect, lang }: GoalSelectorProps) {
    const goals = [
        {
            id: "date",
            label: lang === "ja" ? "デートに誘う" : "Ask on Date",
            icon: <Coffee className="w-8 h-8 mb-2 text-rose-500" />,
            desc: lang === "ja" ? "自然な流れで食事や遊びに誘いたい" : "Invite them naturally for food or fun",
        },
        {
            id: "call",
            label: lang === "ja" ? "電話する" : "Make a Call",
            icon: <Phone className="w-8 h-8 mb-2 text-blue-500" />,
            desc: lang === "ja" ? "もっと距離を縮めるために通話したい" : "Talk to get closer",
        },
        {
            id: "chat",
            label: lang === "ja" ? "雑談を続ける" : "Keep Chatting",
            icon: <MessageCircle className="w-8 h-8 mb-2 text-green-500" />,
            desc: lang === "ja" ? "途切れないように会話を盛り上げたい" : "Keep the conversation lively",
        },
        {
            id: "confess",
            label: lang === "ja" ? "告白の準備" : "Prepare Confession",
            icon: <Heart className="w-8 h-8 mb-2 text-red-500" />,
            desc: lang === "ja" ? "脈ありか確かめて次のステップへ" : "Check if they like you and move forward",
        },
    ];

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-center mb-8 text-gray-800"
            >
                {lang === "ja" ? "今の目標は？" : "What is your goal?"}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal, index) => (
                    <motion.button
                        key={goal.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(goal.id as GoalType)}
                        className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-rose-200 hover:shadow-md transition-all duration-300"
                    >
                        {goal.icon}
                        <span className="text-lg font-semibold text-gray-800">
                            {goal.label}
                        </span>
                        <span className="text-sm text-gray-500 mt-2">{goal.desc}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
