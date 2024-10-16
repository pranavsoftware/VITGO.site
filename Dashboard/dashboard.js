// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your Firebase configuration
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
const firestore = getFirestore(app);
const auth = getAuth(app);

// Google Sign-In
function googleSignIn() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log('User signed in: ', user);
        })
        .catch((error) => {
            console.error('Error during sign in: ', error);
        });
}

// Check if user is authenticated
function checkAuthState() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('User is logged in: ', user);
            loadPlans();  // Load plans only if the user is authenticated
            autoLogout();  // Start auto-logout timer
        } else {
            alert('Successfully logged out.');
            window.location.href = '../face/index.html';  // Redirect to login page if not authenticated
        }
    });

    // Prevent back button from accessing the dashboard after logging out
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
}

// Fetch and display plans from Firestore
const plansContainer = document.getElementById('plansContainer');

async function loadPlans() {
    const plansRef = collection(firestore, 'posts');
    const snapshot = await getDocs(plansRef);
    plansContainer.innerHTML = '';  // Clear previous plans
    snapshot.forEach((doc) => {
        const plan = doc.data();
        const planId = doc.id;  // Get the unique ID for each plan

        const planCard = document.createElement('div');
        planCard.classList.add('plan-card');
        planCard.innerHTML = `
            <h3><span class="username">${plan.username}</span></h3>
            <p>University: ${plan.university}</p>
            <p>Date & Time: ${plan.dateTime}</p>
            <p>From: ${plan.fromState}, ${plan.fromCity}, ${plan.fromPlace}</p>
            <p>To: ${plan.toState}, ${plan.toCity}, ${plan.toPlace}</p>
            <p>Message: ${plan.message}</p>
            <div class="buttons"> 
                <button class="btn btn-connect" onclick="connectToChat('${plan.username}')">Connect</button>
                <button class="btn btn-delete" onclick="deletePlan('${planId}', '${plan.username}')">Delete</button>
            </div>
        `;
        plansContainer.appendChild(planCard);
    });
}

// Redirect to chatbox
function connectToChat(username) {
    window.location.href = `../webchat/index.html?user=${encodeURIComponent(username)}`;
}

// Delete a plan (only if the logged-in user is the plan owner)
async function deletePlan(planId, planOwnerUsername) {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        alert('You must be logged in to delete this plan.');
        return;
    }

    // Compare the logged-in user’s username to the plan owner’s username
    if (currentUser.displayName !== planOwnerUsername) {
        alert('You do not have permission to delete this plan.');
        return;
    }

    const planRef = doc(firestore, `posts/${planId}`);
    await deleteDoc(planRef)
        .then(() => {
            alert('Plan deleted successfully.');
            loadPlans();  // Refresh the list after deletion
        })
        .catch((error) => {
            console.error('Error deleting plan:', error);
        });
}

// Auto-logout after 5 minutes of inactivity
function autoLogout() {
    let logoutTimer = setTimeout(() => {
        signOut(auth).then(() => {
            alert('You have been logged out due to inactivity.');
            window.location.href = '../face/index.html';
        }).catch(error => {
            console.error('Error during sign out:', error);
        });
    }, 300000);  // 5 minutes in milliseconds

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('keypress', resetTimer);

    function resetTimer() {
        clearTimeout(logoutTimer);
        logoutTimer = setTimeout(() => {
            signOut(auth).then(() => {
                alert('You have been logged out due to inactivity.');
                window.location.href = '../face/index.html';
            }).catch(error => {
                console.error('Error during sign out:', error);
            });
        }, 300000);
    }
}

// Logout manually on button click
function logout() {
    signOut(auth).then(() => {
        alert('Logged out successfully.');
        window.location.href = '../face/index.html';
    }).catch((error) => {
        console.error('Error during sign out:', error);
    });
}

// Menu Toggle
function toggleMenu() {
    const menuList = document.querySelector('.menu-list');
    menuList.classList.toggle('show');
}

// Filter Sidebar Toggle
function toggleFilter() {
    const filterSidebar = document.getElementById('filter-sidebar');
    filterSidebar.classList.toggle('show');
}

// Apply Filters
async function applyFilters() {
    const universityFilter = document.getElementById('universityFilter').value;
    const stateFilter = document.getElementById('stateFilter').value;
    const cityFilter = document.getElementById('cityFilter').value;
    const placeFilter = document.getElementById('placeFilter').value;

    const plansRef = collection(firestore, 'posts');
    const snapshot = await getDocs(plansRef);
    plansContainer.innerHTML = '';  // Clear previous plans

    snapshot.forEach((doc) => {
        const plan = doc.data();
        if ((universityFilter === '' || plan.university === universityFilter) &&
            (stateFilter === '' || plan.fromState === stateFilter) &&
            (cityFilter === '' || plan.fromCity === cityFilter) &&
            (placeFilter === '' || plan.fromPlace === placeFilter)) {

            const planCard = document.createElement('div');
            planCard.classList.add('plan-card');
            planCard.innerHTML = `
                <h3><span class="username">${plan.username}</span></h3>
                <p>University: ${plan.university}</p>
                <p>Date & Time: ${plan.dateTime}</p>
                <p>From: ${plan.fromState}, ${plan.fromCity}, ${plan.fromPlace}</p>
                <p>To: ${plan.toState}, ${plan.toCity}, ${plan.toPlace}</p>
                <p>${plan.message}</p>
                <div class="buttons">
                    <button class="btn btn-connect" onclick="connectToChat('${plan.username}')">Connect</button>
                    <button class="btn btn-delete" onclick="deletePlan('${doc.id}', '${plan.username}')">Delete</button>
                </div>
            `;

            plansContainer.appendChild(planCard);
        }
    });
}

// Reset Filters
function resetFilters() {
    document.getElementById('universityFilter').value = '';
    document.getElementById('stateFilter').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('placeFilter').value = '';
    loadPlans();  // Reload all plans
}

// Load the plans and check authentication state on page load
window.onload = () => {
    checkAuthState();
};

// Attach the functions to the window object for inline event handlers
window.connectToChat = connectToChat;
window.deletePlan = deletePlan;
window.toggleMenu = toggleMenu;
window.toggleFilter = toggleFilter;
window.applyFilters = applyFilters;
window.resetFilters = resetFilters;  // Attach reset function
window.googleSignIn = googleSignIn;
window.checkAuthState = checkAuthState;
window.logout = logout;

// Sign out functionality
document.getElementById('signOutBtn').addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully.");
            window.location.href = '../face/index.html';
        })
        .catch((error) => {
            console.error("Error signing out: ", error);
        });
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
setTimeout(hideLoading, 2000); // Simulates a loading time of 2 seconds
