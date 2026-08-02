/* ==========================================
   item.js – v2.4
   伝票表示対応版
========================================== */

/* ---------- 0. 左部屋 共通トッピング候補 ---------- */
const GLOBAL_TOPPINGS = ["fukujinzuke", "goma", "parsley", "nuts"];

/* ---------- 1. アイテムマスター ---------- */
const ITEM_MASTER = {
  toset:{id:"toset",name:"TOセット",image:"images/item/toset.png"},
  spoon:{id:"spoon",name:"スプーン",image:"images/item/spoon.png"},
  toset3:{id:"toset3",name:"TOセット×3",image:"images/item/toset3.png"},

  fukujinzuke:{id:"fukujinzuke",name:"福神漬け",image:"images/item/fuku.png"},
  sansho:{id:"sansho",name:"山椒",image:"images/item/sansho.png"},
  goma:{id:"goma",name:"ゴマ",image:"images/item/goma.png"},
  parsley:{id:"parsley",name:"パセリ",image:"images/item/parsley.png"},
  wasabi:{id:"wasabi",name:"わさび",image:"images/item/wasabi.png"},
  dashi:{id:"dashi",name:"だししょうゆ",image:"images/item/dashi.png"},

  karasauce:{id:"karasauce",name:"辛口ソース",image:"images/item/karasauce.png"},
  kalbitare:{id:"kalbitare",name:"カルビたれ",image:"images/item/kalbitare.png"},
  dressing:{id:"dressing",name:"ドレッシング",image:"images/item/dressing.png"},
  dressing2:{id:"dressing2",name:"ドレッシング×2",image:"images/item/dressing2.png"},
  cholegidre:{id:"cholegidre",name:"チョレギドレ",image:"images/item/cholegidre.png"},
  caesardre:{id:"caesardre",name:"シーザードレ",image:"images/item/caesardre.png"},
  tabasco:{id:"tabasco",name:"タバスコ",image:"images/item/tabasco.png"},

  katsuo:{id:"katsuo",name:"かつお節",image:"images/item/katsuo.png"},
  nori_kizami:{id:"nori_kizami",name:"きざみのり",image:"images/item/nori_kizami.png"},
  okra:{id:"okra",name:"オクラ",image:"images/item/okra.png"},
  nori:{id:"nori",name:"のりフレーク",image:"images/item/nori.png"},
  nuts:{id:"nuts",name:"ナッツ",image:"images/item/nuts.png"},
  pcheese:{id:"pcheese",name:"粉チーズ",image:"images/item/pcheese.png"},
  tororo:{id:"tororo",name:"とろろ",image:"images/item/tororo.png"},
  egg:{id:"egg",name:"たまご",image:"images/item/egg.png"},

  miso:{id:"miso",name:"みそ汁",image:"images/item/miso.png"},
  tonjiru:{id:"tonjiru",name:"とん汁",image:"images/item/tonjiru.png"},
  oshinko:{id:"oshinko",name:"おしんこ",image:"images/item/oshinko.png"},
  salad:{id:"salad",name:"サラダ",image:"images/item/salad.png"},
  apple:{id:"apple",name:"りんご",image:"images/item/apple.png"},
  juice:{id:"juice",name:"ジュース",image:"images/item/juice.png"},
  toy:{id:"toy",name:"おもちゃ",image:"images/item/toy.png"},
  ontama:{id:"ontama",name:"おんたま",image:"images/item/ontama.png"},
garigari:{id:"garigari",name:"ガリガリ",image:"images/item/garigari.png"},
};

