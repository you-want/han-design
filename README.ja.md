# 汉 · Han

AI Agent 向けの中国文化デザイン Skill です。宣紙、墨、朱紅、書道、巻物、伝統的な構図を、再利用可能なデザイントークン、テーマ、視覚レシピ、文化的判断ルールへと変換します。

**言語 / Languages：** [简体中文](README.md) · [English](README.en.md) · [日本語](README.ja.md)（現在） · [한국어](README.ko.md)

## なぜ「Han」なのか

身分証明書には漢族と書かれており、私たちは漢語を話し、漢字を書いている。私たちが作ったこの中国風デザインシステムは、当然 han-design と呼ぶべきものです。

## 特徴

- 7 つの王朝テーマ：秦漢、魏晋、唐、宋、元、明、清
- 9 つの文化テーマ：水墨、青緑山水、青花磁、敦煌、宮廷金、武俠、茶、朱砂、青磁
- 完全な CSS トークン、コンポーネント、アイコン、文様、モーション
- 6 つの全ページ Starter：ブランド、プロダクト、ダッシュボード、展示、イベント、長文
- テーマ、視覚強度、コンテンツ補完、スクリーンショット振り返りをサポートする自動運転デザインフロー
- 標準的な Agent Skill frontmatter と独立してインストール可能なディレクトリ
- レスポンシブ、キーボードフォーカス、reduced-motion のベースラインサポート
- ビルドステップ不要の静的 HTML サンプル

## 現在のバージョン

Han の現在のバージョンは `v0.1.0-preview.0` で、インストール試用、ページ生成、フィードバック収集に適しています。これはデザイン Skill と視覚アセットパックであり、汎用フロントエンドコンポーネントライブラリではありません。複雑なインタラクションは引き続き対象プロジェクト既存のネイティブまたはアクセシブルなコンポーネントを使用してください。

## リポジトリ構成

```text
han/
├── .codex-plugin/plugin.json   # Codex Plugin マニフェスト
├── skills/
│   └── han-design/              # 独立してインストール可能な Skill
│       ├── SKILL.md
│       ├── agents/openai.yaml
│       ├── references/
│       └── assets/
│           ├── han.css          # 完全 CSS エントリ
│           ├── han-scoped.css   # トークンとルールが data-han-scope に制約
│           ├── base.css         # 完全エントリのみが使用するグローバルベーススタイル
│           ├── utilities.css    # scoped 安全なレイアウトとタイポグラフィユーティリティ
│           ├── accessibility.css
│           ├── fonts.css        # オプションのリモートフォント
│           ├── *.css
│           └── snippets/
├── examples/                    # デモサイト、Skill/Plugin コアには含まれない
├── scripts/validate.mjs
├── vercel.json
├── LICENSE
└── README.md
```

## Agent Skill としてインストール

リポジトリをクローン：

```bash
git clone https://github.com/you-want/han-design.git han
```

インストール可能な Skill ディレクトリは：

```text
skills/han-design
```

Agent Skills の推奨共通インストール先は `~/.agents/skills/` です：

```bash
mkdir -p "$HOME/.agents/skills"
cp -R skills/han-design "$HOME/.agents/skills/han-design"
```

PowerShell：

```powershell
New-Item -ItemType Directory -Force "$HOME/.agents/skills" | Out-Null
Copy-Item -Recurse -Force "skills/han-design" "$HOME/.agents/skills/han-design"
```

Codex は引き続き `~/.codex/skills/` をサポートします。Agent Skills をサポートする他のツールは、そのインストーラや設定を `skills/han-design/` に向けてください。ツールごとに自動検出ディレクトリは異なります。

リポジトリルートには `.codex-plugin/plugin.json` も含まれており、Codex Plugin ソースとして使用できます。リポジトリのサンプルやサードパーティのデモ画像を含まないリリースディレクトリを生成：

```bash
node scripts/package-plugin.mjs
```

インストール後、次のように呼び出せます：

> han-design を使って、控えめな宋風のプロダクトランディングページを生成して。

> han-design で現在のページをリファクタリングし、既存の React コンポーネントとインタラクションを維持して。

設計判断を Han に直接任せることもできます：

