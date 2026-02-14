// Get elements
const deck = document.getElementById("deck");
const reveal = document.getElementById("reveal");
const revealImg = document.getElementById("revealImg");
const slotsBtn = document.getElementById("slotsBtn");
const forceBtn = document.getElementById("forceBtn");
const forceDropdown = document.getElementById("forceDropdown");
const dropdownContent = document.getElementById("dropdownContent");
const deckWrapper = document.getElementById("deckWrapper");

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

// Track which cards have been revealed (by index in forcedCards)
let revealedCards = new Set();
let firstCardFlipped = false;

// Create a shuffled copy of all card indices except the forced card, for pre-assignment
function createShuffledDeckExcludingForced(excludeIndex) {
  const deck = [];
  for (let i = 0; i < forcedCards.length; i++) {
    if (i !== excludeIndex) {
      deck.push(i);
    }
  }
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

let shuffledDeck = [];

// Create a shuffled copy of all card indices except the forced card, for pre-assignment
function createShuffledDeckExcludingForced(excludeIndex) {
  const deck = [];
  for (let i = 0; i < forcedCards.length; i++) {
    if (i !== excludeIndex) {
      deck.push(i);
    }
  }
  // Fisher-Yates shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Preload images for a list of card indices
function preloadImages(indices) {
  indices.forEach((idx) => {
    const img = new Image();
    img.src = "cards/" + forcedCards[idx];
  });
}

function updateForcedCard() {
  if (revealImg) revealImg.src = "cards/" + forcedCards[forcedIndex];
}

// Get a random unrevealed card index
function getRandomUnrevealedCard() {
  const available = [];
  for (let i = 0; i < forcedCards.length; i++) {
    if (!revealedCards.has(i)) {
      available.push(i);
    }
  }
  if (available.length === 0) return -1; // all cards revealed
  return available[Math.floor(Math.random() * available.length)];
}

// Initialize reveal image
updateForcedCard();

// Create 52 identical face-down cards (each has a flippable front/back)
for (let i = 0; i < 52; i++) {
  const card = document.createElement("div");
  card.className = "card";

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const front = document.createElement("div");
  front.className = "card-front";

  const back = document.createElement("div");
  back.className = "card-back";
  const backImg = document.createElement("img");
  backImg.className = "card-face-img";
  // Do NOT initialize src - will be set on flip
  back.appendChild(backImg);

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  // flip this specific card
  card.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!card.classList.contains("flipped")) {
      // Card is about to flip
      if (!firstCardFlipped) {
        // First flip: show the forced card and initialize remaining 51 cards
        backImg.src = "cards/" + forcedCards[forcedIndex];
        revealedCards.add(forcedIndex);
        firstCardFlipped = true;
        
        // Generate shuffled deck excluding forced card and preload those images
        shuffledDeck = createShuffledDeckExcludingForced(forcedIndex);
        preloadImages(shuffledDeck);
        
        // Assign the remaining cards their pre-shuffled images
        let deckIndex = 0;
        for (let j = 0; j < 52; j++) {
          const otherCard = deck.children[j];
          if (otherCard !== card) {
            const otherImg = otherCard.querySelector(".card-face-img");
            if (deckIndex < shuffledDeck.length) {
              otherImg.src = "cards/" + forcedCards[shuffledDeck[deckIndex]];
              deckIndex++;
            }
          }
        }
      } else {
        // Subsequent flips: card already has its pre-assigned image (set above)
        // Just mark it as revealed
        const imageSrc = backImg.src;
        const cardFilename = imageSrc.split("/").pop();
        const cardIndex = forcedCards.findIndex(c => c === cardFilename);
        if (cardIndex !== -1) {
          revealedCards.add(cardIndex);
        }
      }
    }
    card.classList.toggle("flipped");
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
      // Regenerate shuffled deck to exclude the new forced card
      shuffledDeck = createShuffledDeckExcludingForced(forcedIndex);
      updateForcedCard();
      forceDropdown.classList.add("hidden");
    });
    dropdownContent.appendChild(option);
  });
}

buildDropdownOptions();

// Slots button handler
if (slotsBtn) {
  slotsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Store the forced card in sessionStorage
    sessionStorage.setItem("forcedCard", forcedCards[forcedIndex]);
    // Navigate to slots page
    window.location.href = "slots.html";
  });
}

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

// Disable button interaction when the page is scrolled past the deck
function updateButtonInteractable() {
  if (!forceBtn || !deckWrapper) return;
  const deckRect = deckWrapper.getBoundingClientRect();
  // If deck's top has scrolled above the viewport top, disable the fixed button
  const deckAtTopOrBelow = deckRect.top >= 0;
  forceBtn.style.pointerEvents = deckAtTopOrBelow ? 'auto' : 'none';
  if (slotsBtn) {
    slotsBtn.style.pointerEvents = deckAtTopOrBelow ? 'auto' : 'none';
  }
  // hide dropdown if button is disabled
  if (!deckAtTopOrBelow && forceDropdown && !forceDropdown.classList.contains('hidden')) {
    forceDropdown.classList.add('hidden');
  }
}

window.addEventListener('scroll', updateButtonInteractable, { passive: true });
window.addEventListener('resize', updateButtonInteractable);
window.addEventListener('touchmove', updateButtonInteractable, { passive: true });
// initial check
updateButtonInteractable();