/* ---------- 2. 商品マスター ---------- */
const PRODUCTS = [
  {id:"gyudon",name:"牛丼",img0:"images/product/gyudon.png",imgDone:"images/product/gyudon.png",toppings:[],accessories:["toset"]},
  {id:"takana",name:"高菜明太マヨ牛丼",img0:"images/product/takana.png",imgDone:"images/product/takana.png",toppings:[],accessories:["toset"]},
  {id:"kimuchi_gyudon",name:"キムチ牛丼",img0:"images/product/kimuchi.png",imgDone:"images/product/kimuchi.png",toppings:[],accessories:["toset"]},

  {id:"kalbi_don",name:"牛カルビ丼",img0:"images/product/karubi1.png",imgDone:"images/product/karubi2.png",toppings:["goma"],accessories:["toset","kalbitare"]},

  {id:"cheese_karubi",name:"チーズカルビ丼",
    img0:"images/product/chkarubi1.png",
    img1:"images/product/chkarubi2.png",
    img2:"images/product/chkarubi3.png",
    imgDone:"images/product/chkarubi4.png",
    toppings:["goma","parsley"],
    accessories:["toset","kalbitare","tabasco"]},

  {id:"negitama",name:"ねぎ玉牛丼",img0:"images/product/negi.png",imgDone:"images/product/negi.png",toppings:[],accessories:["toset","egg"]},
  {id:"katsu_okra",name:"かつぶしオクラ牛丼",img0:"images/product/okuragyudon.png",imgDone:"images/product/okuragyudon.png",toppings:[],accessories:["toset","katsuo"]},
  {id:"torisoboro",name:"とりそぼろ丼",img0:"images/product/soboro1.png",imgDone:"images/product/soboro2.png",toppings:["goma"],accessories:["toset","egg"]},

  {id:"tataki_don",name:"たたき丼",
    img0:"images/product/tataki1.png",
    img1:"images/product/tataki2.png",
    img2:"images/product/tataki3.png",
    imgDone:"images/product/tataki4.png",
    toppings:["wasabi","dashi"],
    accessories:["toset","nori_kizami"]},

{
  id:"ninniku",
  name:"ニンニクの芽牛丼",
  img0:"images/product/ninniku.png",
  imgDone:"images/product/ninniku.png",
  toppings:[],
  accessories:["toset"]
},

{
  id:"double",
  name:"ダブルニンニク牛丼",
  img0:"images/product/double.png",
  imgDone:"images/product/double.png",
  toppings:[],
  accessories:["toset"]
},

{
  id:"triple",
  name:"トリプルニンニク牛丼",
  img0:"images/product/double.png",
  img1:"images/product/triple.png",
  imgDone:"images/product/triple.png",
  toppings:["garigari"],
  accessories:["toset"]
},

  {id:"unadon",name:"うな丼",img0:"images/product/unagi.png",imgDone:"images/product/unagi.png",toppings:[],accessories:["toset","sansho"]},
  {id:"mazenokke",name:"まぜのっけ",img0:"images/product/maze.png",imgDone:"images/product/maze.png",toppings:[],accessories:["toset","katsuo","dashi"]},
  {id:"mekabu_okura",name:"めかぶオクラ牛丼",img0:"images/product/mekabu.png",imgDone:"images/product/mekabu.png",toppings:[],accessories:["toset","katsuo"]},
  {id:"yamakake_wasabi",name:"山かけわさび牛丼",img0:"images/product/yamakake.png",imgDone:"images/product/yamakake.png",toppings:[],accessories:["toset","tororo","dashi","wasabi"]},

  {id:"curry",name:"カレー",img0:"images/product/curry1.png",imgDone:"images/product/curry2.png",toppings:["fukujinzuke"],accessories:["toset","spoon","karasauce"]},
  {id:"cheese_curry",name:"チーズ牛カレー",img0:"images/product/chgyucurry1.png",imgDone:"images/product/chgyucurry2.png",toppings:["fukujinzuke"],accessories:["toset","spoon","karasauce"]},

  {id:"cholegi_salad",name:"チョレギサラダ",img0:"images/product/chsalad.png",imgDone:"images/product/chsalad.png",toppings:[],accessories:["toset","nori","cholegidre"]},
  {id:"caesar_salad",name:"シーザーサラダ",img0:"images/product/csalad1.png",imgDone:"images/product/csalad2.png",toppings:["pcheese"],accessories:["toset","caesardre"]},
  {id:"okra_salad",name:"オクラサラダ",img0:"images/product/okurasalad1.png",imgDone:"images/product/okurasalad2.png",toppings:["okra"],accessories:["toset","dressing"]},
  {id:"beef_meal_salad",name:"牛お食事サラダ",img0:"images/product/osyokuji1.png",imgDone:"images/product/osyokuji2.png",toppings:["nuts"],accessories:["toset","dressing2"]},
  {id:"simple_salad",name:"サラダ",img0:"images/product/salad.png",imgDone:"images/product/salad.png",toppings:[],accessories:["toset","dressing"]},
{
  id:"tekkadon",
  name:"鉄火丼",

  img0:"images/product/tekkadon1.png",
  img1:"images/product/tekkadon2.png",
  img2:"images/product/tekkadon3.png",
  imgDone:"images/product/tekkadon4.png",

  toppings:["goma","wasabi","dashi"],
  accessories:["toset","nori_kizami"]
},

{
  id:"hiyashijiru",
  name:"冷やし汁",

  img0:"images/product/hiyashijiru1.png",
  imgDone:"images/product/hiyashijiru2.png",

  toppings:["goma"],
  accessories:[]
},
];


/* =================================================
   レベル2 セット商品
================================================= */
const LEVEL2_SETS = [
  {id:"egg_set",name:"たまごセット",items:["egg","miso"]},
  {id:"salad_set",name:"サラダセット",items:["salad","dressing","miso"]},
  {id:"three_set",name:"3点セット",items:["egg","oshinko","miso"]},
  {id:"sukisuki_set",name:"すきすきセット",items:["apple","juice","toy"]}
];

/* =================================================
   レベル2 変更
================================================= */
const LEVEL2_CHANGES = [
  {id:"ontama_change", from:"egg", to:"ontama", name:"おんたま変更"},
  {id:"tonjiru_change", from:"miso", to:"tonjiru", name:"とん汁変更"}
];
/* =================================================
   レベル2 単品
================================================= */
const LEVEL2_SINGLE = [
  "egg",
  "miso",
  "tonjiru",
  "oshinko",
  "ontama"
];

/* ---------- 3. 進行用変数 ---------- */
let currentProduct = null;
let collected = [];
let fieldItems = [];

let activeProductIndex = 0;
let completedProducts = new Set();
let level3CollectedToppings = [[], [], []];
/* =================================================
   レベル2 注文データ
================================================= */

let level2Set = null;
let level2Changes = [];
let level2Singles = [];

