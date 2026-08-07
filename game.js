
/* ==========================================
   game.js – v1.6
   ゲーム画面レイアウト変更対応版
========================================== */

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let isClear = false;

const images = {
  floor: new Image(),
  wall: new Image(),
  stairs: new Image(),
  chest: new Image(),
  pillar: new Image(),

  floor2: new Image(),
  wall2: new Image(),
  stairs2: new Image(),
  chest2: new Image(),
  pillar2: new Image(),

  floor3: new Image(),
  wall3: new Image(),
  stairs3: new Image(),
  chest3: new Image(),
  pillar3: new Image(),

  player: new Image(),
  heartFull: new Image(),
  heartHalf: new Image(),
  heartEmpty: new Image(),
  clearLogo: new Image(),

  door_close1: new Image(),
  door_open1: new Image(),

  door_close2: new Image(),
  door_open2: new Image(),

  door_close3: new Image(),
  door_open3: new Image()
};

images.floor.src = "images/floor/floor1.png";
images.wall.src = "images/wall/wall1.png";
images.stairs.src = "images/stairs/stairs1.png";
images.chest.src = "images/chest/chest1.png";
images.pillar.src = "images/pillar/pillar1.png";
images.player.src = "images/product/gyudon.png";
images.heartFull.src = "images/ui/heart_full.png";
images.heartHalf.src = "images/ui/heart_half.png";
images.heartEmpty.src = "images/ui/heart_empty.png";
images.clearLogo.src = "images/ui/clear_logo.png";
images.door_close1.src = "images/door/door_close1.png";
images.door_open1.src = "images/door/door_open1.png";

images.door_close2.src = "images/door/door_close2.png";
images.door_open2.src = "images/door/door_open2.png";

images.door_close3.src = "images/door/door_close3.png";
images.door_open3.src = "images/door/door_open3.png";

images.floor2.src = "images/floor/floor2.png";
images.wall2.src = "images/wall/wall2.png";
images.stairs2.src = "images/stairs/stairs2.png";
images.chest2.src = "images/chest/chest2.png";
images.pillar2.src = "images/pillar/pillar2.png";

images.floor3.src = "images/floor/floor3.png";
images.wall3.src = "images/wall/wall3.png";
images.stairs3.src = "images/stairs/stairs3.png";
images.chest3.src = "images/chest/chest3.png";
images.pillar3.src = "images/pillar/pillar3.png";
const sounds = {
  correct: new Audio("sounds/correct.mp3"),
  wrong: new Audio("sounds/wrong.mp3"),
  clear: new Audio("sounds/fanfare.mp3"),

  door: new Audio("sounds/door.mp3"),
  stairs: new Audio("sounds/stairs.mp3"),
  fall: new Audio("sounds/fall.mp3")
};

function playSound(n) {
  if (!sounds[n]) return;
  sounds[n].currentTime = 0;
  sounds[n].play().catch(() => {});
}

let currentFloor = 1;
let selectedLevel = 1;
let gameStarted = false;
let player = null;

/* =========================
   レベル3 タイマー
========================= */

let timeLimit = 0;          // その階の制限時間
let remainingTime = 0;      // 残り時間
let timerActive = false;    // カウント中か
let lastTimerUpdate = 0;
let isTimeUp = false;
let isFloorCollapsing = false;
let collapseStartTime = 0;
let playerFallOffset = 0;
let fallenFloor = false;    // 下に落ちた階（時間制限なし）
let returnFloor = 0;         // 元の階

function getLevel3TimeLimit(floor){

  if(floor <= 5){
    return 30;
  }

  if(floor <= 8){
    return 30;
  }

  return 35;
}
const keys = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

/* ==========================================
   スマホ：目的地タップ移動
   ・タップしたマスまで最短経路で移動
   ・斜め移動対応
   ・壁、柱、閉じた扉を避ける
   ・途中のアイテムは拾わない
   ・到着マスだけ取得判定
   ・移動中の再タップで目的地変更
========================================== */

let autoMovePath = [];
let autoMoveTimer = null;

const AUTO_MOVE_INTERVAL = 120;

/* 自動移動を停止 */
function stopAutoMove(){

  autoMovePath = [];

  if(autoMoveTimer !== null){
    clearInterval(autoMoveTimer);
    autoMoveTimer = null;
  }
}

