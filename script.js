function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);

  requestAnimationFrame(() => el.classList.add("toast--show"));

  setTimeout(() => {
    el.classList.remove("toast--show");
    setTimeout(() => el.remove(), 250);
  }, 1400);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copiado!");
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast("Copiado!");
  }
}

function toggleSecret(maskEl, btn) {
  const secret = maskEl.getAttribute("data-secret") || "";
  const mask = maskEl.getAttribute("data-mask") || "••••••••••";
  const showing = maskEl.getAttribute("data-showing") === "1";

  if (showing) {
    maskEl.textContent = mask;
    maskEl.setAttribute("data-showing", "0");
    btn.textContent = "👁";
    btn.title = "Mostrar";
  } else {
    maskEl.textContent = secret;
    maskEl.setAttribute("data-showing", "1");
    btn.textContent = "🙈";
    btn.title = "Ocultar";
  }
}

function injectToastCSS() {
  const style = document.createElement("style");
  style.textContent = `
    .toast{
      position: fixed;
      left: 50%;
      bottom: 18px;
      transform: translateX(-50%) translateY(8px);
      opacity: 0;
      padding: 10px 12px;
      border-radius: 14px;
      background: rgba(0,0,0,.75);
      border: 1px solid rgba(255,255,255,.12);
      color: rgba(233,236,255,.92);
      font-weight: 800;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: opacity .2s ease, transform .2s ease;
      z-index: 9999;
      box-shadow: 0 10px 24px rgba(0,0,0,.45);
    }
    .toast--show{
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  `;
  document.head.appendChild(style);
}

/* ===== categorias ===== */
function setActiveCategory(catKey) {
  document.querySelectorAll(".nav__item[data-cat]").forEach((btn) => {
    btn.classList.toggle("nav__item--active", btn.dataset.cat === catKey);
  });

  document.querySelectorAll(".cat[data-cat]").forEach((block) => {
    block.classList.toggle("cat--active", block.dataset.cat === catKey);
  });

  const input = document.querySelector(".search__input");
  if (input) input.value = "";
}

function filterVisibleItems(query) {
  const q = (query || "").trim().toLowerCase();
  const activeCat = document.querySelector(".cat.cat--active");
  if (!activeCat) return;

  activeCat.querySelectorAll(".item").forEach((item) => {
    if (!q) {
      item.style.display = "";
      return;
    }
    item.style.display = item.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

function bindHandlers() {
  // copiar
  document.addEventListener("click", (e) => {
    const copyBtn = e.target.closest("[data-copy]");
    if (!copyBtn) return;
    copyText(copyBtn.getAttribute("data-copy") || "");
  });

  // mostrar/ocultar
  document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".js-toggle");
    if (!toggleBtn) return;

    const fieldValue = toggleBtn.closest(".field__value");
    if (!fieldValue) return;

    const maskEl = fieldValue.querySelector(".masked");
    if (!maskEl) return;

    toggleSecret(maskEl, toggleBtn);
  });

  // favoritar (visual)
  document.addEventListener("click", (e) => {
    const fav = e.target.closest(".fav");
    if (!fav) return;

    const active = fav.getAttribute("data-active") === "1";
    fav.textContent = active ? "☆" : "★";
    fav.setAttribute("data-active", active ? "0" : "1");
  });

  // editar (placeholder)
  document.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".pill");
    if (!editBtn) return;
    toast("Editar (exemplo)");
  });

  // trocar categoria
  document.addEventListener("click", (e) => {
    const catBtn = e.target.closest(".nav__item[data-cat]");
    if (!catBtn) return;
    setActiveCategory(catBtn.dataset.cat);
  });

  // busca
  const input = document.querySelector(".search__input");
  if (input) input.addEventListener("input", () => filterVisibleItems(input.value));
}

injectToastCSS();
bindHandlers();
setActiveCategory("bancos");
