// List of all available cards
const availableCards = [
  "ace_of_clubs.png", "2_of_clubs.png", "3_of_clubs.png", "4_of_clubs.png", "5_of_clubs.png", "6_of_clubs.png", "7_of_clubs.png", "8_of_clubs.png", "9_of_clubs.png", "10_of_clubs.png", "jack_of_clubs.png", "queen_of_clubs.png", "king_of_clubs.png",
  "ace_of_diamonds.png", "2_of_diamonds.png", "3_of_diamonds.png", "4_of_diamonds.png", "5_of_diamonds.png", "6_of_diamonds.png", "7_of_diamonds.png", "8_of_diamonds.png", "9_of_diamonds.png", "10_of_diamonds.png", "jack_of_diamonds.png", "queen_of_diamonds.png", "king_of_diamonds.png",
  "ace_of_hearts.png", "2_of_hearts.png", "3_of_hearts.png", "4_of_hearts.png", "5_of_hearts.png", "6_of_hearts.png", "7_of_hearts.png", "8_of_hearts.png", "9_of_hearts.png", "10_of_hearts.png", "jack_of_hearts.png", "queen_of_hearts.png", "king_of_hearts.png",
  "ace_of_spades.png", "2_of_spades.png", "3_of_spades.png", "4_of_spades.png", "5_of_spades.png", "6_of_spades.png", "7_of_spades.png", "8_of_spades.png", "9_of_spades.png", "10_of_spades.png", "jack_of_spades.png", "queen_of_spades.png", "king_of_spades.png",
  "joker.png"
];

// Map card filenames to display names
const cardNames = {
  "ace_of_clubs.png": "Ace of Clubs",
  "2_of_clubs.png": "2 of Clubs",
  "3_of_clubs.png": "3 of Clubs",
  "4_of_clubs.png": "4 of Clubs",
  "5_of_clubs.png": "5 of Clubs",
  "6_of_clubs.png": "6 of Clubs",
  "7_of_clubs.png": "7 of Clubs",
  "8_of_clubs.png": "8 of Clubs",
  "9_of_clubs.png": "9 of Clubs",
  "10_of_clubs.png": "10 of Clubs",
  "jack_of_clubs.png": "Jack of Clubs",
  "queen_of_clubs.png": "Queen of Clubs",
  "king_of_clubs.png": "King of Clubs",
  "ace_of_diamonds.png": "Ace of Diamonds",
  "2_of_diamonds.png": "2 of Diamonds",
  "3_of_diamonds.png": "3 of Diamonds",
  "4_of_diamonds.png": "4 of Diamonds",
  "5_of_diamonds.png": "5 of Diamonds",
  "6_of_diamonds.png": "6 of Diamonds",
  "7_of_diamonds.png": "7 of Diamonds",
  "8_of_diamonds.png": "8 of Diamonds",
  "9_of_diamonds.png": "9 of Diamonds",
  "10_of_diamonds.png": "10 of Diamonds",
  "jack_of_diamonds.png": "Jack of Diamonds",
  "queen_of_diamonds.png": "Queen of Diamonds",
  "king_of_diamonds.png": "King of Diamonds",
  "ace_of_hearts.png": "Ace of Hearts",
  "2_of_hearts.png": "2 of Hearts",
  "3_of_hearts.png": "3 of Hearts",
  "4_of_hearts.png": "4 of Hearts",
  "5_of_hearts.png": "5 of Hearts",
  "6_of_hearts.png": "6 of Hearts",
  "7_of_hearts.png": "7 of Hearts",
  "8_of_hearts.png": "8 of Hearts",
  "9_of_hearts.png": "9 of Hearts",
  "10_of_hearts.png": "10 of Hearts",
  "jack_of_hearts.png": "Jack of Hearts",
  "queen_of_hearts.png": "Queen of Hearts",
  "king_of_hearts.png": "King of Hearts",
  "ace_of_spades.png": "Ace of Spades",
  "2_of_spades.png": "2 of Spades",
  "3_of_spades.png": "3 of Spades",
  "4_of_spades.png": "4 of Spades",
  "5_of_spades.png": "5 of Spades",
  "6_of_spades.png": "6 of Spades",
  "7_of_spades.png": "7 of Spades",
  "8_of_spades.png": "8 of Spades",
  "9_of_spades.png": "9 of Spades",
  "10_of_spades.png": "10 of Spades",
  "jack_of_spades.png": "Jack of Spades",
  "queen_of_spades.png": "Queen of Spades",
  "king_of_spades.png": "King of Spades",
  "joker.png": "Joker"
};

// Get DOM elements
const spinBtn = document.getElementById("spinBtn");
const resultMessage = document.getElementById("resultMessage");
const reel1 = document.getElementById("reel1");
const reel2 = document.getElementById("reel2");
const reel3 = document.getElementById("reel3");
const forceBtn = document.getElementById("forceBtn");
const forceDropdown = document.getElementById("forceDropdown");
const dropdownContent = document.getElementById("dropdownContent");

// State
let isSpinning = false;
let forcedCard = sessionStorage.getItem("forcedCard") || "ace_of_spades.png";

