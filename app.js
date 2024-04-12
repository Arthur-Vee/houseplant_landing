var burgerBtn = document.getElementById('burger_menu')

var modal = document.getElementById("modalMenu");
var modalContentWrapper = document.getElementById("modalContentWrapper")

var closeButtonForModal = document.getElementById('close')

var mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu')

var navSlider = document.getElementById('stickyNavPopUp')

const inputElements = document.querySelectorAll("input[class='formEmelemnt']");

burgerBtn.onclick = function () {
    modal.style.display = "block";
    modalContentWrapper.style.display = "flex"
}

function closeModal() {
    modal.style.display = "none";
}
function mobileNavSliderCloser() {
    mobileNavSlider.style.display = 'none'
}

window.addEventListener("scroll", function () {/* Navigation Slider Logic */
    var headerElem = document.getElementById("header");
    let screenWidth = screen.width;
    if (screenWidth > 617) {
        if (window.scrollY > headerElem.offsetTop + headerElem.offsetHeight) {
            navSlider.style.display = "flex"
            navSlider.style.animation = "navigationSliderTopToBottom 0.5s ease-in-out"
        }
        if (window.scrollY < headerElem.offsetTop + headerElem.offsetHeight) {
            navSlider.style.animation = "opacity 1s ease-in"
            navSlider.style.animationFillMode = "forwards"


        }
    } else if (screenWidth < 617) {
        navSlider.style.display = "none"
        if (window.scrollY > headerElem.offsetTop + headerElem.offsetHeight) {
            /* Animation when user scrolls past header section */
            mobileNavSlider.style.display = "flex"
            mobileNavSlider.style.animation = "navigationSlider 0.5s ease-in-out"


        }
        if (window.scrollY < headerElem.offsetTop + headerElem.offsetHeight) {
            /* Animation when user scrolls back on top is needed for the popUp navigation */
            mobileNavSlider.style.animation = "opacity 1s ease-in"
            mobileNavSlider.style.animationFillMode = "forwards"

        }
    } else return
})


for (let i = 0; i < inputElements.length; i++) {/* Contact Form Placeholder Logic */
    const input = inputElements[i];
    input.addEventListener("focus", function () {
        var savedInputText = input.placeholder
        if (input.value === "") {
            input.placeholder = "";
        }
        input.addEventListener("blur", function () {
            if (input.value === "") {
                input.placeholder = savedInputText;
            }
        });
    });
}