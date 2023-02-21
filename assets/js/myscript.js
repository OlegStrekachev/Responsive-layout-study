'use strict'

// Sticky header

window.addEventListener("scroll", navbarScroll);

function navbarScroll() {

    const inventoryHeader =  document.querySelector('.inventory-header');
    const placeholderHeight = inventoryHeader.getBoundingClientRect().height;
    const navBar = document.querySelector('#section-1-navbar');
    const inventoryTitle = document.querySelector('.inventory-title');
    
    if (window.innerWidth >= 900) {
        if ( !inventoryHeader.classList.contains('fixed')  && inventoryHeader.getBoundingClientRect().top <= 0) {
            navBar.insertAdjacentHTML('beforeend', `<div class = "onScrollPlaceholder"></div>`);
            document.querySelector('.onScrollPlaceholder').style.height = `${placeholderHeight}px`;
            document.querySelector('.onScrollPlaceholder').style.width = `100%`;
            inventoryHeader.classList.add('fixed');
        } else if (inventoryHeader.classList.contains('fixed') &&  document.querySelector('.navbar-container').getBoundingClientRect().bottom > 0)  {
            inventoryHeader.classList.remove('fixed');
            document.querySelector('.onScrollPlaceholder').remove();
        }
    }
    else if (window.innerWidth < 900) {
         if (!inventoryHeader.classList.contains('fixed') &&  inventoryTitle.getBoundingClientRect().bottom <= 0) { 
            navBar.insertAdjacentHTML('beforeend', `<div class = "onScrollPlaceholder"></div>`);
            document.querySelector('.onScrollPlaceholder').style.height = `${placeholderHeight}px`;
            document.querySelector('.onScrollPlaceholder').style.width = `100%`;
            inventoryHeader.classList.add('fixed');
            inventoryHeader.style.top = `-${inventoryTitle.getBoundingClientRect().height}px`;
        }  else if (inventoryHeader.classList.contains('fixed') &&  document.querySelector('.onScrollPlaceholder').getBoundingClientRect().bottom - document.querySelector('.small-screen-table').getBoundingClientRect().height > 0) {
            inventoryHeader.style.top = '0';
            inventoryHeader.classList.remove('fixed');
            document.querySelector('.onScrollPlaceholder').remove();
        }  
    }
}



// Global viewport - right positioned sidebar menu.

let globalModalMenu = 'closed'

function globalOverlayToggle() {

    if ( document.querySelector('.overlay-filter').style.opacity != 1)
        {document.querySelector('.overlay-filter').style.opacity = 1;
        document.querySelector('.overlay-filter').style.pointerEvents = 'inherit'}
    else {
        document.querySelector('.overlay-filter').style.opacity = '0'
        document.querySelector('.overlay-filter').style.pointerEvents = 'none'
    }
}

function tooggleModalMenu() {
    if (globalModalMenu == 'closed') {
        globalOverlayToggle()
        document.body.style.overflow = 'hidden';
        document.querySelector('.global-menu').style.opacity = 1;
        document.querySelector('.global-menu').style.transform = 'translateX(0)'
        globalModalMenu = 'open';
    } else {
        globalOverlayToggle()
   
        document.body.style.overflow = 'auto';
        document.querySelector('.global-menu').style.transform = 'translateX(100%)'
        document.querySelector('.global-menu').style.opacity = '0';
        document.querySelector('.overlay-filter').style.opacity = '0'
        document.querySelector('.overlay-filter').style.pointerEvents = 'none';
        globalModalMenu = 'closed';
        console.log(globalModalMenu)
    }
}

document.querySelector('.navbar-menu.right li:nth-child(3) a').addEventListener('click', function(e) {
    e.preventDefault();
    tooggleModalMenu() 
})
document.querySelector('.global-menu-header button').addEventListener('click', function(e) {
    tooggleModalMenu() 
})
document.querySelector('.overlay-filter').addEventListener('click',  function(e) {
    console.log('click')
    if (globalModalMenu != 'closed') {
        tooggleModalMenu()
    }
    if (document.querySelector('.sm-screen-filter-modal') != null) {
        document.querySelector('.sm-screen-filter-modal').remove();
        globalOverlayToggle()
    }
})
// Menu links highlight on hover function
//  c - container, i - item. Works with lists where container - ul

function highlightBox (c, i) {
    const statements = {
        navbarCondition: function() {
            if (document.querySelector('.menu-highlighter') == null && globalModalMenu == 'closed') 
            {statements.container.insertAdjacentHTML('afterbegin', `<div class="menu-highlighter"></div>`);
            statements.highlighter = document.querySelector('.menu-highlighter')
            }
        },
        globalMenuCondition: function() {
            if (globalModalMenu == 'open' && document.querySelector('.menu-highlighter') == null) {
                statements.container.insertAdjacentHTML('afterbegin', `<div class="menu-highlighter"></div>`);
                statements.highlighter = document.querySelector('.menu-highlighter')
            }
        },
        highlighter: "",
        container: document.querySelector(c),
        items: document.querySelectorAll(i),
    }
    statements.items.forEach( i => {
        i.addEventListener('mouseenter', function(e) {
            if (globalModalMenu == 'closed') { 
                statements.navbarCondition();
                } else { 
                statements.globalMenuCondition()
            };
    // A crutch 
            setTimeout(() => {statements.highlighter.style.transition = 'top 0.15s, left 0.15s, height 0.15s, width 0.15s, opacity 0.3s'}, 300);
            setTimeout(() => {statements.highlighter.style.opacity = '100%'}, 1);

            const l = i.getBoundingClientRect().left;
            const t = i.getBoundingClientRect().top;
            const w = i.getBoundingClientRect().width;
            const h = i.getBoundingClientRect().height;
            statements.highlighter.style.top = `${t - statements.container.getBoundingClientRect().top}px`;
            statements.highlighter.style.left  = `${l - statements.container.getBoundingClientRect().left}px`
            statements.highlighter.style.width = `${w}px`
            statements.highlighter.style.height = `${h}px`   
        })
    })
    statements.container.addEventListener('mouseleave', function(e) {
        if ( document.querySelector('.menu-highlighter') != null) {
            document.querySelector('.menu-highlighter').remove();
        }
    })
}

