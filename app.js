import { holes, COURSE_NAME, COURSE_INFO, rakutenLayoutImg } from "./data/holes.js";

const app = document.getElementById("app");
const backToTop = document.getElementById("backToTop");

const escapeHtml = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

document.title = `${COURSE_NAME} 攻略メモ`;

// =========================================================
// Router
// =========================================================
const parseRoute = () => {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "/print") return { name: "print" };
  const m = hash.match(/^\/hole\/(\d+)$/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (n >= 1 && n <= 18) return { name: "hole", number: n };
  }
  return { name: "index" };
};

const navigate = (path) => {
  window.location.hash = path;
};

// =========================================================
// Helpers
// =========================================================
const sumBack = (range) =>
  holes
    .filter((h) => range.includes(h.number))
    .reduce((s, h) => s + (Number(h.yardage?.back) || 0), 0);

const sumPar = (range) =>
  holes
    .filter((h) => range.includes(h.number))
    .reduce((s, h) => s + (Number(h.par) || 0), 0);

const yardCell = (v) => {
  const empty = v === undefined || v === null || v === "";
  if (empty) return `<span class="yardage__value yardage__value--empty">—</span>`;
  return `<span class="yardage__value">${escapeHtml(v)}<small>y</small></span>`;
};

// =========================================================
// Index view (overview / scorecard)
// =========================================================
const renderCourseInfo = () => {
  const info = COURSE_INFO || {};
  const items = [
    info.par ? `Par ${info.par}` : null,
    info.totalYardage ? `${info.totalYardage.toLocaleString()}Y` : null,
    info.terrain || null,
    info.greenType || null,
    info.designer ? `設計: ${info.designer}` : null,
  ].filter(Boolean);
  return `
    <section class="course-info">
      <h1 class="course-info__title">${escapeHtml(COURSE_NAME)}</h1>
      <p class="course-info__subtitle">攻略メモ / Hole Strategy</p>
      ${info.location ? `<p class="course-info__location">${escapeHtml(info.location)}</p>` : ""}
      ${items.length ? `<p class="course-info__meta">${items.map(escapeHtml).join(" / ")}</p>` : ""}
    </section>
  `;
};

const renderScorecardRow = (hole) => `
  <a class="scorecard__row" href="#/hole/${hole.number}">
    <span class="scorecard__cell scorecard__cell--num">${hole.number}</span>
    <span class="scorecard__cell scorecard__cell--par">
      <span class="par-badge par-badge--${hole.par}">P${hole.par}</span>
    </span>
    <span class="scorecard__cell scorecard__cell--hdcp">${hole.hdcp ?? "—"}</span>
    <span class="scorecard__cell scorecard__cell--yard">${
      hole.yardage?.back ? hole.yardage.back + "Y" : "—"
    }</span>
    <span class="scorecard__cell scorecard__cell--chevron" aria-hidden="true">›</span>
  </a>
`;

const renderScorecardSection = (label, range) => {
  const inRange = holes.filter((h) => range.includes(h.number));
  return `
    <section class="scorecard">
      <header class="scorecard__head">
        <h2 class="scorecard__label">${label}</h2>
        <span class="scorecard__total">
          Par ${sumPar(range)} / ${sumBack(range).toLocaleString()}Y
        </span>
      </header>
      <div class="scorecard__columns">
        <span class="scorecard__col-label scorecard__col-label--num">No.</span>
        <span class="scorecard__col-label scorecard__col-label--par">Par</span>
        <span class="scorecard__col-label scorecard__col-label--hdcp">HDCP</span>
        <span class="scorecard__col-label scorecard__col-label--yard">BACK</span>
        <span class="scorecard__col-label scorecard__col-label--chevron"></span>
      </div>
      <div class="scorecard__rows">
        ${inRange.map(renderScorecardRow).join("")}
      </div>
    </section>
  `;
};

