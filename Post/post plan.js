import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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
const firestore = getFirestore(app);
const auth = getAuth(app);

// Get authenticated user
let username = '';

onAuthStateChanged(auth, (user) => {
    if (user) {
        username = user.displayName || user.email.split('@')[0];
    } else {
        window.location.href = '/login/login.html';
    }
});

// Helper function to validate the selected date and time
function isValidDateTime(date, time) {
    const selectedDateTime = new Date(`${date}T${time}`);
    const now = new Date();

    return selectedDateTime >= now;
}

// Handle form submission
document.getElementById('postPlanForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const university = document.getElementById('university').value;
    const fromState = document.getElementById('fromState').value;
    const fromCity = document.getElementById('fromCity').value;
    const fromPlace = document.getElementById('fromPlace').value;
    const toState = document.getElementById('toState').value;
    const toCity = document.getElementById('toCity').value;
    const toPlace = document.getElementById('toPlace').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const message = document.getElementById('message').value;

    // Validate if the date and time are for the present or future
    if (!isValidDateTime(date, time)) {
        alert('Please select a valid date and time (present or future).');
        return;
    }

    if (username) {
        try {
            const postId = Date.now().toString();  // Create a unique post ID using timestamp
            const postDocRef = doc(firestore, 'posts', postId);

            await setDoc(postDocRef, {
                username,
                university,
                fromState,
                fromCity,
                fromPlace,
                toState,
                toCity,
                toPlace,
                dateTime: `${date} ${time}`,
                message
            });

            showPopup();
            setTimeout(() => {
                window.location.href = '/Dashboard/dashboard.html';
            }, 2000);
        } catch (error) {
            console.error("Error posting plan:", error);
        }
    } else {
        alert("User is not authenticated. Redirecting to login page.");
        window.location.href = '/login/login.html';
    }
});

// Show popup
function showPopup() {
    const popup = document.getElementById('popup');
    popup.classList.add('show');
    document.getElementById('closePopup').addEventListener('click', () => {
        popup.classList.remove('show');
    });
}

// Toggle menu visibility
function toggleMenu() {
    const menuList = document.querySelector('.nav-menu');
    menuList.classList.toggle('show');
}

document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

// Update city and place dropdowns
const citiesByState = {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem", "Vellore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Delhi": ["New Delhi", "Old Delhi", "Dwarka", "Janakpuri", "Rohini"],
    "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam"],
    "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Bikaner"]
};

const placesByCity = {
    "Chennai": ["T Nagar", "Adyar", "Velachery", "Anna Nagar", "Egmore"],
    "Coimbatore": ["RS Puram", "Peelamedu", "Saibaba Colony", "Gandhipuram", "Tidel Park"],
    "Madurai": ["KK Nagar", "Anna Nagar", "North Masi Street", "Natham Road", "Thirumangalam"],
    "Trichy": ["Tidel Park", "Karur Bypass", "Thillainagar", "K K Nagar", "Srirangam"],
    "Salem": ["Suramangalam", "Omalur", "Athiankadu", "Hasanur", "Mettur"],
    "Vellore": ["VIT Campus", "Katpade Junction"]
};

function updateCities(stateSelectId, citySelectId) {
    const state = document.getElementById(stateSelectId).value;
    const citySelect = document.getElementById(citySelectId);
    citySelect.innerHTML = '<option value="">Select City</option>';

    if (state && citiesByState[state]) {
        citiesByState[state].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

function updatePlaces(citySelectId, placeSelectId) {
    const city = document.getElementById(citySelectId).value;
    const placeSelect = document.getElementById(placeSelectId);
    placeSelect.innerHTML = '<option value="">Select Place</option>';

    if (city && placesByCity[city]) {
        placesByCity[city].forEach(place => {
            const option = document.createElement('option');
            option.value = place;
            option.textContent = place;
            placeSelect.appendChild(option);
        });
    }
}

document.getElementById('fromState').addEventListener('change', () => {
    updateCities('fromState', 'fromCity');
});
document.getElementById('fromCity').addEventListener('change', () => {
    updatePlaces('fromCity', 'fromPlace');
});

document.getElementById('toState').addEventListener('change', () => {
    updateCities('toState', 'toCity');
});
document.getElementById('toCity').addEventListener('change', () => {
    updatePlaces('toCity', 'toPlace');
});
