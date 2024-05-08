const projectData = [
    {
        id: 1,
        replacements: {
            "##PROJECT_NAME##": "Project",
            "##PROJECT_DESCRIPTION##": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus pretium pulvinar. Curabitur eget libero nec felis ornare bibendum in in nulla. Aenean turpis tortor, malesuada et lacus et, rutrum malesuada est. Maecenas pellentesque velit ac suscipit consectetur.",
            "##NEXT_PROJECT_NAME##": "Project",
            "##NEXT_PROJECT_DESCRIPTION##": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus pretium pulvinar. Curabitur eget libero nec felis ornare bibendum in in nulla. Aenean turpis tortor, malesuada et lacus et, rutrum malesuada est. Maecenas pellentesque velit ac suscipit consectetur.",
            "##IMAGE_1##": '<img src="./img/project1.svg" alt="" srcset="">',
            "##IMAGE_2##": '<img src="./img/project1.svg" alt="" srcset="">',
            "##IMAGE_3##": '<img src="./img/project1.svg" alt="" srcset="">',
            "##IMAGE_4##": '<img src="./img/project1.svg" alt="" srcset="">',
            "##IMAGE_5##": '<img src="./img/project1.svg" alt="" srcset="">',
            "##IMAGE_6##": '<img src="./img/project1.svg" alt="" srcset="">',
            "##IMAGE_7##": '<img src="./img/project2.svg" alt="" srcset="">',

        }
    },
    {
        id: 2,
        replacements: {
            "##PROJECT_NAME##": "Project",
            "##PROJECT_DESCRIPTION##": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus pretium pulvinar. Curabitur eget libero nec felis ornare bibendum in in nulla. Aenean turpis tortor, malesuada et lacus et, rutrum malesuada est. Maecenas pellentesque velit ac suscipit consectetur.",
            "##NEXT_PROJECT_NAME##": "Project",
            "##NEXT_PROJECT_DESCRIPTION##": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus pretium pulvinar. Curabitur eget libero nec felis ornare bibendum in in nulla. Aenean turpis tortor, malesuada et lacus et, rutrum malesuada est. Maecenas pellentesque velit ac suscipit consectetur.",
            "##IMAGE_1##": '<img src="./img/project2.svg" alt="" srcset="">',
            "##IMAGE_2##": '<img src="./img/project2.svg" alt="" srcset="">',
            "##IMAGE_3##": '<img src="./img/project2.svg" alt="" srcset="">',
            "##IMAGE_4##": '<img src="./img/project2.svg" alt="" srcset="">',
            "##IMAGE_5##": '<img src="./img/project2.svg" alt="" srcset="">',
            "##IMAGE_6##": '<img src="./img/project2.svg" alt="" srcset="">',
            "##IMAGE_7##": '<img src="./img/project3.svg" alt="" srcset="">',

        }
    },
    {
        id: 3,
        replacements: {
            "##PROJECT_NAME##": "Project",
            "##PROJECT_DESCRIPTION##": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus pretium pulvinar. Curabitur eget libero nec felis ornare bibendum in in nulla. Aenean turpis tortor, malesuada et lacus et, rutrum malesuada est. Maecenas pellentesque velit ac suscipit consectetur.",
            "##NEXT_PROJECT_NAME##": "Project",
            "##NEXT_PROJECT_DESCRIPTION##": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus pretium pulvinar. Curabitur eget libero nec felis ornare bibendum in in nulla. Aenean turpis tortor, malesuada et lacus et, rutrum malesuada est. Maecenas pellentesque velit ac suscipit consectetur.",
            "##IMAGE_1##": '<img src="./img/project3.svg" alt="" srcset="">',
            "##IMAGE_2##": '<img src="./img/project3.svg" alt="" srcset="">',
            "##IMAGE_3##": '<img src="./img/project3.svg" alt="" srcset="">',
            "##IMAGE_4##": '<img src="./img/project3.svg" alt="" srcset="">',
            "##IMAGE_5##": '<img src="./img/project3.svg" alt="" srcset="">',
            "##IMAGE_6##": '<img src="./img/project3.svg" alt="" srcset="">',
            "##IMAGE_7##": '<img src="./img/project1.svg" alt="" srcset="">',
            projectImages: [
                "./img/project3.svg",
                "./img/project2.svg",
                "./img/project1.svg"],
        }
    },
];

var urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
var projectIdChangable = Number(projectId)

