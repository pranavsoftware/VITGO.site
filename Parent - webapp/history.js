import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ",
    authDomain: "easycab-71fcf.firebaseapp.com",
    databaseURL: "https://easycab-71fcf-default-rtdb.firebaseio.com",
    projectId: "easycab-71fcf",
    storageBucket: "easycab-71fcf.appspot.com",
    messagingSenderId: "621065707054",
    appId: "1:621065707054:web:8b47875a751d361f2e09bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fetch past bookings for the user
async function fetchPastBookings(userId) {
    try {
        const bookingsSnapshot = await getDocs(collection(db, "bookings"));
        const pastBookingsContainer = document.getElementById('past-bookings-container');
        let bookingsFound = false;

        bookingsSnapshot.forEach(doc => {
            const bookingData = doc.data();
            if (bookingData.userId === userId) {
                bookingsFound = true;
                const bookingDiv = document.createElement('div');
                bookingDiv.classList.add('booking-item');
                bookingDiv.innerHTML = `
                    <h4>Booking ID: ${doc.id}</h4>
                    <p><strong>Car:</strong> ${bookingData.car || "N/A"}</p>
                    <p><strong>Cab Name:</strong> ${bookingData.cabName || "N/A"}</p>
                    <p><strong>From:</strong> ${bookingData.from || "N/A"}</p>
                    <p><strong>To:</strong> ${bookingData.to || "N/A"}</p>
                    <p><strong>Date:</strong> ${bookingData.date || "N/A"}</p>
                    <p><strong>Time:</strong> ${bookingData.time || "N/A"}</p>
                    <p><strong>Estimated Pick Time:</strong> ${bookingData.estimatedPickTime || "N/A"}</p>
                    <p><strong>Payment Mode:</strong> ${bookingData.paymentMode || "N/A"}</p>
                    <p><strong>Amount:</strong> ${bookingData.amount || "N/A"}</p>
                    <h5>Driver Details:</h5>
                    <p><strong>Name:</strong> ${bookingData.driverDetails?.driverName || "N/A"}</p>
                    <p><strong>Phone:</strong> ${bookingData.driverDetails?.phone || "N/A"}</p>
                    <p><strong>Cab Number:</strong> ${bookingData.taxiNumber || "N/A"}</p>
                    <p><strong>Message:</strong> ${bookingData.message || "N/A"}</p>
                `;
                pastBookingsContainer.appendChild(bookingDiv);
            }
        });

        if (!bookingsFound) {
            pastBookingsContainer.innerHTML = "<p>No past bookings found.</p>";
        }
    } catch (error) {
        console.error("Error fetching past bookings:", error);
    }
}

// Handle authentication state change
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchPastBookings(user.uid);
    } else {
        window.location.href = "login.html"; // Redirect to login page if not authenticated
    }
});

// Sign out
document.getElementById('signOutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "login.html"; // Redirect to login page after signing out
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
});
