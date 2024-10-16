const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  'About Us(About Us) - About Us.css.Name',
  'About Us(About Us) - About Us.html.Name',
  'About Us(About Us) - About Us.js.Name',
  'About Us(About Us) - About Us_hidden.css.Name',
  'assets(assets) - Advantages.jpeg.Name',
  'assets(assets) - Akshay.jpg.Name',
  'assets(assets) - Ankit.png.Name',
  'assets(assets) - Arye.jpg.Name',
  'assets(assets) - Atharva.jpg.Name',
  'assets(assets) - backgroundimage.jpeg.Name',
  'assets(assets) - bitmoji.png.Name',
  'assets(assets) - Blue Modern Investment Mobile App Promotion Facebook Ad.png.Name',
  'assets(assets) - contact us.jpeg.Name',
  'assets(assets) - default Avatar.jpg.Name',
  'assets(assets) - Divyansh.png.Name',
  'assets(assets) - easycab-driver.jpg.Name',
  'assets(assets) - Google logo.png.Name',
  'assets(assets) - howtouse.jpeg.Name',
  'assets(assets) - instagram.jpeg.Name',
  'assets(assets) - Linkedin.png.Name',
  'assets(assets) - loginimage.png.Name',
  'assets(assets) - logo (1).png.Name',
  'assets(assets) - logo.jpeg.Name',
  'assets(assets) - Nishta.png.Name',
  'assets(assets) - Padma Priya mam.jpeg.Name',
  'assets(assets) - Pranav.jpg.Name',
  'assets(assets) - preloader.mp4.Name',
  'assets(assets) - Sahil.jpg.Name',
  'assets(assets) - smile.jpeg.Name',
  'assets(assets) - Tanisha.png.Name',
  'assets(assets) - Team.jpg.Name',
  'assets(assets) - tickmark.jpeg.Name',
  'assets(assets) - Vyom Sen.png.Name',
  'assets(assets) - what is easycab.jpeg.Name',
  'Driver Webapp(Driver Webapp) - Driver.css.Name',
  'Driver Webapp(Driver Webapp) - Driver.html.Name',
  'Driver Webapp(Driver Webapp) - Driver.js.Name',
  'Driver Webapp(Driver Webapp) - Driver_hidden.css.Name',
  'Driver Webapp(Driver Webapp) - manifest.json.Name',
  'Driver Webapp(Driver Webapp) - service-worker.js.Name',
  'FeedBack(FeedBack) - feedback.css.Name',
  'FeedBack(FeedBack) - feedback.html.Name',
  'FeedBack(FeedBack) - feedback.js.Name',
  'FeedBack(FeedBack) - feedback_hidden.css.Name',
  'index(index) - index.css.Name',
  'index(index) - index.html.Name',
  'index(index) - index.js.Name',
  'index(index) - index_hidden.css.Name',
  'index(index) - manifest.json.Name',
  'index(index) - service-worker.js.Name',
  'login(login) - login.css.Name',
  'login(login) - login.html.Name',
  'login(login) - login.js.Name',
  'login(login) - redirect.js.Name',
  'Maintance(Maintance) - undermaintance.html.Name',
  'Parent - webapp(Parent - webapp) - app.js.Name',
  'Parent - webapp(Parent - webapp) - index.html.Name',
  'Parent - webapp(Parent - webapp) - login.css.Name',
  'Parent - webapp(Parent - webapp) - login.html.Name',
  'Parent - webapp(Parent - webapp) - login.js.Name',
  'Parent - webapp(Parent - webapp) - styles.css.Name',
  'Parent - webapp(Parent - webapp) - styles_hidden.css.Name',
  'Payment(Payment) - payment.css.Name',
  'Payment(Payment) - payment.html.Name',
  'Payment(Payment) - payment.js.Name',
  'Post(Post) - post plan.css.Name',
  'Post(Post) - post plan.html.Name',
  'Post(Post) - post plan.js.Name',
  'Post(Post) - Post_hidden.css.Name',
  'Profile(Profile) - user profiel.html.Name',
  'Profile(Profile) - user profile.css.Name',
  'Profile(Profile) - user profile.js.Name',
  'Profile(Profile) - user_hidden.css.Name',
  'Start soon(Start soon) - index.html.Name',
  'Start soon(Start soon) - script.js.Name',
  'Start soon(Start soon) - start_hidden.css.Name',
  'Start soon(Start soon) - styles.css.Name',
  'Student Booking(Student Booking) - Student_hidden.css.Name',
  'Student Booking(Student Booking) - Studentbooking.css.Name',
  'Student Booking(Student Booking) - studentbooking.html.Name',
  'Student Booking(Student Booking) - Studentbooking.js.Name',
  'taxi(taxi) - Mayataxi.css.Name',
  'taxi(taxi) - Mayataxi.html.Name',
  'taxi(taxi) - Mayataxi.js.Name',
  'taxi(taxi) - Mayataxi_hidden.css.Name',
  'Terms&Condition(Terms&Condition) - Terms and condition.html.Name'
];

// Installation event for caching files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to cache:', error);
      })
  );
});

// Activation event to clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event for serving cached files or making network requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return the cached file if found, otherwise fetch from the network
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.error('Fetch failed, serving offline page if applicable:', error);
        // You could add a fallback offline page here, e.g.:
        // return caches.match('/offline.html');
      })
  );
});
