import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Check if email is from the allowed domain
    if (!email.endsWith('@drivereasycab.site')) {
        errorMessage.textContent = 'Please use an email with the domain @drivereasycab.site';
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to driver dashboard upon successful login
        window.location.href = '../Drivers Dashboard/Driver-Login.html'; // Update to your actual dashboard URL
    } catch (error) {
        errorMessage.textContent = error.message; // Display any error messages
    }
});