/* Canvas上のタップ位置をマップ座標へ変換 */
function getTappedMapTile(clientX, clientY){

  if(!player) return null;

  const rect = canvas.getBoundingClientRect();

  if(rect.width <= 0 || rect.height <= 0){
    return null;
  }

  /*
    CSS上の表示座標を、
    Canvas内部の座標へ変換
  */
  const canvasX =
    (clientX - rect.left) * canvas.width / rect.width;

  const canvasY =
    (clientY - rect.top) * canvas.height / rect.height;

  /*
    draw()と同じカメラ計算
  */
  const camX =
    player.x * TILE_SIZE
    - canvas.width / 2
    + TILE_SIZE / 2;

  const camY =
    player.y * TILE_SIZE
    - canvas.height / 2
    + TILE_SIZE / 2;

  const mapX = Math.floor((canvasX + camX) / TILE_SIZE);
  const mapY = Math.floor((canvasY + camY) / TILE_SIZE);

  return {
    x: mapX,
    y: mapY
  };
}

/* 斜め移動時に壁の角をすり抜けないか確認 */
function canUseDiagonal(x, y, dx, dy){

  if(dx === 0 || dy === 0){
    return true;
  }

  /*
    斜め先だけ通れても、
    両脇が壁なら角抜けさせない
  */
  return (
    isWalkable(x + dx, y) ||
    isWalkable(x, y + dy)
  );
}

/* 8方向の最短経路を探す */
function findShortestPath(startX, startY, goalX, goalY){

  if(!isWalkable(goalX, goalY)){
    return [];
  }

  if(startX === goalX && startY === goalY){
    return [];
  }

  const directions = [
    {dx:  0, dy: -1},
    {dx:  1, dy: -1},
    {dx:  1, dy:  0},
    {dx:  1, dy:  1},
    {dx:  0, dy:  1},
    {dx: -1, dy:  1},
    {dx: -1, dy:  0},
    {dx: -1, dy: -1}
  ];

  const queue = [{
    x: startX,
    y: startY
  }];

  let queueIndex = 0;

  const startKey = `${startX},${startY}`;
  const visited = new Set([startKey]);
  const previous = new Map();

  while(queueIndex < queue.length){

    const current = queue[queueIndex++];

    for(const dir of directions){

      const nx = current.x + dir.dx;
      const ny = current.y + dir.dy;
      const key = `${nx},${ny}`;

      if(visited.has(key)){
        continue;
      }

      if(!isWalkable(nx, ny)){
        continue;
      }

      if(
        !canUseDiagonal(
          current.x,
          current.y,
          dir.dx,
          dir.dy
        )
      ){
        continue;
      }

      visited.add(key);

      previous.set(key, {
        x: current.x,
        y: current.y
      });

      if(nx === goalX && ny === goalY){

        const path = [];
        let step = {
          x: goalX,
          y: goalY
        };

        while(
          step.x !== startX ||
          step.y !== startY
        ){
          path.push(step);

          const prev =
            previous.get(`${step.x},${step.y}`);

          if(!prev){
            return [];
          }

          step = prev;
        }

        path.reverse();
        return path;
      }

      queue.push({
        x: nx,
        y: ny
      });
    }
  }

  return [];
}

/* 経路に沿って自動移動開始 */
function startAutoMove(path){

  stopAutoMove();

  if(!path || path.length === 0){
    return;
  }

  autoMovePath = path;

  autoMoveTimer = setInterval(() => {

    if(
      !gameStarted ||
      !player ||
      isTimeUp ||
      isFloorCollapsing
    ){
      stopAutoMove();
      return;
    }

    if(autoMovePath.length === 0){
      stopAutoMove();
      return;
    }

    const next = autoMovePath.shift();

    const dx = next.x - player.x;
    const dy = next.y - player.y;

    /*
      最後の1歩だけ通常判定を行う。
      途中はアイテム、階段、宝箱を無視する。
    */
    const isLastStep =
      autoMovePath.length === 0;

    player.move(dx, dy, {
      skipInteractions: !isLastStep
    });

    /*
      壁や扉の状態変化などで移動できなかった場合
    */
    if(
      player.x !== next.x ||
      player.y !== next.y
    ){
      stopAutoMove();
      uiMessage("そこまでは行けません");
      return;
    }

    if(isLastStep){
      stopAutoMove();
    }

  }, AUTO_MOVE_INTERVAL);
}

