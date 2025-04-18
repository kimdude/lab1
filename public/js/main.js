//Fetching variables from html-document
const mainNav = document.getElementById("mainMenu");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

//Adding eventlisteners
openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

//Function to toggle menu
function toggleMenu () {
    const menuStyle = getComputedStyle(mainNav);

    if(menuStyle.display === "none") {
        mainNav.style.display = "flex";
        openBtn.style.display = "none";
        closeBtn.style.display = "flex";

    } else {
        mainNav.style.display = "none";
        closeBtn.style.display = "none";
        openBtn.style.display = "flex";
    }
}