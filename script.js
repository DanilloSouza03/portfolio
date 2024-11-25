document.addEventListener('DOMContentLoaded', () => {

    function openImageInFullscreen(src) {
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');

        const fullscreenImage = document.createElement('img');
        fullscreenImage.src = src;
        fullscreenImage.classList.add('fullscreen-image');

        overlay.appendChild(fullscreenImage);

        document.body.appendChild(overlay);

        overlay.addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
    }

    function addImageClickEvent(card) {
        const images = card.querySelectorAll('img');
        images.forEach(image => {
            image.addEventListener('click', function() {
                openImageInFullscreen(image.src);
            });
        });
    }

    function moveSlide(carousel, direction) {
        const slides = carousel.querySelectorAll('.slide');
        const totalSlides = slides.length;
        let currentSlide = parseInt(carousel.dataset.currentSlide) || 0;
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        carousel.dataset.currentSlide = currentSlide;
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function addNavigationListeners(card) {
        const prevButton = card.querySelector('.prev');
        const nextButton = card.querySelector('.next');
        const carousel = card.querySelector('.carousel');

        prevButton.addEventListener('click', () => moveSlide(carousel, -1));
        nextButton.addEventListener('click', () => moveSlide(carousel, 1));
    }

    function addProjectCard(images, title, description, cardprincipal, tags, linkGitHub, linkDeploy) {

        links = ''
        if (linkGitHub && linkDeploy) {
            links = `<a href="${linkGitHub}" class="link-github" target="_blank" rel="noopener noreferrer">Link GitHub</a> <a href="${linkDeploy}" class="link-deploy" target="_blank" rel="noopener noreferrer">Link Deploy</a>`  
        } else if (linkGitHub) {
            links = `<a href="${linkGitHub}" class="link-github" target="_blank" rel="noopener noreferrer">Link GitHub</a>`     
        } else if (linkDeploy) {
            links = `<a href="${linkDeploy}" class="link-deploy" target="_blank" rel="noopener noreferrer">Link Deploy</a>`
        }

        const projectsGrid = document.querySelector('#projects-grid');
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.dataset.cardprincipal = cardprincipal;
        card.innerHTML = `
            <div class="image-gallery">
                <div class="carousel" data-current-slide="0">
                    ${images.map(img => `<div class="slide"><img src="img/projetos/${img}" alt="project image"></div>`).join('')}
                </div>
                <button class="prev">&#10094;</button>
                <button class="next">&#10095;</button>
            </div>
            <div class="content">
                <h3>${title}</h3>
                <p>${description}</p>
                <div class="card-principal">
                    <b>${cardprincipal}</b>
                </div>
                <div class="tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="links">
                    ${links}
                </div>
            </div>
        `;
        projectsGrid.appendChild(card);
        addNavigationListeners(card);
        addImageClickEvent(card);
    }

    function addCursoCard(title, img, description, year, tags) {
        const cursosGrid = document.querySelector('#cursos-grid');
        const card = document.createElement('div');
        card.classList.add('curso-card');
        card.innerHTML = `
            <div class="content">
                <h3>${title}</h3>
                <div class="slide"><img src="img/cursos/${img}" alt="project image"></div>
                <p>${description}</p>
                <i>Concluído em ${year}</i>
                <div class="tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        cursosGrid.appendChild(card);
        addImageClickEvent(card);
    }
    
    let checkList = [];
    function addTagPesquisa(card_search) {
        if (!checkList.includes(card_search)) { 
            checkList.push(card_search);

            const divCheck = document.querySelector('#checkboxes-container');
            const labelCheck = document.createElement('label');
            labelCheck.innerHTML = `
                <input type="checkbox" value="${card_search}"> ${card_search}
            `;

            divCheck.appendChild(labelCheck); // Adiciona o label ao contêiner
        }
    }

    function filterProjects() {
        const selectedCardPrincipals = Array.from(document.querySelectorAll('#checkboxes-container input[type="checkbox"]:checked')).map(checkbox => checkbox.value);
        
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const cardPrincipal = card.dataset.cardprincipal;
            const matchesCardPrincipal = selectedCardPrincipals.length === 0 || selectedCardPrincipals.includes(cardPrincipal);

            if (matchesCardPrincipal) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    const projetos = [
        {
            images: ['Logo PayTrack.png', 'paytrack01.png', 'paytrack02.png', 'videotrackapi.gif'],
            title: 'Pay Track API',
            description: 'API desenvolvida com FastAPI para gerenciar contas. Oferece funcionalidades de CRUD (criar, atualizar, listar e deletar), manipulando dados como nome, descrição, data, valor e situação das contas.',
            cardprincipal: 'Full Stack Development',
            tags: ['Python', 'FastAPI', 'CRUD'],
            linkGitHub: 'https://github.com/DanilloSouza03/PayTrack-API'
        },
        {
            images: ['videotrackapi.gif', 'Logo PayTrack.png'],
            title: 'Pay Track Web',
            description: 'Interface web para interagir com a API Pay Track API. Desenvolvida com HTML, CSS e JavaScript, permite realizar operações de adicionar, visualizar, editar e excluir contas, proporcionando uma experiência de CRUD.',
            cardprincipal: 'Full Stack Development',
            tags: ['HTML', 'CSS', 'JavaScript', 'CRUD'],
            linkGitHub: 'https://github.com/DanilloSouza03/PayTrack-WEB'
        },
        {
            images: ['ad_ws.png', 'ad_ws1.png', 'ad_ws2.png'],
            title: 'Análise de Dados com Web Scraping',
            description: 'Projeto utilizando Python para coletar dados do site Gupy via web scraping. Os dados foram analisados e visualizados no Jupyter Notebook, destacando tendências do mercado de trabalho.',
            cardprincipal: 'Data Analysis',
            tags: ['Python', 'Web Scraping', 'Jupyter Notebook'],
            linkGitHub: 'https://github.com/DanilloSouza03/Analise-Dados-Gupy'
        },
        {
            images: ['calcfinance_image.png', 'calcfinance_image1.png', 'calcfinance_image2.png', 'calcfinance_image3.png',],
            title: 'CalcFácil Financeira',
            description: 'Desenvolvida para cálculos financeiros básicos, feita com HTML, CSS e JavaScript. Criada para facilitar a análise rápida de operações financeiras.',
            cardprincipal: 'Full Stack Development',
            tags: ['HTML', 'CSS', 'JavaScript', 'Matemática Financeira'],
            linkDeploy: 'https://danillosouza03.github.io/CalcFacil-Financeira/',
            linkGitHub: 'https://github.com/DanilloSouza03/CalcFacil-Financeira'
        },
        {
            images: ['proj_login.png', 'proj_login1.png', 'proj_login2.png', 'proj_login3.png', 'proj_login4.gif'],
            title: 'Projeto Login',
            description: 'Interface de login responsiva desenvolvida com HTML e CSS, projetada para garantir uma experiência de usuário consistente em diversos dispositivos.',
            cardprincipal: 'Frontend Development',
            tags: ['HTML', 'CSS', 'Responsividade'],
            linkGitHub: 'https://github.com/DanilloSouza03/Projeto-Login',
            linkDeploy: 'https://danillosouza03.github.io/Projeto-Login/'
        },
        {
            images: ['da_api.png', 'da_api1.png', 'da_api2.png', 'da_api3.png', 'da_api4.png'],
            title: 'Análise de Dados com API ViaCEP',
            description: 'Projeto de análise de dados combinando informações da API pública ViaCEP com dados demográficos do IBGE. Utiliza Python, Jupyter Notebook, e Power BI para automação, extração, tratamento e visualização dos dados, aplicando técnicas de ETL (Extração, Transformação e Carga).',
            cardprincipal: 'Data Analysis',
            tags: ['Python', 'API', 'Jupyter Notebook', 'Power BI', 'ETL'],
            linkGitHub: 'https://github.com/DanilloSouza03/Analise-Dados-API-ViaCep'
        },
        {
            images: ['ea_bd.png', 'ea_bd1.png', 'ea_bd2.png', 'ea_bd3.png', 'ea_bd4.gif'],
            title: 'Ecommerce API',
            description: 'API RESTful desenvolvida com Flask. Inclui gerenciamento de usuários, produtos e carrinhos de compras, além de autenticação de usuários e funcionalidade de checkout. Banco de dados em SQLite e testes com Postman.',
            cardprincipal: 'Backend Development',
            tags: ['Python', 'Flask', 'SQLite', 'Postman', 'API'],
            linkGitHub: 'https://github.com/DanilloSouza03/ecommerce-api'
        }
    ];
        
    const cursos = [
        {
            title: 'Linguagem de Programação Python',
            img: 'python_bra.png',
            description: 'Apresenta Python junto ao POO, GUI e SQLite.',
            year: '2024',
            tags: ['Fundação Bradesco', 'Python', 'SQLite', 'POO']
        },
        {
            title: 'Git e GitHub',
            img: 'git_fgv.png',
            description: 'Controle de versão com Git e hospedagem no GitHub (FGV).',
            year: '2024',
            tags: ['FGV', 'Git', 'GitHub', 'Versionamento de Código']
        },
        {
            title: 'Bootcamp Python Data Analytics',
            img: 'bootcamp_python.jpg',
            description: 'Análise de dados com Python, ETL e visualização.',
            year: '2024',
            tags: ['DIO', 'Python', 'Data Analytics', 'ETL']
        },
        {
            title: 'Figma para DEV',
            img: 'figma_ada.png',
            description: 'Uso do Figma no desenvolvimento (ADATech).',
            year: '2024',
            tags: ['ADATech', 'Figma', 'Design', 'UI']
        },
        {
            title: 'Fundamentos para Desenvolvimento de Software',
            img: 'certificado_software_microsoft.jpg',
            description: 'Curso da Microsoft e LinkedIn sobre os fundamentos do desenvolvimento de software.',
            year: '2023',
            tags: ['Microsoft', 'Desenvolvimento de Software', 'Programação']
        },
        {
            title: 'Santander Bootcamp 2023 - Ciência de Dados com Python',
            img: 'bootcamp_santander.jpg',
            description: 'Bootcamp de ciência de dados, incluindo estatística, SQL, Power BI e Python.',
            year: '2023',
            tags: ['DIO', 'Ciência de Dados', 'Python', 'SQL', 'Power BI', 'Estatística']
        },
        {
            title: 'Formação HTML Web Developer',
            img: 'formacao_html.jpg',
            description: 'Formação em desenvolvimento web com foco em HTML e HTML5.',
            year: '2023',
            tags: ['DIO', 'HTML', 'Front-End', 'Web Development']
        },
        {
            title: 'Fundamentos do Desenvolvimento de Sistemas',
            img: 'fundamentos_bra.jpg',
            description: 'Curso dos fundamentos de desenvolvimento de sistemas pela Fundação Bradesco.',
            year: '2023',
            tags: ['Fundação Bradesco', 'Desenvolvimento de Sistemas', 'LGPD']
        },
        {
            title: 'SQL a linguagem dos bancos de dados',
            img: 'SQL_conquer.jpg',
            description: 'Curso focado na linguagem SQL e sua aplicação em bancos de dados MySQL.',
            year: '2023',
            tags: ['Conquer', 'SQL', 'MySQL', 'Bancos de Dados']
        },
        {
            title: 'Fundamentos para Análise de Dados',
            img: 'certificado_dados_microsoft.jpg',
            description: 'Curso de fundamentos sobre análise de dados oferecido pela Microsoft e LinkedIn.',
            year: '2023',
            tags: ['Microsoft', 'Análise de Dados', 'Técnicas Analíticas']
        },
        {
            title: 'Bootcamp Potência Tech powered by iFood | Ciência de Dados',
            img: 'bootcamp_ifood.jpg',
            description: 'Bootcamp abordando ciência de dados com foco em Python, SQL, Machine Learning, e Power BI.',
            year: '2023',
            tags: ['DIO', 'Ciência de Dados', 'Python', 'SQL', 'Machine Learning', 'Power BI']
        }
    ];

    projetos.forEach(projeto => addProjectCard(projeto.images, projeto.title, projeto.description, projeto.cardprincipal, projeto.tags, projeto.linkGitHub, projeto.linkDeploy));

    cursos.forEach(curso => addCursoCard(curso.title, curso.img, curso.description, curso.year, curso.tags));

    projetos.forEach(projeto => addTagPesquisa(projeto.cardprincipal));
    
    const checkboxesContainer = document.querySelector('#checkboxes-container');
    
    checkboxesContainer.addEventListener('change', filterProjects);
});