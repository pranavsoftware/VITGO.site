import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ",
    authDomain: "easycab-71fcf.firebaseapp.com",
    projectId: "easycab-71fcf",
    storageBucket: "easycab-71fcf.appspot.com",
    messagingSenderId: "621065707054",
    appId: "1:621065707054:web:8b47875a751d361f2e09bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize the Auth instance

// Redirect unauthorized users
onAuthStateChanged(auth, (user) => {
    if (!user || !user.email.endsWith("@emp-easycab.site")) {
        window.location.href = "../Driver & Taxi Login/EMP_Login.html"; // Redirect to login page if unauthorized
    }
});

async function fetchDrivers() {
    const driverContainer = document.getElementById("driverContainer");
    const driverCollection = collection(db, "drivers");
    
    try {
        const driverSnapshot = await getDocs(driverCollection);
        driverSnapshot.forEach(doc => {
            const driverData = doc.data();
            const driverDiv = document.createElement("div");
            driverDiv.classList.add("driver");
            driverDiv.innerHTML = `
                <img src="${driverData.picUrl}" alt="${driverData.name}'s profile picture">
                <h2>${driverData.name}</h2>
                <p>Phone: ${driverData.phone}</p>
                <p>Email: ${driverData.email}</p>
                <p>Address: ${driverData.address}</p>
                <p>License Number: ${driverData.license}</p>
                <p>Taxi Number: ${driverData.taxiNumber}</p>
                <p>UID: ${driverData.uid}</p>
                <hr>
            `;
            driverContainer.appendChild(driverDiv);
        });
    } catch (error) {
        console.error("Error fetching driver details:", error);
    }
}

// Call fetchDrivers to retrieve data when the page loads
window.onload = () => {
    fetchDrivers();
};

// Go Back button functionality
document.getElementById("goBack").onclick = () => {
    window.history.back();
};
