// 太平洋クラブ美野里コース 18ホールデータ
//
// 出典:
//   - パー / ヤード: 楽天GORA (https://booking.gora.golf.rakuten.co.jp/...c_id/80113)
//   - ホール俯瞰図 + 詳細ページ: ShotNavi (https://shotnavi.jp/gcguide/cdata/cdata_182_0.htm)
//
// strategy / dangers / clubs はホール俯瞰図(ShotNavi)から
// AIが視覚的に読み取った推奨ライン。実際のラウンド経験で上書きしてください。
//
// フィールド説明:
//   number    : ホール番号 (1-18)
//   par       : パー (3, 4, 5)
//   hdcp      : ハンディキャップ (1=最難 ~ 18=最易)
//   yardage   : 各ティーからの距離 { back, regular, front, ladies } (Y)
//   imageUrl  : ホールレイアウト画像URL
//   detailUrl : ShotNavi詳細ページ (タップで距離計測機能が使える)
//   layout    : レイアウト・形状の説明
//   strategy  : 攻め方
//   dangers   : 危険ポイント (配列)
//   clubs     : クラブ選択 { tee, second, approach }
//   green     : グリーンの特徴
//   notes     : その他メモ

export const COURSE_NAME = "太平洋クラブ 美野里コース";

export const COURSE_INFO = {
  location: "茨城県小美玉市三箇952",
  totalYardage: 6946,
  par: 72,
  designer: "倉上俊治",
  greenType: "ベント (1グリーン)",
  terrain: "林間 / フラット",
};

// ShotNavi のサブコース ID
const CID = { out: 1927, in: 4179 };

const layoutImg = (n) => {
  const cid = n <= 9 ? CID.out : CID.in;
  const idx = n <= 9 ? n : n - 9;
  return `https://shotnavi.jp/gcguide/cdata/cimg_182_${cid}_h${idx}_3.gif`;
};

const detailPage = (n) => {
  const cid = n <= 9 ? CID.out : CID.in;
  const idx = n <= 9 ? n : n - 9;
  return `https://shotnavi.jp/gcguide/cdata/hdata_182_${cid}_${idx}.htm`;
};