//Modal Functionality 
var isModalOpen = false
let focusIndex = 0; //For tabbable elements

function getTabbableElements() {
    const tabbableElements = document.querySelectorAll('[tabindex]')
    sortedTabbableArray = [...tabbableElements].sort((a, b) => parseInt(a.getAttribute('tabIndex'), 10) - parseInt(b.getAttribute('tabIndex'), 10));
    return sortedTabbableArray
}
function getModalTabbableElements(modal) {
    const modalTabbableElements = modal.querySelectorAll('button')
    return modalTabbableElements
}



var parsedHTMLString = document.documentElement.innerHTML;

var finalHTML = replaceKeywords(parsedHTMLString, projectIdChangable);

document.documentElement.innerHTML = finalHTML // Renders the filap project page

var projectPageContainer = document.getElementById('projectPage_container')

var mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu')



var navSlider = document.getElementById('stickyNavPopUp')

function changeProject() {

    projectIdChangable = projectIdChangable + 1
    if (projectIdChangable > 3) {
        projectIdChangable = 1
    }
    finalHTML = replaceKeywords(parsedHTMLString, projectIdChangable)
    document.documentElement.innerHTML = finalHTML

    urlParams.set('id', projectIdChangable); // Update or add the 'id' parameter

    history.pushState({}, null, `?${urlParams.toString()}`); // Update URL history
    location.href = 'project.html' + `?${urlParams.toString()}`


}
function replaceKeywords(htmlString, projectId) {
    const project = projectData.find(project => project.id == projectId);

    if (!project) {
        console.error('Project not found:', projectId);
        return htmlString;
    }

    const replacements = project.replacements;
    for (const keyword in replacements) {
        const replacementValue = replacements[keyword];
        htmlString = htmlString.replace(new RegExp(keyword, 'g'), replacementValue);
    }

    return htmlString;
}
window.addEventListener("scroll", handleNavigationSlider)
window.addEventListener("resize", handleNavigationSlider);
function handleNavigationSlider() {
    const headerElem = document.getElementById("header");
    const screenWidth = window.innerWidth;
    const navSlider = document.getElementById('stickyNavPopUp');
    const mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu');
    if (screenWidth > 617) {
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

window.addEventListener('load', function () {/* Focus Managment Logic */




    function manageFocusAfterDelay() {/* Overrides native browser Focus Logic */
        document.addEventListener('keydown', (event) => {
            event.preventDefault()
            var modal = getModal()
            modalSortedArray = []
            sortedTabbableArray = getTabbableElements()
            modalTabbableArray = getModalTabbableElements(modal)
            if (!isModalOpen) {
                modalSortedArray = sortedTabbableArray
            } else {
                modalSortedArray = modalTabbableArray
            }
            if (focusIndex === modalSortedArray.length) {
                focusIndex = 0
            }
            if (event.key === 'Tab') {

                console.log(modalSortedArray[focusIndex])
                console.log(modal)
                modalSortedArray[focusIndex].focus();
                focusIndex++

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


// modal.addEventListener('keydown', (event) => { // Get current focused element index


//     if (event.key === 'Tab') {
//         if (event.shiftKey) {
//             focusedIndex--; // Decrement index on Shift + Tab
//             if (focusedIndex < 0) {
//                 focusedIndex = focusableModalElements.length - 1;
//             }
//         } else {
//             focusedIndex++; // Increment index on Tab
//             if (focusedIndex >= focusableModalElements.length) {
//                 focusedIndex = 0;
//             }
//         }
//         focusableModalElements[focusedIndex].focus();
//         event.preventDefault();
//     }
// });



function getModal() {
    return document.getElementById("modalMenu");
}
function closeModal() { /* Closing MODAL */

    var modal = getModal()
    isModalOpen = false

    modal.style.animation = "modalSliderTopToBottom-reverse 0.25s ease-in-out"
    modal.style.animationFillMode = "forwards"
    document.body.style.overflow = "auto"
}
function openModal() {/* Opening MODAL */

    var modal = getModal()
    isModalOpen = true
    focusIndex = 0

    modal.style.display = "block"
    modal.style.animation = "modalSliderTopToBottom 0.3s ease-in-out"
    modal.style.animationFillMode = "forwards"

    document.body.style.overflow = "hidden"

    mobileNavSlider.style.animation = "navigationSlider-reverse 0.25s ease-in"
    mobileNavSlider.style.animationFillMode = "forwards"

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