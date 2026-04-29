// Mostrar senha
document.querySelectorAll(".show").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector(".password");
    input.type = input.type === "password" ? "text" : "password";
  });
});

// Copiar senha
document.querySelectorAll(".copy").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement.querySelector(".password");
    navigator.clipboard.writeText(input.value);

    btn.innerText = "✅";
    setTimeout(() => btn.innerText = "📋", 1500);
  });
});

// Buscar
document.getElementById("searchInput").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  document.querySelectorAll(".card").forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
});
