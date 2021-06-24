const toggleButtons = document.querySelectorAll('nav.container .toggle');

for(const button of toggleButtons) {
   button.addEventListener('click', handleOpenOrClose);
}

function handleOpenOrClose(event) {
   const menuContainer = event.target.closest('nav.container');
   if(!menuContainer) return;
   menuContainer.classList.toggle('show');

   const contains = menuContainer.classList.contains('show');
   const menu = menuContainer.querySelector('.menu');

   menu.setAttribute('aria-expanded', contains);
}

//Navigations 
const navContainer = document.querySelector('nav.container');

navContainer.addEventListener('click', function(event) {
   event.preventDefault();

   const navItem = event.target.closest('.nav-items a');

   if(!navItem) return;

   this.classList.remove('show');

   const divId = navItem.getAttribute('href').replace('#', '');

   document.getElementById(divId).scrollIntoView({ behavior: 'smooth' });
});

//Carousel - Swiper
const swiper = new Swiper('.swiper-container', {
   slidesPerView: 1,
   pagination: {
      el: '.swiper-pagination'
   },
   mousewheel: true,
   keyboard: true
 });

//scrollReveal - Scroll Animado 
const scrollReveal = ScrollReveal({
   origin: 'top',
   distance: '30px',
   duration: 700,
   reset: true
});

scrollReveal.reveal(
   `#home .text, #home .image, 
   #about .image, #about .text,
   #services header, #services .card,
   #testimonials header, #testimonials .testimonials,
   #contact .text, #contact .links
   `, 
   { interval: 100 }
);

//button-up
const buttonUp = document.querySelector('.btn-up');


window.addEventListener('scroll', function(event) {
   const top = window.pageYOffset;

   if(top > 700) {
      buttonUp.classList.add('show');
      buttonUp.addEventListener('click', goToTop);
   } else {
      buttonUp.removeEventListener('click', goToTop);
      buttonUp.classList.remove('show');
   }
});

function goToTop(event) {
   event.preventDefault();
   const id = this.getAttribute('data-go');
   document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}