highlightBox('.navbar-container', '.navbar-menu.center .navbar-links, .navbar-menu.right .navbar-links')

highlightBox ('.global-menu-content', '.global-menu-content li')

// filter modal on small screens

// Constructor function on a button "filter click"

document.querySelector('.filter-menu').addEventListener('click', function() {
    console.log('clicked')
    document.body.style.overflow = 'hidden';
    document.querySelector('.overlay-filter').style.opacity = 1;
    document.querySelector('.overlay-filter').style.pointerEvents = 'inherit';
    insertHtmlBlock();

    document.querySelector('.sm-screen-filter-modal button').addEventListener('click', function() {
        document.querySelector('.sm-screen-filter-modal').remove();
        globalOverlayToggle();
    })
    document.querySelector('.sm-screen-filter-modal .inventory-sidebar').style.display = "block";
})
function insertHtmlBlock() {
    const smallFilterModalHtml = String.raw`<div class="sm-screen-filter-modal"> ${document.querySelector('.inventory-sidebar').outerHTML}</div>`;
    document.querySelector('.overlay-filter').insertAdjacentHTML('afterend', smallFilterModalHtml);

    const closeButton = document.querySelector('.global-menu-header button').outerHTML;

    document.querySelector('.sm-screen-filter-modal .inventory-sidebar').insertAdjacentHTML
    ('afterbegin', `<div class = 'close-button-container'> </div>`);

    document.querySelector('.close-button-container').insertAdjacentHTML('afterbegin', '<h5>Filter</h5>')
    document.querySelector('.close-button-container').insertAdjacentHTML('beforeend', closeButton)
};

// // Inventory view options switch List / Grid

document.querySelector('.view-options .view-list').addEventListener('click', function() {

        switchToListLayout();
        this.parentElement.querySelectorAll('g').forEach(g => {
            g.classList.remove('active');
        })
        this.querySelector('g').classList.add('active')

})

document.querySelector('.view-options .view-grid').addEventListener('click', function() {

        switchToGridLayout();
        this.parentElement.querySelectorAll('g').forEach(g => {
            g.classList.remove('active');
        })
        this.querySelector('g').classList.add('active');  
})

const layoutSwitch = {
    cards: document.querySelectorAll('.card-wrapper'),
    grid: document.querySelector('.inventory-content-grid'),
}

function switchToListLayout() {

    document.querySelectorAll('.inventory-card').forEach((item) => {
        item.classList.add('list');
    })
    
    layoutSwitch.grid.classList.add('active');

    layoutSwitch.cards.forEach((card) => {

        card.querySelector('.details-wrapper').style.display = 'none';
        card.querySelector('.details-wrapper').classList.add('list');

        function collapse() {

            card.querySelector('.details-wrapper.list').style.height = `0`;
            setTimeout(() => {card.querySelector('.details-wrapper.list').style.display = 'none'}, 300);
            setTimeout(() => {card.querySelector('.inventory-card').style.borderRadius = `var(--space-2xs)`}, 250);

        };
    
        function expand() {

            card.querySelector('.details-wrapper.list').style.display = 'flex';

            card.querySelector('.details-wrapper.list').style.height = `auto`;

            let X = card.querySelector('.details-wrapper.list').getBoundingClientRect().height;
            console.log(X)

            card.querySelector('.details-wrapper.list').style.height = `0`;

            card.querySelector('.details-wrapper.list').style.borderRadius = `0 0 var(--space-2xs) var(--space-2xs)`;

            card.querySelector('.inventory-card').style.borderRadius = `var(--space-2xs) var(--space-2xs) 0 0`

            setTimeout(() => { card.querySelector('.details-wrapper.list').style.height = `${X}px`}, 0);

        };

        // Dynamic expand button creation when list layout

        if (card.querySelector('.card-expand') == null) {
            card.querySelector('.inventory-price-wrap').insertAdjacentHTML('beforeend', `<div class = 'card-expand title-light'> Show details </div>`)  
        } 

        // Assigning to expand button on click expand/collapse card functionality

        card.querySelector('.card-expand').addEventListener('click', function() {
       
            if (!card.querySelector('.card-expand').classList.contains('active')) {
                card.querySelector('.card-expand').classList.add('active');
                card.querySelector('.card-expand').innerHTML = 'Close details';
                expand();
            } else {
                card.querySelector('.card-expand').classList.remove('active');
                card.querySelector('.card-expand').innerHTML = 'Show details';
                collapse();
            }
        })
    })
}


function switchToGridLayout() {

    layoutSwitch.grid.classList.remove('active');

    document.querySelectorAll('.inventory-card').forEach((item) => {
        item.classList.remove('list');
    })
    
    layoutSwitch.cards.forEach((card) => {

        card.querySelector('.details-wrapper.list').style.display = 'flex';

        if (card.querySelector('.details-wrapper').classList.contains('list')) {
            card.querySelector('.details-wrapper').classList.remove('list')
            card.querySelector('.details-wrapper').style.height = `auto`;
        }

        card.querySelector('.card-expand').remove();
       
    })
};