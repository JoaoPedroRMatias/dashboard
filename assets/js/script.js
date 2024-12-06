const linkTexts = {
    home: "Welcome to my portfolio!",
    projects: "Veja meus projetos!",
    contact: "Aqui estão minhas informações de contato:"
};

const navLinks = document.querySelectorAll('.nav-menu li a');
const infoText = document.querySelector('.info-text');

function resetLinks() {
    navLinks.forEach(link => {
        if (link.getAttribute('data-original')) {
            link.textContent = link.getAttribute('data-original');
        }
        link.classList.remove('selected');
    });
    infoText.textContent = '';
}

window.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.querySelector('[data-link="home"]');
    homeLink.setAttribute('data-original', homeLink.textContent);
    homeLink.textContent = '●';
    homeLink.classList.add('selected');
    infoText.textContent = linkTexts.home;
});

navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        resetLinks();
        link.setAttribute('data-original', link.textContent);
        link.textContent = '●';
        link.classList.add('selected');
        const key = link.getAttribute('data-link');
        infoText.textContent = linkTexts[key] || '';

        if (key === "projects") {
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const projects = data.projects;
                    let projectList = '<ul>';
                    projects.forEach(project => {
                        projectList += `<li><a href="${project.link}" target="_blank">${project.title}</a>: ${project.description}</li>`;
                    });
                    projectList += '</ul>';
                    infoText.innerHTML = projectList;
                })
                .catch(error => {
                    console.error('Erro ao carregar os projetos:', error);
                    infoText.textContent = "Erro ao carregar os projetos.";
                });
        }

        if (key === "contact") {
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    const contacts = data.contacts;
                    let contactList = '<ul>';
                    contacts.forEach(contact => {
                        contactList += `<li><a href="${contact.link}" target="_blank">${contact.title}</a></li>`;
                    });
                    contactList += '</ul>';
                    infoText.innerHTML = contactList;
                })
                .catch(error => {
                    console.error('Erro ao carregar os contatos:', error);
                    infoText.textContent = "Erro ao carregar as informações de contato.";
                });
        }
    });
});
