function toggleMenu() {
    const menuList = document.querySelector('.menu-list');
    menuList.classList.toggle('show');
}
// Function to hide the spinner after the page is fully loaded
window.addEventListener('load', function() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.style.display = 'none'; // Hides the spinner
    }
});