const renderIndex = () => {
  const out = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const inn = [10, 11, 12, 13, 14, 15, 16, 17, 18];
  app.innerHTML = `
    <header class="site-header">
      <div class="site-header__inner">
        <span class="site-header__brand">攻略メモ</span>
      </div>
    </header>
    <main class="page">
      ${renderCourseInfo()}
      ${renderScorecardSection("OUT", out)}
      ${renderScorecardSection("IN", inn)}
      <a class="print-link" href="#/print">🖨 印刷用シート (A4・4ホール×5枚)</a>
      <footer class="site-footer">
        <p>個人的な攻略メモ。</p>
        <p class="site-footer__credit">
          ホール俯瞰図: <a href="https://shotnavi.jp/gcguide/cdata/cdata_182_0.htm" target="_blank" rel="noopener">ShotNavi</a> /
          ヤード・パー: <a href="https://booking.gora.golf.rakuten.co.jp/guide/course_info/layout/disp/c_id/80113" target="_blank" rel="noopener">楽天GORA</a>
        </p>
      </footer>
    </main>
  `;
};

// =========================================================
// Hole detail view
// =========================================================
const renderYardage = (yardage = {}) => {
  const cells = [
    { label: "BACK", key: "back" },
    { label: "REG", key: "regular" },
    { label: "FRONT", key: "front" },
    { label: "LADIES", key: "ladies" },
  ];
  return `
    <div class="yardage" aria-label="ティーごとの距離">
      ${cells
        .map(
          (c) => `
        <div class="yardage__cell">
          <span class="yardage__label">${c.label}</span>
          ${yardCell(yardage[c.key])}
        </div>`,
        )
        .join("")}
    </div>
  `;
};

const renderImage = (url, alt, extraClass = "") => {
  if (!url) return "";
  return `
    <figure class="hole-img ${extraClass}">
      <img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}" loading="lazy" />
    </figure>
  `;
};

const renderTextField = (label, value, opts = {}) => {
  const empty = value === null || value === undefined || value === "";
  if (empty && opts.hideIfEmpty) return "";
  const cls = opts.className ? ` ${opts.className}` : "";
  return `
    <div class="field${cls}">
      <span class="field__label">${escapeHtml(label)}</span>
      <p class="field__value ${empty ? "field__value--empty" : ""}">${
        empty ? "未入力" : escapeHtml(value)
      }</p>
    </div>
  `;
};

const renderDangers = (dangers = []) => {
  if (!Array.isArray(dangers) || dangers.length === 0) {
    return `
      <div class="field dangers">
        <span class="field__label">危険ポイント</span>
        <p class="field__value field__value--empty">未入力</p>
      </div>
    `;
  }
  return `
    <div class="field dangers">
      <span class="field__label">危険ポイント</span>
      <ul>
        ${dangers.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}
      </ul>
    </div>
  `;
};

const renderClubs = (clubs = {}) => {
  const cells = [
    { label: "ティー", key: "tee" },
    { label: "セカンド", key: "second" },
    { label: "アプローチ", key: "approach" },
  ];
  const allEmpty = cells.every((c) => !clubs[c.key]);
  if (allEmpty) return "";
  return `
    <div class="field">
      <span class="field__label">クラブ選択</span>
      <div class="club-grid">
        ${cells
          .map((c) => {
            const v = clubs[c.key];
            const isEmpty = !v;
            return `
          <div class="club-grid__cell">
            <span class="club-grid__label">${c.label}</span>
            <span class="club-grid__value ${
              isEmpty ? "club-grid__value--empty" : ""
            }">${isEmpty ? "—" : escapeHtml(v)}</span>
          </div>`;
          })
          .join("")}
      </div>
    </div>
  `;
};