export const holes = [
  // ====== OUT ======
  {
    number: 1, par: 4, hdcp: 9,
    yardage: { back: 400, regular: 378, front: 361, ladies: 291 },
    imageUrl: layoutImg(1),
    detailUrl: detailPage(1),
    layout: "緩やかな右カーブのストレートホール。フェアウェイは比較的広い。",
    strategy: "開幕ホールは無理せず中央狙い。ティーショットは右220y付近のFWバンカー手前を意識し、240yラインまでに収めると次打がフラットなライ。",
    dangers: [
      "右220y付近にFWバンカー",
      "残り100y地点にクロスバンカー",
      "グリーン左右にガードバンカー",
    ],
    clubs: { tee: "ドライバー (右バンカー手前)", second: "7-8I", approach: "" },
    green: "グリーン左右をバンカーがガード",
    notes: "",
  },
  {
    number: 2, par: 5, hdcp: 3,
    yardage: { back: 533, regular: 509, front: 481, ladies: 411 },
    imageUrl: layoutImg(2),
    detailUrl: detailPage(2),
    layout: "緩やかにうねるロングホール。中盤からフェアウェイ幅が狭まる。",
    strategy: "3オン狙いが基本。ティーショットは250y地点の左右FWバンカー間を抜く。2打目は残り150-180y残せる位置にレイアップ。",
    dangers: [
      "200-260y付近に複数のFWバンカー (左右両サイド)",
      "350y付近にもFWバンカー",
      "グリーン左にガードバンカー",
    ],
    clubs: { tee: "ドライバー", second: "5W or UT (レイアップ)", approach: "8-9I" },
    green: "",
    notes: "HDCP3 — パーセーブで儲けもの",
  },
  {
    number: 3, par: 3, hdcp: 15,
    yardage: { back: 171, regular: 149, front: 126, ladies: 113 },
    imageUrl: layoutImg(3),
    detailUrl: detailPage(3),
    layout: "ショートホール。グリーン奥〜左に大きな池が広がる。",
    strategy: "オーバー絶対NG。番手はやや短めに取って確実にグリーンセンター狙い。ピンが奥でも無理せず手前から。",
    dangers: [
      "グリーン奥〜左サイドに広い池",
      "グリーン右にバンカー",
      "グリーン手前左にもバンカー",
    ],
    clubs: { tee: "6-7I (ピンより1番手短く)", second: "", approach: "" },
    green: "池に背を向けるピン位置に注意。下りパットになりやすい",
    notes: "",
  },
  {
    number: 4, par: 4, hdcp: 1,
    yardage: { back: 406, regular: 387, front: 374, ladies: 307 },
    imageUrl: layoutImg(4),
    detailUrl: detailPage(4),
    layout: "ティー前面に池。フェアウェイ中盤でS字に折れる長いPar 4。",
    strategy: "最難ホール。ティーは確実に池をキャリーできる距離(150y+)を最優先。FWバンカーが多いので、ドライバー使うなら左右バンカー間を狙う。3オン+2パットでボギーで上等。",
    dangers: [
      "ティー前面に池 (キャリー必要)",
      "220y付近右にFWバンカー2連",
      "320y付近左にFWバンカー",
      "グリーン左にガードバンカー",
    ],
    clubs: { tee: "ドライバー or 3W (確実性優先)", second: "ロングアイアン or UT", approach: "" },
    green: "",
    notes: "HDCP1 最難ホール。無理せずボギーオン狙いも有効",
  },
  {
    number: 5, par: 4, hdcp: 7,
    yardage: { back: 396, regular: 357, front: 345, ladies: 317 },
    imageUrl: layoutImg(5),
    detailUrl: detailPage(5),
    layout: "右ドッグレッグ。右サイド全面に複数の池が連続して配置。",
    strategy: "右の池は完全にデッドゾーン。ティーは思い切り左サイド狙い。FWバンカー覚悟でも池よりはマシ。レギュラーなら3W/UTで180y地点レイアップ→残り180y打つ手も。",
    dangers: [
      "右サイド200y〜300yに連続した池",
      "左200y/300y付近FWバンカー",
      "グリーン手前にも池",
    ],
    clubs: { tee: "3W or UT (左サイド)", second: "5-7I", approach: "" },
    green: "",
    notes: "右に絶対飛ばさない。左ミスで命拾いするホール",
  },
  {
    number: 6, par: 4, hdcp: 13,
    yardage: { back: 378, regular: 354, front: 337, ladies: 278 },
    imageUrl: layoutImg(6),
    detailUrl: detailPage(6),
    layout: "ストレート気味のPar 4。右サイドに点在する池とフェアウェイ左にバンカー。",
    strategy: "中央〜やや左狙い。グリーン奥右にも池があるのでアプローチはショート気味で。ピンデッドより手前から確実に。",
    dangers: [
      "右サイドに小池が点在 (200-300y)",
      "200y/300y左にFWバンカー",
      "グリーン奥右に池",
    ],
    clubs: { tee: "ドライバー (中央〜左)", second: "7-8I", approach: "" },
    green: "奥が低い受けグリーンの可能性、ショート目で",
    notes: "",
  },
  {
    number: 7, par: 4, hdcp: 17,
    yardage: { back: 340, regular: 327, front: 318, ladies: 274 },
    imageUrl: layoutImg(7),
    detailUrl: detailPage(7),
    layout: "短いPar 4。フェアウェイ右に大きく食い込む池が最大の障害。",
    strategy: "距離が短いのでドライバー不要。3W/UTで190-200y地点に置き、池を完全に避ける。残り130y前後でショートアイアンのアプローチ。",
    dangers: [
      "右サイド200y地点に大きな池",
      "200y/300y左にFWバンカー",
      "グリーン左にバンカー",
    ],
    clubs: { tee: "3W or UT (190y地点まで)", second: "8-9I", approach: "" },
    green: "",
    notes: "HDCP17 最易ホール。ボギー以下を死守",
  },
  {
    number: 8, par: 3, hdcp: 11,
    yardage: { back: 180, regular: 165, front: 148, ladies: 108 },
    imageUrl: layoutImg(8),
    detailUrl: detailPage(8),
    layout: "ミドルレングスのPar 3。グリーン手前〜右に大きな池。",
    strategy: "右の池は絶対NG。グリーンセンターやや左サイド狙い。番手しっかり選んで池越えのキャリーを最優先。風があれば1番手大きく。",
    dangers: [
      "グリーン手前〜右に大きな池",
      "グリーン左にガードバンカー",
      "オーバーで奥の林",
    ],
    clubs: { tee: "5-6I (風なら1番手大きく)", second: "", approach: "" },
    green: "右に向かって傾斜の可能性、ピン右ならショート目に",
    notes: "",
  },
  {
    number: 9, par: 5, hdcp: 5,
    yardage: { back: 581, regular: 561, front: 528, ladies: 430 },
    imageUrl: layoutImg(9),
    detailUrl: detailPage(9),
    layout: "581Yの超ロングPar 5。緩やかな右カーブ、グリーン手前左に池。",
    strategy: "確実な3オン狙い。ティーはとにかく飛距離。2打目は残り100y池に絶対届かない位置(150-180y地点)にレイアップ。3打目で池越えウェッジ。",
    dangers: [
      "280y/340y付近右にFWバンカー",
      "グリーン手前左に池",
      "グリーン左サイドのバンカー",
    ],
    clubs: { tee: "ドライバー (距離最優先)", second: "5W or UT (レイアップ)", approach: "PW-9I" },
    green: "",
    notes: "前半最長ホール。3打目で池越えのプレッシャーに勝つ",
  },
  // ====== IN ======
  {
    number: 10, par: 4, hdcp: 10,
    yardage: { back: 411, regular: 381, front: 367, ladies: 346 },
    imageUrl: layoutImg(10),
    detailUrl: detailPage(10),
    layout: "後半スタートの長いPar 4。緩やかな右カーブ。",
    strategy: "距離があるのでドライバー必須。中央〜やや左狙い。第2打は150-180y残しでロングアイアン or UT。",
    dangers: [
      "250y付近にFWバンカー",
      "350-400y付近左右にガードバンカー",
      "グリーン左にバンカー",
    ],
    clubs: { tee: "ドライバー", second: "5-6I or UT", approach: "" },
    green: "",
    notes: "",
  },
  {
    number: 11, par: 4, hdcp: 16,
    yardage: { back: 371, regular: 353, front: 338, ladies: 327 },
    imageUrl: layoutImg(11),
    detailUrl: detailPage(11),
    layout: "池が多いPar 4。ティー前面と左サイド200y付近に池が広がる。",
    strategy: "池越え必要。ティーは確実に160y+のキャリーが出るクラブ。左の池を避けて右サイド狙い。距離は短いので無理しない。",
    dangers: [
      "ティー前面に池 (80-130y)",
      "左200y付近に池",
      "グリーン左にバンカー、右にも小バンカー",
    ],
    clubs: { tee: "3W or UT (右サイド)", second: "8-9I", approach: "" },
    green: "",
    notes: "池に何度も囲まれるので心理的プレッシャーに注意",
  },
  {
    number: 12, par: 5, hdcp: 4,
    yardage: { back: 512, regular: 482, front: 468, ladies: 437 },
    imageUrl: layoutImg(12),
    detailUrl: detailPage(12),
    layout: "Par 5。緩やかな右カーブ、フェアウェイ周辺に池とバンカーが点在。",
    strategy: "飛距離より位置取り重視。ティーは250y地点のFWバンカー手前。2打目はクロスバンカー手前にレイアップして残り100-120y。",
    dangers: [
      "250y/350y付近に左右の池",
      "100y付近クロスバンカー",
      "グリーン左にバンカー",
    ],
    clubs: { tee: "ドライバー or 3W", second: "5-6I (レイアップ)", approach: "PW" },
    green: "",
    notes: "HDCP4 — 距離より精度",
  },
  {
    number: 13, par: 3, hdcp: 14,
    yardage: { back: 188, regular: 173, front: 161, ladies: 129 },
    imageUrl: layoutImg(13),
    detailUrl: detailPage(13),
    layout: "距離長めのPar 3。グリーン左に大きなバンカー複合、右にも小バンカー。",
    strategy: "番手しっかり (3-5I)。グリーン中央〜右狙い。ショートよりロング目に。フックは左バンカーに捕まりやすい。",
    dangers: [
      "グリーン左に大きなバンカー (奥行きあり)",
      "グリーン右に小バンカー",
      "100y付近にクロスハザード",
    ],
    clubs: { tee: "3-5I (風次第で大きめ)", second: "", approach: "" },
    green: "左バンカーから上りのアプローチに",
    notes: "",
  },
  {
    number: 14, par: 4, hdcp: 8,
    yardage: { back: 389, regular: 319, front: 306, ladies: 269 },
    imageUrl: layoutImg(14),
    detailUrl: detailPage(14),
    layout: "比較的ストレートなPar 4。フェアウェイ広めで障害少なめ。",
    strategy: "ティーは中央狙いでOK。第2打のグリーン手前バンカーを越せる距離が必要。レギュラー(319y)なら短いのでチャンスホール。",
    dangers: [
      "350-400y付近左右にFWバンカー (グリーン手前)",
      "グリーン左奥にバンカー",
    ],
    clubs: { tee: "ドライバー", second: "8-9I (バンカー越え)", approach: "" },
    green: "",
    notes: "ボギーペース崩したくないホール",
  },
  {
    number: 15, par: 4, hdcp: 2,
    yardage: { back: 407, regular: 398, front: 357, ladies: 306 },
    imageUrl: layoutImg(15),
    detailUrl: detailPage(15),
    layout: "緩やかな左ドッグレッグ気味。フェアウェイは曲線的。",
    strategy: "ティーは右サイド狙いで距離稼ぐ。FWバンカーを避けて中央〜右へ。距離あるのでHDCP2の名に恥じない難しさ、パーで上等。",
    dangers: [
      "200y付近左にFWバンカー",
      "グリーン左右にバンカー",
    ],
    clubs: { tee: "ドライバー (右サイド)", second: "5-7I", approach: "" },
    green: "",
    notes: "HDCP2 — パーオンできれば成功",
  },
  {
    number: 16, par: 3, hdcp: 18,
    yardage: { back: 198, regular: 172, front: 155, ladies: 136 },
    imageUrl: layoutImg(16),
    detailUrl: detailPage(16),
    layout: "池越えのPar 3。グリーン手前に大きな池。",
    strategy: "池越えのプレッシャーが最大。198y(BACK)ならキャリーが出る番手で。確実にグリーンに乗せる。バンカーに入っても池よりマシ。",
    dangers: [
      "グリーン手前に大きな池",
      "グリーン左右にバンカー",
    ],
    clubs: { tee: "4-5I (BACK), 6-7I (REG)", second: "", approach: "" },
    green: "",
    notes: "HDCP18だが池越えは精神的に重い",
  },
  {
    number: 17, par: 5, hdcp: 6,
    yardage: { back: 510, regular: 498, front: 462, ladies: 395 },
    imageUrl: layoutImg(17),
    detailUrl: detailPage(17),
    layout: "緩やかな左カーブのPar 5。比較的素直なレイアウト。",
    strategy: "距離はあるが障害少なめ。ティーは中央〜やや左狙い。3打目で残り120-130y残しのレイアップ戦略が安全。チャンスホール。",
    dangers: [
      "200y付近FWバンカー",
      "350y付近にFWバンカー",
      "グリーン手前左にバンカー",
    ],
    clubs: { tee: "ドライバー", second: "5W (距離稼ぎ) or UT (レイアップ)", approach: "PW-9I" },
    green: "",
    notes: "上がり前のスコアメイクポイント",
  },
  {
    number: 18, par: 4, hdcp: 12,
    yardage: { back: 420, regular: 401, front: 379, ladies: 311 },
    imageUrl: layoutImg(18),
    detailUrl: detailPage(18),
    layout: "最終ホール。長めのPar 4、グリーン右に大きな池。",
    strategy: "ドライバーで距離稼ぐ。第2打のグリーン右の池が最大の罠。ややグリーン左サイドを狙ってアプローチ。フェード持ちは特に注意。",
    dangers: [
      "グリーン右に大きな池",
      "200y付近FWバンカー",
      "グリーン左奥にバンカー",
    ],
    clubs: { tee: "ドライバー", second: "5-7I (グリーン左狙い)", approach: "" },
    green: "右に外せない。手前か左に外すのが安全",
    notes: "上がりの最終ホール、ナイスフィニッシュで締め",
  },
];
