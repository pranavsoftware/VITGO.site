// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Fetch and display user data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        // Display user info
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            document.querySelector('.profile-name').textContent = userData.name || "No Name";
            document.querySelector('.profile-email').textContent = userData.email;

            const avatarElement = document.querySelector('.avatar');
            if (userData.faceScan) {
                avatarElement.src = userData.faceScan; // Use face scan as avatar
            } else {
                avatarElement.src = '../assets/default Avatar .jpg'; // Fallback to default avatar
            }
        } else {
            console.error("No such document!");
        }
    } else {
        // No user is signed in, redirect to login
        window.location.href = '../face/index.html';
    }
});