const renderGreenSection = (hole) => {
  // グリーン画像は明示指定が空なら楽天画像にフォールバック
  const greenImg = hole.imageGreenUrl || rakutenLayoutImg(hole.number);
  const hasGreen = !!hole.green;
  const hasAround = !!hole.greenAround;
  if (!greenImg && !hasGreen && !hasAround) return "";
  return `
    <section class="green-section">
      <h3 class="green-section__title">グリーン</h3>
      ${
        greenImg
          ? `
        <figure class="hole-img hole-img--green">
          <div class="hole-img--green__crop">
            <img src="${escapeHtml(greenImg)}" alt="HOLE ${hole.number} グリーン周り" loading="lazy" />
          </div>
          <a class="hole-img--green__expand" href="${escapeHtml(greenImg)}" target="_blank" rel="noopener">全体を見る ↗</a>
        </figure>
      `
          : ""
      }
      ${renderTextField("グリーン", hole.green, { hideIfEmpty: true })}
      ${renderTextField("グリーン周り", hole.greenAround, { hideIfEmpty: true })}
    </section>
  `;
};

const renderHole = (number) => {
  const hole = holes.find((h) => h.number === number);
  if (!hole) {
    renderIndex();
    return;
  }
  const prev = number > 1 ? number - 1 : null;
  const next = number < 18 ? number + 1 : null;

  app.innerHTML = `
    <header class="site-header site-header--hole">
      <div class="site-header__inner">
        <a class="site-header__back" href="#/" aria-label="一覧へ戻る">
          <span class="site-header__back-icon">‹</span>
          <span>一覧</span>
        </a>
        <span class="site-header__title">HOLE ${hole.number}</span>
        <div class="site-header__paginate">
          ${prev ? `<a class="site-header__nav" href="#/hole/${prev}" aria-label="前のホール">‹</a>` : `<span class="site-header__nav site-header__nav--disabled" aria-hidden="true">‹</span>`}
          ${next ? `<a class="site-header__nav" href="#/hole/${next}" aria-label="次のホール">›</a>` : `<span class="site-header__nav site-header__nav--disabled" aria-hidden="true">›</span>`}
        </div>
      </div>
    </header>

    <main class="page page--hole">
      <article class="hole">
        <header class="hole__title-bar">
          <div class="hole__number">
            <span class="hole__number-label">HOLE</span>
            <span class="hole__number-value">${hole.number}</span>
          </div>
          <div class="hole__meta">
            <span class="par-badge par-badge--${hole.par}">PAR ${hole.par}</span>
            ${hole.hdcp ? `<span class="hole__hdcp">HDCP <strong>${hole.hdcp}</strong></span>` : ""}
          </div>
        </header>

        <div class="hole__body">
          ${renderYardage(hole.yardage)}
          ${renderImage(hole.imageUrl, `HOLE ${hole.number} レイアウト図`, "hole-img--layout")}
          ${
            hole.detailUrl
              ? `<a class="hole__detail-link" href="${escapeHtml(hole.detailUrl)}" target="_blank" rel="noopener">ShotNaviで距離計測 ↗</a>`
              : ""
          }
          ${renderTextField("レイアウト", hole.layout)}
          ${renderTextField("特徴", hole.features, { hideIfEmpty: true, className: "field--features" })}
          ${renderTextField("攻め方", hole.strategy)}
          ${renderDangers(hole.dangers)}
          ${renderClubs(hole.clubs)}
          ${renderGreenSection(hole)}
          ${renderTextField("メモ", hole.notes, { hideIfEmpty: true })}
        </div>
      </article>

      <nav class="hole-pagination" aria-label="ホール間ナビゲーション">
        ${
          prev
            ? `<a class="hole-pagination__btn hole-pagination__btn--prev" href="#/hole/${prev}">
                 <span class="hole-pagination__arrow">‹</span>
                 <span class="hole-pagination__label">前のホール</span>
                 <span class="hole-pagination__num">HOLE ${prev}</span>
               </a>`
            : `<span class="hole-pagination__btn hole-pagination__btn--prev hole-pagination__btn--disabled"></span>`
        }
        ${
          next
            ? `<a class="hole-pagination__btn hole-pagination__btn--next" href="#/hole/${next}">
                 <span class="hole-pagination__num">HOLE ${next}</span>
                 <span class="hole-pagination__label">次のホール</span>
                 <span class="hole-pagination__arrow">›</span>
               </a>`
            : `<span class="hole-pagination__btn hole-pagination__btn--next hole-pagination__btn--disabled"></span>`
        }
      </nav>

      <footer class="site-footer site-footer--hole">
        <a class="site-footer__home" href="#/">▲ コース一覧へ戻る</a>
      </footer>
    </main>
  `;
};

