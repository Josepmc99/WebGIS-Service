// Header toggle

let MenuBtn = document.getElementById('MenuBtn')

MenuBtn.addEventListener('click', function(e){
    document.querySelector('body').classList.toggle('mobile-nav-active');
    this.classList.toggle ('fa-xmark')
})


// Typing Effect

let typed =new Typed('.auto-input', {
    strings: ['Geografo!', 'Front-End Developer!', 'Freelancer!'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 200,
    loop: true,
})

// Active Link State

// Get All Link
let navLink = document.querySelectorAll('nav ul li a')

// Get All Sections
let sections = document.querySelectorAll('section')

window.addEventListener('scroll', function(){
    const scrollPos = window.scrillY + 20
    sections.forEach(sectuib => {
        if(scrollPos > sections.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
            navLinks.forEach(link => {
                link.classList.remove ('active');
                if(section.getAttreibute('id') === link.getAttribute('href').substring(1)) {
                    link.classList.add('active')
                }
            });
        }
    })
});