const ICONS = {
  check:
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  chevron:
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  linkedin:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  facebook:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
};

const CHECKLIST_STORAGE_KEY = "bwai-2026-checklist-state";

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderCredits();
  renderWorkshops();
  renderCommunity();
  renderFooter();
});

function renderHero() {
  const h = CONTENT.hero;
  document.getElementById("heroBadge").textContent = h.badge;
  document.getElementById("heroHeading").textContent = h.heading;
  document.getElementById("heroIntro").textContent = h.intro;

  const detailsEl = document.getElementById("heroDetailsContent");
  detailsEl.innerHTML = h.details
    .map((block) => {
      if (block.type === "p") return `<p>${block.text}</p>`;
      if (block.type === "ul")
        return `<ul>${block.items.map((li) => `<li>${li}</li>`).join("")}</ul>`;
      return "";
    })
    .join("");
}

function renderCredits() {
  const c = CONTENT.credits;
  document.getElementById("creditsLabel").textContent = c.label;
  document.getElementById("creditsTitle").textContent = c.title;
  document.getElementById("creditsDesc").textContent = c.desc;

  const stepsEl = document.getElementById("checkSteps");
  stepsEl.innerHTML = c.steps
    .map(
      (step, i) => `
    <div class="check-step" onclick="toggleCheck(this, ${i})">
      <div class="check-box">${ICONS.check}</div>
      <div class="check-text">
        <div class="check-title">${step.title}</div>
        <div class="check-sub">${step.sub}</div>
        ${step.linkUrl ? `<a class="check-link" href="${step.linkUrl}" target="_blank" rel="noopener" onclick="event.stopPropagation()">${step.linkText} &rarr;</a>` : ""}
      </div>
    </div>
  `,
    )
    .join("");

  document.getElementById("badgeText").textContent = c.badge.text;
  document.getElementById("badgeSub").textContent = c.badge.sub;

  const savedState = getSavedChecklistState(c.steps.length);
  window._checks = savedState.checks;
  isCollapsed = savedState.isCollapsed;

  document.querySelectorAll(".check-step").forEach((stepEl, index) => {
    stepEl.classList.toggle("done", window._checks[index]);
  });

  syncChecklistUI({ immediate: true });
}

function renderWorkshops() {
  const w = CONTENT.workshops;
  document.getElementById("workshopsLabel").textContent = w.label;
  document.getElementById("workshopsTitle").textContent = w.title;
  document.getElementById("workshopsDesc").textContent = w.desc;

  const container = document.getElementById("workshopsList");
  container.innerHTML = w.groups
    .map(
      (group) => `
    <div class="codelab-group">
      <div class="codelab-header">
        <span class="workshop-num">${group.num}</span>
        ${group.title}
      </div>
      ${group.items
        .map(
          (item) => `
        <a class="codelab-item" href="${item.url}" target="_blank" rel="noopener">
          <div class="codelab-num">${item.num === "star" ? ICONS.star : item.num}</div>
          <div class="codelab-name">${item.name}</div>
          ${item.tag ? `<span class="codelab-tag codelab-tag-yellow">${item.tag}</span>` : ""}
          <span class="codelab-arrow">&rarr;</span>
        </a>
      `,
        )
        .join("")}
    </div>
  `,
    )
    .join("");
}

function renderCommunity() {
  const c = CONTENT.community;
  document.getElementById("communityLabel").textContent = c.label;
  document.getElementById("communityTitle").textContent = c.title;
  document.getElementById("communityDesc").textContent = c.desc;

  const grid = document.getElementById("socialGrid");
  grid.innerHTML = c.links
    .map(
      (link) => `
    <a class="social-link" href="${link.url}" target="_blank" rel="noopener">
      ${ICONS[link.icon] || ""}
      ${link.name}
    </a>
  `,
    )
    .join("");
}

function renderFooter() {
  const f = CONTENT.footer;
  document.getElementById("footerLine1").textContent = f.line1;
  document.getElementById("footerLine2").textContent = f.line2;
}

function toggleHeroDetails() {
  document.getElementById("heroDetails").classList.toggle("open");
  document.getElementById("heroToggle").classList.toggle("open");
}

let isCollapsed = false;
let completionTimeoutId;

function toggleCheck(el, i) {
  window._checks[i] = !window._checks[i];
  el.classList.toggle("done", window._checks[i]);
  saveChecklistState();
  syncChecklistUI();
}

function expandChecklist() {
  if (!window._checks.every(Boolean)) return;

  const steps = document.getElementById("checkSteps");
  const progress = document.querySelector(".checklist-progress");
  const chevron = document.getElementById("badgeExpand");
  isCollapsed = !isCollapsed;

  if (isCollapsed) {
    steps.classList.add("collapsed");
    progress.classList.add("hidden");
    chevron.classList.remove("flipped");
  } else {
    steps.classList.remove("collapsed");
    progress.classList.remove("hidden");
    chevron.classList.add("flipped");
  }

  saveChecklistState();
}

function setPostChecklistVisibility(isVisible) {
  document
    .getElementById("postChecklistContent")
    .classList.toggle("visible", isVisible);
}

function syncChecklistUI(options = {}) {
  const { immediate = false } = options;
  const done = window._checks.filter(Boolean).length;
  const total = window._checks.length;
  const pct = Math.round((done / total) * 100);
  const allDone = pct === 100;
  const fill = document.getElementById("checkFill");
  const progress = document.querySelector(".checklist-progress");
  const steps = document.getElementById("checkSteps");
  const badge = document.getElementById("checkBadge");
  const chevron = document.getElementById("badgeExpand");

  fill.style.width = pct + "%";
  fill.classList.toggle("complete", allDone);
  document.getElementById("checkPct").textContent = pct + "%";
  badge.classList.toggle("show", allDone);

  clearTimeout(completionTimeoutId);

  if (!allDone) {
    isCollapsed = false;
    steps.classList.remove("collapsed");
    progress.classList.remove("hidden");
    chevron.classList.remove("flipped");
    setPostChecklistVisibility(false);
    saveChecklistState();
    return;
  }

  setPostChecklistVisibility(true);

  if (immediate) {
    steps.classList.toggle("collapsed", isCollapsed);
    progress.classList.toggle("hidden", isCollapsed);
    chevron.classList.toggle("flipped", !isCollapsed);
    return;
  }

  completionTimeoutId = setTimeout(() => {
    steps.classList.add("collapsed");
    progress.classList.add("hidden");
    chevron.classList.remove("flipped");
    isCollapsed = true;
    saveChecklistState();
  }, 600);
}

function saveChecklistState() {
  localStorage.setItem(
    CHECKLIST_STORAGE_KEY,
    JSON.stringify({
      checks: window._checks,
      isCollapsed,
    }),
  );
}

function getSavedChecklistState(stepCount) {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(CHECKLIST_STORAGE_KEY) || "{}",
    );
    const savedChecks = Array.isArray(parsed.checks) ? parsed.checks : [];
    const checks = Array.from({ length: stepCount }, (_, index) =>
      Boolean(savedChecks[index]),
    );
    const allDone = checks.every(Boolean);

    return {
      checks,
      isCollapsed: allDone ? parsed.isCollapsed !== false : false,
    };
  } catch {
    return {
      checks: Array.from({ length: stepCount }, () => false),
      isCollapsed: false,
    };
  }
}
