let hasFlippedCard = false,
  lockBoard = false,
  firstCard,
  secondCard,
  matches = 0;

const cards = {
  front: [
    {
      src: "assets/images/ball_of_thread.png",
      alt: "ball_of_thread",
    },
    {
      src: "assets/images/needle.png",
      alt: "needle",
    },
    {
      src: "assets/images/pillow_for_needles.png",
      alt: "pillow_for_needles",
    },
    {
      src: "assets/images/scissors.png",
      alt: "scissors",
    },
    {
      src: "assets/images/spool_of_thread.png",
      alt: "spool_of_thread",
    },
    {
      src: "assets/images/thimble.png",
      alt: "thimble",
    },
  ],
  back: {
    src: "assets/images/question.png",
    alt: "question",
  },
};

const startGame = () => {
  for (let i = 0; i < cards.front.length; i++) {
    document.querySelector(".game-wrapper").innerHTML += `
                <div class="memory-card">
                    <img class="front-face" src=${cards.front[i].src} alt=${cards.front[i].alt}>
                    <img class="back-face" src=${cards.back.src} alt=${cards.back.alt}>
                </div>

                <div class="memory-card">
                    <img class="front-face" src=${cards.front[i].src} alt=${cards.front[i].alt}>
                    <img class="back-face" src=${cards.back.src} alt=${cards.back.alt}>
                </div>
    `;
  }

  document.querySelectorAll(".memory-card").forEach((card) => {
    card.addEventListener("click", flipCard);
    card.classList.remove("flip");
    card.removeAttribute("hidden", "hidden");

    let ramdomPos = Math.floor(
      Math.random() * document.querySelectorAll(".memory-card").length
    );
    card.style.order = ramdomPos;
  });

  matches = 0;
  resetBoard();
};

const flipCard = (event) => {
  if (lockBoard) return;
  console.log(event.target.parentNode);
  if (event.target.parentNode === firstCard) return;

  event.target.parentNode.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = event.target.parentNode;
    return;
  }

  secondCard = event.target.parentNode;

  checkForMatch();
};

const checkForMatch = () => {
  if (
    firstCard.querySelector("img").alt === secondCard.querySelector("img").alt
  ) {
    matches += 2;

    if (matches === document.querySelectorAll(".memory-card").length) {
      setTimeout(() => {
        document.querySelector(".game").style.display = "none";
        document.querySelector(".game__heading").style.display = "none";
      }, 2000);
      setTimeout(() => {
        document.querySelector(".game-modal").style.display = "block";
        document.querySelector(".game-btn").addEventListener("click", () => {
          document.querySelector(".gobelen").style.display = "block";
        });
      }, 2500);
    } else {
      disableCards();
    }
  } else {
    unflipCards();
  }
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
};

const unflipCards = () => {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
};

const resetBoard = () => {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
};

document.addEventListener("DOMContentLoaded", startGame);
