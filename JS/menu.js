document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggle-menu-btn");
    const sidebar = document.getElementById("sidebar");
    const content = document.querySelector(".container");

    toggleButton.addEventListener("click", function () {
        sidebar.classList.toggle("sidebar-hidden");
        content.classList.toggle("content-expanded");
    });
});