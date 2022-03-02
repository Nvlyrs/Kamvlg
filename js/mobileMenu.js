"use strict"

const body = document.body, 
    menu = document.querySelector('.menu-trigger'),
    menuMobile = document.querySelector('.menu-mobile'),
    menuMobileList = document.querySelectorAll('.menu-mobile__link');

if (menu){
    menu.addEventListener('click',()=>{
        menu.classList.toggle('_active');
        menuMobile.classList.toggle('_active');
        body.classList.toggle('_menu-open');
    });
}

menuMobileList.forEach((el)=>{
    el.addEventListener('click',()=>{
        menu.classList.toggle('_active');
        menuMobile.classList.remove('_active');
        body.classList.toggle('_menu-open');
    });
});



  