/* ゲーム画面をタップ */
canvas.addEventListener("pointerdown", e => {

  if(
    !gameStarted ||
    !player ||
    isTimeUp ||
    isFloorCollapsing
  ){
    return;
  }

  /*
    スマホとマウスの両方で試せる。
    右クリックは除外。
  */
  if(e.pointerType === "mouse" && e.button !== 0){
    return;
  }

  e.preventDefault();

  const destination =
    getTappedMapTile(e.clientX, e.clientY);

  if(!destination){
    return;
  }

  /*
    現在地をタップした場合は停止
  */
  if(
    destination.x === player.x &&
    destination.y === player.y
  ){
    stopAutoMove();
    return;
  }

  const path = findShortestPath(
    player.x,
    player.y,
    destination.x,
    destination.y
  );

  if(path.length === 0){
    stopAutoMove();
    uiMessage("そこまでは行けません");
    return;
  }

  startAutoMove(path);
});

/* 画面切替時などに自動移動を止める */
window.addEventListener("blur", stopAutoMove);

document.addEventListener("visibilitychange", () => {

  if(document.hidden){
    stopAutoMove();
  }

});

function resizeCanvas() {

  const root = document.getElementById("root");
  const sidePanel = document.getElementById("sidePanel");

  if (!root) return;

  if (window.innerWidth <= 800) {

    /* スマホ：9×9マス */
    canvas.width  = TILE_SIZE * 9;
    canvas.height = TILE_SIZE * 9;

  } else {

    const sideW = sidePanel ? sidePanel.offsetWidth : 240;

    canvas.width  = root.clientWidth - sideW;
    canvas.height = root.clientHeight;

  }
}
window.addEventListener("resize", resizeCanvas);

document.querySelectorAll(".levelButton").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedLevel = Number(btn.dataset.level);
    startGame();
  });
});

function startGame() {
  currentFloor = 1;
  gameStarted = true;
  isClear = false;

isFloorCollapsing = false;
collapseStartTime = 0;
playerFallOffset = 0;

/* レベル3タイマー初期化 */
fallenFloor = false;
returnFloor = 0;

if(selectedLevel === 3){
  timeLimit = getLevel3TimeLimit(currentFloor);
  remainingTime = timeLimit;
  timerActive = true;
lastTimerUpdate = 0;
isTimeUp = false;
}else{
  timeLimit = 0;
  remainingTime = 0;
  timerActive = false;
}

  completedProducts.clear(); // ★追加  
document.getElementById("startScreen").style.display = "none";
  document.getElementById("levelNumber").textContent = selectedLevel;
  document.getElementById("floorNumber").textContent = currentFloor;

  resizeCanvas();

  createFloor(currentFloor);
  selectProduct();
  createItems();

// レベルごとにクリアロゴを変更
if (selectedLevel === 3) {
    images.clearLogo.src = "images/ui/clear_logo3.png";
} else {
    images.clearLogo.src = "images/ui/clear_logo.png";
}
player = new Player();

/* ▼ここ追加 */
const productPanel = document.getElementById("productPanel");

if(selectedLevel === 3){
  productPanel.classList.add("level3");
}else{
  productPanel.classList.remove("level3");
}
/* ▲ここまで */

updateProductUI();

  uiMessage(`レベル${selectedLevel} 開始！`);
  requestAnimationFrame(gameLoop);
}

