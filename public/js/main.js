const mainNav = document.getElementById("mainMenu");
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");

openBtn.addEventListener("click", toggleMenu);

function toggleMenu () {
    const menuStyle = getComputedStyle(mainNav);

    if(menuStyle.display === "none") {
        mainNav.style.display = "flex";
    }
}