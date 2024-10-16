import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login with Google when button is clicked
document.getElementById('loginBtn').addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            const emailDomain = user.email.split('@')[1];
            
            // Check if the user is logging in with a VIT student email
            if (emailDomain === 'vitstudent.ac.in') {
                // Redirect to parent dashboard after successful login
                window.location.href = '/Parent - webapp/index.html';
            } else {
                // Show an error message if email domain is not VIT
                document.getElementById('error-message').textContent = 'Please log in using a VIT student email address.';
                auth.signOut(); // Sign out the user if email domain is not allowed
            }
        })
        .catch((error) => {
            console.error('Login failed:', error);
            document.getElementById('error-message').textContent = 'Login failed. Please try again.';
        });
});