function gameLoop(timestamp) {
  if (!gameStarted) return;

  /* レベル3のタイマー */
  if(selectedLevel === 3 && timerActive){

    if(lastTimerUpdate === 0){
      lastTimerUpdate = timestamp;
    }

    if(timestamp - lastTimerUpdate >= 1000){
      remainingTime--;
      lastTimerUpdate = timestamp;

      console.log("残り時間:", remainingTime);

 if(remainingTime <= 0){
  remainingTime = 0;
  timerActive = false;
  isTimeUp = true;

 uiMessage("TIME UP!!");

/* 少し待ってから床崩壊演出開始 */
setTimeout(() => {
  if(!gameStarted || !isTimeUp) return;

  playSound("fall");

  isFloorCollapsing = true;
  collapseStartTime = performance.now();
}, 600);
/* 演出後に下の階へ落下 */
setTimeout(() => {
  if(!gameStarted || !isTimeUp) return;

  floorCollapse();
}, 1600);
}
    }
  }

  if(!isTimeUp){
  player.update();
}

draw();

  requestAnimationFrame(gameLoop);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let camX = player.x * TILE_SIZE - canvas.width / 2 + TILE_SIZE / 2;
let camY = player.y * TILE_SIZE - canvas.height / 2 + TILE_SIZE / 2;

/* 床崩壊中は画面を小刻みに揺らす */
if(isFloorCollapsing){
  camX += Math.random() * 12 - 6;
  camY += Math.random() * 12 - 6;
}

  drawMap(ctx, camX, camY);
drawItems(ctx, camX, camY);

/* 床崩壊時：リアルな穴と落下演出 */
let playerFallScale = 1;

if(isFloorCollapsing){

  const elapsed = performance.now() - collapseStartTime;
  const progress = Math.min(elapsed / 1000, 1);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2 + 28;

  /* 穴がゆっくり広がる */
  const easeOut = 1 - Math.pow(1 - progress, 3);

  const holeWidth = 18 + easeOut * 105;
  const holeHeight = 7 + easeOut * 38;

  ctx.save();

  /* 穴の外側の割れた縁 */
  ctx.fillStyle = "rgba(70,45,25,0.85)";
  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY,
    holeWidth + 10,
    holeHeight + 7,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  /* 穴の内側 */
  ctx.fillStyle = "rgba(0,0,0,0.96)";
  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY,
    holeWidth,
    holeHeight,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  /* 奥行きを感じる内側の影 */
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY - holeHeight * 0.4,
    4,
    centerX,
    centerY,
    holeWidth
  );

  gradient.addColorStop(0, "rgba(55,55,55,0.65)");
  gradient.addColorStop(0.35, "rgba(15,15,15,0.85)");
  gradient.addColorStop(1, "rgba(0,0,0,1)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY,
    holeWidth * 0.9,
    holeHeight * 0.88,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  /* 穴の手前側の縁を少し明るくする */
  ctx.strokeStyle = "rgba(120,80,45,0.75)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.ellipse(
    centerX,
    centerY + 2,
    holeWidth + 5,
    holeHeight + 3,
    0,
    0,
    Math.PI
  );
  ctx.stroke();

  ctx.restore();

  /* 後半から商品が加速して落ちる */
  const fallProgress = Math.max(0, (progress - 0.32) / 0.68);

  playerFallOffset =
    fallProgress * fallProgress * 360;

  /* 落ちながら小さくなる */
  playerFallScale =
    Math.max(0.25, 1 - fallProgress * 0.75);

}else{
  playerFallOffset = 0;
  playerFallScale = 1;
}

/* 商品だけ下方向へ落とす */
ctx.save();

const playerScreenX = canvas.width / 2;
const playerScreenY = canvas.height / 2;

ctx.translate(
  playerScreenX,
  playerScreenY + playerFallOffset
);

ctx.scale(
  playerFallScale,
  playerFallScale
);

ctx.translate(
  -playerScreenX,
  -playerScreenY
);

player.draw(ctx, camX, camY);

ctx.restore();drawLevel3Timer();

if(isTimeUp){
  ctx.save();

  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ff3333";
  ctx.font = "bold 54px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
    "TIME UP!!",
    canvas.width / 2,
    canvas.height / 2
  );

  ctx.restore();
}

