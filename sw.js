// 用于标注创建的缓存，也可以根据它来建立版本规范
const CACHE_NAME = "lzwme_cache_v1.0.0";

// 列举要默认缓存的静态资源，一般用于离线使用
const urlsToCache = [
    "/index.html"
];


importScripts('/workbox-v4.3.1/workbox-sw.js');


if(workbox){
    console.log('loaded');
}else{
    console.log('loaded ERROR');
}

workbox.setConfig({
  debug: false,
  modulePathPrefix: '/workbox-v4.3.1/'
});

// workbox.skipWaiting();
// workbox.clientsClaim();

/*预先下载资源的*/
workbox.precaching.precache([
   {url: "/index4.html"
   //,revision: "1234"
    }
]);

workbox.precaching.addRoute();


workbox.routing.registerRoute(
  new RegExp('.*\.html'),
  new workbox.strategies.StaleWhileRevalidate()
);


// workbox.routing.registerRoute(
//     new RegExp(".*\.html"),
//     new workbox.strategies.StaleWhileRevalidate()
// );

// self.addEventListener('install', function(event) {
//   // Perform install steps
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });


// self.addEventListener('activate', function(event) {
//   var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });