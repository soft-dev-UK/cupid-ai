"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, ShieldCheck, Database, Server } from "lucide-react";

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: "ja" | "en";
}

export default function PrivacyModal({ isOpen, onClose, lang }: PrivacyModalProps) {
    const t = {
        ja: {
            title: "個人情報の取り扱いについて",
            intro: "本サービスでは、お客様のプライバシーを最優先に考え、以下の通りデータを慎重に取り扱っています。",
            point1Title: "AI分析のためのデータ利用",
            point1Desc: "入力されたチャット内容や画像は、AIによる分析（脈あり診断）の目的でのみ使用され、一時的にGoogle Gemini APIへ送信されます。",
            point2Title: "データの保存について",
            point2Desc: "当サービスはお客様の個人情報（チャット履歴、画像、分析結果）をサーバー等のデータベースに永続的に保存することは一切ありません。ブラウザを閉じるとデータは消去されます。",
            point3Title: "第三者への提供",
            point3Desc: "法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。",
            close: "閉じる"
        },
        en: {
            title: "Privacy Policy",
            intro: "We prioritize your privacy and handle your data with the utmost care as described below.",
            point1Title: "Data Usage for AI Analysis",
            point1Desc: "Input chat logs and images are sent to the Google Gemini API solely for the purpose of analysis (Pulse Check).",
            point2Title: "Data Storage",
            point2Desc: "We do NOT permanently store your personal information (chat history, images, analysis results) on our servers. Data is cleared when you close the browser.",
            point3Title: "Third-Party Sharing",
            point3Desc: "We do not share your personal information with third parties without your consent, except as required by law.",
            close: "Close"
        }
    };

    const content = t[lang];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-lg border border-white/50"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Lock className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                {content.title}
                            </h2>
                        </div>

                        <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                            {content.intro}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <Server className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-700 text-sm mb-1">{content.point1Title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{content.point1Desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <Database className="w-5 h-5 text-rose-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-700 text-sm mb-1">{content.point2Title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{content.point2Desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-700 text-sm mb-1">{content.point3Title}</h3>
                                    <p className="text-xs text-gray-500 leading-relaxed">{content.point3Desc}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-transform active:scale-[0.98]"
                        >
                            {content.close}
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
