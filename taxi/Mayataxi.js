import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, updateDoc, onSnapshot, doc, query, orderBy, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Authentication check
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (user.email !== 'easycab.site@gmail.com') {
            window.location.href = '/login/login.html';
        }
    } else {
        window.location.href = '/login/login.html';
    }
});

// Fetch and display bookings
const bookingsTable = document.getElementById('bookings-table').getElementsByTagName('tbody')[0];
const searchBar = document.getElementById('searchBar');

// Fetch and display bookings
onSnapshot(query(collection(db, "bookings"), orderBy("date", "desc")), (snapshot) => {
    bookingsTable.innerHTML = "";
    snapshot.forEach((doc) => {
        const booking = doc.data();
        const row = bookingsTable.insertRow();

        row.insertCell(0).textContent = doc.id;
        row.insertCell(1).textContent = booking.car;
        row.insertCell(2).textContent = booking.noOfStudents;
        row.insertCell(3).textContent = booking.from;
        row.insertCell(4).textContent = booking.to;

        // Format the date and time
        const bookingDate = new Date(booking.date);
        const formattedDate = formatDate(bookingDate);
        const formattedTime = formatTime(booking.time);

        row.insertCell(5).textContent = formattedDate;
        row.insertCell(6).textContent = formattedTime;
        row.insertCell(7).textContent = booking.paymentMode;
        row.insertCell(8).textContent = booking.message;

        const driverDetailsCell = row.insertCell(9);

        if (!booking.driverDetails) {
            const sendButton = document.createElement('button');
            sendButton.textContent = "Send Driver Details";
            sendButton.onclick = () => openDriverDetailsModal(doc.id, booking);
            driverDetailsCell.appendChild(sendButton);
        } else {
            driverDetailsCell.innerHTML = `
                <div class="driver-details">
                    <strong>Driver:</strong> ${booking.driverDetails.driverName || "N/A"}<br>
                    <strong>Cab:</strong> ${booking.driverDetails.cabName || "N/A"}<br>
                    <strong>Taxi No:</strong> ${booking.driverDetails.taxiNumber || "N/A"}<br>
                    <strong>Phone:</strong> ${booking.driverDetails.phone || "N/A"}<br>
                    <strong>Pick Time:</strong> ${formatTime(booking.driverDetails.estimatedPickTime)}<br>
                    <strong>Amount:</strong> ${booking.driverDetails.amount || "N/A"}<br>
                    <strong>Message:</strong> ${booking.driverDetails.message || booking.message || "No message"}<br>
                </div>
            `;
        }
    });
});

// Format date to DD/MM/YYYY
function formatDate(date) {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
}

// Format time to HH:mm AM/PM
function formatTime(timeString) {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${String(formattedHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

// Filter search by Booking ID
searchBar.addEventListener('keyup', function () {
    const searchTerm = searchBar.value.toLowerCase();
    const rows = bookingsTable.getElementsByTagName('tr');
    for (let row of rows) {
        const bookingId = row.cells[0].textContent.toLowerCase();
        row.style.display = bookingId.includes(searchTerm) ? '' : 'none';
    }
});

// Sign out function
document.getElementById('signOutBtn').onclick = () => {
    signOut(auth).then(() => {
        window.location.href = '/login/login.html';
    }).catch((error) => {
        console.error('Sign Out Error', error);
    });
};

// Open modal for driver details
function openDriverDetailsModal(bookingId, booking) {
    const modal = document.getElementById('driverDetailsModal');
    modal.style.display = 'block';

    const driverSelect = document.getElementById('driverSelect');
    driverSelect.innerHTML = ""; // Clear previous options

    // Fetch and populate drivers
    getDocs(collection(db, "drivers")).then((snapshot) => {
        snapshot.forEach((doc) => {
            const driver = doc.data();
            const option = document.createElement('option');
            option.value = doc.id;
            option.textContent = driver.name;
            driverSelect.appendChild(option);
        });
    });

    // Close modal on clicking "X"
    document.getElementById('closeModal').onclick = () => {
        modal.style.display = 'none';
    };

    // Submit driver details
    document.getElementById('driverDetailsForm').onsubmit = async (event) => {
        event.preventDefault();

        const driverId = driverSelect.value;
        const driverDetails = {
            driverName: driverSelect.options[driverSelect.selectedIndex].text,
            cabName: document.getElementById('cabName').value,
            taxiNumber: document.getElementById('taxiNumber').value,
            phone: document.getElementById('phone').value,
            estimatedPickTime: document.getElementById('estimatedPickTime').value,
            amount: document.getElementById('amount').value,
            message: document.getElementById('message').value
        };

        try {
            // Update booking with driver details
            await updateDoc(doc(db, "bookings", bookingId), {
                driverDetails: driverDetails
            });

            // Ensure the driver message is saved correctly
            driverDetails.message = document.getElementById('message').value || booking.message; // Set message correctly

            // Save driver details with booking ID in a separate section (sub-collection)
            await setDoc(doc(db, "drivers", driverId, "bookings", bookingId), {
                bookingId: bookingId,
                car: booking.car,
                noOfStudents: booking.noOfStudents,
                from: booking.from,
                to: booking.to,
                date: booking.date,
                time: booking.time,
                paymentMode: booking.paymentMode,
                message: booking.message, // Ensure message from booking is saved
                driverDetails: driverDetails
            });

            alert("Driver details sent successfully!");
            modal.style.display = 'none';
        } catch (error) {
            console.error("Error sending driver details: ", error);
        }
    };
}
