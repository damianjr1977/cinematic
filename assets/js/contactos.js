// contactos.js
function initContactoPage() {
    // Validación del formulario
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                alert('Formulario enviado correctamente');
                form.reset();
                form.classList.remove('was-validated');
            }

            form.classList.add('was-validated');
        }, false);
    } else {
        console.error("El formulario con ID 'contactForm' no fue encontrado");
    }

    // Configuración del mapa
    const mapElement = document.getElementById('map');

    if (mapElement) {
        const map = L.map('map').setView([40.4168, -3.7038], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const masterdMarker = L.marker([40.4168, -3.7038]).addTo(map)
            .bindPopup('<b>USER</b><br>Nuestra ubicación por defecto');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    map.setView([userLat, userLng], 13);
                    L.marker([userLat, userLng]).addTo(map)
                        .bindPopup('<b>Tu ubicación</b><br>Hemos detectado que estás aquí')
                        .openPopup();
                },
                function(error) {
                    console.error("Error obteniendo la ubicación: ", error);
                    masterdMarker.openPopup();
                }
            );
        } else {
            console.log("Geolocalización no soportada por el navegador");
            masterdMarker.openPopup();
        }
    } else {
        console.error("El elemento con ID 'map' no fue encontrado");
    }
}

// Exportar al global para poder llamarlo después de la carga dinámica
window.initContactoPage = initContactoPage;
// contactos.js
function initContactoPage() {
    // Validación del formulario
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                alert('Formulario enviado correctamente');
                form.reset();
                form.classList.remove('was-validated');
            }

            form.classList.add('was-validated');
        }, false);
    } else {
        console.error("El formulario con ID 'contactForm' no fue encontrado");
    }

    // Configuración del mapa
    const mapElement = document.getElementById('map');

    if (mapElement) {
        const map = L.map('map').setView([40.4168, -3.7038], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const masterdMarker = L.marker([40.4168, -3.7038]).addTo(map)
            .bindPopup('<b>USER</b><br>Nuestra ubicación por defecto');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const userLat = position.coords.latitude;
                    const userLng = position.coords.longitude;

                    map.setView([userLat, userLng], 13);
                    L.marker([userLat, userLng]).addTo(map)
                        .bindPopup('<b>Tu ubicación</b><br>Hemos detectado que estás aquí')
                        .openPopup();
                },
                function(error) {
                    console.error("Error obteniendo la ubicación: ", error);
                    masterdMarker.openPopup();
                }
            );
        } else {
            console.log("Geolocalización no soportada por el navegador");
            masterdMarker.openPopup();
        }
    } else {
        console.error("El elemento con ID 'map' no fue encontrado");
    }
}

// Exportar al global para poder llamarlo después de la carga dinámica
window.initContactoPage = initContactoPage;