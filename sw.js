var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
	'/',
	'/app.js',
	'/TESOEM.png'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache){
				console.log('Cache Abierto!');
				return cache.addAll(urlsToCache);
			})
		);
});

// fetch es un proxy.
self.addEventListener('fetch', function(event){
	event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response){
				return response;   // Devolver lo que esta en la Cache
			}
			return fetch(event.request);
		})
	);
});


