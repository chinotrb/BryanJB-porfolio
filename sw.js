const CACHE_NAME = 'bryan-portfolio-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/index.js',
  '/translations.js',
  '/project-billix.html',
  '/project-gamehaven.html',
  '/assets/png/BryanJB.PNG',
  '/assets/svg/favicon.svg',
  '/assets/png/linkedin-ico.png',
  '/assets/png/github-ico.png',
  '/assets/png/insta-ico.png',
  '/assets/png/opened.png',
  '/assets/png/inGame.png',
  '/assets/png/logros.png',
  '/assets/png/rancked.png',
  'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Portfolio cache opened');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // If both fail, return offline page
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(
      // Handle offline form submissions
      console.log('Background sync triggered for contact form')
    );
  }
});

// Push notifications (for future features)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: '/assets/svg/favicon.svg',
    badge: '/assets/svg/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Portfolio',
        icon: '/assets/svg/favicon.svg'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/assets/svg/favicon.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Bryan J. Brenes Portfolio', options)
  );
});
