// register serviceworker
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js', {
		'scope': '/serviceworker_test/'
	});
}

console.log(Date.now());
