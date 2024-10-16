import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, getDocs, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Handle user authentication
onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('username').innerText = user.displayName || user.email;
        await fetchCurrentBooking(user.uid);
    } else {
        window.location.href = '/Parent - webapp/login.html';
    }
});

// Fetch current booking details
async function fetchCurrentBooking(userId) {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    querySnapshot.forEach((doc) => {
        const bookingData = doc.data();
        if (bookingData.userId === userId) {
            const bookingId = doc.id; // Get booking ID
            displayCurrentBooking(bookingData, bookingId);
            displayDriverDetails(bookingData); // Display driver details as well
        }
    });
}

// Function to display current booking
function displayCurrentBooking(data, bookingId) {
    const currentBookingDiv = document.getElementById('current-booking');
    currentBookingDiv.innerHTML = `
    <h3>Current Booking Details</h3>    
    <h4>Current Booking (ID: ${bookingId})</h4>
        <p>Car: ${data.car}</p>
        <p>From: ${data.from}</p>
        <p>To: ${data.to}</p>
        <p>Date: ${data.date}</p>
        <p>Time: ${data.time}</p>
        <p>Payment Mode: ${data.paymentMode}</p>
        <p>Message: ${data.message}</p>
    `;
}

// Function to display driver details
function displayDriverDetails(data) {
    const driverInfoDiv = document.getElementById('driver-info');
    
    // Convert `estimatedPickTime` to a 12-hour AM/PM format if available
    const estimatedPickTime = data.driverDetails && data.driverDetails.estimatedPickTime 
        ? formatTime(data.driverDetails.estimatedPickTime) 
        : "N/A";
    const amount = data.driverDetails && data.driverDetails.amount 
        ? data.driverDetails.amount 
        : "N/A"; // Default to "N/A" if amount is undefined

    driverInfoDiv.innerHTML = `
        <h4>Driver Details</h4>
        <p>Driver Name: ${data.driverDetails?.driverName || "N/A"}</p>
        <p>Phone: ${data.driverDetails?.phone || "N/A"}</p>
        <p>Cab Name: ${data.driverDetails?.cabName || "N/A"}</p>
        <p>Taxi Number: ${data.driverDetails?.taxiNumber || "N/A"}</p>
        <p>Estimated Pick Time: ${estimatedPickTime}</p>
        <p>Amount: ${amount}</p>
        <p>Message: ${data.message || "N/A"}</p>
    `;
}

// Helper function to format time to 12-hour AM/PM format
function formatTime(timeString) {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

// QR Code Scanner logic
const html5QrCode = new Html5Qrcode("reader");

async function checkCameraPermissions() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        startScanning();
    } catch (err) {
        alert("Please allow camera access.");
    }
}

async function startScanning() {
    try {
        await html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, qrCodeSuccessCallback);
        document.getElementById('startScanBtn').style.display = 'none';
        document.getElementById('stopScanBtn').style.display = 'block';
    } catch (err) {
        console.error("Error starting QR code scanning.", err);
    }
}

function qrCodeSuccessCallback(decodedText, decodedResult) {
    document.getElementById('scan-result').innerText = `Scanned QR Code: ${decodedText}`;
}

async function stopScanning() {
    try {
        await html5QrCode.stop();
        document.getElementById('startScanBtn').style.display = 'block';
        document.getElementById('stopScanBtn').style.display = 'none';
    } catch (err) {
        console.error("Error stopping QR code scanning.", err);
    }
}

document.getElementById('startScanBtn').addEventListener('click', startScanning);
document.getElementById('stopScanBtn').addEventListener('click', stopScanning);

// Sign out
document.getElementById('signOutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = '/Parent - webapp/login.html';
    });
});
