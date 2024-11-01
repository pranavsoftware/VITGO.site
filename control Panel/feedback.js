import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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

// Fetch feedback from Firestore
async function fetchFeedback() {
    const feedbackList = document.getElementById('feedback-list');
    const spinner = document.getElementById('spinner');
    spinner.style.visibility = 'visible'; // Show the spinner

    try {
        const querySnapshot = await getDocs(collection(db, 'feedback'));
        feedbackList.innerHTML = ''; // Clear the list
        querySnapshot.forEach((doc) => {
            const feedbackData = doc.data();
            const feedbackItem = document.createElement('div');
            feedbackItem.classList.add('feedback-item');
            feedbackItem.innerHTML = `
                <p class="feedback-user">Name: ${feedbackData.name || 'Anonymous'} (${feedbackData.email})</p>
                <p class="feedback-message">Message: ${feedbackData.message || 'No message provided.'}</p>
                <p class="feedback-rating">Rating: ${feedbackData.rating}</p>
                <p class="feedback-timestamp">Submitted on: ${new Date(feedbackData.timestamp.seconds * 1000).toLocaleString()}</p>
            `;
            feedbackList.appendChild(feedbackItem);
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
    } finally {
        spinner.style.visibility = 'hidden'; // Hide the spinner once done
    }
}

// Call fetchFeedback on page load
window.onload = fetchFeedback;
