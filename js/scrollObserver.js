"use strict"

function onEntry(entry){
    entry.forEach(element => {
        if (element.isIntersecting){
            element.target.classList.add('_active');
        }
    });
}
let options = {
    threshold: [0.5]
};
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.anim-elem');
for (let elm of elements){
    observer.observe(elm);
}