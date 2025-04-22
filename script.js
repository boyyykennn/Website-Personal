let score = 0;
let time = 60;
let coin = 100;
let timer;
let bgmEnabled = true;
let soundEnabled = true;

const scoreSpan = document.getElementById("score");
const timeSpan = document.getElementById("time");
const finalScore = document.getElementById("final-score");
const winScore = document.getElementById("win-score");
const hammer = document.getElementById("hammer");
const board = document.getElementById("board");
const smashEffect = document.getElementById("smash-effect");
const hitSound = document.getElementById("hitSound");
const bgm = document.getElementById("bgm");
const coinCount = document.getElementById("coinCount");

document.addEventListener("mousemove", (e) => {
  hammer.style.left = `${e.pageX - 40}px`;
  hammer.style.top = `${e.pageY - 40}px`;
});

function startGame() {
  score = 0;
  time = 60;
  scoreSpan.textContent = score;
  timeSpan.textContent = time;
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("gameplay").classList.remove("hidden");
  timer = setInterval(() => {
    time--;
    timeSpan.textContent = time;
    if (time <= 0) endGame();
  }, 1000);
  if (bgmEnabled) bgm.play();
  spawnBarriers();
}

function spawnBarriers() {
  const interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(interval);
      return;
    }
    const barrier = document.createElement("div");
    barrier.classList.add("barrier");
    barrier.style.left = `${Math.random() * (board.offsetWidth - 60)}px`;
    barrier.addEventListener("click", () => {
      if (soundEnabled) hitSound.play();
      score += 10;
      scoreSpan.textContent = score;
      smashEffect.style.left = barrier.style.left;
      smashEffect.style.top = barrier.offsetTop + "px";
      smashEffect.style.display = "block";
      setTimeout(() => smashEffect.style.display = "none", 300);
      barrier.remove();
    });
    board.appendChild(barrier);
    setTimeout(() => barrier.remove(), 3000);
  }, 800);
}

function endGame() {
  clearInterval(timer);
  document.getElementById("gameplay").classList.add("hidden");
  if (score >= 100) {
    document.getElementById("win-screen").classList.remove("hidden");
    winScore.textContent = score;
    coin += 100;
    coinCount.textContent = coin;
  } else {
    document.getElementById("game-over").classList.remove("hidden");
    finalScore.textContent = score;
  }
  bgm.pause();
  bgm.currentTime = 0;
}

function retryGame() {
  document.getElementById("game-over").classList.add("hidden");
  startGame();
}

function returnToMenu() {
  document.getElementById("game-over").classList.add("hidden");
  document.getElementById("win-screen").classList.add("hidden");
  document.getElementById("main-menu").classList.remove("hidden");
}

function toggleSetting() {
  document.getElementById("settings").classList.toggle("hidden");
  document.getElementById("main-menu").classList.toggle("hidden");
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.getElementById("soundStatus").textContent = soundEnabled ? "ON" : "OFF";
}

function toggleBGM() {
  bgmEnabled = !bgmEnabled;
  document.getElementById("bgmStatus").textContent = bgmEnabled ? "ON" : "OFF";
  if (!bgmEnabled) {
    bgm.pause();
  } else {
    if (!bgm.paused) bgm.play();
  }
}

function openShop() {
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("shop").classList.remove("hidden");
}

function closeShop() {
  document.getElementById("shop").classList.add("hidden");
  document.getElementById("main-menu").classList.remove("hidden");
}

function buyItem(price) {
  if (coin >= price) {
    coin -= price;
    coinCount.textContent = coin;
    alert("Pembelian berhasil!");
  } else {
    alert("Koin tidak cukup!");
  }
}
