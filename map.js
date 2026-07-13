/* ==========================================
   map.js – v1.3
   ・柱下の黒背景を解消（床は常に描画）
   ・柱をタイル中央に配置（幅 40px）
   ・既存レイアウト／ロジックは維持
========================================== */
const TILE_SIZE = 64;

const TILE = {
  WALL:        0,
  FLOOR:       1,
  STAIRS:      2,
  CHEST:       3,
  PILLAR:  4  
};

const MAP_W = 37;
const MAP_H = 18;

let map   = [];
let rooms = [];
let stairs = null;
let chest  = null;

/* ---------- フロア生成 ---------- */
function createFloor(floor){
  map   = Array.from({length:MAP_H},()=>Array(MAP_W).fill(TILE.WALL));
  rooms = [];
  stairs = chest = null;

  createRooms();          // 左右 12×12
  createCorridor();       // 通路 5 マス

lockGate();
  placePillarsRandom();   // ランダム柱
  if(floor===5||floor===8) placeChest();
}

/* ----- 10×10 ×2 部屋 ----- */
function createRooms(){

  const ROOM = 9;
  const PASSAGE = 3;

  rooms.length = 0;

  // =========================
  // レベル3だけ3部屋
  // =========================
  if(selectedLevel === 3){

    // 左
    rooms.push({
      x:2,
      y:3,
      w:ROOM,
      h:ROOM
    });

    // 中央
    rooms.push({
      x:2 + ROOM + PASSAGE,
      y:3,
      w:ROOM,
      h:ROOM
    });

    // 右
    rooms.push({
      x:2 + (ROOM + PASSAGE) * 2,
      y:3,
      w:ROOM,
      h:ROOM
    });

  }else{

    // =========================
    // レベル1・2は今まで通り2部屋
    // =========================
    rooms.push({
      x:2,
      y:3,
      w:ROOM,
      h:ROOM
    });

    rooms.push({
      x:2 + ROOM + PASSAGE,
      y:3,
      w:ROOM,
      h:ROOM
    });

  }

 // 床生成（共通）
for(const r of rooms){
  for(let y=r.y; y<r.y+r.h; y++){
    for(let x=r.x; x<r.x+r.w; x++){
      map[y][x]=TILE.FLOOR;
    }
  }
}


} // ←ここで createRooms終了

