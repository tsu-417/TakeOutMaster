/* =================================================
   TakeOutMaster Service Worker
================================================= */

const CACHE_NAME = "takeoutmaster-v1";

/* 最初に保存しておく基本ファイル */
const CORE_FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./game.js",
  "./map.js",
  "./player.js",
  "./item.js",
  "./manifest.webmanifest",
  "./images/icons/icon-192.png",
  "./images/icons/icon-512.png"
];

/* =================================================
   インストール時
================================================= */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(CORE_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

/* =================================================
   古いキャッシュを削除
================================================= */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

/* =================================================
   ファイル読み込み
================================================= */
self.addEventListener("fetch", event => {
  const request = event.request;

  /* GET以外は処理しない */
  if (request.method !== "GET") return;

  /* 外部サイトのファイルは処理しない */
  const requestUrl = new URL(request.url);

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {

        /* キャッシュがあれば先に表示 */
        if (cachedResponse) {
          return cachedResponse;
        }

        /* キャッシュがなければネットから取得 */
        return fetch(request)
          .then(networkResponse => {

            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse;
            }

            /* 読み込んだ画像や音声も自動保存 */
            const responseCopy = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(request, responseCopy);
              });

            return networkResponse;
          })
          .catch(() => {

            /* ページ移動時に通信できなければトップ画面を表示 */
            if (request.mode === "navigate") {
              return caches.match("./index.html");
            }

            return new Response("", {
              status: 503,
              statusText: "Offline"
            });
          });
      })
  );
});