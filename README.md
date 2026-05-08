# 太平洋クラブ 美野里コース 攻略メモ

太平洋クラブ美野里コース（茨城県）の個人用攻略メモサイト。
ホールごとのレイアウト・攻め方・危険ポイントを記録し、試合当日にスマホで確認するためのもの。

## 構成

```
.
├── index.html        # メインページ
├── styles.css        # スタイル
├── app.js            # 描画ロジック (ESモジュール)
├── data/
│   └── holes.js      # 18ホール分のデータ ← ここを編集
└── .nojekyll         # GitHub Pages 用
```

## ホールデータの編集

`data/holes.js` の各ホールオブジェクトを書き換える。フィールド：

| フィールド | 内容 | 例 |
| --- | --- | --- |
| `number`   | ホール番号 (1–18)               | `1` |
| `par`      | パー (3 / 4 / 5)                | `4` |
| `hdcp`     | ハンディキャップ (1=最難)       | `9` |
| `yardage`  | ティーごとの距離                | `{ back: 400, regular: 378, front: 361, ladies: 291 }` |
| `imageUrl` | ホール俯瞰図のURL               | `"https://shotnavi.jp/.../h1_3.gif"` |
| `layout`   | ホールの形状                    | `"緩やかな右ドッグレッグ"` |
| `strategy` | 攻め方                          | `"フェアウェイ左サイドが安全"` |
| `dangers`  | 危険ポイント (配列)             | `["右OB", "残り100yから池"]` |
| `clubs`    | クラブ選択                      | `{ tee: "ドライバー", second: "7I" }` |
| `green`    | グリーンの特徴                  | `"受けグリーン、奥が低い"` |
| `notes`    | その他メモ                      | `"風を読む"` |

空欄でよいフィールドは空文字 `""` または空配列 `[]` のままにしておけば、UIには「未入力」と表示される（一部は非表示）。

### データ出典

- **パー / ヤード**: 楽天GORA - <https://booking.gora.golf.rakuten.co.jp/guide/course_info/layout/disp/c_id/80113>
- **ホール俯瞰図 (距離マーカー付き)**: ShotNavi - <https://shotnavi.jp/gcguide/cdata/cdata_182_0.htm>

画像はホットリンクで参照しており、リポジトリには同梱していません。著作権は各サイトに帰属します。本サイトは個人用メモであり再配布目的ではありません。

## ローカルで確認する

`type="module"` を使っているため、`file://` で開くと CORS で動かない。簡易サーバーを立てる。

```bash
# Python 3
python3 -m http.server 8000

# Node (npx必要)
npx --yes serve .
```

ブラウザで <http://localhost:8000> を開く。

## GitHub Pages で公開する

1. GitHub にこのリポジトリを push
2. リポジトリ → Settings → Pages
3. **Source** を `Deploy from a branch` に設定
4. **Branch** を `main` / `(root)` に設定して保存
5. 数分待つと `https://<ユーザー名>.github.io/taiheiyou-minori/` で公開される

ビルド不要。`data/holes.js` を編集して push すれば即反映。

## 試合当日の使い方

- スマホでサイトを開く（事前に開いておけばオフラインでもキャッシュから表示されることが多い）
- 上部の `OUT` / `IN` ナビからホール番号をタップで該当ホールへジャンプ
- 危険ポイントは赤帯で強調表示
- 印刷すれば紙のメモとしても使える（ナビは非表示）