/* ----- 通路 ----- */
function createCorridor(){

  const a = rooms[0];
  const b = rooms[1];
  const y = Math.floor(a.y + a.h / 2);

  if(selectedLevel === 3){
    // 左 → 中央
    for(let x = a.x + a.w + 1; x <= b.x - 1; x++){
      map[y][x] = TILE.FLOOR;
    }

    // 中央 → 右
    const c = rooms[2];
    for(let x = b.x + b.w + 1; x <= c.x - 1; x++){
      map[y][x] = TILE.FLOOR;
    }

  }else{
    // レベル1・2は完成版なのでそのまま
    for(let x = a.x + a.w; x <= b.x; x++){
      map[y][x] = TILE.FLOOR;
    }
  }
}
/* ---------- レベル3 扉 ---------- */
function lockGate(){

  if(selectedLevel !== 3) return;

  const y = rooms[0].y + Math.floor(rooms[0].h / 2);

  // 左 → 中央の扉
  map[y][11] = "door_close1";

  // 中央 → 右の扉
  map[y][23] = "door_close1";
}
/* ---------- 柱（1マス）をランダム配置 ---------- */
function placePillarsRandom(){

  const tryPerRoom = 6;
  const wantPerRoom = 3;

  rooms.forEach(r => {

    let placed = 0;
    let tries = 0;

    while(placed < wantPerRoom && tries < tryPerRoom){

      tries++;

      const x = r.x + 2 + (Math.random() * (r.w - 4) | 0);
      const y = r.y + 2 + (Math.random() * (r.h - 4) | 0);

      // 1マス分の床に柱を置く
      if(
  map[y][x] === TILE.FLOOR &&
  !isReservedTile(x, y)
){

  map[y][x] = TILE.PILLAR;
  placed++;
}
    }
  });
}
/* ---------- 描画 ---------- */
function drawMap(ctx, camX, camY){

  /* =========================
     レベルごとの画像切り替え
  ========================= */
  let floorImage;
  let wallImage;
  let stairsImage;
  let chestImage;
  let pillarImage;
  let doorCloseImage;
  let doorOpenImage;

  // =========================
  // レベル1・2は全階同じ
  // =========================
  if(selectedLevel !== 3){

    floorImage  = images.floor;
    wallImage   = images.wall;
    stairsImage = images.stairs;
    chestImage  = images.chest;
    pillarImage = images.pillar;
    doorCloseImage = images.door_close1;
    doorOpenImage  = images.door_open1;

  }

  // =========================
  // レベル3だけ階数で切り替え
  // =========================
  else if(currentFloor <= 5){

    floorImage  = images.floor;
    wallImage   = images.wall;
    stairsImage = images.stairs;
    chestImage  = images.chest;
    pillarImage = images.pillar;
    doorCloseImage = images.door_close1;
    doorOpenImage  = images.door_open1;

  }else if(currentFloor <= 8){

    floorImage  = images.floor2;
    wallImage   = images.wall2;
    stairsImage = images.stairs2;
    chestImage  = images.chest2;
    pillarImage = images.pillar2;
    doorCloseImage = images.door_close2;
    doorOpenImage  = images.door_open2;

  }else{

    floorImage  = images.floor3;
    wallImage   = images.wall3;
    stairsImage = images.stairs3;
    chestImage  = images.chest3;
    pillarImage = images.pillar3;
    doorCloseImage = images.door_close3;
    doorOpenImage  = images.door_open3;

  }  /* --- 1st pass : 床・壁・階段・宝箱・扉 --- */
  for(let y=0;y<MAP_H;y++){
    for(let x=0;x<MAP_W;x++){

      const px = x*TILE_SIZE - camX;
      const py = y*TILE_SIZE - camY;

      const t = map[y][x];

      // ★ door（最優先）
      if(t === "door_close1"){
        ctx.drawImage(doorCloseImage, px, py, TILE_SIZE, TILE_SIZE);
        continue;
      }
      if(t === "door_open1"){
        ctx.drawImage(doorOpenImage, px, py, TILE_SIZE, TILE_SIZE);
        continue;
      }

      // ★ door2・3（今後用）
      if(t === "door_close2"){
        ctx.drawImage(images.door_close2, px, py, TILE_SIZE, TILE_SIZE);
        continue;
      }
      if(t === "door_open2"){
        ctx.drawImage(images.door_open2, px, py, TILE_SIZE, TILE_SIZE);
        continue;
      }
      if(t === "door_close3"){
        ctx.drawImage(images.door_close3, px, py, TILE_SIZE, TILE_SIZE);
        continue;
      }
      if(t === "door_open3"){
        ctx.drawImage(images.door_open3, px, py, TILE_SIZE, TILE_SIZE);
        continue;
      }

      /* 床・壁 */
      if(t === TILE.WALL){

        const isEdge =
          y===0 ||
          y===MAP_H-1 ||
          x===0 ||
          x===MAP_W-1 ||
          map[y-1][x]!==TILE.WALL ||
          map[y+1][x]!==TILE.WALL ||
          map[y][x-1]!==TILE.WALL ||
          map[y][x+1]!==TILE.WALL;

        if(isEdge && x > 0 && y > 0 && x < MAP_W - 1 && y < MAP_H - 1){
          ctx.drawImage(wallImage, px, py, TILE_SIZE, TILE_SIZE);
        }

      }else{
        ctx.drawImage(floorImage, px, py, TILE_SIZE, TILE_SIZE);
      }

      // 階段
      if(t === TILE.STAIRS){
        ctx.drawImage(stairsImage, px, py, TILE_SIZE, TILE_SIZE);
      }

      // 宝箱
      if(t === TILE.CHEST){
        ctx.drawImage(chestImage, px, py, TILE_SIZE, TILE_SIZE);
      }
    }
  }

   /* --- 2nd pass : 柱（1マス描画）--- */
const DRAW_W = 48;
const DRAW_H = 64;

for(let y = 0; y < MAP_H; y++){
  for(let x = 0; x < MAP_W; x++){

    if(map[y][x] !== TILE.PILLAR) continue;

    const px = x * TILE_SIZE - camX;
    const py = y * TILE_SIZE - camY;

    const offsetX = px + (TILE_SIZE - DRAW_W) / 2;
    const offsetY = py + (TILE_SIZE - DRAW_H);

    ctx.drawImage(
      pillarImage,
      0, 0,
      48, 48,
      offsetX, offsetY,
      DRAW_W, DRAW_H
    );
  }
}

  /* --- レベル3 部屋名表示 --- */
  if(selectedLevel === 3){
    drawRoomLabels(ctx, camX, camY);
  }
}

