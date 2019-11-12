const staticCacheName = 'static-tm4';
const expectedCaches = [
	staticCacheName
];

self.addEventListener('install', event => {
	self.skipWaiting();

	event.waitUntil(
		caches.open(staticCacheName)
			.then(cache => cache.addAll([
				"/lib/jquery.min.js", 
				"/tm4/index.js",
				"/tm4/index.css",
				"/tm4/index.html"]))
	);
});

// remove caches that aren't in expectedCaches
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(
			keys.map(key => {
				if (!expectedCaches.includes(key)) return caches.delete(key);
			})
		))
	);
});

async function cacheOnDemand(request) {
	const cachedResponse = await caches.match(request);
	if (cachedResponse) return cachedResponse;

	const response = await fetch(request);
	const responseToCache = response.clone();
	caches.open(staticCacheName).then(cache => cache.put(request, responseToCache));

	return response;
}

function mergeResponses(responsePromises, headers) {
	const readers = responsePromises.map(p => Promise.resolve(p).then(r => r.body.getReader()));
	let fullStreamedResolve;
	let fullyStreamedReject;
	const fullyStreamed = new Promise((r, rr) => {
		fullStreamedResolve = r;
		fullyStreamedReject = rr;
	});

	const readable = new ReadableStream({
		pull(controller) {
			return readers[0].then(r => r.read()).then(result => {
				if (result.done) {
					readers.shift();

					if (!readers[0]) {
						controller.close();
						fullStreamedResolve();
						return;
					}
					return this.pull(controller);
				}

				controller.enqueue(result.value);
			}).catch(err => {
				fullyStreamedReject(err);
				throw err;
			});
		},
		cancel() {
			fullStreamedResolve();
		}
	});

	return responsePromises[0].then(response => ({
		fullyStreamed,
		response: new Response(readable, {
			headers: headers || response.headers
		})
	}));
}

self.addEventListener('fetch', event => {
	const url = new URL(event.request.url);

	if (url.origin === location.origin) {
		// home or article pages
		const includeUrl = new URL(url);
		includeUrl.pathname += 'include';

		const parts = [
			// Using cacheOnDemand as Safari sometimes drops caches
			cacheOnDemand('/tm4/index.js'),
			fetch(includeUrl).then(response => {
				if (!response.ok && response.status != 404) {
					return cacheOnDemand('/error.ba6821d4f751.inc');
				}
				return response;
			}).catch(err => cacheOnDemand('/offline.d989ddb2d13b.inc')),
			cacheOnDemand('/shell-end.ac4a434172d6.inc')
		];

		event.respondWith(
			mergeResponses(parts, { 'Content-Type': 'text/html; charset=utf-8' }).then(({ fullyStreamed, response }) => {
				event.waitUntil(fullyStreamed);
				return response;
			})
		);
		return;
	}

	// cache-first for the rest
	event.respondWith(
		caches.match(event.request).then(r => r || fetch(event.request))
	);
});
