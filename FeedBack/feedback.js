import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const db = getFirestore(app);

const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rating = document.getElementById('rating').value;
    const message = document.getElementById('message').value;

    // Validate email
    const emailPattern = /^[\w-\.]+@(vit\.ac\.in|vitstudent\.ac\.in)$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email ending with vit.ac.in or vitstudent.ac.in.");
        return;
    }

    // Save feedback to Firestore
    try {
        await addDoc(collection(db, "feedback"), {
            name,
            email,
            rating,
            message,
            timestamp: new Date()
        });
        openPopup();
        feedbackForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
});

function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}
