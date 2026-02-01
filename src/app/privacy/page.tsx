import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
                <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    トップページに戻る (Back to Home)
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">プライバシーポリシー (Privacy Policy)</h1>

                <div className="space-y-6 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">1. はじめに</h2>
                        <p>
                            Cupid Agent（以下「当サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
                            本ポリシーでは、当サービスにおける情報の収集、利用、管理について説明します。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">2. 収集する情報</h2>
                        <p>
                            当サービスは、ユーザーが入力したチャット履歴やテキストデータ、およびアップロードされた画像データを、AI分析および返信生成の目的でのみ使用します。
                            これらのデータは、ユーザーのブラウザセッション内で一時的に処理されるか、APIを通じてAIモデルに送信されますが、
                            当サービスのサーバー上に永続的に保存され、個人を特定する形で蓄積されることは原則としてありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">3. AIモデルによる情報の利用</h2>
                        <p>
                            当サービスは Google Gemini API 等のサードパーティAIサービスを使用しています。
                            入力されたデータは、分析および回答生成のためにこれらのサービスプロバイダーに送信されます。
                            入力データがAIの学習データとして使用されるかどうかは、各プロバイダーの利用規約およびポリシーに準拠します。
                            機密性の高い個人情報（本名、住所、電話番号など）の入力はお控えください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cookie等の利用</h2>
                        <p>
                            当サービスでは、利用状況の分析やサービス改善のためにCookieまたは類似の技術を使用する場合があります。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 mb-3">5. お問い合わせ</h2>
                        <p>
                            本ポリシーに関するご質問は、開発元の連絡先（GitHubリポジトリ等に記載）までお問い合わせください。
                        </p>
                    </section>

                    <hr className="my-8 border-gray-200" />

                    <section className="text-sm text-gray-600">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">English Summary</h2>
                        <p className="mb-2"><strong>Data Usage:</strong> We respect your privacy. Text and images you input are used solely for generating AI responses and analysis.</p>
                        <p className="mb-2"><strong>AI Processing:</strong> Data is processed via third-party AI APIs (e.g., Google Gemini). Please avoid inputting sensitive personal information.</p>
                        <p><strong>Storage:</strong> We do not permanently store your personal conversation data on our servers.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
