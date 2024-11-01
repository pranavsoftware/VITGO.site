import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Spinner reference
const spinner = document.getElementById('spinner');

// Function to fetch users and display their details
async function fetchUsers() {
    showLoading(); // Show spinner before fetching data
    const userCollection = collection(db, 'users'); // Assuming 'users' is your collection name
    const userSnapshot = await getDocs(userCollection);
    const userDetailsContainer = document.getElementById('userDetails');

    userDetailsContainer.innerHTML = ''; // Clear existing details

    // Create an array to hold users
    const users = [];
    userSnapshot.forEach(doc => {
        const userData = doc.data();
        users.push({ ...userData, id: doc.id }); // Add document ID to user data
    });

    // Sort users alphabetically by name
    users.sort((a, b) => a.name.localeCompare(b.name));

    // Populate user details
    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        
        userCard.innerHTML = `
            <img src="${user.faceScan}" alt="User Face Scan">
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <p>UID: ${user.id}</p>
            <button class="delete-button" data-uid="${user.id}">Delete</button>
        `;
        
        userDetailsContainer.appendChild(userCard);
    });

    // Attach delete event listeners to all delete buttons
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const uid = event.target.getAttribute('data-uid');
            deleteUser(uid);
        });
    });

    hideLoading(); // Hide spinner after loading data
}

// Function to delete a user
async function deleteUser(uid) {
    try {
        const userDoc = doc(db, 'users', uid);
        await deleteDoc(userDoc);
        fetchUsers(); // Refresh the user list
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Check permissions.");
    }
}

// Function to handle the go back button
window.goBack = function() {
    window.history.back();
};

// Fetch users on page load
fetchUsers();

// Loading Spinner functions
function showLoading() {
    spinner.style.display = 'flex'; // Show spinner
}

function hideLoading() {
    spinner.style.display = 'none'; // Hide spinner
}
