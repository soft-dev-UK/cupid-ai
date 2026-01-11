"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GoalSelector from "@/components/GoalSelector";
// import ChatInput from "@/components/ChatInput"; // Legacy input
import StructuredChatInput, { Message } from "@/components/StructuredChatInput";
import AnalysisResult from "@/components/AnalysisResult";
import LimitModal from "@/components/LimitModal";
import { useUsageLimit } from "@/hooks/useUsageLimit";
import { Edit2 } from "lucide-react";

import LandingPage from "@/components/LandingPage";
import ContextPanel from "@/components/ContextPanel";
import PrivacyModal from "@/components/PrivacyModal";
import { Globe } from "lucide-react";

type Step = "landing" | "goal" | "input" | "analyzing" | "result";
type GoalType = "date" | "call" | "chat" | "confess";

const translations = {
    ja: {
        title: "Cupid Agent",
        subtitle: "AI恋愛参謀が、最適解を導き出す。",
        chatGoal: "雑談を続ける",
        dateGoal: "デートに誘う",
        callGoal: "電話する",
        confessGoal: "告白の準備",
        footerPrivacy: "個人情報の取り扱いについて",
        analyzing: "分析中...",
        analyzingDesc: "AIが二人の会話から心理状態を読み解いています",
    },
    en: {
        title: "Cupid Agent",
        subtitle: "AI Love Strategist finds your best move.",
        chatGoal: "Keep Chatting",
        dateGoal: "Ask on Date",
        callGoal: "Make a Call",
        confessGoal: "Prepare Confession",
        footerPrivacy: "Privacy Policy",
        analyzing: "Analyzing...",
        analyzingDesc: "AI is decoding the psychological state from your chat",
    }
};

const GOAL_LABELS_JA: Record<GoalType, string> = {
    date: "デートに誘う",
    call: "電話する",
    chat: "雑談を続ける",
    confess: "告白の準備",
};

const GOAL_LABELS_EN: Record<GoalType, string> = {
    date: "Ask on Date",
    call: "Make a Call",
    chat: "Keep Chatting",
    confess: "Prepare Confession",
};

export default function Home() {
    const [step, setStep] = useState<Step>("landing");
    const [lang, setLang] = useState<"ja" | "en">("ja");
    const [showPrivacy, setShowPrivacy] = useState(false);

    // Default goal is 'chat' if coming from landing, but user can change it
    // We keep 'goal' state as the INITIAL value for ContextPanel
    const [initialGoal, setInitialGoal] = useState<string>("雑談を続ける");
    const [contextData, setContextData] = useState<any>({});

    // Lifted Chat State
    const [messages, setMessages] = useState<Message[]>([]);

    const [resultData, setResultData] = useState<any>(null);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isLimitReached, incrementUsage } = useUsageLimit();

    const t = translations[lang];

    const handleGoalSelect = (selectedGoal: GoalType) => {
        const labels = lang === "ja" ? GOAL_LABELS_JA : GOAL_LABELS_EN;
        setInitialGoal(labels[selectedGoal]);
        setStep("input");
        setError(null);
    };

    const handleStart = () => {
        setStep("input");
        setError(null);
        setInitialGoal(lang === "ja" ? "雑談を続ける" : "Keep Chatting");
    };

    const toggleLang = () => {
        setLang(prev => prev === "ja" ? "en" : "ja");
    };

    const handleAnalyze = async (formattedText: string, images: File[]) => {
        setError(null);
        if (isLimitReached) {
            setShowLimitModal(true);
            return;
        }

        setStep("analyzing");

        try {
            const formData = new FormData();
            formData.append("text", formattedText);

            if (images.length > 0) {
                formData.append("image", images[0]);
            }

            // Append enhanced context data
            formData.append("goal", contextData.goal || initialGoal);
            formData.append("relation", contextData.relation || "");
            formData.append("names", contextData.names || "");
            formData.append("topic", contextData.topic || "");
            formData.append("language", lang);

            const res = await fetch("/api/analyze", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Analysis failed");
            }

            const data = await res.json();
            setResultData(data);
            incrementUsage();
            setStep("result");
        } catch (error: any) {
            console.error(error);
            setError(error.message);
            setStep("input");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-[#FFC3D0] via-[#E8DFF5] to-[#AEC6CF] flex flex-col items-center py-8 px-4 font-sans text-gray-700">
            <header className="mb-6 text-center w-full max-w-4xl relative z-50">
                <div className="absolute top-0 right-0">
                    <button
                        onClick={toggleLang}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/40 backdrop-blur-md rounded-full text-xs font-bold text-gray-600 hover:bg-white/60 transition-colors shadow-sm"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        {lang === "ja" ? "JP" : "EN"}
                    </button>
                </div>

                {step !== "landing" && (
                    <div className="pt-2">
                        <button
                            onClick={() => setStep("landing")}
                            className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 tracking-tighter hover:opacity-80 transition-opacity"
                        >
                            {t.title}
                        </button>
                        <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">
                            {t.subtitle}
                        </p>
                    </div>
                )}
            </header>

            <AnimatePresence>
                {showLimitModal && (
                    <LimitModal onClose={() => setShowLimitModal(false)} />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {step === "landing" && (
                    <motion.div
                        key="landing"
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                    >
                        <LandingPage onStart={handleStart} onGoalSelect={handleGoalSelect} lang={lang} />
                    </motion.div>
                )}

                {step === "goal" && (
                    <motion.div
                        key="goal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full"
                    >
                        <GoalSelector onSelect={handleGoalSelect} lang={lang} />
                    </motion.div>
                )}

                {step === "input" && (
                    <motion.div
                        key="input"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-2xl bg-white/60 backdrop-blur-xl border border-white/40 rounded-[40px] shadow-xl p-6 flex items-center justify-center flex-col relative"
                    >
                        {/* Context Panel placed at/near top */}
                        <div className="w-full mb-4">
                            <ContextPanel
                                initialGoal={initialGoal}
                                onUpdate={(data) => setContextData(data)}
                                lang={lang}
                            />
                        </div>

                        {error && (
                            <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{error}</span>
                                <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
                                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                                </span>
                            </div>
                        )}
                        {/* Replaced ChatInput with StructuredChatInput */}
                        <div className="w-full h-[500px]">
                            <StructuredChatInput
                                messages={messages}
                                onMessagesChange={setMessages}
                                onSubmit={handleAnalyze}
                                onBack={() => setStep("landing")}
                                lang={lang}
                            />
                        </div>
                    </motion.div>
                )}

                {step === "analyzing" && (
                    <motion.div
                        key="analyzing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mt-20"
                    >
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rose-500 mx-auto mb-4"></div>
                        <p className="text-xl font-semibold text-gray-700">{t.analyzing}</p>
                        <p className="text-sm text-gray-500 mt-2">{t.analyzingDesc}</p>
                    </motion.div>
                )}

                {step === "result" && resultData && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        {/* onReset now goes back to 'input', preserving state */}
                        <AnalysisResult data={resultData} onReset={() => setStep("input")} lang={lang} />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