/* =================================================
   レベル2 注文作成
================================================= */
function createLevel2Order(){

  /* ---------- セット ---------- */
  level2Set = structuredClone(
    LEVEL2_SETS[Math.random() * LEVEL2_SETS.length | 0]
  );

  /* ---------- 変更（0～2個） ---------- */
  level2Changes = [];

if(level2Set.id === "sukisuki_set"){
  // 変更なし
}

else if(level2Set.id === "salad_set"){
  // 0 or 1（とん汁のみ）
  if(Math.random() < 0.5){
    level2Changes.push(
      LEVEL2_CHANGES.find(c => c.id === "tonjiru_change")
    );
  }
}

else if(level2Set.id === "egg_set" || level2Set.id === "three_set"){

  const rand = Math.random();

  if(rand < 0.25){
    // 変更なし
  }
  else if(rand < 0.5){
    // おんたま
    level2Changes.push(
      LEVEL2_CHANGES.find(c => c.id === "ontama_change")
    );
  }
  else if(rand < 0.75){
    // とん汁
    level2Changes.push(
      LEVEL2_CHANGES.find(c => c.id === "tonjiru_change")
    );
  }
  else{
    // 両方
    level2Changes.push(
      LEVEL2_CHANGES.find(c => c.id === "ontama_change")
    );
    level2Changes.push(
      LEVEL2_CHANGES.find(c => c.id === "tonjiru_change")
    );
  }
}
// すきすきセットは変更なし
if(level2Set.id === "sukisuki_set"){
    level2Changes = [];
}

  /* ---------- 単品（0～1個） ---------- */
  level2Singles = [];

  if(Math.random() < 0.5){

    level2Singles.push(
      LEVEL2_SINGLE[
        Math.floor(Math.random() * LEVEL2_SINGLE.length)
      ]
    );

  }

}
/* =================================================
   レベル3 注文作成（3商品）
================================================= */
let level3Products = [];
let level3MiddleItems = [];
let completedMiddleItems = [];

let level3RightItems = [];
let completedRightItems = [];

function createLevel3Order(){

  level3Products = [];

  completedProducts.clear();
  level3CollectedToppings = [[], [], []];
  // サラダ系除外
const exclude = [
  "simple_salad",
  "okra_salad",
  "cholegi_salad",
  "caesar_salad",
  "hiyashijiru"
];

  const pool = PRODUCTS.filter(p => !exclude.includes(p.id));

  // 3商品ランダム
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  level3Products = shuffled.slice(0, 3).map(p => ({
  ...structuredClone(p),
  set: null,
  changes: [],
  singles: []
}));

  /* =========================
     レベル3 セット付与
  ========================= */

  let setCount;

if(currentFloor <= 5){
    setCount = Math.random() < 0.5 ? 1 : 2;
}
else{
    setCount = 2;
}

  const productIndexes = [0,1,2].sort(() => Math.random() - 0.5);

for(let i=0; i<setCount; i++){

  const productIndex = productIndexes[i];

  level3Products[productIndex].set = structuredClone(
    LEVEL2_SETS[Math.floor(Math.random() * LEVEL2_SETS.length)]
  );

  level3Products[productIndex].changes = [];

  const set = level3Products[productIndex].set;

  if(set.id === "egg_set" || set.id === "three_set"){

    const r = Math.random();

    if(r < 0.25){
      // 変更なし
    }
    else if(r < 0.5){
      level3Products[productIndex].changes.push(
        LEVEL2_CHANGES.find(c => c.id === "ontama_change")
      );
    }
    else if(r < 0.75){
      level3Products[productIndex].changes.push(
        LEVEL2_CHANGES.find(c => c.id === "tonjiru_change")
      );
    }
    else{
      level3Products[productIndex].changes.push(
        LEVEL2_CHANGES.find(c => c.id === "ontama_change")
      );
      level3Products[productIndex].changes.push(
        LEVEL2_CHANGES.find(c => c.id === "tonjiru_change")
      );
    }

  }else if(set.id === "salad_set"){

    if(Math.random() < 0.5){
      level3Products[productIndex].changes.push(
        LEVEL2_CHANGES.find(c => c.id === "tonjiru_change")
      );
    }

  }
} // セット付与のfor終了

/* =========================
   レベル3 単品追加（0～2個）
========================= */
let singleCount;

if(currentFloor <= 5){
    singleCount = Math.floor(Math.random() * 3);   // 0～2
}
else if(currentFloor <= 8){
    singleCount = Math.random() < 0.5 ? 1 : 2;
}
else{
    singleCount = 2;
}

const singlePool = [
  "egg",
  "ontama",
  "miso",
  "tonjiru",
  "salad"
];

for(let i = 0; i < singleCount; i++){

  const productIndex = Math.floor(Math.random() * 3);

  level3Products[productIndex].singles.push(
    singlePool[Math.floor(Math.random() * singlePool.length)]
  );

}

} // createLevel3Order終了
/* =================================================
   商品決定
================================================= */
function selectProduct(){

  let pool = PRODUCTS;

  // ★ここ追加
  completedProducts.clear();
  if(selectedLevel === 2){
   const level2Exclude = [
  "simple_salad",
  "okra_salad",
  "cholegi_salad",
  "caesar_salad",
  "hiyashijiru"
];

    pool = PRODUCTS.filter(p => !level2Exclude.includes(p.id));
  }

  currentProduct = structuredClone(pool[Math.random() * pool.length | 0]);
  collected.length = 0;

  Object.entries(currentProduct)
    .filter(([k]) => k.startsWith("img"))
    .forEach(([k, src]) => {
      const img = new Image();
      img.src = src;
      currentProduct[k + "Obj"] = img;
    });

  if(selectedLevel === 2){
    createLevel2Order();
  }

  /* ▼ここ追加 */
  if(selectedLevel === 3){
    createLevel3Order();
  }
  /* ▲ここまで */
}/* =================================================
   アイテム配置
================================================= */
function createItems(){
  /* レベル2 */
  if(selectedLevel === 2){
    createLevel2Items();
    return;
  }

/* ▼ここ追加 */
if(selectedLevel === 3){
  createLevel3Items();
  return;
}

  fieldItems.length = 0;

  const tops = currentProduct.toppings;
  const acc = currentProduct.accessories;
  const allIds = Object.keys(ITEM_MASTER);

  let leftPool = [...GLOBAL_TOPPINGS];

  switch(currentProduct.id){
    case "caesar_salad":
      leftPool.push("pcheese");
      break;
    case "okra_salad":
      leftPool.push("okra");
      break;
    case "tataki_don":
      leftPool.push("wasabi", "dashi");
      break;
  }

  leftPool = Array.from(new Set([...leftPool, ...tops]));

  placeRandomBatch(
    tops,
    0,
    3,
    4,
    leftPool.filter(id => !tops.includes(id))
  );

  placeRandomBatch(
    acc,
    1,
    3,
    4,
    allIds.filter(id => !acc.includes(id) && !tops.includes(id))
  );
}

