"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Image as ImageIcon, Send } from "lucide-react";

interface ChatInputProps {
    onSubmit: (text: string, image: File | null) => void;
    onBack: () => void;
}

export default function ChatInput({ onSubmit, onBack }: ChatInputProps) {
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type.startsWith("image/")) {
            setImage(file);
        } else {
            alert("画像ファイルのみアップロード可能です");
        }
    };

    const handleSubmit = () => {
        if (!text && !image) return;
        onSubmit(text, image);
    };

    // Paste event handler for images
    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
                const file = items[i].getAsFile();
                if (file) handleFile(file);
            }
        }
    };

    return (
        <div className="w-full flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
                分析するチャットを入力
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
                テキストをコピーするか、スクリーンショットを貼り付けてください
            </p>

            <div
                className={`flex-grow relative border-2 border-dashed rounded-xl transition-all duration-300 ${dragActive ? "border-rose-500 bg-rose-50" : "border-gray-200 bg-gray-50"
                    } p-4 flex flex-col`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <textarea
                    className="w-full h-full bg-transparent resize-none outline-none text-gray-700 placeholder-gray-400 z-10"
                    placeholder="ここにチャット履歴を貼り付け..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPaste={handlePaste}
                />

                <AnimatePresence>
                    {image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute bottom-4 right-4 z-20 group"
                        >
                            <div className="relative">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Upload preview"
                                    className="h-24 w-auto rounded-lg shadow-md border border-white"
                                />
                                <button
                                    onClick={() => setImage(null)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!image && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <Upload className="w-24 h-24 text-gray-400" />
                    </div>
                )}
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="flex gap-2">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        戻る
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
                        title="画像をアップロード"
                    >
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-sm">画像を追加</span>
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={!text && !image}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all ${!text && !image
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-rose-500 to-blue-600 text-white hover:shadow-rose-200/50 hover:scale-105"
                        }`}
                >
                    <Send className="w-4 h-4" />
                    分析スタート
                </button>
            </div>
        </div>
    );
}
