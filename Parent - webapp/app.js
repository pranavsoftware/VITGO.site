import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Fetch child details and current booking
async function fetchChildDetails(userId) {
    try {
        const docRef = doc(db, "users", userId);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Display child details
            document.getElementById('childName').textContent = userData.name || "N/A";
            document.getElementById('childEmail').textContent = userData.email || "N/A";

            // Display face scan if available
            if (userData.faceScan) {
                const imgElement = document.createElement("img");
                imgElement.src = userData.faceScan;
                imgElement.alt = "Face Scan";
                imgElement.style.width = "100px"; // Adjust size as needed
                document.getElementById('faceScanContainer').innerHTML = '';
                document.getElementById('faceScanContainer').appendChild(imgElement);
            } else {
                document.getElementById('faceScanContainer').textContent = "No face scan available.";
            }

            // Fetch current booking
            await fetchCurrentBooking(userId); // Ensure to await this function

            // Display driver details if available
            if (userData.driverDetails) {
                const driverDetails = userData.driverDetails;
                
                // Display driver details
                const driverDetailsHtml = `
                <p><strong>Driver Name:</strong> ${driverDetails.driverName || "N/A"}</p>
                <p><strong>Cab Name:</strong> ${driverDetails.cabName || "N/A"}</p>
                <p><strong>Taxi Number:</strong> ${driverDetails.taxiNumber || "N/A"}</p>
                <p><strong>Phone:</strong> ${driverDetails.phone || "N/A"}</p>
            `;
                document.getElementById('driverDetails').innerHTML = driverDetailsHtml;
            } else {
                console.log("No driver details found for user:", userId); // Log if driverDetails is not present
                document.getElementById('driverDetails').textContent = "No driver details available.";
            }
        } else {
            console.error("No such document!");
        }
    } catch (error) {
        console.error("Error fetching child details:", error);
    }
}

// Function to fetch current booking
async function fetchCurrentBooking(userId) {
    try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        let bookingFound = false; // To track if booking is found
        let latestBooking = null; // Variable to hold the latest booking

        querySnapshot.forEach((doc) => {
            const bookingData = doc.data();
            if (bookingData.userId === userId) {
                bookingFound = true; // Booking found for the user
                // Check if this booking is more recent than the currently stored one
                if (!latestBooking || new Date(bookingData.date) > new Date(latestBooking.date)) {
                    latestBooking = { ...bookingData, id: doc.id }; // Store the most recent booking
                }
            }
        });

        // If a latest booking is found, display it; otherwise, show no bookings
        if (latestBooking) {
            displayCurrentBooking(latestBooking);
        } else {
            document.getElementById('current-booking').innerHTML = "<p>No current bookings found.</p>";
        }
    } catch (error) {
        console.error("Error fetching current booking:", error);
    }
}

// Function to display current booking
function displayCurrentBooking(data) {
    const currentBookingDiv = document.getElementById('current-booking');
    currentBookingDiv.innerHTML = `
        <h4>Current Booking (ID: ${data.id})</h4>
        <p><strong>Car:</strong> ${data.car || "N/A"}</p>
        <p><strong>Cab Name:</strong> ${data.driverDetails?.cabName || "N/A"}</p>
        <p><strong>From:</strong> ${data.from || "N/A"}</p>
        <p><strong>To:</strong> ${data.to || "N/A"}</p>
        <p><strong>Date:</strong> ${data.date || "N/A"}</p>
        <p><strong>Time:</strong> ${data.time || "N/A"}</p>
        <p><strong>Payment Mode:</strong> ${data.paymentMode || "N/A"}</p>
        <p><strong>Number of Students:</strong> ${data.noOfStudents || "N/A"}</p>
        <p><strong>Estimated Pick Time:</strong> ${data.driverDetails?.estimatedPickTime || "N/A"}</p>
        <p><strong>Taxi Number:</strong> ${data.driverDetails?.taxiNumber || "N/A"}</p>
        <p><strong>Driver Name:</strong> ${data.driverDetails?.driverName || "N/A"}</p>
        <p><strong>Driver Phone:</strong> ${data.driverDetails?.phone || "N/A"}</p>
        <p><strong>Amount:</strong> ${data.driverDetails?.amount || "N/A"}</p>
        <p><strong>Message:</strong> ${data.driverDetails?.message || "No message provided"}</p>
    `;
}

// Sign out
document.getElementById('signOutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = "../Parent - webapp/Index.html"; // Redirect to login page after signing out
    }).catch((error) => {
        console.error("Sign out error:", error);
    });
});

// Track child (Google Maps integration)
document.getElementById('trackChildBtn').addEventListener('click', () => {
    const userLocation = "vit campus"; // Placeholder for actual location data
    const destination = "to katpadi"; // Placeholder for actual destination data
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(userLocation)}&destination=${encodeURIComponent(destination)}`;
    window.open(googleMapsUrl, "_blank");
});

// Handle authentication state change
onAuthStateChanged(auth, (user) => {
    if (user) {
        fetchChildDetails(user.uid);
    } else {
        window.location.href = "../Parent - webapp/login.html"; // Redirect to login page if not authenticated
    }
});
