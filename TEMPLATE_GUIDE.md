# LP テンプレート 制作ガイド

Next.js (App Router) + TypeScript で整骨院・治療院向け静的 LP を量産するためのテンプレートです。

## ディレクトリ構成

```
lp-template/
  app/
    globals.css          # デザイントークン・共通スタイル
    layout.tsx           # ルートレイアウト（meta は content.json から自動生成）
    page.tsx             # トップページ
    symptoms/[slug]/     # 施術ページ（症状ごとに自動生成）
    flow/                # 施術の流れ
    pricing/             # 料金
    access/              # アクセス
    staff/               # スタッフ
  components/            # 全セクションコンポーネント（props で content.json を受け取る）
  lib/
    content.ts           # SiteContent 型定義
  content.example.json   # データスキーマのサンプル（→ content.json にコピーして使う）
  content.json           # 実データ（.gitignore 対象・クライアントごとに作成）
```

## 新規クライアントの制作手順

### STEP 1: リポジトリ準備

```bash
git clone https://github.com/yukiya-sakamoto/lp-template.git {client}-lp
cd {client}-lp
npm install
cp content.example.json content.json
```

### STEP 2: 情報収集・スクレイピング

既存 HP・エキテン・ホットペッパー・EPARK などから以下を収集:

- 院名・住所・電話番号・営業時間
- キャッチコピー・院長メッセージ
- 施術メニュー・料金表
- 患者の声（口コミ）
- スタッフ情報
- 写真 URL（外観・院内・スタッフ）
- YouTube 動画 ID（施術動画がある場合）

### STEP 3: content.json を埋める

`content.example.json` を参考に `content.json` を編集。  
型定義は `lib/content.ts` の `SiteContent` を参照。

### STEP 4: 動作確認

```bash
npm run dev      # ローカル確認
npm run build    # 静的ビルド（out/ に出力）
```

### STEP 5: デプロイ

```bash
# GitHub Pages / Vercel / Netlify など
git add -A && git commit -m "feat: {client名} LP 初版"
git push
```

---

## カラートークン

`app/globals.css` で定義。変更は1ファイルで全体に反映。

| トークン          | 用途                         | デフォルト値 |
|-------------------|------------------------------|-------------|
| Orange primary    | ボタン・アクセント           | `#D96B0B`   |
| Orange dark       | ホバー時                     | `#B85808`   |
| Orange light bg   | セクション背景               | `#FEF3E8`   |
| Orange border     | カード枠                     | `#F5DCC2`   |
| Green accent      | サブアクセント・バッジ       | `#05AF4B`   |
| Green light bg    | 営業時間・インフォボックス   | `#EAF7F1`   |
| Cream bg          | メイン背景（温かみ）         | `#FDFAF6`   |
| Warm bg           | セクション交互背景           | `#F7F0E6`   |
| Border warm       | カード・セパレーター         | `#EDE0CC`   |

別の院のカラーに変える場合は `app/globals.css` の `:root` ブロックにある CSS 変数を変更するだけで全体に反映されます。

---

## content.json スキーマ

詳細は `lib/content.ts` の `SiteContent` 型を参照。  
`content.example.json` に全フィールドのサンプルあり。

### 最低限必要なフィールド

```json
{
  "meta":    { "title", "description", "siteUrl" },
  "clinic":  { "name", "branch", "tel", "telFormatted", "address", "hours", "access", "parking", "insurance", "mapUrl" },
  "hero":    { "catchcopy", "subcopy", "lead", "image" },
  "features": [...],
  "about":   { "heading", "body", "director" },
  "symptoms": [...],
  "flow":    [...],
  "voices":  [...],
  "staff":   [...],
  "pricing": { "insurance", "extras", "insuranceTypes" },
  "images":  { "exterior", "interior", "parking" }
}
```

### YouTube 動画の埋め込み

`symptoms` の各エントリに `videos` 配列で動画 ID を追加:

```json
{
  "slug": "katakori",
  "videos": ["A_Etwx12Rd0", "Qa-eS5Zk1Yc"],
  ...
}
```

---

## よくある調整

- **配色変更**: `app/globals.css` の `:root` ブロックの CSS 変数を変更（コンポーネントは `var(--color-primary)` 等で参照しているため個別編集不要）
- **症状ページ追加**: `content.json` の `symptoms` 配列にエントリ追加 → 自動でページ生成
- **セクション削除**: `app/page.tsx` から該当コンポーネントを削除
- **フォント変更**: `globals.css` の `font-family` を変更
