// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Your web app's Firebase configuration
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

// Function to fetch drivers and update the UI
async function fetchDrivers() {
    const driverList = document.getElementById("driverList");
    driverList.innerHTML = ''; // Clear existing content

    // Show spinner while fetching data
    document.getElementById("spinner").style.display = 'flex';

    try {
        const querySnapshot = await getDocs(collection(db, 'drivers'));
        querySnapshot.forEach(doc => {
            const driverData = doc.data();
            const driverCard = document.createElement('div');
            driverCard.classList.add('driver-card');

            driverCard.innerHTML = `
                <img src="${driverData.picUrl}" alt="${driverData.name}">
                <h3>${driverData.name}</h3>
                <p>Email: ${driverData.email}</p>
                <p>Phone: ${driverData.phone}</p>
                <p>License: ${driverData.license}</p>
                <p>Taxi Number: ${driverData.taxiNumber}</p>
                <p>Address: ${driverData.address}</p>
            `;
            driverList.appendChild(driverCard);
        });
    } catch (error) {
        console.error("Error fetching drivers: ", error);
    } finally {
        // Hide spinner after fetching data
        document.getElementById("spinner").style.display = 'none';
    }
}

// Fetch drivers on page load
window.onload = () => {
    fetchDrivers();
};
