/* ==========================================
   player.js – v1.3  (2026-07-01)
   変更点
   ------------------------------------------
   • 鎧を取得すると hasArmor=true のまま保持
     └ 以降すべてのダメージが 0.5 倍
   • HP バーは 1.0 / 0.5 / 0.0 の 3 段階表示
========================================== */

class Player {

  constructor () {
    /* ---------- 初期座標 ---------- */
    const s = getPlayerStartPosition();      // map.js
    this.x = s.x;
    this.y = s.y;

    /* ---------- ステータス ---------- */
    this.maxHp   = 3;
    this.hp      = 3;
    this.hasArmor = false;                   // ★ 鎧フラグ

    /* ---------- 行動制御 ---------- */
    this.cool    = 0;
    this.coolMax = 8;                        // フレーム数

    /* ---------- 所持品 ---------- */
    this.items = [];

    /* ---------- スプライト ---------- */
    this.sprite = new Image();               // item.js が差し替える

    this.updateHPUI();
  }

  /* ======================================
     更新
  ====================================== */
  update () {
    if (this.cool > 0) { this.cool--; return; }

    let dx = 0, dy = 0;
    if (keys["ArrowUp"]   || keys["w"]) dy = -1;
    if (keys["ArrowDown"] || keys["s"]) dy =  1;
    if (keys["ArrowLeft"] || keys["a"]) dx = -1;
    if (keys["ArrowRight"]|| keys["d"]) dx =  1;

    if (dx || dy) {
      this.move(dx, dy);
      this.cool = this.coolMax;
    }
  }

  /* ---------- 移動 ---------- */
move (dx, dy, options = {}) {

  const nx = this.x + dx;
  const ny = this.y + dy;

  if(!isWalkable(nx, ny)){
    return false;
  }

  this.x = nx;
  this.y = ny;

  /*
    タップ移動の途中では、
    アイテム・階段・宝箱を反応させない
  */
  if(options.skipInteractions){
    return true;
  }

  updateItems(this);

  if(isStairs(this.x, this.y)){
    nextFloor(this);
    return true;
  }

  if(isChest(this.x, this.y)){
    openChest(this);
    removeChest();
  }

  return true;
}

  /* ---------- 描画 ---------- */
 draw (ctx, camX, camY) {

  const PLAYER_SIZE = 72;



  ctx.drawImage(
    this.sprite,
    this.x * TILE_SIZE - camX - (PLAYER_SIZE - TILE_SIZE) / 2,
    this.y * TILE_SIZE - camY - (PLAYER_SIZE - TILE_SIZE) / 2,
    PLAYER_SIZE,
    PLAYER_SIZE
  );
}

  /* ---------- ダメージ（鎧で 0.5 倍） ---------- */
  damage (v) {
    if (this.hasArmor) v *= 0.5;             // ★ 軽減
    this.hp = Math.max(0, this.hp - v);
    this.updateHPUI();
    if (this.hp === 0) gameOver();
  }

  /* ---------- HP 回復 ---------- */
  heal (v) {
    this.hp = Math.min(this.maxHp, this.hp + v);
    this.updateHPUI();
  }

  /* ---------- HP UI ---------- */
  updateHPUI () {
    const bar = document.getElementById("hpBar");
    bar.innerHTML = "";

    for (let i = 1; i <= this.maxHp; i++) {
      const img = document.createElement("img");
      if (this.hp >= i) {
        img.src = images.heartFull.src;          // 1.0 以上
      } else if (this.hp >= i - 0.5) {
        img.src = images.heartHalf.src;          // 0.5 以上
      } else {
        img.src = images.heartEmpty.src;         // 0.0
      }
      img.alt = "HP";
      bar.appendChild(img);
    }
  }

  /* ---------- アイテム管理 ---------- */
  addItem (it) { this.items.push(it); }
  hasItem (id) { return this.items.some(x => x.id === id); }
}