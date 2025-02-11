//SCROLL
let scrollPercent = 0;
const animationScripts = [];

//Scroll animation
window.addEventListener('scroll', () => {

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollPercent = (scrollTop / docHeight) * 100; // Convertion -> pourcentage
});
console.log("scroll percent : " + scrollPercent);


const addAnimationScript = (start, end, func) => {
    animationScripts.push({ start, end, func });
};



const playScrollAnimations = () => {
    animationScripts.forEach((animation) => {
        if (scrollPercent >= animation.start && scrollPercent <= animation.end) {
            animation.func();
        }
    });
};

export {playScrollAnimations, addAnimationScript, scrollPercent};