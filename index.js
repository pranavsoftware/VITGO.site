// Function to toggle the mobile menu
function toggleMenu() {
    const menuList = document.querySelector('.menu-list');
    const header = document.querySelector('.transparent-header');

    // Toggle the 'menu-open' class
    header.classList.toggle('menu-open');
    menuList.classList.toggle('active');

    // Open the menu
    if (menuList.classList.contains('active')) {
        menuList.style.display = 'flex';
        setTimeout(() => {
            menuList.style.opacity = '1';
            menuList.style.transform = 'translateX(0)';
        }, 0);
    } else {
        // Close the menu
        menuList.style.opacity = '0';
        menuList.style.transform = 'translateX(100%)';
        setTimeout(() => {
            menuList.style.display = 'none';
        }, 300); // Match this timeout with the CSS transition duration
    }
}

// Manage review functionality
let currentReview = 0;

// Function to change reviews
function changeReview(direction) {
    const reviews = document.querySelectorAll('.review');
    reviews[currentReview].classList.remove('active'); // Hide the current review
    currentReview = (currentReview + direction + reviews.length) % reviews.length; // Update index
    reviews[currentReview].classList.add('active'); // Show the new review
}

// Function to automatically change reviews every 3 seconds
function autoChangeReview() {
    setInterval(() => {
        changeReview(1); // Automatically move to the next review
    }, 3000); // 3000 ms = 3 seconds
}

// Event listeners for document ready to ensure everything is set up correctly
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.querySelector('.menu-list');

    // Toggle menu on click
    menuToggle.addEventListener('click', toggleMenu);

    // Optional: Close the menu when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !menuList.contains(event.target)) {
            menuList.classList.remove('active');
            header.classList.remove('menu-open');
            menuList.style.opacity = '0';
            menuList.style.transform = 'translateX(100%)';
            setTimeout(() => {
                menuList.style.display = 'none';
            }, 300);
        }
    });

    // Automatically start changing reviews every 3 seconds
    autoChangeReview();
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/index/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}
