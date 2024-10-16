// Firebase Configuration
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
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
document.addEventListener('DOMContentLoaded', async () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginScanBtn = document.getElementById('login-scan-btn');
    const registerScanBtn = document.getElementById('register-scan-btn');
    const loginVideo = document.getElementById('login-video');
    const registerVideo = document.getElementById('register-video');
    const loginCanvas = document.getElementById('login-canvas');
    const registerCanvas = document.getElementById('register-canvas');
    const loginStatus = document.getElementById('login-status');
    const registerStatus = document.getElementById('register-status');

    // Detection Options using TinyYolov2
    const detectionOptions = new faceapi.TinyYolov2Options({
        inputSize: 320,
        scoreThreshold: 0.5
    });

    // Load face-api.js models
    await loadFaceApiModels();

    // Event Listeners
    loginBtn.addEventListener('click', () => {
        toggleForms('login');
    });

    registerBtn.addEventListener('click', () => {
        toggleForms('register');
    });

    loginScanBtn.addEventListener('click', async () => {
        await startVideoStream(loginVideo);
    });

    registerScanBtn.addEventListener('click', async () => {
        await startVideoStream(registerVideo);
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleLogin();
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleRegister();
    });

    // Toggle Login/Register Forms
    function toggleForms(formType) {
        if (formType === 'login') {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        } else {
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    }

    // Start Video Stream
    async function startVideoStream(videoElement) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoElement.srcObject = stream;
            videoElement.play();
        } catch (error) {
            alert('Cannot access webcam. Please allow camera access.');
            console.error('Webcam access error:', error);
        }
    }

    // Stop Video Stream
    function stopVideoStream(videoElement) {
        const stream = videoElement.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            videoElement.srcObject = null;
        }
    }

    // Load face-api.js Models
    async function loadFaceApiModels() {
        const MODEL_URL = './models/face-api.js/weights';
        try {
            await faceapi.nets.tinyYolov2.loadFromUri(MODEL_URL);
            await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        } catch (error) {
            console.error('Error loading face-api.js models:', error);
        }
    }

    // Validate Email Domain
    function validateEmailDomain(email) {
        return email.endsWith('@vit.ac.in') || email.endsWith('@vitstudent.ac.in');
    }

    // Handle Registration
    async function handleRegister() {
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const password = document.getElementById('register-password').value;

        if (!validateEmailDomain(email)) {
            alert('Please use a @vit.ac.in or @vitstudent.ac.in email address.');
            return;
        }

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await user.sendEmailVerification();
            registerStatus.innerText = 'Registration successful! Please verify your email.';

            const faceImage = await captureFace(registerVideo, registerCanvas, registerStatus);
            if (!faceImage) {
                alert('No face detected. Registration failed.');
                await user.delete();
                registerStatus.innerText = 'No face detected. Registration failed.';
                return;
            }

            // Save user details and face scan in Firestore
            await db.collection("users").doc(user.uid).set({ 
                name, 
                email, 
                faceScan: faceImage 
            });

            stopVideoStream(registerVideo);
            registerForm.reset();
            registerStatus.innerText = 'Registration completed successfully.';
        } catch (error) {
            registerStatus.innerText = `Error: ${error.message}`;
        }
    }

    // Handle Login
    async function handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        if (!validateEmailDomain(email)) {
            alert('Please use a @vit.ac.in or @vitstudent.ac.in email address.');
            return;
        }

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            if (!user.emailVerified) {
                alert('Please verify your email before logging in.');
                await auth.signOut();
                loginStatus.innerText = 'Email not verified.';
                return;
            }

            // Fetch the stored face scan for the logged-in user
            const userDoc = await db.collection("users").doc(user.uid).get();
            const storedFaceScan = userDoc.data().faceScan;

            if (!storedFaceScan) {
                alert('Face scan not found. Please register again.');
                await auth.signOut();
                return;
            }

            const capturedFace = await captureFace(loginVideo, loginCanvas, loginStatus);
            if (!capturedFace) {
                await auth.signOut();
                loginStatus.innerText = 'No face detected. Access denied.';
                return;
            }

            // Compare the captured face with the stored face scan
            const isMatch = await compareFaces(capturedFace, storedFaceScan);
            if (!isMatch) {
                await auth.signOut();
                loginStatus.innerText = 'Face does not match. Access denied.';
                return;
            }

            // Proceed to dashboard if face matches
            window.location.href = '/Dashboard/dashboard.html';
            stopVideoStream(loginVideo);
            loginForm.reset();
            loginStatus.innerText = 'Login process completed successfully.';
        } catch (error) {
            loginStatus.innerText = `Error: ${error.message}`;
        }
    }

    // Capture Face from Video
    async function captureFace(videoElement, canvasElement, statusElement) {
        try {
            statusElement.innerText = 'Detecting face...';
            const detections = await faceapi.detectSingleFace(videoElement, detectionOptions)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (detections) {
                const captureCanvas = document.createElement('canvas');
                captureCanvas.width = videoElement.videoWidth;
                captureCanvas.height = videoElement.videoHeight;
                const captureCtx = captureCanvas.getContext('2d');
                captureCtx.drawImage(videoElement, 0, 0, captureCanvas.width, captureCanvas.height);
                const dataURL = captureCanvas.toDataURL('image/png');
                statusElement.innerText = 'Face detected successfully.';
                return dataURL;
            } else {
                statusElement.innerText = 'No face detected. Please try again.';
                return null;
            }
        } catch (error) {
            statusElement.innerText = 'Error during face detection.';
            return null;
        }
    }

    // Function to compare captured face with stored face scan
    async function compareFaces(capturedFace, storedFaceScan) {
        try {
            const capturedImage = await faceapi.fetchImage(capturedFace);
            const storedImage = await faceapi.fetchImage(storedFaceScan);

            const capturedDescriptor = await faceapi.detectSingleFace(capturedImage)
                .withFaceLandmarks()
                .withFaceDescriptor();

            const storedDescriptor = await faceapi.detectSingleFace(storedImage)
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (capturedDescriptor && storedDescriptor) {
                const distance = faceapi.euclideanDistance(capturedDescriptor.descriptor, storedDescriptor.descriptor);
                // Set a threshold for face matching (this might need tweaking)
                const threshold = 0.6;
                return distance < threshold;
            }
        } catch (error) {
            console.error('Error comparing faces:', error);
            return false;
        }
        return false;
    }
});

// Monitor user authentication state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        console.log('User is signed in', user);
        await handleUserAuthentication(user);
    } else {
        console.log('No user is signed in');
    }
});
