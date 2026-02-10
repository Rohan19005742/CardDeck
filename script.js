// Get elements
const deck = document.getElementById("deck");
const reveal = document.getElementById("reveal");
const revealImg = document.getElementById("revealImg");
const forceBtn = document.getElementById("forceBtn");
const forceDropdown = document.getElementById("forceDropdown");
const dropdownContent = document.getElementById("dropdownContent");

// Safety: ensure reveal is hidden on load
reveal.classList.remove("show");

// List of forced card image filenames (all 52 cards)
const forcedCards = [
  "ace_of_clubs.png", "2_of_clubs.png", "3_of_clubs.png", "4_of_clubs.png", "5_of_clubs.png", "6_of_clubs.png", "7_of_clubs.png", "8_of_clubs.png", "9_of_clubs.png", "10_of_clubs.png", "jack_of_clubs.png", "queen_of_clubs.png", "king_of_clubs.png",
  "ace_of_diamonds.png", "2_of_diamonds.png", "3_of_diamonds.png", "4_of_diamonds.png", "5_of_diamonds.png", "6_of_diamonds.png", "7_of_diamonds.png", "8_of_diamonds.png", "9_of_diamonds.png", "10_of_diamonds.png", "jack_of_diamonds.png", "queen_of_diamonds.png", "king_of_diamonds.png",
  "ace_of_hearts.png", "2_of_hearts.png", "3_of_hearts.png", "4_of_hearts.png", "5_of_hearts.png", "6_of_hearts.png", "7_of_hearts.png", "8_of_hearts.png", "9_of_hearts.png", "10_of_hearts.png", "jack_of_hearts.png", "queen_of_hearts.png", "king_of_hearts.png",
  "ace_of_spades.png", "2_of_spades.png", "3_of_spades.png", "4_of_spades.png", "5_of_spades.png", "6_of_spades.png", "7_of_spades.png", "8_of_spades.png", "9_of_spades.png", "10_of_spades.png", "jack_of_spades.png", "queen_of_spades.png", "king_of_spades.png",
  "joker.png"
];

// Map card filenames to display names
const cardNames = {
  "ace_of_clubs.png": "Ace of Clubs", "2_of_clubs.png": "2 of Clubs", "3_of_clubs.png": "3 of Clubs", "4_of_clubs.png": "4 of Clubs", "5_of_clubs.png": "5 of Clubs", "6_of_clubs.png": "6 of Clubs", "7_of_clubs.png": "7 of Clubs", "8_of_clubs.png": "8 of Clubs", "9_of_clubs.png": "9 of Clubs", "10_of_clubs.png": "10 of Clubs", "jack_of_clubs.png": "Jack of Clubs", "queen_of_clubs.png": "Queen of Clubs", "king_of_clubs.png": "King of Clubs",
  "ace_of_diamonds.png": "Ace of Diamonds", "2_of_diamonds.png": "2 of Diamonds", "3_of_diamonds.png": "3 of Diamonds", "4_of_diamonds.png": "4 of Diamonds", "5_of_diamonds.png": "5 of Diamonds", "6_of_diamonds.png": "6 of Diamonds", "7_of_diamonds.png": "7 of Diamonds", "8_of_diamonds.png": "8 of Diamonds", "9_of_diamonds.png": "9 of Diamonds", "10_of_diamonds.png": "10 of Diamonds", "jack_of_diamonds.png": "Jack of Diamonds", "queen_of_diamonds.png": "Queen of Diamonds", "king_of_diamonds.png": "King of Diamonds",
  "ace_of_hearts.png": "Ace of Hearts", "2_of_hearts.png": "2 of Hearts", "3_of_hearts.png": "3 of Hearts", "4_of_hearts.png": "4 of Hearts", "5_of_hearts.png": "5 of Hearts", "6_of_hearts.png": "6 of Hearts", "7_of_hearts.png": "7 of Hearts", "8_of_hearts.png": "8 of Hearts", "9_of_hearts.png": "9 of Hearts", "10_of_hearts.png": "10 of Hearts", "jack_of_hearts.png": "Jack of Hearts", "queen_of_hearts.png": "Queen of Hearts", "king_of_hearts.png": "King of Hearts",
  "ace_of_spades.png": "Ace of Spades", "2_of_spades.png": "2 of Spades", "3_of_spades.png": "3 of Spades", "4_of_spades.png": "4 of Spades", "5_of_spades.png": "5 of Spades", "6_of_spades.png": "6 of Spades", "7_of_spades.png": "7 of Spades", "8_of_spades.png": "8 of Spades", "9_of_spades.png": "9 of Spades", "10_of_spades.png": "10 of Spades", "jack_of_spades.png": "Jack of Spades", "queen_of_spades.png": "Queen of Spades", "king_of_spades.png": "King of Spades",
  "joker.png": "Joker"
};

let forcedIndex = 0;

function updateForcedCard() {
  if (revealImg) revealImg.src = "cards/" + forcedCards[forcedIndex];
}

// Initialize reveal image
updateForcedCard();

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

// Build dropdown options
function buildDropdownOptions() {
  dropdownContent.innerHTML = "";
  forcedCards.forEach((card, index) => {
    const option = document.createElement("button");
    option.className = "force-option";
    option.textContent = cardNames[card] || card;
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      forcedIndex = index;
      updateForcedCard();
      forceDropdown.classList.add("hidden");
    });
    dropdownContent.appendChild(option);
  });
}

buildDropdownOptions();

// Toggle dropdown on button click
if (forceBtn) {
  forceBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    forceDropdown.classList.toggle("hidden");
  });
}

// Close dropdown when clicking outside
document.addEventListener("click", () => {
  forceDropdown.classList.add("hidden");
});

// Prevent dropdown from closing when clicking inside it
if (forceDropdown) {
  forceDropdown.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// Tap anywhere on reveal to hide it
reveal.addEventListener("click", () => {
  reveal.classList.remove("show");
});