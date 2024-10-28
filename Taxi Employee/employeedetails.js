// Import Firebase libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js"; // Import authentication

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
const auth = getAuth(app); // Initialize Firebase Auth

// Redirect unauthorized users
onAuthStateChanged(auth, (user) => {
    if (!user || !user.email.endsWith("@emp-easycab.site")) {
        window.location.href = "../Driver & Taxi Login/EMP_Login.html"; // Redirect to login page if unauthorized
    } else {
        getEmployeeDetails(); // Fetch employee details only if authorized
    }
});

async function getEmployeeDetails() {
    const employeeRef = collection(db, "TAXIemployee");
    const employeeSnapshot = await getDocs(employeeRef);
    const employeeList = document.getElementById("employee-list");

    employeeSnapshot.forEach(doc => {
        const data = doc.data();
        const employeeDiv = document.createElement("div");
        employeeDiv.classList.add("employee-card");
        employeeDiv.innerHTML = `
            <img src="${data.profilePic}" alt="${data.name}'s profile picture">
            <h2>${data.name}</h2>
            <p><strong>Age:</strong> ${data.age}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Licence Number:</strong> ${data.licenceNumber}</p>
            <p><strong>Address:</strong> ${data.address}</p>
        `;
        employeeList.appendChild(employeeDiv);
    });
}

window.onload = () => {
    // Removed the checkAuthorization function; authorization check is now done in onAuthStateChanged
};