// =========================================================
// Print view (A4 / 4 holes per page)
// =========================================================
const renderPrintCell = (hole) => {
  const layoutUrl = rakutenLayoutImg(hole.number);
  const greenUrl = hole.imageGreenUrl || rakutenLayoutImg(hole.number);
  return `
    <div class="print-cell">
      <header class="print-cell__head">
        <span class="print-cell__num">${hole.number}</span>
        <span class="print-cell__par">PAR ${hole.par}</span>
        <span class="print-cell__yard">${
          hole.yardage?.back ? hole.yardage.back + "Y" : "—"
        }</span>
      </header>
      <div class="print-cell__layout">
        <img src="${escapeHtml(layoutUrl)}" alt="HOLE ${hole.number} レイアウト" />
      </div>
      <div class="print-cell__green" aria-label="グリーン拡大">
        <div class="print-cell__green-crop">
          <img src="${escapeHtml(greenUrl)}" alt="HOLE ${hole.number} グリーン周り" />
        </div>
      </div>
    </div>
  `;
};

// 18ホールを4ホールずつチャンクに分割
const chunkHoles = (size) => {
  const chunks = [];
  const sorted = [...holes].sort((a, b) => a.number - b.number);
  for (let i = 0; i < sorted.length; i += size) {
    chunks.push(sorted.slice(i, i + size));
  }
  return chunks;
};

const renderPrintPage = (cells, pageIdx, totalPages) => {
  const first = cells[0]?.number;
  const last = cells[cells.length - 1]?.number;
  const range = first === last ? `HOLE ${first}` : `HOLE ${first}-${last}`;
  return `
    <section class="print-page print-page--4">
      <header class="print-page__head">
        <span class="print-page__course">${escapeHtml(COURSE_NAME)}</span>
        <span class="print-page__label">${range}</span>
        <span class="print-page__date">${pageIdx + 1} / ${totalPages}</span>
      </header>
      <div class="print-grid print-grid--4">
        ${cells.map(renderPrintCell).join("")}
      </div>
    </section>
  `;
};

const renderPrint = () => {
  const chunks = chunkHoles(4);
  app.innerHTML = `
    <header class="site-header site-header--hole no-print">
      <div class="site-header__inner">
        <a class="site-header__back" href="#/" aria-label="一覧へ戻る">
          <span class="site-header__back-icon">‹</span>
          <span>一覧</span>
        </a>
        <span class="site-header__title">印刷用シート</span>
        <button class="site-header__print" id="printBtn" type="button">🖨 印刷</button>
      </div>
    </header>
    <main class="page page--print">
      ${chunks.map((c, i) => renderPrintPage(c, i, chunks.length)).join("")}
    </main>
  `;
  const btn = document.getElementById("printBtn");
  if (btn) btn.addEventListener("click", () => window.print());
};

// =========================================================
// Render dispatcher
// =========================================================
const render = () => {
  const route = parseRoute();
  if (route.name === "hole") {
    renderHole(route.number);
  } else if (route.name === "print") {
    renderPrint();
  } else {
    renderIndex();
  }
  // ハッシュ変更のたびにスクロール位置をリセット
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
};

// =========================================================
// Back to top
// =========================================================
const setupBackToTop = () => {
  const onScroll = () => {
    if (window.scrollY > 400) {
      backToTop.removeAttribute("hidden");
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
      // 完全フェード後に非表示
      setTimeout(() => {
        if (window.scrollY <= 400) backToTop.setAttribute("hidden", "");
      }, 200);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// =========================================================
// Boot
// =========================================================
window.addEventListener("hashchange", render);
setupBackToTop();
render();
