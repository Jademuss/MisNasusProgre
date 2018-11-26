var CACHE_NAME = 'my-site-cache-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/formulario.html',
    '/lista_lomitos.html',    
    '/styles/boostrap.min.css',    
    '/styles/formulario.css',
    '/styles/entry.css',
    '/styles/lista.css',
    '/styles/galeria.css',
    '/styles/mainn.css',
    '/styles/menu.css',
    '/js/jquery.min.js',
    '/js/boostrap.min.js',
    '/js/app.js',
    '/js/formulario.js',
    '/js/javamenu.js',
    '/img/perro_1.jpg',
    '/img/perro_2.jpg',
    '/img/perro_3.JPG',
    '/img/perro_4.JPG',
    '/img/perro_5.JPG',
    '/img/perro_6.JPG',
    '/img/iconoperro.png',
    '/img/icon-paw.png',
    '/img/galeria_1.jpg',
    '/img/galeria_2.jpg',
    '/img/galeria_3.jpg',    
    '/img/rescate.jpg',
    '/img/crowfunding.jpg'
];

self.addEventListener( 'install', function( e ) {
    console.log( '[ServiceWorker] Install' );
    e.waitUntil(
        caches.open( CACHE_NAME ).then( function( cache ) {
            console.log( '[ServiceWorker] Caching app shell' );
            return cache.addAll( filesToCache );
        } )
    );
  });

  self.addEventListener( 'activate', function( e ) {
    console.log( '[ServiceWorker] Activate' );
    e.waitUntil(
      caches.keys( ).then( function( keyList ) {
        return Promise.all( keyList.map( function( key ) {
          if ( key !== CACHE_NAME ) {
            console.log('[ServiceWorker] Removing old cache', key );
            return caches.delete( key );
          }
        }));
      })
    );
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }); 