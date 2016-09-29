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
				throw Error('${event.request.url} not found in cache');
			}
			return response;
		})
};

function shouldHandleFetch (event) {
	var request = event.request;
	var url = new URL(request.url);

	console.log('URL is ${url.pathname}');
	// conditions
	var isGetRequest = (request.method === 'GET');
	var isSameOrigin = (url.origin === self.location.origin);

	if (isGetRequest && isSameOrigin) {
		console.log('Request made for ${url.pathname}');
		return (url.pathname.match(/panda\.png/) !== null)
	}
	return false;
};

self.addEventListener('fetch', event => {
	console.log('fetch called');
	if (shouldHandleFetch(event)) {
		fetchFromCache(event);
	}
});
