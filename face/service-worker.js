// Service Worker for caching all assets
const CACHE_NAME = "easycab-cache-v1";
const urlsToCache = [
  // About Us section
  "../About Us/About Us.html",
  "../About Us/About Us.css",
  "../About Us/About Us.js",
  "../About Us/About Us_hidden.css",

  // Assets
  "../assets/Advantages.jpeg",
  "../assets/Akshay.jpg",
  "../assets/Ankit.png",
  "../assets/apple-touch-icon-ipad-76x76.png",
  "../assets/apple-touch-icon-ipad-retina-152x152.png",
  "../assets/apple-touch-icon-iphone-60x60.png",
  "../assets/apple-touch-icon-iphone-retina-120x120.png",
  "../assets/Arye.jpg",
  "../assets/Atharva.jpg",
  "../assets/backgroundimage.jpeg",
  "../assets/bitmoji.png",
  "../assets/Blue Modern Investment Mobile App Promotion Facebook Ad.png",
  "../assets/contact us.jpeg",
  "../assets/default Avatar .jpg",
  "../assets/Divyansh.png",
  "../assets/Driver Login.png",
  "../assets/Easycab - Parent.jpg",
  "../assets/easycab-driver.jpg",
  "../assets/Google logo.png",
  "../assets/howtouse.jpeg",
  "../assets/instagram.jpeg",
  "../assets/Linkedin.png",
  "../assets/loginimage.png",
  "../assets/logo (1).png",
  "../assets/logo.jpeg",
  "../assets/Nishta.png",
  "../assets/Padma Priya mam.jpeg",
  "../assets/Parent Login..jpeg",
  "../assets/Parent Login.png",
  "../assets/Parent web-logo.jpg",
  "../assets/Pranav.jpg",
  "../assets/preloader.mp4",
  "../assets/Sahil.jpg",
  "../assets/smile.jpeg",
  "../assets/Student login.jpeg",
  "../assets/tab logo.ico",
  "../assets/Tanisha.png",
  "../assets/Taxi Driver.jpeg",
  "../assets/Taxi Login.png",
  "../assets/taxi Management.jpeg",
  "../assets/Team.jpg",
  "../assets/tickmark.jpeg",
  "../assets/VIT Admin Login.png",
  "../assets/VIT Logo.jpeg",
  "../assets/VITian.jpeg",
  "../assets/Vyom Sen.png",
  "../assets/web app 192 logo.jpg",
  "../assets/what is easycab.jpeg",

  // Control Panel section
  "../control Panel/dashboard.css",
  "../control Panel/dashboard.html",
  "../control Panel/dashboard.js",
  "../control Panel/dashboard_hidden.css",
  "../control Panel/feedback.css",
  "../control Panel/feedback.html",
  "../control Panel/feedback.js",
  "../control Panel/feedback_hidden.css",
  "../control Panel/login.css",
  "../control Panel/login.html",
  "../control Panel/login.js",
  "../control Panel/login_hidden.css",
  "../control Panel/Planlist.css",
  "../control Panel/Planlist.html",
  "../control Panel/Planlist.js",
  "../control Panel/Planlist_hidden.css",
  "../control Panel/Registeration.js",
  "../control Panel/Registerations.css",
  "../control Panel/Registerations.html",
  "../control Panel/Registerations_hidden.css",
  "../control Panel/VITian App.js",
  "../control Panel/VITian notice.html",
  "../control Panel/VITians styles.css",
  "../control Panel/VITian_hidden.css",

  // Dashboard section
  "../Dashboard/dashboard.css",
  "../Dashboard/dashboard.html",
  "../Dashboard/dashboard.js",
  "../Dashboard/dashboard_hidden.css",

  // Driver & Taxi Login section
  "../Driver & Taxi Login/Driver-Login.html",
  "../Driver & Taxi Login/EMP Styles.css",
  "../Driver & Taxi Login/EMP.js",
  "../Driver & Taxi Login/emp_hiddent.css",
  "../Driver & Taxi Login/EMP_Login.html",
  "../Driver & Taxi Login/index.js",
  "../Driver & Taxi Login/styles.css",

  // Driver Webapp section
  "../Driver Webapp/Driver.css",
  "../Driver Webapp/Driver.html",
  "../Driver Webapp/Driver.js",
  "../Driver Webapp/Driver_hidden.css",
  "../Driver Webapp/manifest.json",
  "../Driver Webapp/service-worker.js",

  // Drivers Dashboard section
  "../Drivers Dashboard/Driver-Login.html",
  "../Drivers Dashboard/driver.js",
  "../Drivers Dashboard/styles.css",

  // Face recognition section
  "../face/app.js",
  "../face/face.css",
  "../face/firebase.js",
  "../face/index.html",
  "../face/styles_hidden.css",

  // Feedback section
  "../FeedBack/feedback.css",
  "../FeedBack/feedback.html",
  "../FeedBack/feedback.js",
  "../FeedBack/feedback_hidden.css",

  // Index section
  "../index/index.css",
  "../index/index.html",
  "../index/index.js",
  "../index/index_hidden.css",
  "../index/manifest.json",
  "../index/service-worker.js",

  // Login section
  "../login/login.css",
  "../login/login.html",
  "../login/login.js",
  "../login/redirect.js",

  // Main Login section
  "../Main Login/index.html",
  "../Main Login/index.js",
  "../Main Login/styles.css",
  "../Main Login/styles_hidden.css",

  // Maintenance section
  "../Maintance/undermaintance.html",

  // Parents section
  "../Parents/bookHistory.css",
  "../Parents/bookHistory.html",
  "../Parents/bookHistory.js",
  "../Parents/booking.css",
  "../Parents/booking.html",
  "../Parents/booking.js",
  "../Parents/bookingHistory_hidden.css",
  "../Parents/booking_hidden.css",
  "../Parents/contact us.css",
  "../Parents/contact us.html",
  "../Parents/contact_hidden.css",
  "../Parents/dashboard.css",
  "../Parents/dashboard.html",
  "../Parents/dashboard.js",
  "../Parents/dashboard_hidden.css",
  "../Parents/login.css",
  "../Parents/login.html",
  "../Parents/login.js",
  "../Parents/login_hidden.css",
  "../Parents/manifest.json",
  "../Parents/service-worker.js",
  "../Parents/ward details.css",
  "../Parents/ward details.html",
  "../Parents/ward details.js",
  "../Parents/ward details_hidden.css",

  // Payment section
  "../Payment/payment.css",
  "../Payment/payment.html",
  "../Payment/payment.js",

  // Post section
  "../Post/post plan.css",
  "../Post/post plan.html",
  "../Post/post plan.js",
  "../Post/Post_hidden.css",

  // Profile section
  "../Profile/user profiel.html",
  "../Profile/user profile.css",
  "../Profile/user profile.js",
  "../Profile/user_hidden.css",

  // Start Soon section
  "../Start soon/index.html",
  "../Start soon/script.js",
  "../Start soon/start_hidden.css",
  "../Start soon/styles.css",

  // Student Booking section
  "../Student Booking/Studentbooking.css",
  "../Student Booking/studentbooking.html",
  "../Student Booking/Studentbooking.js",
  "../Student Booking/Student_hidden.css",

  // Taxi section
  "../taxi/taxi.css",
  "../taxi/taxi.js",
  "../taxi/Taxilogin.html",

  // Taxi Employee section
  "../Taxi Employee/+ADD Driver.html",
  "../Taxi Employee/+ADDEmployee.css",
  "../Taxi Employee/+ADDEmployee.html",
  "../Taxi Employee/+ADDEmployee.js",
  "../Taxi Employee/ADD Driver.css",
  "../Taxi Employee/ADD Driver.js",
  "../Taxi Employee/ADD Driver_hidden.css",
  "../Taxi Employee/add emp hidden.css",
  "../Taxi Employee/driverdetails.css",
  "../Taxi Employee/driverDetails.html",
  "../Taxi Employee/driverdetails.js",
  "../Taxi Employee/driver_hidden.css",
  "../Taxi Employee/employeedetails.css",
  "../Taxi Employee/employeedetails.html",
  "../Taxi Employee/employeedetails.js",
  "../Taxi Employee/employeedetails_hidden.css",
  "../Taxi Employee/index hidden.css",
  "../Taxi Employee/index.html",
  "../Taxi Employee/index.js",
  "../Taxi Employee/Mayataxi.css",
  "../Taxi Employee/Mayataxi.html",
  "../Taxi Employee/Mayataxi.js",
  "../Taxi Employee/Mayataxi_hidden.css",
  "../Taxi Employee/styles.css",

  // Terms and Condition section
  "../Terms&Condition/Terms and condition.html",

  // Webchat section
  "../webchat/app.js",
  "../webchat/index.html",
  "../webchat/styles.css",
  "../webchat/styles_hidden.css"
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
      // Cache each asset and log any errors
      return Promise.all(urlsToCache.map(asset => {
        return cache.add(asset).then(() => {
          console.log(`Successfully cached: ${asset}`);
        }).catch((error) => {
          console.error(`Failed to cache ${asset}:`, error);
        });
      }));
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        console.log(`Serving cached response for: ${event.request.url}`);
        return response; // Return cached response if found
      } else {
        console.log(`Fetching from network: ${event.request.url}`);
        return fetch(event.request); // Fetch from network if not cached
      }
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
