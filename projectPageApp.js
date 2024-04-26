const projectData = [
    {
        id: 1,
        replacements: {
            "##PROJECT_NAME##": "Project Alpha",
            "##PROJECT_DESCRIPTION##": "This is the description for Project Alpha.",
            "##NEXT_PROJECT_NAME##": "Project Beta",
             "##NEXT_PROJECT_DESCRIPTION##":"Some Text about NEXT PROJECT",
            projectImages: [ 
            "./img/project1.svg",
            "./img/project2.svg",
            "./img/project3.svg"],
        }
    },
    {
        id: 2,
        replacements: {
            "##PROJECT_NAME##": "Project Beta",
            "##PROJECT_DESCRIPTION##": "This is the description for Project Beta.",
            "##NEXT_PROJECT_NAME##": "Project Delta",
             "##NEXT_PROJECT_DESCRIPTION##":"Some Text about NEXT PROJECT",
            projectImages: [ 
            "./img/project2.svg",
            "./img/project3.svg",
            "./img/project1.svg"],
        }
    },
    {
        id: 3,
        replacements: {
            "##PROJECT_NAME##": "Project Delta",
            "##PROJECT_DESCRIPTION##": "This is the description for Project Beta.",
            "##NEXT_PROJECT_NAME##": "Project Delta",
             "##NEXT_PROJECT_DESCRIPTION##":"Some Text about NEXT PROJECT",
            projectImages: [ 
            "./img/project3.svg",
            "./img/project2.svg",
            "./img/project1.svg"],
        }
    },
];

const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get('id');
var projectIdChangable = projectId.toString()

const parsedHTMLString = document.documentElement.innerHTML;
const selectedProjectId = projectIdChangable;

const finalHTML = replaceKeywords(parsedHTMLString, selectedProjectId);
document.documentElement.innerHTML = finalHTML

var projectPageContainer = document.getElementById('projectPage_container')

var mobileNavSlider = document.getElementById('mobileNavWithHamburgerMenu')

var navSlider = document.getElementById('stickyNavPopUp')

function changeProject(newValue) {
    projectIdChangable = newValue
    PageChanger()
}



function replaceKeywords(htmlString, projectId) {
    const project = projectData.find(project => project.id == projectId); // Or use project.name for names

    if (!project) {
        console.error('Project not found:', projectId);
        return htmlString; // Handle case where project ID is not found
    }

    const replacements = project.replacements;
    for (const keyword in replacements) {
        const replacementValue = replacements[keyword];
        htmlString = htmlString.replace(new RegExp(keyword, 'g'), replacementValue);
    }
    
    return htmlString;
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