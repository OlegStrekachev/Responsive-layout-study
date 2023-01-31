'use strict'

const globalMenuSelector =document.querySelector('.navbar-menu.right li:nth-child(3) a');
const globalMenuClose = document.querySelector('.global-menu-header svg');
const globalMenuCloseOverlayClick = document.querySelector('.overlay-filter');
const globalMenuBody = document.querySelector('.global-menu');

let  globalModalMenu = 'closed'

function tooggleModalMenu() {
    if (globalModalMenu == 'closed') {
        globalMenuBody.style.transform = 'translateX(0)';
        globalMenuBody.style.opacity = '100';
        globalMenuCloseOverlayClick.style.opacity = '100%';
        globalMenuCloseOverlayClick.style.pointerEvents = 'inherit';
        globalModalMenu = 'open';
    } else {
        globalMenuBody.style.transform = 'translateX(100%)'
        globalMenuBody.style.opacity = '0';
        globalMenuCloseOverlayClick.style.opacity = '0'
        globalMenuCloseOverlayClick.style.pointerEvents = 'none';
        globalModalMenu = 'closed';
    }
}

globalMenuSelector.addEventListener('click', function(e) {
    e.preventDefault();
    tooggleModalMenu() 
})

globalMenuClose.addEventListener('click', function(e) {
    tooggleModalMenu() 
})

globalMenuCloseOverlayClick.addEventListener('click',  function(e) {
    tooggleModalMenu() 
})


// Menu links highlight on hover

const navItemHighlighter = document.querySelector('.menu-item-highlight')
const navBarItems = document.querySelectorAll('.navbar-menu.center .navbar-links, .navbar-menu.right .navbar-links')
const navBarContainer = document.querySelector('.navbar-container')
const navMenuContainer = document.querySelector('.navbar-menu')



// navBarItems.forEach( i => {
//     i.addEventListener('mouseenter', function (e) {

//         navItemHighlighter.style.opacity = "100"

//         setTimeout(() => {navItemHighlighter.style.transition = 'top 0.3s, left 0.3s, height 0.3s, width 0.3s, opacity 0.3s'}, 300)

//         const l = i.getBoundingClientRect().left;
//         const t = i.getBoundingClientRect().top;
//         const w = i.getBoundingClientRect().width;
//         const h = i.getBoundingClientRect().height;

//         navItemHighlighter.style.left = `${l}px`
//         navItemHighlighter.style.top = `${t}px`
//         navItemHighlighter.style.width = `${w}px`
//         navItemHighlighter.style.height = `${h}px`
//     })
// } )

// navBarContainer.addEventListener('mouseleave', function (e) {
//         navItemHighlighter.style.opacity = "0"
//         navItemHighlighter.style.transition = 'opacity 0.3s'
// })


// co - container, it - item, hi - highlighter

function highlightBox (co, it, hi) {
    const container = document.querySelector(co);
    const items = document.querySelectorAll(it);
    const highlighter = document.querySelector(hi);

    console.log(items)

    container.addEventListener('mouseleave', function (e) {
        console.log(`leave`)
        highlighter.style.opacity = "0"
        highlighter.style.transition = 'opacity 0.3s'
    })


    items.forEach( i => {

    
        i.addEventListener('mouseenter', function (e) {

            highlighter.style.opacity = "100"

            setTimeout(() => {highlighter.style.transition = 'top 0.3s, left 0.3s, height 0.3s, width 0.3s, opacity 0.3s'}, 300)

            const l = i.getBoundingClientRect().left;
            const t = i.getBoundingClientRect().top;
            const w = i.getBoundingClientRect().width;
            const h = i.getBoundingClientRect().height;

            highlighter.style.left = `${l}px`
            highlighter.style.top = `${t}px`
            highlighter.style.width = `${w}px`
            highlighter.style.height = `${h}px`
        })
    })

}

highlightBox('.navbar-container', '.navbar-menu.center .navbar-links, .navbar-menu.right .navbar-links', '.menu-item-highlight')


highlightBox('.global-menu-content', '.global-menu-content li', '.menu-item-highlight')

// filter modal on small screens

// Constructor function on a button "filter click"


const modalHtml = document.querySelector('.inventory-sidebar').innerHTML

const ovrlayFilter = document.querySelector('.overlay-filter')

const filterButton = document.querySelector('.dropdown-menu-wrapper .filter-menu')
console.log(filterButton)

filterButton.addEventListener('click', function() {
    const globalMenuCloseOverlayClick = document.querySelector('.overlay-filter');
    globalMenuCloseOverlayClick.style.opacity = '100%'
    document.body.style.overflow = "hidden";
})

