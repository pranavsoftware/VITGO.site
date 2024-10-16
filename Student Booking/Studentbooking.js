import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, addDoc, getDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Load username and fetch active booking
onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('username').innerText = user.displayName || user.email;
        await fetchCurrentBooking(user.uid); // Fetch current booking if needed
    } else {
        window.location.href = '/login/login.html'; // Redirect to login if not authenticated
    }
});

// Function to fetch current booking
async function fetchCurrentBooking(userId) {
    try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        querySnapshot.forEach((doc) => {
            const bookingData = doc.data();
            if (bookingData.userId === userId) {
                displayCurrentBooking(bookingData, doc.id); // Display current booking
            }
        });
    } catch (error) {
        console.error("Error fetching current booking:", error);
    }
}

// Function to display current booking
function displayCurrentBooking(data, bookingId) {
    const currentBookingDiv = document.getElementById('current-booking');
    currentBookingDiv.innerHTML = `
        <h4>Current Booking (ID: ${bookingId})</h4>
        <p>Car: ${data.car}</p>
        <p>From: ${data.from}</p>
        <p>To: ${data.to}</p>
        <p>Date: ${data.date}</p>
        <p>Time: ${data.time}</p>
        <p>Payment Mode: ${data.paymentMode}</p>
        <p>Message: ${data.message || "No message provided"}</p> <!-- Default message if undefined -->
    `;
}

// Booking form submission
document.getElementById('booking-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const car = document.getElementById('car').value;
    const noOfStudents = parseInt(document.getElementById('noOfStudents').value, 10);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const paymentMode = document.getElementById('paymentMode').value;
    const message = document.getElementById('message').value;

    // Validate number of students based on car type
    const maxStudents = getMaxStudents(car);
    if (noOfStudents > maxStudents) {
        alert(`You can select a maximum of ${maxStudents} students for a ${car}.`);
        return;
    }

    try {
        const docRef = await addDoc(collection(db, "bookings"), {
            car,
            noOfStudents,
            from,
            to,
            date,
            time,
            paymentMode,
            message,
            userId: auth.currentUser.uid,
            timestamp: new Date()
        });
        alert("Booking successful! Booking ID: " + docRef.id);
        displayCurrentBooking({ car, from, to, date, time, paymentMode, message }, docRef.id); // Display current booking immediately after booking
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("There was an error while booking. Please try again.");
    }
});

// Function to get maximum students based on car type
function getMaxStudents(car) {
    switch (car) {
        case 'Tata Zest':
        case 'Dzire':
            return 4; // 4-seater
        case 'Innova':
            return 7; // 7-seater
        default:
            return 0; // No limit or invalid car
    }
}

// View Driver Details logic
document.getElementById('viewDriverDetailsBtn').addEventListener('click', async () => {
    const bookingId = document.getElementById('bookingIdInput').value.trim();
    if (!bookingId) {
        alert("Please enter a valid Booking ID.");
        return;
    }

    const docRef = doc(db, "bookings", bookingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const bookingData = docSnap.data();
        displayDriverDetails(bookingData);
    } else {
        alert("No booking found with this ID.");
    }
});

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
        <p>Message: ${data.driverDetails?.message || "No message provided"}</p> <!-- Updated message display -->
    `;
}

// Format time to 12-hour AM/PM format
function formatTime(timeString) {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':'); 
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${String(formattedHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

// QR Code scanning logic
const html5QrCode = new Html5Qrcode("reader");

// Check camera permissions and start scanning
async function checkCameraPermissions() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop()); // Stop the video track
        startScanning(); // Start scanning after permission is granted
    } catch (err) {
        console.error("Camera permissions denied:", err);
        alert("Please allow camera access to scan QR codes. You may need to adjust your browser settings.");
        if (err.name === "NotAllowedError") {
            alert("To change your camera settings, go to your browser settings and allow camera access for this site.");
        }
    }
}

// Start scanning for QR codes
async function startScanning() {
    try {
        await html5QrCode.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, qrCodeSuccessCallback);
        document.getElementById('startScanBtn').style.display = 'none';
        document.getElementById('stopScanBtn').style.display = 'block';
    } catch (err) {
        console.error("Error starting QR code scanning.", err);
    }
}

// Handle successful QR code scan
function qrCodeSuccessCallback(decodedText, decodedResult) {
    document.getElementById('scan-result').innerText = `Scanned QR Code: ${decodedText}`;
    // You can add additional logic here to handle the decoded QR code
}

// Function to stop scanning
async function stopScanning() {
    try {
        await html5QrCode.stop();
        console.log("QR Code scanning stopped.");
        document.getElementById('stopScanBtn').style.display = 'none';
        document.getElementById('startScanBtn').style.display = 'block';
    } catch (err) {
        console.error("Error stopping QR code scanning.", err);
    }
}

// Start scanning when the page is loaded
window.addEventListener('load', checkCameraPermissions);
