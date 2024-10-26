import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, getDoc, serverTimestamp, deleteDoc } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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
const auth = getAuth(app);
const noticesCollection = collection(db, "VITian Notice");

let currentUserName = "";
let currentNoticeId = null; // Track if we are editing a notice

// Fetch current user and display their name
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDocRef = doc(db, "users", user.uid); // Assuming user UID is the document ID
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            currentUserName = userData.name || user.email.split('@')[0];
        } else {
            currentUserName = user.email.split('@')[0];
        }
    } else {
        currentUserName = "Anonymous";
    }

    const nameElement = document.getElementById("name");
    if (nameElement) {
        nameElement.textContent = currentUserName;
    }
});

// Function to add a new notice or update an existing one
async function saveNotice(title, content) {
    if (currentNoticeId) {
        // Update existing notice
        try {
            const noticeDocRef = doc(db, "VITian Notice", currentNoticeId);
            await updateDoc(noticeDocRef, {
                title,
                content
            });
            currentNoticeId = null; // Reset after editing
            document.getElementById("noticeSubmitBtn").textContent = "Post Notice"; // Change button back
        } catch (error) {
            console.error("Error updating notice: ", error);
        }
    } else {
        // Add new notice
        try {
            await addDoc(noticesCollection, {
                title,
                content,
                createdAt: serverTimestamp(),
                postedBy: currentUserName
            });
        } catch (error) {
            console.error("Error adding notice: ", error);
        }
    }
    loadNotices();
}

// Function to load notices
async function loadNotices() {
    const noticesContainer = document.getElementById("noticesContainer");
    noticesContainer.innerHTML = "";

    const querySnapshot = await getDocs(noticesCollection);
    querySnapshot.forEach((doc) => {
        const notice = doc.data();
        const noticeItem = document.createElement("div");
        noticeItem.classList.add("notice-item");

        const createdAt = notice.createdAt ? notice.createdAt.toDate().toLocaleString() : "No date available";

        noticeItem.innerHTML = `
            <h3>${notice.title}</h3>
            <div class="meta">Posted by: ${notice.postedBy || "Unknown"} | Date: ${createdAt}</div>
            <p>${notice.content}</p>
            <div class="actions">
                <button onclick="editNotice('${doc.id}')">Edit</button>
                <button onclick="deleteNotice('${doc.id}')">Delete</button>
            </div>
        `;
        noticesContainer.appendChild(noticeItem);
    });
}

// Function to edit a notice
window.editNotice = async function (id) {
    const docRef = doc(db, "VITian Notice", id);
    const noticeDoc = await getDoc(docRef);
    if (noticeDoc.exists()) {
        const notice = noticeDoc.data();
        document.getElementById("noticeTitle").value = notice.title;
        document.getElementById("noticeContent").value = notice.content;

        // Track the notice being edited
        currentNoticeId = id;
        document.getElementById("noticeSubmitBtn").textContent = "Update Notice"; // Change button text to indicate edit mode
    }
}

// Function to delete a notice
window.deleteNotice = async function (id) {
    try {
        await deleteDoc(doc(db, "VITian Notice", id));
        loadNotices();
    } catch (error) {
        console.error("Error deleting notice: ", error);
    }
};

// Form submit event listener
document.getElementById("noticeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("noticeTitle").value;
    const content = document.getElementById("noticeContent").value;
    await saveNotice(title, content);
    document.getElementById("noticeForm").reset();
});

// Load notices on page load
window.onload = loadNotices;
