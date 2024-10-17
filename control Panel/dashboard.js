import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ",
    authDomain: "easycab-71fcf.firebaseapp.com",
    projectId: "easycab-71fcf",
    storageBucket: "easycab-71fcf.appspot.com",
    messagingSenderId: "621065707054",
    appId: "1:621065707054:web:8b47875a751d361f2e09bf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Function to fetch and display users
async function displayUsers() {
    const userList = document.getElementById("userList");
    if (!userList) {
        console.error("Element with ID 'userList' not found");
        return;
    }
    userList.innerHTML = ""; // Clear existing data

    // Fetching user data
    const usersCollection = collection(db, "users");
    const userSnapshot = await getDocs(usersCollection);
    userSnapshot.forEach((doc) => {
        const userData = doc.data();
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <img src="${userData.faceScan || '../assets/default-avatar.jpg'}" alt="${userData.name || 'No Name'}">
            <h3>${userData.name || 'Unknown User'}</h3>
            <p><strong>UID:</strong> ${doc.id}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
        `;
        userList.appendChild(userCard);
    });
}

// Search functionality
document.getElementById("searchBar").addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const userCards = document.querySelectorAll(".user-card");
    userCards.forEach((card) => {
        const userName = card.querySelector("h3").textContent.toLowerCase();
        if (userName.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// Sign-out functionality
document.getElementById("signOutButton").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Signed out successfully!");
        window.location.href = "../control Panel/login.html";
    }).catch((error) => {
        alert("Error signing out: " + error.message);
    });
});

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        displayUsers(); // Fetch and display users when authenticated
    } else {
        console.log("User is logged out");
        window.location.href = "../control Panel/login.html";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const signOutButton = document.getElementById("signOutButton");
    if (signOutButton) {
        signOutButton.addEventListener("click", () => {
            signOut(auth);
        });
    }
});

// Loading Spinner
function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// Attach loading functions to global scope
window.showLoading = showLoading;
window.hideLoading = hideLoading;

// Simulate loading time
showLoading();
setTimeout(hideLoading, 10000); // Simulates a loading time of 10 seconds
