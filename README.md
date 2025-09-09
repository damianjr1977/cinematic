# 🎬 Proyecto Cinematic & Gallery

## 📌 Descripción del Proyecto
Este proyecto es un sitio web de galería cinematográfica desarrollado con **Bootstrap**, **CSS personalizado** y **JavaScript**, estructurado en tres secciones principales:

- **Página de inicio** con carrusel de imágenes y descripciones de películas.
- **Galería de imágenes** categorizadas para exploración visual.
- **Formulario de contacto** con validación y mapa interactivo implementado con **Leaflet.js**.

El diseño busca combinar la estética moderna de **Bootstrap** para los estilos base con personalizaciones adicionales mediante CSS propio, manteniendo una estructura ordenada de carpetas para su fácil mantenimiento.

---

## 📂 Estructura del Proyecto
proyecto/
        │
        ├─ assets/ # Recursos estáticos como imágenes, fuentes, sonidos
        ├─ css/ # Archivos .css personalizados
        ├─ views/ # Páginas HTML secundarias (galería, contacto)
        │ ├─ galeria.html
        │ ├─ contacto.html
        │
        ├─ index.html # Página principal
        └─ js/ # Scripts JavaScript (validaciones, mapa, etc.)

---

## 🛠 Tecnologías Utilizadas
- **Bootstrap 5.3** → Estilos y componentes base (navbar, carrusel, footer).
- **CSS personalizado** → Ajustes visuales específicos no cubiertos por Bootstrap.
- **JavaScript** → Validaciones, interactividad y carga de contenido dinámico.
- **Leaflet.js** → Implementación del mapa interactivo.
- **Patterns en inputs** → Validación de formularios en cliente.

---

## 📋 Observaciones y Aspectos a Mejorar

✅ **YA** – No se ha creado la estructura completa de un documento HTML en `contacto`, `galeria` y `index`.
✅ **YA** – La etiqueta semántica `<section>` debe contener un encabezado como hijo. Si no se desea incluirlo, sustituir por `<div>` para evitar problemas de accesibilidad y SEO.  
✅ **YA** – No se ha utilizado correctamente la jerarquía de encabezados; en algunos casos se emplea `h5` sin que exista previamente un `h4`.  
✅ **YA** – Las imágenes deben incluir siempre los atributos `src`, `alt`, `width` y `height`. El redimensionado debe hacerse únicamente con CSS.  
✅ **YA** – El formulario no contiene las propiedades `action` y `method`, lo que afecta su funcionalidad de envío.  

---

## 🚀 Funcionalidades Destacadas
- **Navbar y Footer consistentes** en todas las páginas, aprovechando componentes de Bootstrap.
- **Carrusel de inicio** con transiciones suaves y contenido destacado.
- **Galería de imágenes** con atributos optimizados para carga más rápida.
- **Formulario con validación de patrones** (`pattern` en inputs) para campos como correo electrónico.
- **Mapa interactivo** con Leaflet.js que permite geolocalización y navegación fluida.

---

## 📈 Recomendaciones Futuras
1. Optimizar imágenes y convertir a **WebP** para reducir tiempos de carga.
2. Aplicar **Lazy Loading** en galería y carrusel.
3. Revisar jerarquía de encabezados en todo el sitio.
4. Mejorar el SEO mediante meta etiquetas, títulos y descripciones adecuadas.
5. Añadir **modo oscuro** como opción para el usuario.

---

## 🔧 Dependencias
```json
"dependencies": {
  "bootstrap": "^5.3.0",
  "leaflet": "^1.9.4",
  "font-awesome": "^6.4.0"
}
