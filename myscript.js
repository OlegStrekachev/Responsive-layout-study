'use strict'

const globalMenuSelector =document.querySelector('.navbar-menu.right li:nth-child(3) a');
const globalMenuClose = document.querySelector('.global-menu-header button');
const globalMenuCloseOverlayClick = document.querySelector('.overlay-filter');
const globalMenuBody = document.querySelector('.global-menu');

let  globalModalMenu = 'closed'

function tooggleModalMenu() {
    if (globalModalMenu == 'closed') {
        globalMenuBody.style.transform = 'translateX(0)';
        globalMenuBody.style.opacity = '100';
        // globalMenuCloseOverlayClick.style.opacity = '100%';
        // globalMenuCloseOverlayClick.style.pointerEvents = 'inherit';
        globalModalMenu = 'open';
    } else {

        if ( document.querySelector('.experiment')!= null) {
            document.querySelector('.experiment').remove()
        }
        
        globalMenuBody.style.transform = 'translateX(100%)'
        globalMenuBody.style.opacity = '0';
        // globalMenuCloseOverlayClick.style.opacity = '0'
        // globalMenuCloseOverlayClick.style.pointerEvents = 'none';
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
    if (window.innerWidth > 900 ) {tooggleModalMenu() }
})


// Menu links highlight on hover function
//  co - container, it - item. Works with lists where container - ul


function highlightBox (co, it) {
    const statements = {
        navbarCondition: function() {
            if (document.querySelector('.experiment') == null) 
            {container.insertAdjacentHTML('afterbegin', `<div class="experiment"></div>`)}
        },
        globalMenuCondition: function() {
            {if (globalModalMenu == 'open' && document.querySelector('.experiment') == null) {
               container.insertAdjacentHTML('afterbegin', `<div class="experiment"></div>`)
            }}
        },
    }
    const container = document.querySelector(co);
    const items = document.querySelectorAll(it);

    container.addEventListener('mouseleave', function(e) {
        if ( document.querySelector('.experiment') != null) {
            document.querySelector('.experiment').remove();
        }
        // highlighter.style.opacity = "0"
        // highlighter.style.transition = 'opacity 0.3s'
    })
    items.forEach( i => {
        i.addEventListener('mouseenter', function(e) {
   
            if (globalModalMenu == 'closed') { 
                statements.navbarCondition();
                } else { 
                statements.globalMenuCondition()
            };
            const experiment = document.querySelector('.experiment')
            // setTimeout(() => {highlighter.style.transition = 'top 0.3s, left 0.3s, height 0.3s, width 0.3s, opacity 0.3s'}, 300)
            const l = i.getBoundingClientRect().left;
            const t = i.getBoundingClientRect().top;
            const w = i.getBoundingClientRect().width;
            const h = i.getBoundingClientRect().height;
            experiment.style.top = `${t}px`;
            experiment.style.left  = `${l - container.getBoundingClientRect().left}px`
            experiment.style.width = `${w}px`
            experiment.style.height = `${h}px`   
        })
    })
}

highlightBox('.navbar-container', '.navbar-menu.center .navbar-links, .navbar-menu.right .navbar-links')

highlightBox ('.global-menu-content', '.global-menu-content li')







// filter modal on small screens

// Constructor function on a button "filter click"

// filterButton.addEventListener('click', function() {
//     const globalMenuCloseOverlayClick = document.querySelector('.overlay-filter');
//     globalMenuCloseOverlayClick.style.opacity = '100%'
//     document.body.style.overflow = "hidden";

//     //for development
//     smallOverlayModal.style.display = 'block';
//     overlayContent.style.display = 'block';
// })

const filterButton = document.querySelector('.dropdown-menu-wrapper .filter-menu')
let smallFilterMenu = 'closed';

        let modalHtml = document.querySelector('.inventory-sidebar').innerHTML

        let ovrlayFilter 
        let smallFilterCloseButton 
        let smallOverlayModal 
        let overlayContent 


