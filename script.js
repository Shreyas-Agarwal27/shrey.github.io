document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeOptions = document.getElementById("theme-options");
    const lightMode = document.getElementById("light-mode");
    const darkMode = document.getElementById("dark-mode");
    const autoMode = document.getElementById("auto-mode");
    const logoImg = document.getElementById("logo");
    const icon = document.getElementById("theme-icon"); // Ensure this gets the correct icon

    // Toggle dropdown on button click
    themeToggle.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent it from closing immediately
        themeOptions.classList.toggle("show");
    });

    // Function to change the theme
    function setTheme(theme) {
        const themeIcon = document.getElementById("theme-icon"); // Get the icon element
        const logo = document.getElementById("logo");
    
        if (theme === "dark") {
            document.body.classList.add("dark-mode");
            themeIcon.classList.replace("fa-sun", "fa-moon");  // Change only the icon
            localStorage.setItem("theme", "dark");
        } else if (theme === "light") {
            document.body.classList.remove("dark-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");  // Change only the icon
            localStorage.setItem("theme", "light");
        } else {
            // Auto mode: Check system preference
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
            localStorage.setItem("theme", "auto");
        }
    
        // Update logo
        logo.src = document.body.classList.contains("dark-mode") 
            ? "photos/logo_dark.jpg" 
            : "photos/logo_light.png";
    }
    

    // Apply stored theme on page load
    const savedTheme = localStorage.getItem("theme") || "auto";
    setTheme(savedTheme);

    // Event listeners for theme selection
    lightMode.addEventListener("click", () => {
        setTheme("light");
        themeOptions.classList.remove("show");
    });
    darkMode.addEventListener("click", () => {
        setTheme("dark");
        themeOptions.classList.remove("show");
    });
    autoMode.addEventListener("click", () => {
        setTheme("auto");
        themeOptions.classList.remove("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!themeToggle.contains(event.target) && !themeOptions.contains(event.target)) {
            themeOptions.classList.remove("show");
        }
    });
});