> han-design を使って、現在のページをより美しくして。プロジェクトを確認した上でページタイプ、テーマ、視覚強度を自分で判断し、機能と技術スタックを維持し、デスクトップとモバイルの確認を完了して 1 ラウンド修正して。

ユーザーはテーマ ID、コンポーネントのクラス名、どの Starter を使うべきかを知る必要はありません。Han はまず内部デザインブリーフを生成し、その後全ページ構図、テーマ、視覚強度、コンテンツ補完戦略を選択します。

コピーして使える呼び出しタスクは [Skill 呼び出し例](examples/skill-prompts.md) を参照してください。

## CSS を直接使用

`skills/han-design/assets/` をプロジェクトにコピーします。単体ページは完全エントリを使用：

```html
<!-- オプション：jsDelivr と Google Fonts からフォントを読み込みます -->
<link rel="stylesheet" href="/han/fonts.css">

<!-- デザイントークン、テーマ、すべてのコンポーネント -->
<link rel="stylesheet" href="/han/han.css">
```

既存のアプリやデザインシステムは、グローバルリセットを含まないエントリを使用してください：

```html
<link rel="stylesheet" href="/han/han-scoped.css">

<section data-han-scope data-theme="song">
  <button type="button" class="han-btn-seal">確認</button>
</section>
```

`han-scoped.css` は `:root` に Han トークンを定義せず、グローバルの `body`、見出し、段落、リンク、フォームコントロール、メディア要素、スクロールバーも変更しません。トークン、ダークモード、テーマ変数は `data-han-scope` 内でのみ有効です。レイアウトの基礎と要素のデフォルトスタイルは引き続きホストプロジェクトが担います。

テーマを選択：

```html
<html lang="zh-CN" data-theme="song">
```

ダークモード：

```html
<html lang="zh-CN" data-theme="song" data-color-mode="dark">
```

Han のコアリリースは `skills/han-design/` Skill パッケージであり、npm コンポーネントライブラリを目指すものではありません。アセットをコピーした後、単体ページは `han.css`、既存アプリは `han-scoped.css` を使用します。

## テーマ

### 王朝テーマ

これらのテーマは現代ウェブ向けの視覚的解釈であり、歴史的復元でも、ある王朝の視覚文化のすべてを代表するものでもありません。

| テーマ | `data-theme` | 雰囲気 |
|---|---|---|
| 秦漢 | `qinhan` | 漆器、石刻、重厚な素材感 |
| 魏晋 | `weijin` | 飄逸で清冽 |
| 唐 | `tang` | 雍容で明麗 |
| 宋 | `song` | 清雅で控えめ |
| 元 | `yuan` | 多元的、コントラストが鋭い |
| 明 | `ming` | 精緻で整然 |
| 清 | `qing` | 華麗で繁複 |

### 文化テーマ

| テーマ | `data-theme` |
|---|---|
| 水墨 | `ink` |
| 青緑山水 | `landscape` |
| 青花磁 | `porcelain` |
| 敦煌 | `dunhuang` |
| 宮廷金 | `imperial` |
| 武俠玄墨 | `wuxia` |
| 現代茶空間 | `tea` |
| 朱砂喜慶 | `vermilion` |
| 青磁 | `celadon` |

### 現代カラーテーマ

これらのテーマはリポジトリ内参考画像のカラーカードから翻訳されたもので、現代ウェブ向けのカラーシステムであり、いかなる公式通貨カラー仕様でもありません。

| テーマ | `data-theme` | 雰囲気 |
|---|---|---|
| 松麦 | `pine-wheat` | 自然、清新、静謐 |
| 藤紫 | `plum-blush` | 柔らか、ロマンチック、ライトラグジュアリー |
| 海蘭 | `ocean-orchid` | 冷静、清透、優雅 |
| 焦糖 | `caramel-cream` | 暖かい、ヴィンテージ、高級 |
| 薄荷 | `mint-lavender` | 清透、自然、軽やか |
| 莓果 | `berry-butter` | 明快、トレンディ、活気 |

## サンプル

