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
