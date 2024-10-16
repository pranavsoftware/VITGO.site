import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, query, collection, where, getDocs, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ",
  authDomain: "easycab-71fcf.firebaseapp.com",
  projectId: "easycab-71fcf",
  storageBucket: "easycab-71fcf.appspot.com",
  messagingSenderId: "621065707054",
  appId: "1:621065707054:web:8b47875a751d361f2e09bf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM elements
const loginContainer = document.getElementById('login-container');
const dashboard = document.getElementById('dashboard');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const bookingDiv = document.getElementById('bookingDiv');
const verifyQR = document.getElementById('verifyQR');
const paymentQR = document.getElementById('paymentQR');
const driverName = document.getElementById('driverName');
const driverProfilePic = document.getElementById('driverProfilePic');
const generateQRCodeBtn = document.getElementById('generateQRCodeBtn'); // Button to generate QR code
const timerDisplay = document.getElementById('timerDisplay'); // Display for the timer
let logoutTimer; // Declare logoutTimer
let countdownTimer; // Timer for QR code expiration
let driverDetailsContainer; // Container for driver details

// Google login button click handler
googleLoginBtn.onclick = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await saveDriverDetails(user);
  } catch (error) {
    console.error("Login Error:", error);
  }
};

// On authentication state change
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginContainer.style.display = 'none';
    dashboard.style.display = 'block';
    driverName.textContent = user.displayName;
    driverProfilePic.src = user.photoURL || '';

    // Fetch and display booking details for the logged-in driver
    await fetchBookingDetails(user.displayName);

    // Fetch driver details from Firebase
    const driverDetails = await fetchDriverDetails(user.uid);
    
    // Initialize driver details container
    driverDetailsContainer = document.getElementById('driverInfoContainer');

    // Generate QR codes for verification and payment
    generateQRCodes(driverDetails);

    // Display driver details including profile picture
    displayDriverDetails(driverDetails);

    // Start inactivity logout timer
    resetLogoutTimer();

    // Reset inactivity timer on user interaction
    document.addEventListener('mousemove', resetLogoutTimer);
    document.addEventListener('keypress', resetLogoutTimer);
  } else {
    loginContainer.style.display = 'block';
    dashboard.style.display = 'none';
  }
});

// Sign-out handler
logoutBtn.onclick = () => signOut(auth);

// Save driver details to Firestore
async function saveDriverDetails(user) {
  const driverDocRef = doc(db, "drivers", user.uid);
  const docSnap = await getDoc(driverDocRef);
  if (!docSnap.exists()) {
    await setDoc(driverDocRef, {
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL || '',
      createdAt: new Date(),
      bookings: []
    });
  }
}

// Fetch booking details for the logged-in driver
async function fetchBookingDetails(driverName) {
  const bookingsRef = collection(db, "bookings");
  const q = query(bookingsRef, where("driverName", "==", driverName));
  const querySnapshot = await getDocs(q);

  bookingDiv.innerHTML = ''; // Clear previous bookings
  querySnapshot.forEach((doc) => {
    const booking = doc.data();
    const bookingCard = document.createElement('div');
    bookingCard.classList.add('booking-card');
    bookingCard.innerHTML = `
      <h4>Booking for ${booking.passengerName}</h4>
      <p>From: ${booking.pickupLocation}</p>
      <p>To: ${booking.dropLocation}</p>
      <p>Date: ${new Date(booking.date).toLocaleDateString()}</p>
      <p>Time: ${booking.time}</p>
    `;
    bookingDiv.appendChild(bookingCard);
  });
}

// Fetch driver details from Firestore
async function fetchDriverDetails(driverId) {
  const driverDocRef = doc(db, "drivers", driverId);
  const driverSnap = await getDoc(driverDocRef);
  return driverSnap.data();
}

// Display driver details including profile picture
function displayDriverDetails(driverDetails) {
  if (driverDetailsContainer) {
    driverDetailsContainer.innerHTML = `
      <h3>${driverDetails.name}</h3>
      <p>Email: ${driverDetails.email}</p>
      <img src="${driverDetails.profilePic || ''}" alt="Driver Profile Picture" style="width: 100px; height: 100px; border-radius: 50%;">
    `;
  } else {
    console.error('Driver details element not found.');
  }
}

// Generate QR Codes and start the countdown
function generateQRCodes(driverDetails) {
  const verifyData = `Name: ${driverDetails.name}, Email: ${driverDetails.email}, Profile Pic: ${driverDetails.profilePic || ''}`;
  const paymentData = `upi: 9854587777@ptaxis&pn=${driverDetails.name}&mc=yourmc&tid=yourtid&am=0.01&cu=INR&url=https://easycab.site`;

  verifyQR.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(verifyData)}`;
  paymentQR.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(paymentData)}`;

  startCountdown();
}

// Start the countdown timer for 30 seconds
function startCountdown() {
  let timeLeft = 30;
  timerDisplay.textContent = `QR Code valid for: ${timeLeft} seconds`;

  clearInterval(countdownTimer); // Clear any existing timer
  countdownTimer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `QR Code valid for: ${timeLeft} seconds`;
    
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
      timerDisplay.textContent = "QR Code expired.";
      hideDriverDetails(); // Hide driver details when QR code expires
    }
  }, 1000);
}

// Hide driver details
function hideDriverDetails() {
  if (driverDetailsContainer) {
    driverDetailsContainer.innerHTML = ''; // Clear the driver details
    alert("QR Code expired. Please ask the driver to generate a new code and scan it.");
  } else {
    console.error('Driver details element not found.');
  }
}

// QR Code scanned event handler
window.saveQRCodeScan = function (type) {
  console.log(`${type} QR Code scanned.`);
};

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// Ensure driver details display after the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  const user = auth.currentUser;
  if (user) {
    const driverDetails = await fetchDriverDetails(user.uid);
    displayDriverDetails(driverDetails);
  }
});

// Add event listener to the QR Code generate button
generateQRCodeBtn.onclick = async () => {
  const user = auth.currentUser;
  if (user) {
    const driverDetails = await fetchDriverDetails(user.uid);
    generateQRCodes(driverDetails); // Generate new QR codes
  } else {
    alert("Please log in to generate QR codes.");
  }
};