/* =================================================
   レベル2 アイテム配置
================================================= */
function createLevel2Items(){
  fieldItems.length = 0;

  const tops = currentProduct.toppings;
  const allIds = Object.keys(ITEM_MASTER);

  let leftPool = [...GLOBAL_TOPPINGS];

  switch(currentProduct.id){
    case "tataki_don":
      leftPool.push("wasabi", "dashi");
      break;
  }

  leftPool = Array.from(new Set([...leftPool, ...tops]));

  placeRandomBatch(
    tops,
    0,
    3,
    4,
    leftPool.filter(id => !tops.includes(id))
  );

  currentProduct.baseAccessories = [...currentProduct.accessories];

  let rightItems = [...currentProduct.baseAccessories];

  // =========================
  // ★ セット処理（ここ重要）
  // =========================
  if(level2Set){

    let setItems = [...level2Set.items];

    // ★ 先に変更適用
    level2Changes.forEach(ch=>{
      for(let i = 0; i < setItems.length; i++){
        if(setItems[i] === ch.from){
          setItems[i] = ch.to;
          break;
        }
      }
    });

    // ★ 変更後を追加
    rightItems.push(...setItems);
  }

  // =========================
  // ★ 単品
  // =========================
  level2Singles.forEach(id=>{
    rightItems.push(id);
  });

  currentProduct.accessories = [...rightItems];

  placeRandomBatch(
    rightItems,
    1,
    Math.max(4, rightItems.length),
    Math.max(6, rightItems.length + 2),
    allIds.filter(id => !rightItems.includes(id) && !tops.includes(id))
  );
}

/* =================================================
   レベル3 アイテム配置（3部屋分割）
================================================= */
function createLevel3Items(){

  fieldItems.length = 0;

  const allToppings = [];
  const productAccessories = [];
  const commonItems = [];

  level3MiddleItems = [];
  completedMiddleItems = [];

  level3RightItems = [];
  completedRightItems = [];

  /*
    右部屋に置くメイン商品の共通アイテム
    ・TOセット
    ・スプーン
    ・ドレッシング
  */
  const commonList = [
    "toset",
    "spoon",
    "dressing",
    "cholegidre",
    "caesardre"
  ];

  /* =========================
     3商品の内容を部屋ごとに分類
  ========================= */
  level3Products.forEach(p=>{

    // 左部屋：トッピング
    allToppings.push(...p.toppings);

    // メイン商品の付属品を中央・右に分ける
    p.accessories.forEach(id=>{

      if(id === "toset"){
    // 何もしない
}
else if(commonList.includes(id)){
    commonItems.push(id);
}
else{
    productAccessories.push(id);
}

    });

    /* =========================
       セット内容を右部屋へ追加
    ========================= */
    if(p.set){

      let setItems = [...p.set.items];

      // おんたま変更・とん汁変更を反映
      if(p.changes){

        p.changes.forEach(ch=>{

          for(let i = 0; i < setItems.length; i++){

            if(setItems[i] === ch.from){
              setItems[i] = ch.to;
              break;
            }

          }

        });

      }

      // 変更後のセット内容を右部屋へ追加
      commonItems.push(...setItems);
    }

// 単品を右部屋の正解アイテムへ追加
if(p.singles && p.singles.length > 0){

  p.singles.forEach(id=>{

    // 単品本体
    commonItems.push(id);

    // 単品サラダにはドレッシングを1個付ける
    if(id === "salad"){
      commonItems.push("dressing");
    }

  });

}

});   // ← level3Products.forEach がここで終了


// ★★★ここから追加★★★

const tosetCount = level3Products.length;

// いったんTOセットを全部削除
for(let i = commonItems.length - 1; i >= 0; i--){
    if(commonItems[i] === "toset"){
        commonItems.splice(i,1);
    }
}

if(tosetCount >= 3){
    commonItems.push("toset3");
}else{
    for(let i=0;i<tosetCount;i++){
        commonItems.push("toset");
    }
}

// ★★★ここまで追加★★★


const allIds = Object.keys(ITEM_MASTER);

/* =========================
   左部屋：トッピング
========================= */  placeRandomBatch(
    allToppings,
    0,
    6,
    10,
    allIds.filter(id => !allToppings.includes(id))
  );

  /* =========================
     中央部屋：メイン付属品
  ========================= */
  level3MiddleItems = [...productAccessories];

  placeRandomBatch(
    level3MiddleItems,
    1,
    6,
    10,
    allIds.filter(id =>
      !level3MiddleItems.includes(id)
      && !allToppings.includes(id)
    )
  );

  /* =========================
     右部屋：TOセット・スプーン・セット内容
  ========================= */
  level3RightItems = [...commonItems];

  placeRandomBatch(
    level3RightItems,
    2,
    Math.max(8, level3RightItems.length),
    Math.max(12, level3RightItems.length + 3),
    allIds.filter(id =>
      !level3RightItems.includes(id)
      && !level3MiddleItems.includes(id)
      && !allToppings.includes(id)
    )
  );

  /* =========================
     左部屋が0個なら扉を開く
  ========================= */
  const needToppingProducts =
    level3Products.filter(p => p.toppings.length > 0);

  if(needToppingProducts.length === 0){
    openGate(false);
  }

  /* =========================
     中央部屋が0個なら扉を開く
  ========================= */
  if(level3MiddleItems.length === 0){
    openGate2(false);
  }

}/* =================================================
   配置補助
================================================= */
const shuffle = arr => arr.sort(() => Math.random() - 0.5);

