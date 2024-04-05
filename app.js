var burgerBtn = document.getElementById('burger_menu')

var modal = document.getElementById("modalMenu");

var closeButtonForModal = document.getElementById('close')

var mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu')

burgerBtn.onclick = function () {
    modal.style.display = "block";
}
function closeModal() {
    modal.style.display = "none";
}
function mobileNavSliderCloser() {
    mobileNavSlider.style.display = 'none'
}



window.addEventListener("scroll", function () {
    var headerElem = document.getElementById("header");
    let screenWidth = screen.width;
    if (screenWidth < 617) {
        if (window.scrollY > headerElem.offsetTop + headerElem.offsetHeight) {
            /* Animation when user scrolls past header section */
            mobileNavSlider.style.animation = "navigationSlider 1s ease-in-out"

        }
        if (window.scrollY < headerElem.offsetTop + headerElem.offsetHeight) {
            /* Animation when user scrolls back on top is needed for the popUp navigation */
            mobileNavSlider.style.animation = "opacity 1s ease-in"
            mobileNavSlider.style.animationFillMode = "forwards"

        }
    } else return
}) 
