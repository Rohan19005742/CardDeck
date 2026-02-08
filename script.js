const deck = document.getElementById("deck");
const reveal = document.getElementById("reveal");

// Create 52 face-down cards
for (let i = 0; i < 52; i++) {
  const card = document.createElement("div");
  card.className = "card";

  card.addEventListener("click", () => {
    reveal.classList.remove("hidden");
  });

  deck.appendChild(card);
}

// Tap anywhere to reset
reveal.addEventListener("click", () => {
  reveal.classList.add("hidden");
});
