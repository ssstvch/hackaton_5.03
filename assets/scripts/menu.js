document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#first-game").addEventListener("click", () => {
    document.location = "game1.html";
  });
  document.querySelector("#second-game").addEventListener("click", () => {
    document.location = "2_game.html";
  });
  document.querySelector("#third-game").addEventListener("click", () => {
    document.location = "3_game.html";
  });
});
