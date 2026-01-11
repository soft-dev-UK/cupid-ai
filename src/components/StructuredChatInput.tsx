"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Heart, Image as ImageIcon, X, Trash2, RotateCcw } from "lucide-react";

export interface Message {
    id: string;
    sender: "me" | "partner";
    text: string;
    image?: File;
}

interface StructuredChatInputProps {
    messages: Message[];
    onMessagesChange: (messages: Message[]) => void;
    onSubmit: (formattedText: string, images: File[]) => void;
    onBack: () => void;
    lang: "ja" | "en";
}

export default function StructuredChatInput({
    messages,
    onMessagesChange,
    onSubmit,
    onBack,
    lang,
}: StructuredChatInputProps) {
    // const [messages, setMessages] = useState<Message[]>([]); // Lifted to parent
    const [currentText, setCurrentText] = useState("");
    const [currentSender, setCurrentSender] = useState<"me" | "partner">("partner");
    const [currentImage, setCurrentImage] = useState<File | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleAddMessage = () => {
        if (!currentText.trim() && !currentImage) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            sender: currentSender,
            text: currentText,
            image: currentImage || undefined,
        };

        onMessagesChange([...messages, newMessage]);
        setCurrentText("");
        setCurrentImage(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.nativeEvent.isComposing || (e.key === "Enter" && e.shiftKey)) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            handleAddMessage();
        }
    };

    const handleDeleteMessage = (id: string) => {
        onMessagesChange(messages.filter((m) => m.id !== id));
    };

    const handleResetChat = () => {
        if (window.confirm(lang === "ja" ? "会話履歴をすべて消去しますか？" : "Clear all chat history?")) {
            onMessagesChange([]);
        }
    };

    const handleAnalyzeStart = () => {
        if (messages.length === 0) return;

        // Format transcript
        const transcript = messages
            .map(
                (m) =>
                    `[${m.sender === "me" ? (lang === "ja" ? "自分" : "Me") : (lang === "ja" ? "相手" : "Partner")}]: ${m.text} ${m.image ? (lang === "ja" ? "(画像添付)" : "(Image Attached)") : ""
                    }`
            )
            .join("\n");

        const images = messages
            .filter((m) => m.image !== undefined)
            .map((m) => m.image!);

        onSubmit(transcript, images);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setCurrentImage(e.target.files[0]);
        }
    };

    return (
        <div className="w-full flex flex-col h-full max-h-[600px]">
            <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-800">{lang === "ja" ? "会話を入力" : "Enter Chat"}</h2>
                    {messages.length > 0 && (
                        <button
                            onClick={handleResetChat}
                            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                        >
                            <RotateCcw className="w-3 h-3" />
                            {lang === "ja" ? "リセット" : "Reset"}
                        </button>
                    )}
                </div>
                <div className="text-sm text-gray-500">
                    {messages.length} {lang === "ja" ? "通のメッセージ" : "messages"}
                </div>
            </div>

            {/* Message List Area */}
            <div className="flex-grow overflow-y-auto bg-white/30 rounded-2xl p-4 mb-4 border border-white/40 shadow-inner">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <p>{lang === "ja" ? "まだメッセージがありません" : "No messages yet"}</p>
                        <p className="text-sm mt-2">{lang === "ja" ? "下のフォームから会話を追加してください" : "Add conversation from the form below"}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence initial={false}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"
                                        } group relative`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl relative ${msg.sender === "me"
                                            ? "bg-rose-100 text-gray-800 rounded-tr-none" // Light pink for me
                                            : "bg-blue-100 text-gray-800 rounded-tl-none" // Light blue for partner
                                            }`}
                                    >
                                        <div className="text-xs opacity-70 mb-1">
                                            {msg.sender === "me" ? (lang === "ja" ? "自分" : "Me") : (lang === "ja" ? "相手" : "Partner")}
                                        </div>
                                        {msg.image && (
                                            <img
                                                src={URL.createObjectURL(msg.image)}
                                                alt="attachment"
                                                className="w-full h-32 object-cover rounded-lg mb-2"
                                            />
                                        )}
                                        <p className="whitespace-pre-wrap">{msg.text}</p>

                                        <button
                                            onClick={() => handleDeleteMessage(msg.id)}
                                            className="absolute -top-2 -right-2 bg-gray-200 text-gray-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-500"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t border-white/40 pt-4">
                {/* Sender Toggle */}
                <div className="flex gap-2 mb-3">
                    <button
                        onClick={() => setCurrentSender("partner")}
                        className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${currentSender === "partner"
                            ? "bg-white/80 text-gray-800 border-2 border-blue-200 font-bold shadow-sm"
                            : "text-gray-500 hover:bg-white/30"
                            }`}
                    >
                        <User className="w-4 h-4" />
                        {lang === "ja" ? "相手" : "Partner"}
                    </button>
                    <button
                        onClick={() => setCurrentSender("me")}
                        className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 transition-all ${currentSender === "me"
                            ? "bg-white/80 text-rose-600 border-2 border-rose-200 font-bold shadow-sm"
                            : "text-gray-500 hover:bg-white/30"
                            }`}
                    >
                        <Heart className="w-4 h-4" />
                        {lang === "ja" ? "自分" : "Me"}
                    </button>
                </div>

                {/* Text Input */}
                <div className="flex gap-2 items-end">
                    <div className="relative flex-grow">
                        <textarea
                            value={currentText}
                            onChange={(e) => setCurrentText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={`${currentSender === "me" ? (lang === "ja" ? "自分" : "My") : (lang === "ja" ? "相手" : "Partner's")
                                }${lang === "ja" ? "のメッセージを入力..." : " message..."}`}
                            className="w-full bg-white/80 border-2 border-white rounded-2xl p-3 pl-3 pr-10 min-h-[50px] max-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white transition-all shadow-sm placeholder-gray-400 text-gray-700 font-medium"
                        />
                        <div className="absolute right-2 bottom-2 flex gap-1">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className={`p-2 rounded-full transition-colors ${currentImage ? "bg-rose-100 text-rose-500" : "text-gray-400 hover:bg-gray-100"
                                    }`}
                            >
                                <ImageIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleAddMessage}
                        disabled={!currentText.trim() && !currentImage}
                        className="p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                />
                {currentImage && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-2 rounded-lg inline-block">
                        <ImageIcon className="w-4 h-4" />
                        {currentImage.name}
                        <button onClick={() => setCurrentImage(null)} className="ml-2 hover:text-red-500"><X className="w-3 h-3" /></button>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
                <button
                    onClick={onBack}
                    className="text-gray-500 hover:text-gray-700 underline text-sm"
                >
                    {lang === "ja" ? "戻る" : "Back"}
                </button>
                <button
                    onClick={handleAnalyzeStart}
                    disabled={messages.length === 0}
                    className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {lang === "ja" ? "この内容で分析する" : "Analyze Chat"}
                </button>
            </div>
        </div>
    );
}
