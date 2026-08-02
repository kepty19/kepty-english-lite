# Kepty English Lite

無料体験版（GitHub Pages 想定）。有料版アプリとは**別リポジトリ**です。

## できること
- トレーニング 8 モジュール（教材は静的 JSON）
- Vocabulary 等の TTS 再生
- 端末内の学習状態（localStorage）

## 制限
- Shadowing の音源再生不可
- 録音の共有不可（問い合わせ誘導）
- 個人同期 / LINE 連携なし

## ローカル確認
リポジトリ直下で静的サーバを起動してください（例: `python3 -m http.server 8080`）。
`http://localhost:8080/` → `training.html`

## データ
- `data/portal-data.json` … 教材一式（本番 GAS からの読み取りエクスポート。音声 URL は除去済み）
