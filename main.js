const toggleButtons = document.querySelectorAll('nav.container .toggle');
const sections = document.querySelectorAll('[data-nav]');
const buttonToSections = document.querySelectorAll('[data-btn-nav]');

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

   const allTagsA = navContainer.querySelectorAll('a');

   for(const tagA of allTagsA) {
      tagA.classList.remove('active');
   }

   navItem.classList.add('active');

   document.getElementById(divId).scrollIntoView({ behavior: 'smooth' });
});

//Carousel - Swiper
document.addEventListener('DOMContentLoaded',swiperInDesktop);

window.addEventListener('resize', function(event) {
   if(window.innerWidth > 1200) {
      swiperInDesktop();
   } else {
      new Swiper('.swiper-container', {
         slidesPerView: 1,
         pagination: {
            el: '.swiper-pagination'
         },
         mousewheel: true,
         keyboard: true
       });
   }
});

function swiperInDesktop() {
   new Swiper('.swiper-container', {
      slidesPerView: 2,
      pagination: {
         el: '.swiper-pagination'
      },
      mousewheel: true,
      keyboard: true
    });
}

//scrollReveal - Scroll Animado 
const scrollReveal = ScrollReveal({
   origin: 'top',
   distance: '30px',
   duration: 700,
   reset: false
});

scrollReveal.reveal(
   `#home .text, #home .image, 
   #about .image, #about .text,
   #services header, #services .card,
   #testimonials header, #testimonials .testimonials,
   #contact .text, #contact .links,
   footer.section
   `, 
   { interval: 100 }
);

//button-up
const buttonUp = document.querySelector('.btn-up');


window.addEventListener('scroll', function(event) {
   controllButtonUp();
   controlPositionUser();
});

function goToTop(event) {
   event.preventDefault();
   const id = this.getAttribute('data-go');
   document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function controllButtonUp() {
   const top = window.pageYOffset;
   if(top > 700) {
      buttonUp.classList.add('show');
      buttonUp.addEventListener('click', goToTop);
   } else {
      buttonUp.removeEventListener('click', goToTop);
      buttonUp.classList.remove('show');
   }
}

function controlPositionUser() {
   const headerHeight = document.querySelector('.header nav').clientHeight;
   const scrollTop = document.documentElement.scrollTop + headerHeight;
   
   Array.from(sections).forEach(currentSection => {
      const isContact = currentSection.getAttribute('data-nav') === 'contact';
      const sectionTop = isContact ? currentSection.offsetTop - 200 : currentSection.offsetTop;

      if(scrollTop >= sectionTop) {

         const navId = currentSection.getAttribute('data-nav');
         
         Array.from(buttonToSections).forEach(btn => btn.classList.remove('active'));
         document.querySelector(`[data-btn-nav="${navId}"]`).classList.add('active');
      } else if(scrollTop < sectionTop){
         const navId = currentSection.getAttribute('data-nav');
         document.querySelector(`[data-btn-nav="${navId}"]`).classList.remove('active');
      }
   });
}