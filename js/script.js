document.addEventListener('DOMContentLoaded', function() {

    // Inicializa componentes comunes a todas las páginas
    initCommonComponents();

    // Actualiza enlace activo en el navbar basado en la página actual
    updateActiveNavLinkBasedOnCurrentPage();

    // Maneja clics en el navbar para doc html independientes
    initNavbarLinks();

    // Inicializa lógica en página de contacto
    if (typeof initContactoPage === 'function') {
        initContactoPage();
    }
});

// Componentes comunes a todas las páginas
function initCommonComponents() {
    // Tooltips de Bootstrap
    const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.forEach(tooltip => {
        new bootstrap.Tooltip(tooltip);
    });

    // Scroll suave para enlaces interns
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Actualiza enlace activo basado en la página actual
function updateActiveNavLinkBasedOnCurrentPage() {
    // Obtener la página actual del pathname
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';

    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('href').replace('.html', '').replace('/', '');

        // Remover active de todos los enlaces
        link.classList.remove('active');

        // Marcar opción como activa si coincide con la página actual
        if ((currentPage === 'index' && linkPage === '') ||
            (linkPage === currentPage)) {
            link.classList.add('active');
        }
    });
}



// Manejo de click en el navbar
function initNavbarLinks() {

    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.target === '_blank' || this.hostname !== window.location.hostname) {
                return;
            }

            // Actualiza clase activa
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Inicialización de la lógica de contacto
function initContactoPage() {
    //Validación del formulario
    const form = document.getElementById('contactForm');

    if (form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (input.checkValidity()) {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                } else {
                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');
                }
            });
        });

        // Manejar el envío del form
        form.addEventListener('submit', async function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
                return;
            }

            event.preventDefault();

            try {
                // Simula retraso de red
                await new Promise(resolve => setTimeout(resolve, 1000));

                const result = {
                    success: true,
                    message: "Formulario recibido correctamente",
                    timestamp: new Date().toISOString()
                };

                // Mostrar feedback visual
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                ¡Formulario enviado con éxito!
                <div class="small mt-1">${result.message}</div>
            `;
                form.parentNode.insertBefore(alertDiv, form.nextSibling);

                // Resetear formulario
                form.reset();
                inputs.forEach(input => input.classList.remove('is-valid'));
                form.classList.remove('was-validated');

                setTimeout(() => alertDiv.remove(), 5000);

            } catch (error) {
                console.error("Error en enviar formulario:", error);

                const errorDiv = document.createElement('div');
                errorDiv.className = 'alert alert-danger mt-3';
                errorDiv.innerHTML = `
                <i class="fas fa-exclamation-triangle me-2"></i>
                Error en enviar formulario: ${error.message}
            `;
                form.parentNode.insertBefore(errorDiv, form.nextSibling);

                setTimeout(() => errorDiv.remove(), 5000);
            }
        });
    }

    // Configuración del mapa
    const mapElement = document.getElementById('map');

    if (mapElement) {
        // Dimensiones del contenedor de mapa
        mapElement.style.height = '400px';

        try {
            const map = L.map('map').setView([40.4168, -3.7038], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const masterdMarker = L.marker([40.4168, -3.7038]).addTo(map)
                .bindPopup('<b>User</b><br>Tu ubicación')
                .openPopup();

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;

                        map.setView([userLat, userLng], 13);
                        L.marker([userLat, userLng]).addTo(map)
                            .bindPopup('<b>User</b><br>Hemos detectado que estás aquí')
                            .openPopup();
                    },
                    function(error) {
                        console.warn("Error obteniendo la ubicación: ", error);
                        masterdMarker.openPopup();
                    }, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                masterdMarker.openPopup();
            }

            // Forzar un redibujado del mapa(En caso de ser necesario)
            setTimeout(() => map.invalidateSize(), 100);

        } catch (error) {
            console.error("Error al inicializar el mapa:", error);
            mapElement.innerHTML = '<div class="alert alert-warning">No se pudo cargar el mapa. Por favor intenta recargar la página.</div>';
        }
    } else {
        console.error("Error: No se encontró el elemento con ID 'map'");
    }
}

window.initContactoPage = initContactoPage;