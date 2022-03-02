"use strict"

const smoothLinks = document.querySelectorAll('a[href^="#"]');
const topOffsetNode = document.querySelector('.fixed-header');
window.addEventListener('scroll',()=>{
    if(scrollY > 100){
        topOffsetNode.classList.add("_active")
    } else{
        topOffsetNode.classList.remove("_active")
    }
});
smoothLinks.forEach((smoothLink)=>{
    smoothLink.addEventListener('click', function(e){
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        let topOffset;

        const scrollTarget = document.getElementById(href);

        if(topOffsetNode){
            topOffset = topOffsetNode.offsetHeight;
        } else{
            topOffset = -1;
        }

        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
        });
    });
});