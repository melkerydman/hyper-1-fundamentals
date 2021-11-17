import { getData } from "./data.js";

console.log('before getData');
let arrayOfData = await getData();
console.log('after getData');

let showcaseWrapper = document.querySelector('.showcase');
let projectsWrapper = document.querySelector('.projects'); // .projects wraps all columns and projects in HTML file
let numberOfcolumns;

let columns = []; // document.querySelectorAll('.projects__column'), set in createcolumns();
let scrollArray = []; // Array for scroll properties

// CREATION PHASE
function setNumberOfcolumns() {

    let screenWidth = window.innerWidth;
    
    if(screenWidth < 768) {
        numberOfcolumns = 2;
    } 
    else {
        numberOfcolumns = 5;
    }
}
function createcolumns() {
    for(let i = 0; i < numberOfcolumns; i++) {
        projectsWrapper.innerHTML += `<div class="projects__column"></div>`;
    }
    columns = document.querySelectorAll('.projects__column'); // Set global variable columns
}
function createProject(projectData) {
    let project = `
        <article class="project" data-id="${projectData.index}">
            <img 
                class="project__image"
                src="${projectData.src.small}">
            <h3 class="project__title">${projectData.photographer}</h3>
            <p class="project__description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora corporis ea, architecto, consequatur id iste tenetur pariatur ut tempore vitae vero, modi alias eaque beatae.</p>
        </article>`;

    return project;
}
function createProjectClone() {
    columns.forEach(column => {
        let projectsInColumn = column.querySelectorAll('.project');
    
        projectsInColumn.forEach((project) => {
            const clone = project.cloneNode(true);
            clone.classList.add('js-clone');
            column.appendChild(clone);
        });
    })
}

// SCROLL FUNCTIONS
function setScrollProperties() {
    columns.forEach(column => {
        let columnObj = {
            // scrollPosition: 0,
            columnHeight: column.scrollHeight,
            scrollDisabled: false
        }
        scrollArray.push(columnObj)
    })
}
function updateScroll(column, index) {
    let scrollPosition = column.scrollTop;
    let columnHeight = scrollArray[index].columnHeight;
    let scrollDisabled = scrollArray[index].scrollDisabled;

    if(scrollPosition >= columnHeight / 2) {
        // Move to top when bottom scroll reached
        scrollPosition = 1;
        column.scrollTo(0, scrollPosition);
    }
    else if(scrollPosition == 0 ) {
        // Move to bottom when top scroll reached
        scrollPosition = columnHeight / 2;
        column.scrollTo(0, scrollPosition);
    }
    if (!scrollDisabled && scrollPosition < columnHeight) {
        // Scroll a pixel at a time
        column.scrollTo(0, scrollPosition + 1);

    }
}
// Take the objects from scrollArr and change their properties on resize
function recalc() {
    scrollArray.forEach((item, index) => {
        item.columnHeight = columns[index].scrollHeight;
    })
}

// Width and height properties not needed on showcase image since height is static for parent
// Get data-id from project and use for showContent()
function createContent(projectData) {
    let content = `
        <div class="showcase__content hidden">
            <div class="showcase__image">
                <img
                    data-id="${projectData.index}"
                    class="image"
                    src="${projectData.src.regular}">
            </div>
            <div class="showcase__info">
                <p><strong>photographer</strong> <br> ${projectData.photographer}<p>
                <p><strong>location</strong> <br> ${projectData.location.name}<p>
                <p><strong>camera</strong> <br> ${projectData.camera.brand}, ${projectData.camera.model}<p>
            </div>
            
        </div>`
    return content;

}
function showContent(projectData) {

    showcaseWrapper.innerHTML = createContent(projectData);
    let content = document.querySelector('.showcase__content');

    setTimeout(() => { // Timeout needed otherwise classes are added too fast?
        content.classList.remove('hidden');
        content.classList.add('visible');
    }, 200);
}
function removeContent() {
    showcaseWrapper.innerHTML = "";
}

// INIT
function initProjects() {
    setNumberOfcolumns();
    createcolumns();

    let currentColumn = 0;
    for (let i = 0; i < arrayOfData.length; i++) {
        let project = createProject(arrayOfData[i]);
        columns[currentColumn].innerHTML += project;
        if(currentColumn == numberOfcolumns - 1) {
            currentColumn = 0;
        } else {
            currentColumn++;
        }
    }
    createProjectClone();
}
function initScroll() {
    scrollArray = []; // Reset scrollArray
    setScrollProperties();

    columns.forEach((column, index) => {
        let scrollPosition = column.scrollTop;
        column.scrollTo(0, scrollPosition + 1)
        column.addEventListener('scroll', () => {
            updateScroll(column, index);
        });
        column.addEventListener('mouseenter', () => {
            scrollArray[index].scrollDisabled = true;
        })
        column.addEventListener('mouseleave', () => {
            scrollArray[index].scrollDisabled = false;
            updateScroll(column, index);
        })
    })
    
}
function initShowcase() {
    let projects = document.querySelectorAll('.project');
    let persistImage = false;
    let screenWidth = window.innerWidth;

    projects.forEach(project => {
        const id = project.dataset.id;
        const projectData = arrayOfData[id];


        // Preview content on hover on bigger screen
        if(screenWidth >= 768) {
            project.addEventListener('mouseenter', () => {
                if (!persistImage) {
                    showContent(projectData);
                }
            });
            project.addEventListener('mouseleave', () => {
                if (!persistImage) {
                    removeContent();
                }
            });
        }

        project.addEventListener('click', () => {
            // Init content on smaller screen
            if(screenWidth < 768) {
                showContent(projectData);
            }
            persistImage = true;
            let galleryWrapper = document.querySelector('.gallery-wrapper');
            
            galleryWrapper.classList.add('expanded'); // Make showcase fullscreen

            // Add toggle for re-showing project columns
            let showProjects = document.createElement('div');
            showProjects.classList.add('expand-btn');
            showProjects.classList.add('hidden');
            showProjects.innerHTML = `
                expand +`;
            galleryWrapper.append(showProjects);
            setTimeout(() => {
                showProjects.classList.add('visible');
            }, 1500);

            // Open project columns button
            // - a click should open menu again and remove the content
            showProjects.addEventListener('click', () => {
                document.querySelector('.showcase__content').innerHTML = ''; // Reset the showcase content
                if(projectsWrapper.classList.contains('active')) {
                    projectsWrapper.classList.remove('active');
                }
                galleryWrapper.classList.remove('expanded');
                showProjects.remove();
                setTimeout(() => {
                    persistImage = false;
                }, 1500);
            })

            showProjects.addEventListener('mouseenter', () => {
                showProjects.classList.add('active');
                document.querySelector('.projects').classList.add('active');
            })
            showProjects.addEventListener('mouseleave', () => {
                showProjects.classList.remove('active');
                document.querySelector('.projects').classList.remove('active');
            })
        })
    })
}
function initGallery() {
    console.log('initGallery()');
    initProjects();
    projectsWrapper.classList.add('slide-in'); // transition in

    // Workaround solution to calculate columnHeight after all images are loaded
    setTimeout(() => {
        initScroll();
        initShowcase();
    }, 1000);

    window.addEventListener('resize', () => {
        let screenWidth = window.innerWidth;
        
        recalc();
    
        if((screenWidth < 768 && numberOfcolumns !== 2) || (screenWidth >= 768 && numberOfcolumns !== 5)){
            projectsWrapper.innerHTML = "";
            initProjects();
            initScroll();
            initShowcase();
        }
    })
}

initGallery();