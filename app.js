var burgerBtn = document.getElementById('burger_menu')




var modal = document.getElementById("modalMenu");
const allModalElements = modal.querySelectorAll('*'); // Get all elements
const modalWorkButton = document.getElementById('modalWorkButton')

const tabbableElements = document.querySelectorAll('[tabindex]')

let focusIndex = 0; //For tabbable elements that are outside modal

const focusableModalElements = Array.from(allModalElements).filter(
    (element) => element.tabIndex !== -1 || element.getAttribute('href') || element.contentEditable === 'true'
);
let focusedIndex = focusableModalElements.indexOf(document.activeElement);

var closeButtonForModal = document.getElementById('close')

var mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu')

var navSlider = document.getElementById('stickyNavPopUp')

const inputElements = document.querySelectorAll("input[class='formEmelemnt']");

window.addEventListener('load', function () {

    var sortedTabbableArray = [...tabbableElements].sort((a, b) => parseInt(a.getAttribute('tabIndex'), 10) - parseInt(b.getAttribute('tabIndex'), 10));

    function manageFocusAfterDelay() {
        document.addEventListener('keydown', (event) => {
            event.preventDefault()
            if (focusIndex === sortedTabbableArray.length) {
                focusIndex = 0
                console.log("focus index: " + focusIndex)
            }

            if (event.key === 'Tab') {
                setTimeout(() => {
                    sortedTabbableArray[focusIndex].focus();
                    focusIndex++
                }, 50);
            }
            if ((event.key === 'Enter' || event.key === ' ') && document.activeElement.hasAttribute('tabindex')) {
                const focusedElement = document.activeElement;
                // Simulate click event for users who navigate with tab button
                focusedElement.click();

                if (event.key === 'Enter') {
                    event.preventDefault();
                }
            }
        });
    }

    // Initiate focus management
    manageFocusAfterDelay();

});

/* Focus section Logic END  */



burgerBtn.onclick = function () {/* Opening MODAL */
    modal.style.display = "block"
    modal.style.animation = "modalSliderTopToBottom 0.3s ease-in-out"
    modal.style.animationFillMode = "forwards"

    console.log(focusableModalElements[0])

    mobileNavSlider.style.animation = "navigationSlider-reverse 0.25s ease-in"
    mobileNavSlider.style.animationFillMode = "forwards"
    const myTimeout = setTimeout(WorkButtonTimeout, 1000);
}
function WorkButtonTimeout() {
    modalWorkButton.focus()
    document.body.style.overflow = "hidden"
}
function closeModal() { /* Closing MODAL */
    modal.style.animation = "modalSliderTopToBottom-reverse 0.25s ease-in-out"
    modal.style.animationFillMode = "forwards"

    mobileNavSlider.style.animation = "navigationSlider 0.2s ease-in"
    mobileNavSlider.style.animationFillMode = "forwards"

    document.body.style.overflow = "auto"
}
function scrollToSection(targetSectionId) {


    // Check if targetSectionId is null or empty string
    if (!targetSectionId || targetSectionId === "") {
        console.error("Invalid target section ID provided.");
        return; // Exit the function if ID is invalid
    }

    const targetSection = document.getElementById(targetSectionId);

    if (targetSection) {
        const targetPosition = targetSection.offsetTop; // Get target section's offset from top
        // Smooth scrolling animation parameters
        const animationDuration = 800; // milliseconds
        const easeInOutQuad = function (t) {
            return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };
        const current = window.scrollY || window.scrollY;
        let start = null;

        const animateScroll = function (timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const easedProgress = easeInOutQuad(progress / animationDuration);
            const scrollTop = current + (targetPosition - current) * easedProgress;


            window.scrollTo(0, scrollTop);

            if (progress < animationDuration) {
                window.requestAnimationFrame(animateScroll);
            }
        };

        window.requestAnimationFrame(animateScroll);
    } else {
        console.error("Target section with ID", targetSectionId, "not found.");
    }
}
function goToProject(projectId) {/* Project page swap Logic */
    const targetUrl = "project.html?id=" + projectId;
    window.location.href = targetUrl;
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
            navSlider.style.animation = "navigationSliderTopToBottom-reverse 0.5s ease-in-out"
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
            mobileNavSlider.style.animation = "navigationSlider-reverse 0.5s ease-in"
            mobileNavSlider.style.animationFillMode = "forwards"

        }
    } else return
})

modal.addEventListener('keydown', (event) => { // Get current focused element index
    
    
    if (event.key === 'Tab') {
        if (event.shiftKey) {
            focusedIndex--; // Decrement index on Shift + Tab
            if (focusedIndex < 0) {
                focusedIndex = focusableModalElements.length - 1;
            }
        } else {
            focusedIndex++; // Increment index on Tab
            if (focusedIndex >= focusableModalElements.length) {
                focusedIndex = 0;
            }
        }
        focusableModalElements[focusedIndex].focus();
        event.preventDefault();
    }
});

document.getElementById("formSubmitButton").addEventListener("click", function () {
    // Endpoint URL
    var url = "https://formspree.io/f/mnqeoaol";

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Create a new FormData object
    var formData = new FormData();
    formData.append("email", document.getElementById('formEmail').value);
    formData.append("userText", document.getElementById('formText').value);
    console.log(formData)

    // Open a new POST request
    xhr.open("POST", url, true);

    // Set the appropriate headers
    xhr.setRequestHeader("Accept", "application/json");

    // Set up a callback function to handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // Request completed
            if (xhr.status === 200) {
                // Request was successful
                console.log("Success!");
                window.location.href = "https://houseplantdesign.netlify.app/";
                console.log(xhr.responseText);
            } else {
                // Request failed
                console.log("Failed!");
                console.error(xhr.responseText);
            }
        }
    };
    window.location.href = "https://houseplantdesign.netlify.app/";
    // Send the request with the FormData
    xhr.send(formData);
});

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










