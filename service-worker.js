// Service Worker for caching all assets
const CACHE_NAME = "easycab-cache-v1";
const urlsToCache = [
  "../About Us/About Us.html",
  "../About Us/About Us.css",
  "../About Us/About Us.js",
  "../About Us/About Us_hidden.css",
  "../Dashboard/dashboard.css",
  "../Dashboard/dashboard.html",
  "../Dashboard/dashboard.js",
  "../Dashboard/dashboard_hidden.css",
  "../Driver & Taxi Login/Driver-Login.html",
  "../Driver & Taxi Login/EMP Styles.css",
  "../Driver & Taxi Login/EMP.js",
  "../Driver & Taxi Login/emp_hiddent.css",
  "../Driver & Taxi Login/EMP_Login.html",
  "../Driver & Taxi Login/index.js",
  "../Driver & Taxi Login/styles.css",
  "../Driver Webapp/Driver.css",
  "../Driver Webapp/Driver.html",
  "../Driver Webapp/Driver.js",
  "../Driver Webapp/Driver_hidden.css",
  "../Driver Webapp/manifest.json",
  "../Driver Webapp/service-worker.js",
  "../Drivers Dashboard/Driver-Login.html",
  "../Drivers Dashboard/driver.js",
  "../Drivers Dashboard/styles.css",
  "../FeedBack/feedback.css",
  "../FeedBack/feedback.html",
  "../FeedBack/feedback.js",
  "../FeedBack/feedback_hidden.css",
  "../index.css",
  "../index.html",
  "../index.js",
  "../index_hidden.css",
  "../manifest.json",
  "../service-worker.js",
  "../login/login.css",
  "../login/login.html",
  "../login/login.js",
  "../login/redirect.js",
  "../Main Login/index.html",
  "../Main Login/index.js",
  "../Main Login/styles.css",
  "../Main Login/styles_hidden.css",
  "../Maintance/undermaintance.html",
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
  "../Payment/payment.css",
  "../Payment/payment.html",
  "../Payment/payment.js",
  "../Post/post plan.css",
  "../Post/post plan.html",
  "../Post/post plan.js",
  "../Post/Post_hidden.css",
  "../Profile/user profiel.html",
  "../Profile/user profile.css",
  "../Profile/user profile.js",
  "../Profile/user_hidden.css",
  "../Start soon/index.html",
  "../Start soon/script.js",
  "../Start soon/start_hidden.css",
  "../Start soon/styles.css",
  "../Student Booking/Studentbooking.css",
  "../Student Booking/studentbooking.html",
  "../Student Booking/Studentbooking.js",
  "../Student Booking/Student_hidden.css",
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
  "../Terms&Condition/Terms and condition.html",
  "../webchat/app.js",
  "../webchat/index.html",
  "../webchat/styles.css",
  "../webchat/styles_hidden.css"

];

// Installation
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service Worker: Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetching
self.addEventListener("fetch", (event) => {
  console.log("Service Worker: Fetching resource...", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activation
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Service Worker: Deleting old cache...", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

