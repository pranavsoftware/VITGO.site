import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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

// Login form submission
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Get form values
    const email = document.getElementById('email').value;
    const uid = document.getElementById('uid').value;
    const password = document.getElementById('password').value;

    try {
        // Authenticate user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check if the entered UID matches the authenticated user's UID
        if (user.uid === uid) {
            alert("Login successful! Redirecting to parent dashboard...");
            window.location.href = "../Parent - webapp/dashboard.html"; // Redirect to the parent dashboard
        } else {
            showErrorPopup("Incorrect UID. Please try again.");
        }
    } catch (error) {
        showErrorPopup("Authentication failed. Please check your email and password.");
    }
});

// Function to show error pop-up
function showErrorPopup(message) {
    const errorPopup = document.getElementById('errorPopup');
    errorPopup.textContent = message;
    errorPopup.style.display = 'block';
    errorPopup.style.backgroundColor = 'red';
    errorPopup.style.color = 'white';
    errorPopup.style.padding = '10px';
    errorPopup.style.marginTop = '10px';
    errorPopup.style.borderRadius = '5px';
    errorPopup.style.textAlign = 'center';
    
    setTimeout(() => {
        errorPopup.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Request notification permission and show a notification
document.getElementById('notifyButton').addEventListener('click', () => {
    if ('Notification' in window && navigator.serviceWorker) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                navigator.serviceWorker.getRegistration().then((registration) => {
                    registration.showNotification('Hello from My PWA!', {
                        body: 'This is a notification from your Progressive Web App!',
                        icon: 'images/icon-192x192.png'
                    });
                });
            }
        });
    }
});