function tooggleSmallFilterMenu() {
   
    if (smallFilterMenu == 'closed') {

        insertHtmlBlock()

   
        ovrlayFilter = document.querySelector('.overlay-filter')
        
        smallFilterCloseButton = document.querySelector('.sm-filter-overlay button')
        smallOverlayModal = document.querySelector('.sm-filter-overlay')
        overlayContent = document.querySelector('.sm-filter-overlay .inventory-sidebar')
       
        document.body.style.overflow = "hidden";
        globalMenuCloseOverlayClick.style.opacity = '100%';
        globalMenuCloseOverlayClick.style.pointerEvents = 'inherit';
       

        smallOverlayModal.style.display = 'block';
        overlayContent.style.display = 'block';

        smallFilterMenu = 'open';

        smallFilterCloseButton.addEventListener('click', function() {
            console.log('clock')
            tooggleSmallFilterMenu()
            
        })
     

    } else if (smallFilterMenu == 'open')  {
        document.body.style.overflow = "auto";
        globalMenuCloseOverlayClick.style.opacity = '0'
        globalMenuCloseOverlayClick.style.pointerEvents = 'none';
   

        smallOverlayModal.style.display = 'none';
        overlayContent.style.display = 'none';

        smallFilterMenu = 'closed';

        smallOverlayModal.remove()
       
    }
}

globalMenuCloseOverlayClick.addEventListener('click', function(e) {
    tooggleSmallFilterMenu() 
})


filterButton.addEventListener('click', function() {
   
    tooggleSmallFilterMenu()
})


function insertHtmlBlock() {
    const smallFilterModalHtml = String.raw`<div class="sm-filter-overlay">
<div class="inventory-sidebar">
    <div class="close-button-container">
   
        <button>
            <svg  viewBox="0 0 24 24" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg"><path d="M18.53 17.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.748.748 0 0 1-1.06 0 .75.75 0 0 1 0-1.06L10.94 12 5.47 6.53a.75.75 0 1 1 1.06-1.06L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47z" fill="#000000"></path></svg>
        </button>
    </div>
    <div class="inventory-sidebar-grid">
        <div class="filter filter-by-zipcode">
            <div class="label-filter filter-by-zipcode">
                <div class="title-medium">Registration Zip Code</div>
                <div class="paragraph-medium">Where you will register the vehicle</div>
            </div>
            <div class="input-filter input-default">
                <input class="title-medium" value="83714">
            </div>
        </div>
        <div class="filter filter-by-proximity">
            <div class="label-filter filter-by-proximity">
                <div class="title-medium">Search Within</div>
            </div>
            <div class="input-filter input-default">
                <input class="title-medium" value="200 miles">
            </div>
        </div>
        <div class="filter filter-by-model">
            <div class="label-filter filter-by-model title-medium">
                Models
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Model S</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Model 3</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Model X</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Model Y</div>
            </div>
        </div>
        <div class="filter filter-by-type">
            <div class="label-filter filter-by-type">
                <div class="title-medium">Inventory type</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">New</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Used</div>
            </div>
        </div>
        <div class="filter filter-by-trim">
            <div class="label-filter filter-by-trim">
                <div class="title-medium">Trim</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Performance All-Wheel Drive</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Long Range All-Wheel Drive</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Model 3 Rear-Wheel Drive</div>
            </div>
        </div>
        <div class="filter filter-by-paint">
            <div class="label-filter filter-by-type">
                <div class="title-medium">Exterior paint</div>
            </div>
            <div class="radio-input-container">
                <img src="img\ext_paint\ExtWhite@3x.webp" alt="">
                <img src="img\ext_paint\ExtBlack@3x.webp" alt="">
                <img src="img\ext_paint\ExtBlue@3x.avif" alt="">
                <img src="img\ext_paint\ExtRed@3x.avif" alt="">
                <img src="img\ext_paint\ExtGrey@3x.avif" alt="">
            </div>
        </div>
        <div class="filter filter-by-paint">
            <div class="label-filter filter-by-type">
                <div class="title-medium">Interior color</div>
            </div>
            <div class="radio-input-container">
                <img src="img\ext_paint\ExtBlack@3x.webp" alt="">
                <img src="img\ext_paint\ExtWhite@3x.webp" alt="">
            </div>
        </div>
        <div class="filter filter-by-wheels">
            <div class="label-filter filter-by-trim">
                <div class="title-medium">Wheels</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">18" Wheels</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">19" Wheels</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">20" Wheels</div>
            </div>
        </div>
        <div class="filter filter-by-trim">
            <div class="label-filter filter-by-trim">
                <div class="title-medium">Autopilot</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Autopilot</div>
            </div>
        </div>
        <div class="filter filter-by-trim">
            <div class="label-filter filter-by-trim">
                <div class="title-medium">Additional options</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Performance Upgrade</div>
            </div>
            <div class="radio-input-container input-radio">
                <input type="radio">
                <div class="title-light">Rear Heated Seats</div>
            </div>
        </div>
    </div>
</div>
</div>`
document.body.insertAdjacentHTML('beforeend', smallFilterModalHtml)
}

