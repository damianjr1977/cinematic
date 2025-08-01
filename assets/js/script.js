document.addEventListener('DOMContentLoaded', function() {
    //Rutas
    const pages = {
        home: "home/home.html",
        galeria: "galeria/galeria.html",
        contacto: "contacto/contacto.html"
    };

    // Función principal para cargar contenido
    async function loadContent(page) {
        const contentDiv = document.getElementById("dynamic-content");
        if (!contentDiv) return;

        try {
            //Estado de carga
            contentDiv.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>';

            const response = await fetch(pages[page]);
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

            const html = await response.text();
            contentDiv.innerHTML = html;

            // Inicializar componentes específicos
            if (page === "galeria") initGalleryComponents();

            // Inicializar componentes generales
            initCommonComponents();

            if (page === "contacto") {
                const script = document.createElement("script");
                script.src = "assets/js/contactos.js";
                script.onload = () => {
                    // Llama la función una vez que se cargó el script y el DOM ya fue inyectado
                    if (typeof window.initContactoPage === "function") {
                        window.initContactoPage();
                    }
                };
                document.body.appendChild(script);
            }

            // Actualizar enlace activo
            updateActiveNavLink(page);

        } catch (error) {
            console.error('Error al cargar el contenido:', error);
            contentDiv.innerHTML = `
                <div class="alert alert-danger m-4">
                    <h4>Error al cargar el contenido</h4>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" class="btn btn-sm btn-outline-danger">Recargar</button>
                </div>
            `;
        }
    }

    // Componente galería
    function initGalleryComponents() {
        // Filtrado de imágenes
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Actualizar botón activo
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filtrar imágenes
                const filterValue = this.dataset.filter;
                galleryItems.forEach(item => {
                    item.style.display = (filterValue === 'all' || item.dataset.category === filterValue) ?
                        'block' :
                        'none';
                });
            });
        });

        // Modal de imagen - Versión corregida
        const imageModal = document.getElementById('imageModal');
        if (imageModal) {
            imageModal.addEventListener('show.bs.modal', function(event) {
                const button = event.relatedTarget;
                const modalTitle = document.getElementById('modalImageTitle');
                const modalImage = document.querySelector('.modal-image'); // Cambiado a la clase correcta

                if (modalTitle && modalImage) {
                    modalTitle.textContent = button.dataset.title;
                    modalImage.src = button.dataset.img;
                    modalImage.alt = button.dataset.title;

                    // Opcional: Forzar recarga de la imagen si es la misma que la anterior
                    modalImage.src = ''; // Limpiar primero
                    setTimeout(() => {
                        modalImage.src = button.dataset.img;
                    }, 10);
                }
            });
        }
    }

    // Componentes en las otras páginas
    function initCommonComponents() {
        // Tooltips
        const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));

        // Scroll suave para anclas
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });

    }

    // Actualizar enlace activo en el navbar
    function updateActiveNavLink(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    // Efecto de scroll en navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled', 'navbar-light');
                navbar.classList.remove('navbar-dark');
                navbar.style.backgroundColor = '#fff';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.classList.remove('navbar-scrolled', 'navbar-light');
                navbar.classList.add('navbar-dark');
                navbar.style.backgroundColor = '';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Manejar clics en el navbar
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            loadContent(page);

            window.history.pushState({ page }, '', `?page=${page}`);
        });
    });

    // Manejar navegación con botones atrás/adelante
    window.addEventListener('popstate', function(event) {
        const page = event.state.page || 'home';
        loadContent(page);
    });

    // Cargar contenido inicial basado en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = urlParams.get('page') || 'home';
    loadContent(initialPage);
});