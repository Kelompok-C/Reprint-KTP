// Ambil elemen dari DOM
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

// Simulasi status login
let isLoggedIn = false; // Ganti dengan logika autentikasi yang sesuai

// Event untuk login
loginForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah refresh halaman

    // Cek username dan password (dummy)
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        isLoggedIn = true;
        togglePages();
    } else {
        alert("Username atau password salah!");
    }
});

// Event untuk logout
logoutBtn.addEventListener("click", function () {
    isLoggedIn = false;
    togglePages();
});

// Fungsi untuk mengganti tampilan
function togglePages() {
    if (isLoggedIn) {
        loginPage.style.display = "none";
        dashboardPage.style.display = "block";
    } else {
        loginPage.style.display = "block";
        dashboardPage.style.display = "none";
    }
}

// Set tampilan awal
togglePages();
