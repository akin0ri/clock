# Lab Clock

シンプルな時計とカウントダウンタイマーのWebアプリケーション

## 機能

- 現在時刻の表示（HH:mm:ss）
- 現在日付の表示（YYYY/MM/DD）  
- 最大5つまでの期限設定とカウントダウン表示
- ローカルストレージによるデータ保存
- タイムゾーン: JST

## 技術スタック

- React
- TypeScript
- Vite

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# GitHub Pages用ビルド
npm run build:gh-pages
```

## デプロイ

GitHub Actionsを使用して、mainブランチへのプッシュ時に自動的にGitHub Pagesへデプロイされます。
