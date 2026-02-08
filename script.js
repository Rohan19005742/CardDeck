// Get elements
const deck = document.getElementById("deck");
const reveal = document.getElementById("reveal");

// Safety: ensure reveal is hidden on load
reveal.classList.remove("show");

// Create 52 identical face-down cards
for (let i = 0; i < 52; i++) {
  const card = document.createElement("div");
  card.className = "card";

  // ANY card reveals the forced card
  card.addEventListener("click", () => {
    reveal.classList.add("show");
  });

  deck.appendChild(card);
}

// Tap anywhere on reveal to hide it
reveal.addEventListener("click", () => {
  reveal.classList.remove("show");
});