function placeRandomBatch(correctArr, roomIdx, minN, maxN, fillerPool){

  const batch = [...correctArr];

  /* 正解と同じIDは間違い候補から除外 */
  const wrongPool = fillerPool.filter(id =>
    !correctArr.includes(id)
  );

  shuffle(wrongPool);

  /* =====================================
     間違いアイテムを最低2個必ず配置
  ===================================== */
  let wrongCount = 0;

  while(wrongCount < 2 && wrongPool.length){

    batch.push(wrongPool.shift());
    wrongCount++;
  }

  /* 最低配置数に届くまで追加 */
  while(batch.length < minN && wrongPool.length){

    batch.push(wrongPool.shift());
    wrongCount++;
  }

  /*
    正解数が多い場合でも、
    「正解＋間違い2個」は必ず入るようにする
  */
  const effectiveMax = Math.max(
    maxN,
    correctArr.length + 2
  );

  /* さらにランダムで間違いを追加 */
  while(
    batch.length < effectiveMax &&
    Math.random() < 0.5 &&
    wrongPool.length
  ){

    batch.push(wrongPool.shift());
    wrongCount++;
  }

  shuffle(batch);

  batch.forEach(id => {
    addFieldItem(
      id,
      correctArr.includes(id),
      roomIdx
    );
  });
}

function addFieldItem(id, correct, roomIdx){
  const m = ITEM_MASTER[id];
  if(!m) return;

  let pos;
  let retry = 0;

  do{
    pos = getRandomFloorTile(roomIdx);
    retry++;
  }while(fieldItems.some(it => it.x === pos.x && it.y === pos.y) && retry < 20);

  const img = new Image();
  img.src = m.image;

  fieldItems.push({
    id: m.id,
    name: m.name,
    image: m.image,
    x: pos.x,
    y: pos.y,
    correct,
    imageObj: img
  });
}
/* =========================
   完全一致判定
========================= */
function isMatch(a,b){

  if(a.length !== b.length) return false;

  const count = arr => {
    const m = {};
    arr.forEach(v => {
      m[v] = (m[v] || 0) + 1;
    });
    return m;
  };

  const ca = count(a);
  const cb = count(b);

  for(const key in ca){
    if(ca[key] !== cb[key]) return false;
  }

  return true;
}
/* =================================================
   アイテム取得判定
================================================= */
function updateItems(pl){

  for(let i = fieldItems.length - 1; i >= 0; i--){

    const it = fieldItems[i];

    if(it.x !== pl.x || it.y !== pl.y) continue;

// =========================
// レベル3
// =========================
if(selectedLevel === 3){

  const room = getCurrentRoomIndex(pl.x, pl.y);

  // =========================
  // 左部屋：トッピング判定
  // =========================
  if(room === 0){

    let targetIndex = -1;
    const activeProduct = level3Products[activeProductIndex];

    if(
      activeProduct.toppings.includes(it.id) &&
      !completedProducts.has(activeProductIndex)
    ){
      targetIndex = activeProductIndex;
    }

    if(targetIndex === -1){
      playSound("wrong");
      uiMessage("違うトッピング！");
      pl.damage(1);
      return;
    }

    const p = level3Products[targetIndex];

    fieldItems.splice(i, 1);

/* 選択中の商品だけの取得履歴へ追加 */
level3CollectedToppings[targetIndex].push(it.id);

const pickedToppings =
  level3CollectedToppings[targetIndex];

/* この商品の必要トッピングと完全一致したら完成 */
if(isMatch(pickedToppings, p.toppings)){

      updatePlayerSprite(p.imgDone);
      p.img0 = p.imgDone;

      uiMessage(p.name + " 完成！");

      completedProducts.add(targetIndex);
      updateProductUI();

      const needToppingProducts =
        level3Products.filter(p => p.toppings.length > 0);

      if(completedProducts.size === needToppingProducts.length){
        openGate();
      }
    }

    return;
  }

  // =========================
  // 真ん中部屋：メイン付属品判定
  // =========================
  if(room === 1){

    if(level3MiddleItems.includes(it.id)){

      fieldItems.splice(i, 1);
      completedMiddleItems.push(it.id);

      pl.addItem(it);
      updatePickedList();
      

      if(isMatch(completedMiddleItems, level3MiddleItems)){
        openGate2();
        uiMessage("右の部屋への扉が開いた！");
      }

    }else{
      playSound("wrong");
      uiMessage("違う付属品！");
      pl.damage(1);
    }

    return;
  }

// =========================
// 右部屋：セット・共通品判定
// =========================
if(room === 2){

  const targetIndex = level3RightItems.indexOf(it.id);

  // 正解
  if(targetIndex !== -1){

    fieldItems.splice(i, 1);



    completedRightItems.push(it.id);

    pl.addItem(it);
    updatePickedList();
    

    // 右部屋の正解を全部取得
   if(isMatch(completedRightItems, level3RightItems)){
playSound("correct");
  placeStairs();
  uiMessage("すべて揃った！ 階段が出現！");
}
  }else{

    playSound("wrong");
    uiMessage("違うセット商品！");
    pl.damage(1);
  }

  return;
}  return;
}
    // =========================
    // レベル1・2（そのまま）
    // =========================

    const toppings = currentProduct.toppings;
    const accessories = currentProduct.accessories;
    const all = toppings.concat(accessories);

    if(all.indexOf(it.id) !== -1){

      fieldItems.splice(i, 1);
      collected.push(it.id);

      

      if(toppings.indexOf(it.id) !== -1){
        updatePlayerSprite(currentProduct.imgDone);
currentProduct.img0 = currentProduct.imgDone;
updateProductUI();
      }

      if(accessories.indexOf(it.id) !== -1){
        pl.addItem(it);
        updatePickedList();
      }

      if(collected.length === all.length){
     playSound("correct");
  placeStairs();
      }

    }else{

      playSound("wrong");
      uiMessage("違う付属品！");
      pl.damage(1);
    }
  }
}/* =================================================
   アイテム描画
================================================= */
function drawItems(ctx, cx, cy){
  fieldItems.forEach(it => {
    const img = it.imageObj;
    if(!img.complete || img.naturalWidth === 0) return;

   const ITEM_SIZE = 60;

ctx.drawImage(
    img,
    it.x*TILE_SIZE-cx + (TILE_SIZE-ITEM_SIZE)/2,
    it.y*TILE_SIZE-cy + (TILE_SIZE-ITEM_SIZE)/2,
    ITEM_SIZE,
    ITEM_SIZE
);
  });
}

