// 用于标注创建的缓存，也可以根据它来建立版本规范
const CACHE_NAME = "lzwme_cache_v1.0.0";

// 列举要默认缓存的静态资源，一般用于离线使用
const urlsToCache = [
    "/index.html"
];


importScripts('/workbox-v4.3.1/workbox-sw.js');


if (workbox) {
    console.log('loaded');
} else {
    console.log('loaded ERROR');
}

workbox.setConfig({
    debug: false,
    modulePathPrefix: '/workbox-v4.3.1/'
});


workbox.core.setCacheNameDetails({
  prefix: 'my-app',
  suffix: 'v3.0.15',
  precache: 'install-time',
  runtime: 'run-time',
  googleAnalytics: 'ga',
});



workbox.core.skipWaiting();
workbox.core.clientsClaim();


// workbox.skipWaiting();
// workbox.clientsClaim();

/*预先下载资源的*/
workbox.precaching.precache([{
    url: "/index.html"
    //,revision: "1234"
}]);

workbox.precaching.addRoute();


/*自定义方法处理的，实际上是要进行替换的*/
const handlerCb = ( {url, event, params} ) => {
  console.log("0000");

  
    //return Promise.resolve(new Response('Hello World!'))

    //url = "https://www.baidu.com";
    
    console.log(url);

    return fetch(url).then(function(response) {
        // 在资源请求成功后，将 image、js、css 资源加入缓存列表

        if (

            !response

            ||
            response.status !== 200

            ||
            !response.headers.get('Content-type').match(/image|javascript|test\/css/i)

        ) {

            return response;

        }

        var content = response.text();
        //content = content.replace("///shell.html/","/shell111111111111111.html");


        console.log(content);

        return Promise.resolve(new Response(content));
    });
}

workbox.routing.registerRoute(
    '/index4.html',
    handlerCb
);


workbox.routing.registerRoute(
    new RegExp('.*/static/.*\.css'),

    ( {url, event, params} ) => {
        console.log(url);

        const baseUrl = "http://local.dfqp.com/";
        const newUrl = baseUrl + url.pathname;

        console.log(newUrl);

        return fetch(newUrl,{
            credentials: 'same-origin'
        }).then(function(response) {
        // 在资源请求成功后，将 image、js、css 资源加入缓存列表

            if (

                !response

                ||
                response.status !== 200

                ||
                !response.headers.get('Content-type').match(/image|javascript|test\/css/i)

            ) {

                return response;

            }
        });
    }
);

workbox.routing.registerRoute(
    new RegExp('^http://local.dfqp.com/admin.*'),
    ( event ) => {

        console.log(event);

        if(event.request.method == 'post'){
            return Promise.resolve(new Response('Hello World!'));
        }else{
            const newUrl = event.url;

            return fetch(newUrl,{
                credentials: 'same-origin'
            }).then(function(response) {


            if (

                !response

                ||
                response.status !== 200

                ||
                !response.headers.get('Content-type').match(/image|javascript|test\/css/i)

            ) {

                return response;

            }
        });
        }

    }
);

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