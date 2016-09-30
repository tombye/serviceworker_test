// serviceworker script
self.addEventListener('install', event => {
	function onInstall () {
		return caches.open('static')
			.then(cache => cache.addAll([
					'/serviceworker_test/images/panda.png'
				])
			);
	}

	event.waitUntil(onInstall(event));
});

self.addEventListener('activate', event => {

});

function fetchFromCache (event) {
	return caches.match(event.request)
		.then(response => {
			if (!response) {
				throw Error(`${event.request.url} not found in cache`);
			}
			return response;
		})
};

function shouldHandleFetch (event) {
	var request = event.request;
	var url = new URL(request.url);

	console.log(`URL is ${url.pathname}`);
	// conditions
	var isGetRequest = (request.method === 'GET');
	var isSameOrigin = (url.origin === self.location.origin);

	if (isGetRequest && isSameOrigin) {
		console.log(`Request made for ${url.pathname}`);
		return (url.pathname.match(/panda\.png/) !== null)
	}
	return false;
};

function addToCache (cacheKey, request, response) {
  if (response.ok) {
    var copy = response.clone();
    caches.open(cacheKey).then(
      cache => {
        cache.put(request, copy);
      });
    return response;
  }
};

self.addEventListener('fetch', event => {
	console.log('fetch called at ' + Date.now());
  var cacheKey = 'static';

	if (shouldHandleFetch(event)) {
    event.respondWith(
      fetchFromCache(event)
      .catch(() => fetch(event.request))
      .then(response => addToCache(cacheKey, event.request, response))
    );
	}
});