/* =================================================
   UI更新
================================================= */
function updateProductUI(){

  const productPanel = document.getElementById("productPanel");

  /* 中身リセット */
  productPanel.innerHTML = "";

 if(selectedLevel === 3){

  level3Products.forEach((p, index) => {

    const img = document.createElement("img");
    img.src = p.img0 || p.image;
    img.className = "productImage";

    // ★クリックで切り替え
    img.onclick = () => {
      activeProductIndex = index;
      updatePlayerSprite(p.img0);
      updateProductUI();
    };

    // ★選択中の枠表示
    if(index === activeProductIndex){
      img.style.border = "3px solid yellow";
    }

    productPanel.appendChild(img);

  });

}else{

    const img = document.createElement("img");
    img.src = currentProduct.img0;
    img.className = "productImage";
    productPanel.appendChild(img);

  }

  /* ▼ここ追加（超重要） */
  if(selectedLevel === 3){
    if(level3Products.length > 0){
      updatePlayerSprite(level3Products[activeProductIndex].img0);
    }
  }else{
    updatePlayerSprite(currentProduct.img0);
  }
  /* ▲ここまで */

  const name = document.getElementById("productName");
  if(name) name.textContent = currentProduct.name;

  updateTicketUI();
  updatePickedList();
}
/* ---------- 実伝票風 表示 ---------- */
function updateTicketUI(){
  const ticket = document.getElementById("ticketText");
  if(!ticket || !currentProduct) return;

  const ticketNo = String(Math.floor(Math.random() * 90) + 10);

  const sideProducts = [
    "simple_salad",
    "okra_salad",
    "cholegi_salad",
    "caesar_salad"
  ];

  const isSideProduct = sideProducts.includes(currentProduct.id);

  let mainMark = isSideProduct ? "" : "1";
let sideMark = isSideProduct ? "1" : "";

if(selectedLevel === 3){
  mainMark = "1";
  sideMark = "";
}

  
const printIds = [
  "kalbitare","sansho","dressing","dressing2",
  "cholegidre","caesardre","karasauce","tabasco",
  "egg","tonjiru","miso","oshinko","salad",
  "apple","juice","toy","ontama",
  "tororo","katsuo","nori_kizami","dashi","wasabi"
];

const getName = id => ITEM_MASTER[id]?.name || id;

let ticketLines = [];
let ticketRows = [];

function addTicketRow(text, main = "", side = "", divider = false){
  ticketRows.push({
    text,
    main,
    side,
    divider
  });
}

/* 商品付属のサイド容器判定 */
const ticketSideItems = [
  "egg","ontama","miso","tonjiru","oshinko",
  "salad","apple","juice","toy"
];

function addAccessoryTicketRow(id, count = 1){

  const text = count === 1
    ? `　${getName(id)}`
    : `　${getName(id)} ×${count}`;

  addTicketRow(
    text,
    "",
    ticketSideItems.includes(id) ? "1" : ""
  );
}

/* =========================
   レベル3 商品ごと表示
========================= */
if(selectedLevel === 3){

  level3Products.forEach(p=>{

    // 商品名
    // 2商品目以降は区切り線
if(ticketLines.length > 0){
  ticketLines.push("<hr class='ticketDivider'>");
}

if(ticketRows.length > 0){
  addTicketRow("", "", "", true);
}

ticketLines.push(`TO　${p.name}`);
addTicketRow(`TO　${p.name}`, "1", "");
    // 付属品をまとめる
    const countMap = {};

    p.accessories.forEach(id=>{
      if(printIds.includes(id)){
        countMap[id] = (countMap[id] || 0) + 1;
      }
    });

   // 付属品表示
Object.keys(countMap).forEach(id=>{
  const count = countMap[id];

  if(count === 1){
    ticketLines.push(`　${getName(id)}`);
  }else{
    ticketLines.push(`　${getName(id)} ×${count}`);
  }
});

Object.keys(countMap).forEach(id=>{

  addAccessoryTicketRow(id, countMap[id]);

});

    // セット表示
    if(p.set){

      ticketLines.push(`　 TO● ${p.set.name}`);

addTicketRow(`　TO● ${p.set.name}`);

      // サラダセットだけ順番固定
      if(p.set.id === "salad_set"){

        const order = ["salad", "miso", "dressing"];

        order.forEach(key=>{
          if(p.set.items.includes(key)){

            if(key === "dressing"){
              ticketLines.push(`　『${getName(key)}』`);
            }else{
              ticketLines.push(`　【${getName(key)}】`);
            }

if(key === "dressing"){
  addTicketRow(`　『${getName(key)}』`);
}else{
  addTicketRow(`　【${getName(key)}】`, "", "1");
}

          }
        });

      }else{

        // その他のセット
        p.set.items.forEach(id=>{
          ticketLines.push(`　【${getName(id)}】`);
        });
p.set.items.forEach(id=>{
  addTicketRow(`　【${getName(id)}】`, "", "1");
});
      }

      // 変更表示
      if(p.changes){
  p.changes.forEach(ch=>{
    ticketLines.push(`《${ch.name}》`);
    addTicketRow(`《${ch.name}》`);
  });
}
    }

    // 単品表示
    if(p.singles){

 p.singles.forEach(id=>{

  ticketLines.push(`TO　【${getName(id)}】(単)`);
addTicketRow(`TO　【${getName(id)}】(単)`, "", "1");

  // 単品サラダはドレッシングも表示
  if(id === "salad"){
    ticketLines.push(`　『${getName("dressing")}』`);
    addTicketRow(`　『${getName("dressing")}』`);
  }

});

}

  });

} // selectedLevel === 3 終了
  /* レベル1：今まで通り */
if(selectedLevel === 1){

  // ★商品名を伝票に表示
  ticketLines.push(`TO　${currentProduct.name}`);
if(isSideProduct){
  addTicketRow(`TO　${currentProduct.name}`, "", "1");
}else{
  addTicketRow(`TO　${currentProduct.name}`, "1", "");
}
  currentProduct.accessories.forEach(id=>{
    if(printIds.includes(id)){
      ticketLines.push(`　${getName(id)}`);
    }
  });
currentProduct.accessories.forEach(id=>{
  if(printIds.includes(id)){
    addAccessoryTicketRow(id);
  }
});

}

  /* レベル2：セット・変更・単品を表示 */
if(selectedLevel === 2){

  // ★商品名を伝票に表示
  ticketLines.push(`TO${currentProduct.name}`);
addTicketRow(`TO${currentProduct.name}`, "1", "");
  const baseAcc = currentProduct.baseAccessories || [];

    baseAcc.forEach(id=>{
      if(printIds.includes(id)){
        ticketLines.push(`　${getName(id)}`);
        
      }
    });

baseAcc.forEach(id=>{
  if(printIds.includes(id)){
    addAccessoryTicketRow(id);
  }
});
  if(level2Set){
  ticketLines.push(`　TO● ${level2Set.name}`);
addTicketRow(`　TO● ${level2Set.name}`);

  // ▼ サラダセットだけ順番固定
  if(level2Set.id === "salad_set"){

    const order = ["salad","miso","dressing"];

    order.forEach(key=>{
      if(level2Set.items.includes(key)){

        if(key === "dressing"){
          ticketLines.push(`　『${getName(key)}』`);
        }else{
          ticketLines.push(`　【${getName(key)}】`);
        }

if(key === "dressing"){
  addTicketRow(`　『${getName(key)}』`);
}else{
  addTicketRow(`　【${getName(key)}】`, "", "1");
}

      }
    });

  }else{

   // ▼ それ以外のセット
level2Set.items.forEach(id=>{
  ticketLines.push(`　【${getName(id)}】`);
});

level2Set.items.forEach(id=>{
  addTicketRow(`　【${getName(id)}】`, "", "1");
});
  }

  
}

/* =========================
   変更表示
========================= */

level2Changes.forEach(ch=>{

  // すきすきセットは変更表示しない
  if(level2Set && level2Set.id === "sukisuki_set"){
    return;
  }

  if(
  level2Set && level2Set.id === "salad_set"
  && ch.id === "ontama_change"
){
  return;
}
  ticketLines.push(`《${ch.name}》`);
addTicketRow(`《${ch.name}》`);
});

/* 単品 */
level2Singles.forEach(id=>{
 ticketLines.push(`TO　【${getName(id)}】(単)`);
addTicketRow(`TO　【${getName(id)}】(単)`, "", "1");
});

} // ← ★ここでレベル2の表示を閉じる


/* =========================
   正確カウント（ここ重要：外に出す）
========================= */

const SIDE_ITEMS = [
  "egg","ontama","miso","tonjiru","oshinko",
  "salad","apple","juice","toy"
];

const answer = selectedLevel === 2
  ? getLevel2Answer()
  : [...currentProduct.toppings, ...currentProduct.baseAccessories || currentProduct.accessories];

const ok = isMatch(answer, collected);
/* メイン */
const mainCount = selectedLevel === 3
  ? level3Products.length
  : (isSideProduct ? 0 : 1);

/* サイド */
let sideCount;

if(selectedLevel === 3){

  // 中央部屋と右部屋のサイド容器を両方数える
  const level3SideItems = [
    ...level3MiddleItems,
    ...level3RightItems
  ];

  sideCount = level3SideItems.filter(id =>
    SIDE_ITEMS.includes(id)
  ).length;

}else{
  // レベル1・2は今まで通り
  sideCount = answer.filter(id =>
    SIDE_ITEMS.includes(id)
  ).length;

  // チョレギサラダは、のりフレークをサイド容器として数える
  if(currentProduct.id === "cholegi_salad"){
    sideCount++;
  }

}
/* 小袋 */
let pouchCount = 0;

if(selectedLevel === 3){

  // レベル3は中央部屋と右部屋の実際の正解アイテムを合計
  const level3PouchItems = [
    ...level3MiddleItems,
    ...level3RightItems
  ];

  level3PouchItems.forEach(id => {

    if(
      !SIDE_ITEMS.includes(id) &&
      id !== "toset" &&
      id !== "toset3" &&
      id !== "spoon" &&
      id !== "nori"
    ){
      pouchCount++;
    }

    // dressing2は画像1個でも小袋は2個
    if(id === "dressing2"){
      pouchCount++;
    }

  });

  // たたき丼のわさび・だししょうゆは左部屋扱いなので別加算
  level3Products.forEach(product => {
    if(product.id === "tataki_don"){
      pouchCount += 2;
    }
  });

}else{

  // レベル1・2は今まで通り
  pouchCount = currentProduct.accessories.filter(id =>
    !SIDE_ITEMS.includes(id) &&
    id !== "toset" &&
    id !== "toset3" &&
    id !== "spoon" &&
    id !== "nori"
  ).length;

  // ドレッシング×2は小袋2個
  if(currentProduct.accessories.includes("dressing2")){
    pouchCount++;
  }

  // たたき丼は、わさび・だししょうゆを追加
  if(currentProduct.id === "tataki_don"){
    pouchCount += 2;
  }

}
 const itemRows = ticketRows.map(row => {

  // 商品と商品の間の区切り線
  if(row.divider){
    return `
      <tr class="ticketProductDivider">
        <td class="checkCell"></td>
        <td class="nameCell"></td>
        <td class="mainCell"></td>
        <td class="sideCell"></td>
      </tr>
    `;
  }

  return `
    <tr class="ticketNormalRow">
      <td class="checkCell"></td>
      <td class="nameCell">${row.text}</td>
      <td class="mainCell">${row.main}</td>
      <td class="sideCell">${row.side}</td>
    </tr>
  `;

}).join("");

  ticket.innerHTML = `
    <div class="realTicket">
      <table class="ticketTopTable">
        <tr>
          <td class="topLabel">伝票</td>
          <td class="topNumber">${ticketNo}</td>
          <td class="topLabel">卓番</td>
          <td class="topNumber">DT</td>
        </tr>
      </table>

      <table class="ticketItemTable">
        <thead>
          <tr>
            <th class="checkCell"></th>
            <th class="nameCell">品　名</th>
            <th class="mainCell">メ</th>
            <th class="sideCell">サ</th>
          </tr>
        </thead>
        <tbody>
  ${itemRows}
</tbody>
      <table class="ticketCountTable">
        <tr>
          <th>メイン容器</th>
          <th>サイドヨウキ</th>
          <th>小袋など</th>
        </tr>
        <tr>
          <td>${mainCount}</td>
          <td>${sideCount}</td>
          <td>${pouchCount}</td>
        </tr>
      </table>
    </div>
  `;
}
/* ---------- 袋表示 ---------- */
function updatePickedList(){

  const box = document.getElementById("pickedList");
  const bag = document.getElementById("bagImage");

  if(!box || !bag) return;

  box.innerHTML = "";

  if(!player || !player.items) return;

 /* 袋画像 */
bag.src = "images/bag/bag1.png";

  /* 袋の中身 */
  player.items.forEach(item=>{

    const img = document.createElement("img");

    img.src = item.image;
    img.alt = item.name;
    img.title = item.name;

    box.appendChild(img);

  });

}
/* =================================================
   商品画像変更
================================================= */
function updatePlayerSprite(src){
  player.sprite.src = src;

  const productImage = document.getElementById("productImage");
  if(productImage) productImage.src = src;

}

/* =========================
   レベル2 正解生成
========================= */
function getLevel2Answer(){
  return [
    ...currentProduct.accessories,
    ...currentProduct.toppings
  ];
}

/* =========================
   現在いる部屋番号取得
   0:左 1:中央 2:右
========================= */
function getCurrentRoomIndex(x, y){

  for(let i = 0; i < rooms.length; i++){
    const r = rooms[i];

    if(
      x >= r.x &&
      x < r.x + r.w &&
      y >= r.y &&
      y < r.y + r.h
    ){
      return i;
    }
  }

  return -1;
}