- [クイックスタート](examples/quick-start.html) — 完全構造サンプル
- [Mac コンセプトページ](examples/mac-han.html) — 完全構造サンプル、画像ライセンスは下記説明参照
- [スコープテーマ統合](examples/scoped-integration.html) — scoped CSS 完全構造サンプル
- [ブランド視覚実験](examples/landing-page.html) — 静的視覚リファレンス
- [テーマショーケース](examples/theme-showcase.html) — 静的視覚リファレンス
- [完全コンポーネントショーケース](examples/showcase.html) — 静的視覚リファレンス
- [単一コンポーネントサンプル](examples/components/) — 静的視覚リファレンス

`examples/` は独立したデモサイトであり、Skill や Plugin のコアリリースには含まれず、コア有効性判定にも関与しません。サンプルはリポジトリ内の相対パスを使用し、静的サイトとして直接デプロイできます。完全構造／視覚リファレンスの等級は `examples/validation.json` に記録されています。Vercel 設定はホームページをブランド視覚実験ページにマッピングします。

`data-han-static-reference="true"` を持つページは視覚状態のみを表示します。Modal、Tabs、カスタム Select、Date Picker、Tree、Upload などの複雑なコントロールは、表示構造をコピーするだけでは本番に使用できません。コンポーネントカタログに従ってキーボード、フォーカス、状態、ARIA を補完するか、Han スタイルを対象プロジェクトの既存アクセシブルコンポーネントに適用してください。

## Skill リソース

- [Skill 指示](skills/han-design/SKILL.md)
- [詳細デザインガイド](skills/han-design/references/design-guide.md)
- [現代カラーテーマ](skills/han-design/references/contemporary-palettes.md)
- [コンポーネントカタログ](skills/han-design/references/component-catalog.md)
- [文化方法論](skills/han-design/references/cultural-methodology.md)
- [王朝テーマ境界](skills/han-design/references/dynasty-contexts.md)
- [文様セマンティクス](skills/han-design/references/motif-semantics.md)
- [書道と印章](skills/han-design/references/calligraphy-and-seals.md)
- [地域、民族、生活文化](skills/han-design/references/regional-and-ethnic-contexts.md)
- [文化出典索引](skills/han-design/references/cultural-sources.md)
- [タスクレシピ](skills/han-design/references/task-recipes.md)
- [自動運転とデザインブリーフ](skills/han-design/references/autopilot.md)
- [ページタイプと全ページ Starter](skills/han-design/references/page-archetypes.md)
- [視覚レビューと二次修正](skills/han-design/references/visual-review.md)
- [出力品質評価](skills/han-design/references/output-evaluation.md)
- [完全 CSS エントリ](skills/han-design/assets/han.css)
- [Scoped CSS エントリ](skills/han-design/assets/han-scoped.css)
- [HTML snippets](skills/han-design/assets/snippets/)
- [単体 HTML 出力チェック](skills/han-design/scripts/check-output.mjs)
- [ブラウザ出力チェック](skills/han-design/scripts/check-browser-output.mjs)

Skill は参照ドキュメントをオンデマンドで読み込み、各タスク開始時にすべての CSS を読み込むわけではありません。全ページを新築する際は、`skills/han-design/assets/starters/` からブランド、プロダクト、ダッシュボード、展示、イベント、長文の構図を優先的に選択し、対象フレームワークに翻訳してください。

視覚強度は 4 段階あります：`0` はトークン層のみ、ダッシュボード向け；`1` は控えめ、プロダクトとブランドページ向け；`2` は鮮明、茶、工芸、文化ブランド向け；`3` はドラマチック、祭典、展示、ゲームイベント向け。これは装飾の予算であり、ページにコンポーネントを積み増す要求ではありません。

## 開発と検証

コア Skill / Plugin 検証：

```bash
npm ci
npm run generate:scoped
npm run validate
npm run eval:check
npm run test:browser
npm run check:browser-output -- --strict tests/fixtures/scoped-host.html
npm run package:plugin
```

`check-output.mjs` は依存関係ゼロの静的事前チェックです；`check-browser-output.mjs` は Playwright と axe を使い、ブラウザで計算後のアクセシビリティ、フォーカス、横方向オーバーフロー、ランタイム例外、reduced-motion を検査します。

