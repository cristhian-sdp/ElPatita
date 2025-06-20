const CACHE_NAME = 'elpatita-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.min.css',
  '/js/script.min.js',
  '/assets/favicon.ico',
  '/assets/img/misc/pollo-inicio.webp',
  '/assets/img/misc/papas-fritas.webp',
  '/assets/img/misc/alitas-de-pollo.webp',
  '/assets/img/misc/huanchaco.webp',
  '/assets/video/broaster.webm',
  '/assets/video/potatoes.webm',
  '/assets/video/drink.webm',
  '/assets/video/brasas.webm',
  '/assets/fonts/Nunito-Regular.woff2',
  '/assets/fonts/Nunito-SemiBold.woff2',
  '/assets/fonts/Nunito-Bold.woff2'
];
// Instalar el service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});
// Activar el service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devolver desde cache si existe
        if (response) {
          return response;
        }
        // Si no está en cache, hacer la petición a la red
        return fetch(event.request);
      }
    )
  );
});