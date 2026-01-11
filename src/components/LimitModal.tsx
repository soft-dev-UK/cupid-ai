"use client";

import { motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

interface LimitModalProps {
    onClose: () => void;
}

export default function LimitModal({ onClose }: LimitModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="mb-6">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">💖</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                        本日の回数制限です
                    </h3>
                    <p className="text-gray-500 mt-2">
                        無料版の利用は1日10回までです。続きはOrynthでプロ版をチェック！
                    </p>
                </div>

                <a
                    href="https://orynth.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all mb-4 flex items-center justify-center gap-2"
                >
                    <span>プロ版を見る</span>
                    <ExternalLink className="w-4 h-4" />
                </a>

                <button
                    onClick={onClose}
                    className="text-gray-400 text-sm hover:underline"
                >
                    明日また来てね
                </button>
            </motion.div>
        </div>
    );
}
