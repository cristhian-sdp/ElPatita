// Barra de progreso:
const progressBarEl = document.getElementById("progress-bar");
window.addEventListener("scroll", () => {
    let height = document.body.scrollHeight - window.innerHeight;
    let scrollPosition = document.documentElement.scrollTop;
    let width = (scrollPosition / height) * 100;
    progressBarEl.style.width = width + "%";
});

// Selecciona el interruptor de modo oscuro (checkbox) del DOM
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("change", () => {
    // Selecciona la meta etiqueta "theme-color" del documento
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    // Verifica si el interruptor está activado (modo oscuro)
    if (darkModeToggle.checked) {
        // Cambia el color del tema a un gris oscuro para el modo oscuro
        themeColorMeta.setAttribute("content", "#333333");
    } else {
        // Cambia el color del tema al naranja para el modo claro
        themeColorMeta.setAttribute("content", "#f0781f");
    }
});

// Barra de navegación vertical
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const navbarVertical = document.createElement("div");
    navbarVertical.classList.add("navbar-vertical");
    navbarVertical.innerHTML = navbar.innerHTML; // Copia los enlaces de la barra original
    document.body.appendChild(navbarVertical);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry.isIntersecting) {
                navbarVertical.style.display = "flex";
            } else {
                navbarVertical.style.display = "none";
            }
        },
        { root: null, threshold: 0 }
    );

    observer.observe(navbar);
});

// Navegación activa
const navLinks = document.querySelectorAll(".carta-nav a");

navLinks.forEach((link) => {
    link.addEventListener("click", function () {
        // Elimina la clase 'active' de todos los enlaces
        navLinks.forEach((nav) => nav.classList.remove("active"));
        // Agrega la clase 'active' al enlace pulsado
        this.classList.add("active");
    });
});

// Modo oscuro
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;

    // Escucha el cambio en el checkbox
    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            body.classList.add("dark-mode-active"); // Activa el modo oscuro
        } else {
            body.classList.remove("dark-mode-active"); // Desactiva el modo oscuro
        }
    });
});

// Navegación de la carta
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".carta-nav a"); // Selecciona los enlaces de carta-nav
    const sections = document.querySelectorAll(
        ".promociones, .brasas, .parrillas, .guarniciones, .bebidas"
    ); // Selecciona todas las secciones

    // Función para mostrar la sección correspondiente
    function showSection(targetId) {
        sections.forEach((section) => {
            if (section.id === targetId) {
                section.classList.remove("hidden"); // Quita la clase 'hidden' para mostrar la sección
            } else {
                section.classList.add("hidden"); // Agrega la clase 'hidden' para ocultar las demás
            }
        });
    }

    // Configurar el clic en los enlaces de navegación
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            const targetId = link.getAttribute("href").substring(1); // Obtiene el ID del destino
            showSection(targetId); // Muestra la sección correspondiente
        });
    });

    // Mostrar solo "promociones" por defecto al cargar la página
    showSection("promociones");
});
