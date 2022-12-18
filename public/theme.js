// Get the theme from local storage
const theme = localStorage.getItem("theme");

// Set the theme in the document attributes
if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
}

console.log("Theme: " + theme);