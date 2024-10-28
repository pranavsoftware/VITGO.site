import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore, collection, onSnapshot, query, orderBy, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ",
    authDomain: "easycab-71fcf.firebaseapp.com",
    databaseURL: "https://easycab-71fcf-default-rtdb.firebaseio.com",
    projectId: "easycab-71fcf",
    storageBucket: "easycab-71fcf.appspot.com",
    messagingSenderId: "621065707054",
    appId: "1:621065707054:web:8b47875a751d361f2e09bf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const bookingsTableBody = document.querySelector("#bookings-table tbody");
const signOutBtn = document.getElementById("signOutBtn");
const searchBar = document.getElementById("searchBar");
const driverDetailsModal = document.getElementById("driverDetailsModal");
const closeModal = document.getElementById("closeModal");
const driverDetailsForm = document.getElementById("driverDetailsForm");

let currentBookingId = null;

// Check if the user is authorized
const checkAuthorization = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Verify email domain
            const emailDomain = user.email.split("@")[1];
            if (emailDomain !== "emp-easycab.site") {
                console.error("Unauthorized access attempt.");
                window.location.href = "../Driver & Taxi Login/EMP_Login.html";
            } else {
                fetchBookings(); // Fetch bookings only if authorized
            }
        } else {
            // Redirect to login if no user is authenticated
            window.location.href = "../Driver & Taxi Login/EMP_Login.html";
        }
    });
};

// Fetch bookings data
const fetchBookings = () => {
    const bookingsRef = collection(db, "bookings");
    const bookingsQuery = query(bookingsRef, orderBy("date", "desc"));

    onSnapshot(bookingsQuery, (snapshot) => {
        bookingsTableBody.innerHTML = "";
        snapshot.forEach((doc) => {
            const booking = { id: doc.id, ...doc.data() };
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.id}</td>
                <td>${booking.car}</td>
                <td>${booking.noOfStudents}</td>
                <td>${booking.from}</td>
                <td>${booking.to}</td>
                <td>${booking.date}</td>
                <td>${booking.time}</td>
                <td>${booking.paymentMode}</td>
                <td>${booking.message}</td>
                <td>
                    ${booking.driverName ? `
                    <p><strong>Name:</strong> ${booking.driverName}<br>
                    <strong>Phone:</strong> ${booking.driverPhone}</p>`
                    : "No Driver Assigned"}
                    <button class="view-driver" data-id="${booking.id}">View/Edit</button>
                </td>
            `;
            bookingsTableBody.appendChild(row);
        });

        document.querySelectorAll(".view-driver").forEach(button => {
            button.addEventListener("click", () => {
                const bookingId = button.getAttribute("data-id");
                showDriverDetails(bookingId);
            });
        });
    });
};

// Show driver details in modal
const showDriverDetails = (bookingId) => {
    currentBookingId = bookingId;
    const bookingRef = doc(db, "bookings", bookingId);
    getDoc(bookingRef)
        .then((docSnapshot) => {
            if (docSnapshot.exists()) {
                const booking = docSnapshot.data();
                document.getElementById("driver").value = booking.driverName || "";
                document.getElementById("cabName").value = booking.cabName || "";
                document.getElementById("taxiNumber").value = booking.taxiNumber || "";
                document.getElementById("phone").value = booking.driverPhone || "";
                document.getElementById("estimatedPickTime").value = booking.estimatedPickTime || "";
                document.getElementById("bookingMessage").textContent = booking.message || "";
                document.getElementById("driverMessage").value = booking.driverMessage || "";
                document.getElementById("amount").value = booking.amount || "";

                // Disable the amount field if an amount already exists
                document.getElementById("amount").disabled = booking.amount ? true : false;

                driverDetailsModal.style.display = "block";
            } else {
                console.error("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error fetching document: ", error);
        });
};

// Submit driver details form
driverDetailsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentBookingId) {
        const driverData = {
            driverName: document.getElementById("driver").value,
            cabName: document.getElementById("cabName").value,
            taxiNumber: document.getElementById("taxiNumber").value,
            driverPhone: document.getElementById("phone").value,
            estimatedPickTime: document.getElementById("estimatedPickTime").value,
            driverMessage: document.getElementById("driverMessage").value,
            amount: parseFloat(document.getElementById("amount").value) || 0
        };
        updateDoc(doc(db, "bookings", currentBookingId), driverData)
            .then(() => {
                driverDetailsModal.style.display = "none";
                fetchBookings(); // Refresh the table to display updated data
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    } else {
        console.error("Current Booking ID is not defined.");
    }
});

// Close modal
closeModal.addEventListener("click", () => {
    driverDetailsModal.style.display = "none";
});

// Filter bookings using search
searchBar.addEventListener("input", () => {
    const searchValue = searchBar.value.toLowerCase();
    const rows = bookingsTableBody.getElementsByTagName("tr");
    for (let row of rows) {
        const bookingId = row.cells[0].textContent.toLowerCase();
        row.style.display = bookingId.includes(searchValue) ? "" : "none";
    }
});

// Sign out functionality
signOutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "../Driver & Taxi Login/EMP_Login.html";
    }).catch((error) => {
        console.error("Sign Out Error", error);
    });
});

// Initialize authorization check
checkAuthorization();
