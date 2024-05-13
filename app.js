var isModalOpen = false

const burgerBtn = document.getElementById('burger_menu')
const modal = document.getElementById("modalMenu");
const tabbableElements = document.querySelectorAll('[tabindex]')
const modalTabbableElements = modal.querySelectorAll('button')
let focusIndex = 0; //For tabbable elements

const closeButtonForModal = document.getElementById('close')
const mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu')
const navSlider = document.getElementById('stickyNavPopUp')



const emailForm = document.getElementById('emailForm')
const inputElements = document.querySelectorAll("input[class='formEmelemnt']");
const email = document.getElementById('formEmail');
const emailTableElement = document.getElementById('emailTableElement')
const placeholderElem = document.getElementById('emailPlaceholderElement')
const errorMessage = document.getElementById('error-message')// Get the error message span
const message = document.getElementById('formText')
const messageBox = document.getElementById('messageElement')

var sortedTabbableArray = [...tabbableElements].sort((a, b) => parseInt(a.getAttribute('tabIndex'), 10) - parseInt(b.getAttribute('tabIndex'), 10));
function manageFocusAfterDelay() {/* Overrides native browser Focus Logic */
    document.addEventListener('keydown', (event) => {

        if (!isModalOpen) {
            sortedTabbableArray = [...tabbableElements].sort((a, b) => parseInt(a.getAttribute('tabIndex'), 10) - parseInt(b.getAttribute('tabIndex'), 10));
        } else {
            sortedTabbableArray = [...modalTabbableElements]
        }
        if (event.key === 'Tab') {
            event.preventDefault()
            setTimeout(() => {
                console.log(sortedTabbableArray[focusIndex])
                sortedTabbableArray[focusIndex].focus();
                focusIndex++
            }, 4);
        }
        if ((event.key === 'Enter' || event.key === ' ') && document.activeElement.hasAttribute('tabindex')) {
            const focusedElement = document.activeElement;
            // Simulate click event for users who navigate with tab button
            focusedElement.click();

            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }
        if (focusIndex === sortedTabbableArray.length) {
            focusIndex = 0
        }
    });
}
window.addEventListener('load', function () {/* Focus Managment Logic */

    // Initiate focus management
    manageFocusAfterDelay();

});
window.addEventListener("scroll", handleNavigationSlider)
window.addEventListener("resize", handleNavigationSlider)

email.addEventListener('focus', function () {
    emailTableElement.style.outlineColor = "#FF007A"
    emailTableElement.style.outlineStyle = "dashed"

    email.addEventListener('input', function () {
        var emailValue = this.value;

        if (emailValue.length > 0) {
            placeholderElem.style.color = "white"
        } else {
            placeholderElem.style.color = "#8D8D8D"
        }

    });
    email.addEventListener('blur', function () {
        emailValue = this.value;
        emailTableElement.style.outlineColor = "none"
        emailTableElement.style.outlineStyle = "none"
        placeholderElem.style.color = "white"

        if (!emailValue) {
            placeholderElem.style.color = "#8D8D8D"
        }
    })

})
emailTableElement.addEventListener("click", function () {
    email.focus()
    focusIndex = 12
})
//Form Validation
emailForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        errorMessage.innerHTML = "Fields must not be empty"
        errorMessage.style.visibility = "visible"
        return
    }
    if (!/@/.test(email.value)) {
        errorMessage.innerHTML = "Email should contain '@' character"
        errorMessage.style.visibility = "visible"
        return
    }
    if (!/[.]/.test(email.value)) {
        errorMessage.innerHTML = "Email should contain an '.' character"
        errorMessage.style.visibility = "visible"
        return
    }

    if (!emailRegex.test(email.value)) {
        errorMessage.innerHTML = "Provide valid Email"
        errorMessage.style.visibility = "visible"
        return
    }

    if (message.value.trim() === "") {
        errorMessage.innerHTML = "Message field must not be empty"
        errorMessage.style.visibility = "visible"
        return
    }

    // Endpoint URL
    var url = "https://formspree.io/f/mnqeoaol";

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Create a new FormData object
    var formData = new FormData();
    formData.append("email", document.getElementById('formEmail').value);
    formData.append("userText", document.getElementById('formText').value);

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
                // console.log("Success!");
                // console.log(xhr.responseText);
            } else {
                // Request failed
                // console.log("Failed!");
                // console.error(xhr.responseText);
            }
        }
    };
    // Send the request with the FormData
    xhr.send(formData);

    email.value = ""
    formText.value = ""
    errorMessage.innerHTML = ""
    errorMessage.style.visibility = "hidden"
    placeholderElem.style.color = "#8D8D8D"


})
formText.addEventListener('focus', function () {
    messageBox.style.outlineColor = "#FF007A"
    messageBox.style.outlineStyle = "dashed"
    formText.addEventListener('blur', function () {
        messageBox.style.outlineColor = "none"
        messageBox.style.outlineStyle = "none"
    })
})

burgerBtn.onclick = function (event) {/* Opening MODAL */
var captureSafariNativeFocus = true
modal.addEventListener("focusin", (event) => {
    if(captureSafariNativeFocus){
        const focusedElement = event.target;
        focusedElement.blur()
        captureSafariNativeFocus = false
        return
    }
    // Do something with the focused element
});
    isModalOpen = true
    sortedTabbableArray = [...modalTabbableElements]
    focusIndex = 0
    sortedTabbableArray[0].blur()
    modal.style.display = "block"
    modal.style.animation = "modalSliderTopToBottom 0.3s ease-in-out"
    modal.style.animationFillMode = "forwards"
    document.body.style.overflow = "hidden"

    mobileNavSlider.style.animation = "navigationSlider-reverse 0.25s ease-in"
    mobileNavSlider.style.animationFillMode = "forwards"
}
function closeModal() { /* Closing MODAL */
    isModalOpen = false
    document.body.style.overflow = "auto"
    modal.style.animation = "modalSliderTopToBottom-reverse 0.25s ease-in-out"
    modal.style.animationFillMode = "forwards"
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
            const scrollTop = current + (targetPosition - current) * easedProgress -60;


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
function handleNavigationSlider() {
    const headerElem = document.getElementById("header");
    const screenWidth = window.innerWidth;
    const navSlider = document.getElementById('stickyNavPopUp');
    const mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu');

    if (screenWidth >= 617) {
        mobileNavSlider.style.display = "none"
        if (window.scrollY > headerElem.offsetTop + headerElem.offsetHeight) {
            navSlider.style.display = "flex";
            navSlider.style.animation = "navigationSliderTopToBottom 0.5s ease-in-out";
        } else {
            navSlider.style.animation = "navigationSliderTopToBottom-reverse 0.5s ease-in-out";
            navSlider.style.animationFillMode = "forwards";
        }
    } else if (screenWidth < 617) {
        navSlider.style.display = "none";
        if (window.scrollY > headerElem.offsetTop + headerElem.offsetHeight) {
            mobileNavSlider.style.display = "flex";
            mobileNavSlider.style.animation = "navigationSlider 0.5s ease-in-out";
        } else {
            mobileNavSlider.style.animation = "navigationSlider-reverse 0.5s ease-in";
            mobileNavSlider.style.animationFillMode = "forwards";
        }
    }
}

for (let i = 0; i < inputElements.length; i++) {/* Contact Form Placeholder Logic */
    const input = inputElements[i];
    input.addEventListener("focus", function () {
        var savedInputText = input.placeholder
        if (input.value === "") {
            input.placeholder = savedInputText;
        }
        input.addEventListener("blur", function () {
            if (input.value === "") {
                input.placeholder = savedInputText;
            }
        });
    });
}