/* ---------- 部屋名表示（レベル3専用） ---------- */
function drawRoomLabels(ctx, camX, camY){

  const labels = [
    { room:0, text:"メイントッピングの部屋" },
    { room:1, text:"メイン付属品の部屋" },
    { room:2, text:"セット単品他の部屋" }
  ];

  ctx.save();
  ctx.font = "bold 24px 'HG創英角ポップ体','HGP創英角ﾎﾟｯﾌﾟ体','Yu Gothic'";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  labels.forEach(label=>{

    const r = rooms[label.room];
    if(!r) return;

    const x = (r.x + r.w/2) * TILE_SIZE - camX;

    // ★部屋の上の壁より外側に表示
    const y = (r.y - 1.2) * TILE_SIZE - camY;

    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(x-150, y-18, 300, 36);

    ctx.lineWidth = 5;
ctx.strokeStyle = "#5b2c06";   // 茶色の縁
ctx.strokeText(label.text, x, y);

ctx.fillStyle = "#fff8a6";     // クリーム色
ctx.fillText(label.text, x, y);

  });

  ctx.restore();
}
/* ---------- 判定 ---------- */
function isWalkable(x,y){
  if(x<0 || y<0 || x>=MAP_W || y>=MAP_H) return false;

  const t = map[y][x];

  return (
    t === TILE.FLOOR ||
    t === TILE.STAIRS ||
    t === TILE.CHEST ||
    t === "door_open1" ||
    t === "door_open2" ||
    t === "door_open3"
  );
}

function isStairs(x,y){
  return stairs && stairs.x===x && stairs.y===y;
}

function isChest(x,y){
  return chest && chest.x===x && chest.y===y;
}
/* ---------- ユーティリティ ---------- */
function getPlayerStartPosition(){
  const r = rooms[0];
  return {x:r.x+(r.w>>1), y:r.y+(r.h>>1)};
}

/* ---------- アイテム・柱を置かない予約マス ---------- */
/* ---------- アイテム・柱を置かない予約マス ---------- */
function isReservedTile(x, y){

  /* =========================
     スタート位置の周囲3×3
  ========================= */
  const start = getPlayerStartPosition();

  if(
    Math.abs(x - start.x) <= 1 &&
    Math.abs(y - start.y) <= 1
  ){
    return true;
  }

  /* =========================
     各部屋の入口・出口周辺
     上下1マス、奥行き3マスを禁止
  ========================= */
  for(const r of rooms){

    const centerY = r.y + Math.floor(r.h / 2);

    // 左入口：部屋内側3マス × 上下3マス
    if(
      x >= r.x &&
      x <= r.x + 2 &&
      Math.abs(y - centerY) <= 1
    ){
      return true;
    }

    // 右出口：部屋内側3マス × 上下3マス
    if(
      x >= r.x + r.w - 3 &&
      x <= r.x + r.w - 1 &&
      Math.abs(y - centerY) <= 1
    ){
      return true;
    }
  }

  /* =========================
     レベル3の扉周辺
  ========================= */
  if(selectedLevel === 3){

    const doorY =
      rooms[0].y + Math.floor(rooms[0].h / 2);

    // 左→中央の扉 x=11 周辺
    if(
      Math.abs(x - 11) <= 1 &&
      Math.abs(y - doorY) <= 1
    ){
      return true;
    }

    // 中央→右の扉 x=23 周辺
    if(
      Math.abs(x - 23) <= 1 &&
      Math.abs(y - doorY) <= 1
    ){
      return true;
    }
  }

  /* =========================
     階段が出る位置の周囲3×3
  ========================= */
  const stairRoomIndex =
    selectedLevel === 3 ? 2 : 1;

  const stairRoom = rooms[stairRoomIndex];

  if(stairRoom){

    const stairX =
      stairRoom.x + stairRoom.w - 2;

    const stairY =
      stairRoom.y + (stairRoom.h >> 1);

    if(
      Math.abs(x - stairX) <= 1 &&
      Math.abs(y - stairY) <= 1
    ){
      return true;
    }
  }

  return false;
}
function getRandomFloorTile(roomIdx){

  const r = rooms[roomIdx];

  let x, y;
  let tries = 0;

  do{
    x = r.x + (Math.random() * r.w | 0);
    y = r.y + (Math.random() * r.h | 0);

    tries++;

  }while(
    (
      map[y][x] !== TILE.FLOOR ||
      isReservedTile(x, y)
    ) &&
    tries < 200
  );

  return {x, y};
}
function placeStairs(){

  // レベル3だけ右の部屋に階段を出す
  const roomIndex = selectedLevel === 3 ? 2 : 1;
  const r = rooms[roomIndex];

  stairs = {
    x: r.x + r.w - 2,
    y: r.y + (r.h >> 1)
  };

  map[stairs.y][stairs.x] = TILE.STAIRS;
}
function placeChest(){
  const r = rooms[0];
  chest = {x:r.x+(r.w>>1), y:r.y+1};
  map[chest.y][chest.x] = TILE.CHEST;
}

function openGate(play = true){

  const y = rooms[0].y + Math.floor(rooms[0].h / 2);

  map[y][11] = "door_open1";

  if(play){
    playSound("door");
  }
}
function openGate2(play = true){

  const y = rooms[1].y + Math.floor(rooms[1].h / 2);

  map[y][23] = "door_open1";

  if(play){
    playSound("door");
  }
}