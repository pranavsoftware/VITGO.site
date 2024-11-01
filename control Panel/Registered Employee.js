// script.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// Firebase configuration and initialization
const firebaseConfig = {
    apiKey: "AIzaSyCDD_suBufBLAXzLjV0YPoIq1XU_nOVaBQ",
    authDomain: "easycab-71fcf.firebaseapp.com",
    projectId: "easycab-71fcf",
    storageBucket: "easycab-71fcf.appspot.com",
    messagingSenderId: "621065707054",
    appId: "1:621065707054:web:8b47875a751d361f2e09bf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const spinner = document.getElementById("spinner");
const employeeList = document.getElementById("employee-list");

async function fetchEmployees() {
    try {
        const employeeCollection = collection(db, "TAXIemployee");
        const employeeSnapshot = await getDocs(employeeCollection);
        const employees = employeeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Remove the spinner once data is fetched
        spinner.style.display = "none";

        // Display employee data
        employees.forEach(employee => {
            const employeeCard = document.createElement("div");
            employeeCard.className = "employee-card";

            employeeCard.innerHTML = `
                <img src="${employee.profilePic}" alt="${employee.name}" style="width: 100%; border-radius: 50%;">
                <h3>${employee.name}</h3>
                <p>Age: ${employee.age}</p>
                <p>Email: ${employee.email}</p>
                <p>License: ${employee.licenceNumber}</p>
                <p>Address: ${employee.address}</p>
            `;

            employeeList.appendChild(employeeCard);
        });
    } catch (error) {
        console.error("Error fetching employee data: ", error);
    }
}

// Fetch employees when the script loads
fetchEmployees();
