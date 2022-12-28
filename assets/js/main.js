/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50 ) header.classList.add('scroll-header') 
                       else  header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


// ================Onboard====================
// function updateRpm(value) {
//     document.querySelector('#revmeter .gauge').style.setProperty('--rpm', value);
// }

// function updateKmh(value) {
//     document.querySelector('#speedmeter .gauge').style.setProperty('--kmh', Math.round(value));
// }
// /* Binding functions for manual control of CSS prips from inputs */
// const rpmControl = document.querySelector('input[name=rpm]');
// // const rpmControl = 3000;
// rpmControl.addEventListener('keyup', function () {
//     updateRpm(this.value);
// });
// rpmControl.addEventListener('input', function () {
//     updateRpm(this.value);
// });


// const kmhControl = document.querySelector('input[name=kmh]');
// const kmhControl = 50;
// kmhControl.addEventListener('keyup', function () {
    // updateKmh(this.value);
// });
// kmhControl.addEventListener('input', function () {
    // updateKmh(this.value);
// });
// function speedDown() {
//     if (speed > 0) {
//         speed = Math.max(speed - 1, 0);
//     }
// }
// const to = setInterval(() => {
//     updateKmh(0);
//     updateRpm(0);

// }, 30000);

/*=============== POPULAR SWIPER ===============*/

let swiper = new Swiper(".popular__container", {
    loop:true,
    spaceBetween:24,
    slidesPerView:'auto',
    grabCursor:true,

    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
       
        768: {
          slidesPerView: 3,
        },
        1024: {
          spaceBetween: 48,
        },
    },
});
// =================POPUP===============

  function openPop() {
   var myWind = window.open("./popup.html", "subWindow", "HEIGHT=600, WIDTH=800, left=500, top=200, align-self='center")
  }
                              
// ==================Graph===============

/*=============== MIXITUP FILTER FEATURED ===============*/


/* Link active featured */ 


/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr=ScrollReveal({
    origin:'top',
    distance:'60px',
    duration:2500,
    delay:400,
})
sr.reveal(`.home__title`)
sr.reveal(`.home__subtitle`,{delay:500})
sr.reveal(`.home__elec`,{delay:600})
sr.reveal(`.home__img`,{delay:800})
sr.reveal(`.home__car-data`,{delay:900, interval:100,origin:'bottom'})
sr.reveal(`.home__button`,{delay:1000,origin:'bottom'})
sr.reveal(`.about__group`,{origin:'left'})
sr.reveal(`.steerdata__card`,{origin:'right'})
sr.reveal(`.about__data`,{origin:'right'})
sr.reveal(`.onboard__card`,{origin:'top',delay:300})

sr.reveal(`.features__map`,{delay:600,origin:'bottom'})
sr.reveal(`.features__card`,{interval:300})
sr.reveal(`.featured__card`,{interval:100})

// =====================Odometer====================
var clock = new Vue({
  el: '#clock',
  data: {
      time: '',
      date: ''
  }
});

//var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var timerID = setInterval(updateTime);
updateTime();
function updateTime() {
  var cd = new Date();
  clock.time = 00031;
  //clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

function zeroPadding(num, digit) {
  var zero = '';
  for(var i = 0; i < digit; i++) {
      zero += '0';
  }
  return (zero + num).slice(-digit);
}

