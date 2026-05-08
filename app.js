import { holes, COURSE_NAME, COURSE_INFO } from "./data/holes.js";

const courseEl = document.getElementById("course");
const navOut = document.querySelector('[data-nav-group="out"]');
const navIn = document.querySelector('[data-nav-group="in"]');
const backToTop = document.getElementById("backToTop");

document.title = `${COURSE_NAME} 攻略メモ`;

const escapeHtml = (str) =>
  String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderImage = (hole) => {
  if (!hole.imageUrl) return "";
  const detail = hole.detailUrl
    ? `<a class="hole__layout-link" href="${escapeHtml(hole.detailUrl)}" target="_blank" rel="noopener" aria-label="ShotNaviで詳細を開く">ShotNaviで距離計測 ↗</a>`
    : "";
  return `
    <figure class="hole__layout-img">
      <img src="${escapeHtml(hole.imageUrl)}" alt="HOLE ${hole.number} レイアウト図" loading="lazy" />
      ${detail}
    </figure>
  `;
};

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
        .map((c) => {
          const v = yardage[c.key];
          const isEmpty = v === undefined || v === null || v === "";
          return `
        <div class="yardage__cell">
          <span class="yardage__label">${c.label}</span>
          <span class="yardage__value ${
            isEmpty ? "yardage__value--empty" : ""
          }">${isEmpty ? "—" : escapeHtml(v) + "<small>y</small>"}</span>
        </div>`;
        })
        .join("")}
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

const renderTextField = (label, value, opts = {}) => {
  const empty = value === null || value === undefined || value === "";
  if (empty && opts.hideIfEmpty) return "";
  return `
    <div class="field">
      <span class="field__label">${escapeHtml(label)}</span>
      <p class="field__value ${
        empty ? "field__value--empty" : ""
      }">${empty ? "未入力" : escapeHtml(value)}</p>
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

const renderHole = (hole) => {
  const parClass = `hole__par-badge--${hole.par}`;
  return `
    <article class="hole" id="hole-${hole.number}">
      <header class="hole__header">
        <div class="hole__number">
          <span class="hole__number-label">HOLE</span>
          <span class="hole__number-value">${hole.number}</span>
        </div>
        <div class="hole__meta">
          <span class="hole__par-badge ${parClass}">PAR ${hole.par}</span>
          ${hole.hdcp ? `<span class="hole__hdcp">HDCP <strong>${hole.hdcp}</strong></span>` : ""}
        </div>
      </header>
      <div class="hole__body">
        ${renderImage(hole)}
        ${renderYardage(hole.yardage)}
        ${renderTextField("レイアウト", hole.layout)}
        ${renderTextField("攻め方", hole.strategy)}
        ${renderDangers(hole.dangers)}
        ${renderClubs(hole.clubs)}
        ${renderTextField("グリーン", hole.green, { hideIfEmpty: true })}
        ${renderTextField("メモ", hole.notes, { hideIfEmpty: true })}
      </div>
    </article>
  `;
};

const renderCourseInfo = () => {
  const info = COURSE_INFO || {};
  const items = [
    info.par ? `Par ${info.par}` : null,
    info.totalYardage ? `${info.totalYardage.toLocaleString()}Y` : null,
    info.terrain || null,
    info.greenType || null,
    info.designer ? `設計: ${info.designer}` : null,
  ].filter(Boolean);
  if (items.length === 0 && !info.location) return "";
  return `
    <div class="course-info">
      ${info.location ? `<p class="course-info__location">${escapeHtml(info.location)}</p>` : ""}
      ${items.length ? `<p class="course-info__meta">${items.map(escapeHtml).join(" / ")}</p>` : ""}
    </div>
  `;
};

const renderCourse = () => {
  const out = holes.filter((h) => h.number <= 9);
  const inn = holes.filter((h) => h.number >= 10);
  courseEl.innerHTML = `
    ${renderCourseInfo()}
    <div class="section-divider">— OUT —</div>
    ${out.map(renderHole).join("")}
    <div class="section-divider">— IN —</div>
    ${inn.map(renderHole).join("")}
  `;
};

const renderNav = () => {
  const buildBtn = (n) =>
    `<a class="hole-nav__btn" href="#hole-${n}">${n}</a>`;
  navOut.innerHTML = holes
    .filter((h) => h.number <= 9)
    .map((h) => buildBtn(h.number))
    .join("");
  navIn.innerHTML = holes
    .filter((h) => h.number >= 10)
    .map((h) => buildBtn(h.number))
    .join("");
};

const setupBackToTop = () => {
  const onScroll = () => {
    if (window.scrollY > 400) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

renderNav();
renderCourse();
setupBackToTop();
