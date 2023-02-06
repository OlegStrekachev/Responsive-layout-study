'use strict'

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
            // if (document.querySelector('.experiment') != null) {
            //     document.querySelector('.experiment').remove()
            // }        
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
    // Why it is working only this way???????
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

        // statements.highlighter.style.opacity = "0"

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
    cards: document.querySelectorAll('.inventory-card'),
    grid: document.querySelector('.inventory-content-grid'),
    cardDescription: document.querySelector('.inventory-description'),
}

function switchToListLayout() {

    layoutSwitch.grid.classList.add('active');

    layoutSwitch.cards.forEach((card, index) => {
        const verticalGridGap = layoutSwitch.cardDescription.getBoundingClientRect().top - card.getBoundingClientRect().top ;

        card.querySelector('.car-images').classList.add('active');

        card.querySelector('.features').classList.add('active');

        card.querySelectorAll('.stats').forEach(i => {
            i.classList.add('active');
        })





        let expandStatus;

        collapse();



        function expand() {
            card.style.height = `${card.querySelector('.features').getBoundingClientRect().bottom - card.getBoundingClientRect().top + verticalGridGap}px `
            expandStatus = 'expanded'
        };

        function collapse() {
            card.style.height = `${(layoutSwitch.cardDescription.getBoundingClientRect().bottom - card.getBoundingClientRect().top) + verticalGridGap}px`;

            expandStatus = 'collapsed';
        };

        if (card.querySelector('.card-expand') == null) {
            card.querySelector('.inventory-price-wrap').insertAdjacentHTML('beforeend', `<div class = 'card-expand title-light'> Show details </div>`)  
        } 

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
    
    document.querySelectorAll('.stats').forEach(i => {
        i.classList.remove('active');
    })





    layoutSwitch.cards.forEach((card, index) => {

        card.querySelector('.car-images').classList.remove('active');

        card.querySelector('.features').classList.remove('active');

        card.querySelector('.card-expand').remove();

        card.style.height = 'auto';
    })
}


window.addEventListener('resize', function() {

    if (this.window.innerWidth < 1099) {
        
        document.querySelectorAll('.stats').forEach(i => {
            i.classList.remove('active');
        })
        
        layoutSwitch.cards.forEach((card, index) => {
    
            card.querySelector('.car-images').classList.remove('active');
    
            card.querySelector('.features').classList.remove('active');
    
            card.style.height = 'auto';
        })
    } else { 
        switchToListLayout()




    }


})



// const targetButton = document.querySelector('.view-list g');

// let options = {
//     attributes: true,
//     attributeFilter: ['class'],
// };

// const observer = new MutationObserver(activeDetect);

// function activeDetect (mutations) {
//     mutations.forEach(mutation => {
//         if (mutation.target.classList.contains('active')) {switchToListLayout()}
//     }) 
// }
// observer.observe(targetButton, options);