// Initialize reels with card content
function initializeReels() {
  // Clear existing reel content
  [reel1, reel2, reel3].forEach((reel) => {
    reel.innerHTML = '';
  });

  // Helper function to shuffle an array (Fisher-Yates)
  const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create a unique reel with randomized cards
  const createReelCards = () => {
    const allCards = [];
    
    // Create a base set of various random cards
    const baseCards = [
      "2_of_clubs.png", "5_of_diamonds.png", "9_of_hearts.png", "king_of_spades.png",
      "3_of_clubs.png", "7_of_diamonds.png", "10_of_hearts.png", "jack_of_clubs.png",
      "4_of_clubs.png", "ace_of_diamonds.png", "queen_of_hearts.png", "queen_of_spades.png"
    ];
    
    // Shuffle the base cards for unique ordering in this reel
    const shuffledBase = shuffleArray(baseCards);
    
    // Build deck with forced cards at good stopping positions
    // Add some initial random cards
    shuffledBase.slice(0, 4).forEach(card => allCards.push(card)); // indices 0-3
    
    // Add forced card at a good position (index 5)
    allCards.push(shuffledBase[4]);
    allCards.push(forcedCard); // index 5 (good stopping point)
    
    // Add more filler cards
    shuffledBase.slice(5, 8).forEach(card => allCards.push(card)); // indices 7-9
    
    // Add another forced card (index 12)
    shuffledBase.slice(8, 11).forEach(card => allCards.push(card)); // indices 10-12
    allCards.push(forcedCard); // index 13
    
    // Add more cards to reach a good position
    shuffledBase.forEach(card => allCards.push(card)); // indices 14-25
    allCards.push(forcedCard); // index 26 (near ideal)
    
    // Add more cushion cards
    shuffledBase.slice(0, 8).forEach(card => allCards.push(card)); // indices 27-34
    
    return allCards;
  };

  [reel1, reel2, reel3].forEach((reel) => {
    const reelContent = document.createElement("div");
    reelContent.className = "reel-content";

    const cards = createReelCards();
    cards.forEach((cardFile) => {
      const cardSlot = document.createElement("div");
      cardSlot.className = "card-slot";
      const img = document.createElement("img");
      img.src = `cards/${cardFile}`;
      img.alt = cardNames[cardFile];
      cardSlot.appendChild(img);
      reelContent.appendChild(cardSlot);
    });

    reel.appendChild(reelContent);
  });
}

// Spin the machine with natural deceleration
function spin() {
  if (isSpinning) return;

  isSpinning = true;
  spinBtn.disabled = true;
  resultMessage.textContent = "";

  // Reset reels to start position
  const reelContents = [
    reel1.querySelector(".reel-content"),
    reel2.querySelector(".reel-content"),
    reel3.querySelector(".reel-content")
  ];

  reelContents.forEach(content => {
    content.style.transition = "none";
    content.style.transform = "translateY(0)";
  });

  // Trigger reflow
  void reel1.offsetHeight;

  // Find forced card indices for each reel
  const forcedIndices = reelContents.map(reelContent => {
    const forcedCardIndices = [];
    for (let i = 0; i < reelContent.children.length; i++) {
      const img = reelContent.children[i].querySelector("img");
      if (img && img.src && img.src.includes(forcedCard)) {
        forcedCardIndices.push(i);
      }
    }

    if (forcedCardIndices.length === 0) {
      console.warn("No forced card found in reel!");
      return 13; // fallback
    }

    // Find the best forced card to stop on
    let bestIndex = forcedCardIndices[0];
    let bestScore = Infinity;
    
    forcedCardIndices.forEach(idx => {
      const score = Math.abs(idx - 22);
      if (score < bestScore) {
        bestScore = score;
        bestIndex = idx;
      }
    });

    return bestIndex;
  });

  // Calculate final positions
  // Calculate final positions
  const finalPositions = forcedIndices.map(idx => -(idx * 110 - 90));

  // Spin durations for each reel - creates dramatic cascading stop effect
  // First reel stops quickly, second a bit longer, third creates suspense
  const spinDurations = [800, 1400, 2200]; // milliseconds for each reel

  // Animate each reel with natural deceleration
  spinDurations.forEach((duration, reelIndex) => {
    const reelContent = reelContents[reelIndex];
    const finalPosition = finalPositions[reelIndex];
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Enhanced easing function: starts very fast, dramatically decelerates
      // Using ease-out quart for more dramatic effect
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      // Apply smooth position
      reelContent.style.transform = `translateY(${finalPosition * easeProgress}px)`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Snap to final position to ensure no floating point errors
        reelContent.style.transform = `translateY(${finalPosition}px)`;
      }
    };

    requestAnimationFrame(animate);
  });

  // Show winning message after all reels stop (after the longest duration)
  const longestDuration = Math.max(...spinDurations);
  setTimeout(() => {
    const cardName = cardNames[forcedCard];
    resultMessage.textContent = `🎰 All three match: ${cardName}! 🎉`;
    
    isSpinning = false;
    spinBtn.disabled = false;
  }, longestDuration + 100);
}

// Event listener for spin button
spinBtn.addEventListener("click", spin);

// Build dropdown options
function buildDropdownOptions() {
  dropdownContent.innerHTML = '';
  availableCards.forEach((card, index) => {
    const option = document.createElement("button");
    option.className = "force-dropdown-option";
    if (card === forcedCard) {
      option.classList.add("selected");
    }
    option.textContent = cardNames[card] || card;
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      forcedCard = card;
      sessionStorage.setItem("forcedCard", forcedCard);
      buildDropdownOptions();
      initializeReels();
      forceDropdown.classList.add("hidden");
    });
    dropdownContent.appendChild(option);
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

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  buildDropdownOptions();
  initializeReels();
  // Preload images
  availableCards.forEach((card) => {
    const img = new Image();
    img.src = `cards/${card}`;
  });
});

