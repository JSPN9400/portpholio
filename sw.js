const CACHE = 'jspn-v4';
const CORE = ['/portpholio/','/portpholio/index.html','/portpholio/assets/css/main.css','/portpholio/assets/js/app.js','/portpholio/assets/images/photo-400.jpg','/portpholio/assets/data/projects.json','/portpholio/assets/data/articles.json','/portpholio/assets/data/timeline.json','/portpholio/assets/data/testimonials.json','/portpholio/pages/projects.html','/portpholio/pages/blog.html'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/portpholio/index.html')))));
