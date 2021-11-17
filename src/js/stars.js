import { cloneElement, generateRandomNumber} from './helpers.js'

function createStar() {

    let star = document.createElement('div');
    star.classList.add('star');

    let size = generateRandomNumber(3);
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${generateRandomNumber(100)}%`;
    star.style.top = `${generateRandomNumber(100)}%`;
    star.style.animation = `twinkle 4s ${generateRandomNumber(10)}s linear infinite, drift 8s ${generateRandomNumber(10)}s linear infinite`;

    return star;
}

// Append stars to background
export function renderStars(number) {

    const stars = document.createElement('div');
    stars.classList.add('stars');
    
    
    document.querySelector('body').appendChild(stars);
    
    // const stars = document.querySelector('.stars');
    for (let i = 0; i < number; i++) {
        stars.append(createStar());
    }
    
    // Create copy of stars, push down 100% and append to wrapping parent to allow for seamless animation
    let clone = cloneElement(stars);
    clone.classList.add('stars__clone')
    
    stars.parentNode.insertBefore(clone, stars.nextSibling)
}