/* 床崩壊演出 */
if(isFloorCollapsing){

  const elapsed = performance.now() - collapseStartTime;
  const progress = Math.min(elapsed / 1000, 1);

  ctx.save();

  /* 徐々に画面を暗くする */
  ctx.fillStyle = `rgba(0,0,0,${progress * 0.75})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* 床が割れる線 */
  ctx.strokeStyle = "#111";
  ctx.lineWidth = 5;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  
  ctx.restore();
}

  if (isClear) {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      images.clearLogo,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }
}

/* =========================
   レベル3 残り時間表示
========================= */
function drawLevel3Timer(){

  if(selectedLevel !== 3) return;

  ctx.save();

  ctx.font = "bold 28px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  /* 文字の背景 */
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(
    canvas.width / 2 - 70,
    10,
    140,
    42
  );

  /* 落下した無制限階 */
  if(fallenFloor){
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      "時間制限なし",
      canvas.width / 2,
      17
    );
  }else{
    ctx.fillStyle = remainingTime <= 10
      ? "#ff4444"
      : "#ffffff";

    ctx.fillText(
      `TIME ${remainingTime}`,
      canvas.width / 2,
      17
    );
  }

  ctx.restore();
}

function uiMessage(text) {
  const msg = document.getElementById("message");
  msg.textContent = text;
  clearTimeout(uiMessage.timer);
  uiMessage.timer = setTimeout(() => msg.textContent = "", 1800);
}


function nextFloor(pl) {

  // 階段音を鳴らす
  playSound("stairs");

// ★ここへ移動
setTimeout(() => {
  sounds.stairs.pause();
  sounds.stairs.currentTime = 0;
}, 1500);

  /* 落下先の無制限階をクリアした場合 */
  if(selectedLevel === 3 && fallenFloor){

    const retryFloor = returnFloor;

currentFloor = retryFloor;

fallenFloor = false;
returnFloor = 0;

timeLimit = getLevel3TimeLimit(currentFloor);
remainingTime = timeLimit;
timerActive = true;
lastTimerUpdate = 0;
isTimeUp = false;

completedProducts.clear();

createFloor(currentFloor);

const s = getPlayerStartPosition();
pl.x = s.x;
pl.y = s.y;
pl.items = [];

selectProduct();
createItems();
updateProductUI();

document.getElementById("floorNumber").textContent = currentFloor;

uiMessage(`${retryFloor}階へ再挑戦！`);
    return;
  }

  // 1.5秒後に音だけ止める
  setTimeout(() => {
    sounds.stairs.pause();
    sounds.stairs.currentTime = 0;
  }, 1500);
isFloorCollapsing = false;
collapseStartTime = 0;
  currentFloor++;

  completedProducts.clear();

  if (currentFloor > 10) {
    gameClear();
    return;
  }

/* レベル3：次の階のタイマーを開始 */
if(selectedLevel === 3){

  timeLimit = getLevel3TimeLimit(currentFloor);
  remainingTime = timeLimit;
  timerActive = true;
  lastTimerUpdate = 0;
  isTimeUp = false;

}

  createFloor(currentFloor);

  const s = getPlayerStartPosition();
  pl.x = s.x;
  pl.y = s.y;
  pl.items = [];

  selectProduct();
  createItems();

  const productPanel = document.getElementById("productPanel");

  if (selectedLevel === 3) {
    productPanel.classList.add("level3");
  } else {
    productPanel.classList.remove("level3");
  }

  updateProductUI();

  document.getElementById("floorNumber").textContent = currentFloor;
  uiMessage("次の階へ！");
}



function openChest(pl) {
  if (currentFloor === 5 || currentFloor === 8) {
    if (pl.hp < pl.maxHp) {
      pl.hp = pl.maxHp;
      pl.updateHPUI();
      uiMessage("ポーションで全回復！");
    } else {
      pl.hasArmor = true;
      uiMessage("鎧を手に入れた！ ダメージ半減");
    }
  } else {
    uiMessage("空の宝箱だった…");
  }

  playSound("correct");
  removeChest();
}

function removeChest() {
  if (typeof chest !== "undefined" && chest) {
    map[chest.y][chest.x] = TILE.FLOOR;
    chest = null;
  }
}

function gameOver() {
  gameStarted = false;

  timerActive = false;
  remainingTime = 0;
  lastTimerUpdate = 0;
  isTimeUp = false;

  isFloorCollapsing = false;
  collapseStartTime = 0;
playerFallOffset = 0;

  playSound("wrong");
  uiMessage("ゲームオーバー");

  setTimeout(() => {
    document.getElementById("startScreen").style.display = "flex";
  }, 1200);
}

function gameClear() {

  timerActive = false;
  remainingTime = 0;
  lastTimerUpdate = 0;
  isTimeUp = false;

  isFloorCollapsing = false;
  collapseStartTime = 0;
playerFallOffset = 0;

  playSound("clear");
  isClear = true;
  uiMessage("テイクアウトマスター！");
}
/* =========================
   床崩壊
========================= */
function floorCollapse(){

  if(selectedLevel !== 3) return;

  isFloorCollapsing = false;
  collapseStartTime = 0;
playerFallOffset = 0;

  /* 元の階を覚える */
  returnFloor = currentFloor;

  /* 1階下へ落とす */
  currentFloor--;

  /* 1階で時間切れなら1階のまま */
  if(currentFloor < 1){
    currentFloor = 1;
  }

  /* 落下先は時間制限なし */
  fallenFloor = true;
  timerActive = false;
  remainingTime = 0;
  lastTimerUpdate = 0;
  isTimeUp = false;

  completedProducts.clear();

  createFloor(currentFloor);

  const s = getPlayerStartPosition();
  player.x = s.x;
  player.y = s.y;
  player.items = [];

  selectProduct();
  createItems();
  updateProductUI();

document.getElementById("floorNumber").textContent =
  (fallenFloor && returnFloor === 1)
    ? "B1"
    : currentFloor;

  uiMessage("床が崩れた！ 1階下へ落下！");
}
