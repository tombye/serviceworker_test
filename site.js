// register serviceworker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js', {
		'scope': '/'
	});
}
