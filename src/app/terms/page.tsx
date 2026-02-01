import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページに戻る (Back to Home)
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">利用規約 (Terms of Service)</h1>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. 規約への同意</h2>
                        <p>
                            本規約は、Cupid Agent（以下「当サービス」）の利用条件を定めるものです。
                            ユーザーは、当サービスを利用することにより、本規約に同意したものとみなされます。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. サービスの性質と免責事項</h2>
                        <p>
                            当サービスはAIを用いて恋愛相談やメッセージ作成支援を行いますが、そのアドバイスの正確性、有用性、
                            または実際の結果（デートの成功など）を保証するものではありません。
                            AIの回答に基づいて生じた利用者間のトラブルや損害について、運営者は一切の責任を負いません。
                            最終的な判断と行動は、ユーザー自身の責任において行ってください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. 禁止事項</h2>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>他人の個人情報を同意なく入力する行為</li>
                            <li>当サービスのシステムに過度な負荷をかける行為</li>
                            <li>その他、運営者が不適切と判断する行為</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. サービスの変更・終了</h2>
                        <p>
                            運営者は、ユーザーへの事前の通知なく、当サービスの内容を変更、一時停止、または終了することができるものとします。
                        </p>
                    </section>

                    <hr className="my-8 border-gray-200" />

                    <section className="text-sm text-gray-600">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">English Summary</h2>
                        <p className="mb-2"><strong>Agreement:</strong> By using this service, you agree to these terms.</p>
                        <p className="mb-2"><strong>Disclaimer:</strong> This service uses AI for advice but guarantees no specific real-world results. Users are responsible for their own actions and interactions.</p>
                        <p><strong>Prohibitions:</strong> Illegal acts, inputting others' private data without consent, and abusing the system are prohibited.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
