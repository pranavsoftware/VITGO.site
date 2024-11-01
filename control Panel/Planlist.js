import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration object
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

// Reference to the container where plans will be displayed
const plansContainer = document.getElementById("userList");
const spinner = document.getElementById("spinner");

// Function to fetch plans from Firestore
async function fetchPlans() {
    showLoading(); // Show spinner before loading data
    try {
        const plansRef = collection(db, "posts");
        const snapshot = await getDocs(plansRef);
        plansContainer.innerHTML = '';  // Clear previous plans

        // Loop through each plan and display it
        snapshot.forEach((doc) => {
            const planData = doc.data();
            const planId = doc.id;  // Get the unique ID for each plan
            const planCard = createPlanCard(planData, planId);
            plansContainer.appendChild(planCard);
        });
    } catch (error) {
        console.error("Error fetching plans:", error);
    } finally {
        hideLoading(); // Hide spinner after loading data
    }
}

// Function to create a plan card
function createPlanCard(planData, planId) {
    const card = document.createElement("div");
    card.className = "plan-card";
    card.innerHTML = `
        <h3><span class="username">${planData.username}</span></h3>
        <p>University: ${planData.university}</p>
        <p>Date & Time: ${planData.dateTime}</p>
        <p>From: ${planData.fromPlace}, ${planData.fromCity}, ${planData.fromState}</p>
        <p>To: ${planData.toPlace}, ${planData.toCity}, ${planData.toState}</p>
        <p>Message: ${planData.message}</p>
    `;
    return card;
}

// Function to filter plans based on the search query
function filterPlans() {
    const searchValue = document.getElementById("searchBar").value.toLowerCase();
    const planCards = document.querySelectorAll(".plan-card");

    planCards.forEach(card => {
        const username = card.querySelector(".username").textContent.toLowerCase();
        if (username.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Event listener for the search bar
document.getElementById("searchBar").addEventListener("input", filterPlans);

// Fetch plans on page load
window.addEventListener("DOMContentLoaded", fetchPlans);

// Loading Spinner functions
function showLoading() {
    spinner.style.display = 'flex'; // Show spinner
}

function hideLoading() {
    spinner.style.display = 'none'; // Hide spinner
}
