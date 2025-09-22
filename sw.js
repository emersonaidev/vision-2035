// Service Worker para Vision 2035
const CACHE_NAME = 'vision2035-v1';
const urlsToCache = [
  '/',
  '/styles.min.css',
  '/script.min.js',
  '/Resourcers/Logo/Logo_Stroke.png',
  '/Resourcers/Logo/Logo_White.png',
  // Adicionar imagens críticas (hero)
  '/Resourcers/Images/optimized/necker.island.12.png'
];

// Instalar o Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativar o Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requisições
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retornar resposta
        if (response) {
          return response;
        }

        // IMPORTANTE: Clone a requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Verificar se recebemos uma resposta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // IMPORTANTE: Clone a resposta
          const responseToCache = response.clone();

          // Cache de imagens dinamicamente
          if (event.request.url.includes('/Images/')) {
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }

          return response;
        });
      })
  );
});