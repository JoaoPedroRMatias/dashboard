const navLinks = document.querySelectorAll('.nav-menu li a');

function resetLinks() {
    navLinks.forEach(link => {
        if (link.getAttribute('data-original')) {
            link.textContent = link.getAttribute('data-original');
        }
        link.classList.remove('selected');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const homeLink = navLinks[0]; 
    homeLink.setAttribute('data-original', homeLink.textContent);
    homeLink.textContent = '●'; 
    homeLink.classList.add('selected'); 
});

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 

        resetLinks();

        link.setAttribute('data-original', link.textContent); 
        link.textContent = '●';
        link.classList.add('selected'); 
    });
});