`evals/cases.json` はもはやスキーマ検証のみを行いません。実際のフォワードテストは adapter 経由で実行されます：

```bash
node scripts/run-evals.mjs --adapter /path/to/agent-adapter.mjs
```

adapter は標準入力から case id とユーザープロンプトのみを受け取り、`shouldTrigger`、期待される reference、期待されるエントリポイントは見えません。それは `triggered`、`references`、`assetEntry`、およびオプションで `starter`、`intensity`、`designBrief`、`reviewedViewports`、`revisionPerformed`、`checksPassed`、`outputPath` を出力します。自動運転ケースは、Agent が本当にデザインブリーフ、デスクトップとモバイルのレビュー、少なくとも 1 ラウンドの修正を完了し、チェックが通るまで対処可能な問題を修正したかを確認します。リポジトリは汎用の外部 Agent command adapter を提供します：

```bash
HAN_EVAL_AGENT=/path/to/agent \
HAN_EVAL_AGENT_ARGS='["arguments","for-a-fresh-session"]' \
node scripts/run-evals.mjs --adapter scripts/eval-adapters/agent-command.mjs
```

`evals/fixtures/smoke-adapter.mjs` は runner パイプラインのみを検証します。`--allow-smoke-adapter` を明示的に渡す必要があり、モデル品質の結果としては扱えません。

サンプルサイトの検証は別途実行：

```bash
node scripts/validate-examples.mjs
```

検証内容：

- Skill frontmatter とディレクトリ命名
- 必須ファイルとローカル参照
- CSS カスタムプロパティ
- テーマ機能色のコントラストとセマンティックトークン
- 文化 references と高リスクの絶対的表現
- HTML snippet の基本的なセマンティック問題
- Plugin マニフェストと scoped CSS エントリ
- Skill eval ケース構造
- 実行可能 eval runner と adapter 結果スコアリング
- ダークモード機能色のコントラスト
- Skill パッケージ内部参照とリリースパッケージ境界
- 公式 Skill/Plugin validator スナップショット
- Playwright、axe、scoped 分離、キーボード、reduced-motion テスト

GitHub Actions は 2 つの独立ジョブを使用します：`Validate Skill and Plugin core` はリポジトリ検証、Codex 標準 validator スナップショット、eval runner 契約、Playwright/axe ブラウザテスト、リリースパッケージ再検証を実行します；`Validate demo website` は README とサンプルサイトを個別にチェックします。サンプルサイトの問題は Skill schema やランタイムパッケージの問題としては記述されません。

## 貢献

テーマ、コンポーネント、アクセシビリティ修正、サンプル、ドキュメント改善の貢献を歓迎します。

1. リポジトリをフォークし、機能ブランチを作成します。
2. Skill、assets、references、evals、Plugin マニフェストを修正した後、`node scripts/validate.mjs` を実行します。
3. `examples/`、README のサンプルリンク、Vercel ページを修正した後、`node scripts/validate-examples.mjs` を実行します。
4. 新規コンポーネントにはスタイル、成熟度説明、サンプルを含めてください；複雑なインタラクションはキーボード、フォーカス、状態、ARIA の挙動を説明する必要があります。
5. Pull Request を提出し、視覚的意図と検証方法を説明してください。

歴史、地域、民族、宗教、文様、生活文化の内容を新規追加する際は、出典、適用境界、現代翻訳の説明も提供してください。

## フォントとネットワーク

`fonts.css` は LXGW WenKai、Noto Serif SC、Noto Sans SC を読み込みます。オフライン、厳格な CSP、プライバシー重視、または中国大陸のネットワーク環境では、このファイルを読み込まず、デザイントークンで定義されたシステムフォントのフォールバックを使用するか、フォントを自己ホストすることを推奨します。

## License

[MIT](LICENSE)

MIT ライセンスは Han 自身のコード、ドキュメント、自作アセットをカバーし、サードパーティのデモ素材を自動的にカバーしません。`examples/assets/apple-mac/` は `scripts/package-plugin.mjs` が生成する Plugin リリースディレクトリには含まれません。正確な境界は [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) を参照してください。
