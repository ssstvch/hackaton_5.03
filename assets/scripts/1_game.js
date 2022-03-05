document.addEventListener("DOMContentLoaded", () => {
  let timer = document.querySelector(".timer"),
    count = 0;

  setInterval(() => {
    timer.innerHTML = count;
    count++;
    if (count > 15) {
      console.log(`Прошло 15 секунд`);
      document.location = "first_game_win.html";
    }
  }, 1000);
});
