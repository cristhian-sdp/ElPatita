// Gestionar el loader
const loader = document.getElementById("loader");
if (loader) {
  // Ocultar el loader después de un tiempo corto
  setTimeout(() => {
    loader.classList.add("loader-hidden");
    // Eliminar completamente el loader después de la transición
    loader.addEventListener("transitionend", function () {
      this.remove();
    });
  }, 200); // Tiempo reducido
}

// Implementación del modo oscuro
const darkModeToggle = document.querySelector(".darkmode-input");
const moonIcon = document.querySelector(".darkmode-toggle svg use");
if (darkModeToggle && moonIcon) {
  // Función para cambiar el tema
  function toggleDarkMode(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    // Obtener el ícono
    const iconElement = document.querySelector(".darkmode-toggle svg");
    iconElement.style.opacity = "0";
    setTimeout(() => {
      // Cambiar el ícono
      moonIcon.setAttribute(
        "xlink:href",
        isDark ? "assets/sprite.svg#sun" : "assets/sprite.svg#moon"
      );
      // Cambiar la etiqueta aria
      document
        .querySelector(".darkmode-toggle")
        .setAttribute(
          "aria-label",
          isDark ? "Desactivar modo oscuro" : "Activar modo oscuro"
        );
      iconElement.style.opacity = "1";
    }, 150);
    // Guardar preferencia
    localStorage.setItem("darkMode", isDark);
  }
  // Verificar preferencia guardada al cargar la página
  if (localStorage.getItem("darkMode") === "true") {
    darkModeToggle.checked = true;
    toggleDarkMode(true);
  }
  // Escuchar cambios en el toggle
  darkModeToggle.addEventListener("change", function () {
    toggleDarkMode(this.checked);
  });
}

// Referencias a las secciones
const sections = {
  inicio: document.getElementById("inicio"),
  carta: document.getElementById("carta"),
  local: document.getElementById("local"),
};

// Referencias a los enlaces de navegación
const navLinks = document.querySelectorAll('nav a[href^="#"]');
// Función para mostrar la sección seleccionada y ocultar las demás
function showSection(sectionId) {
  // Ocultar todas las secciones
  for (const key in sections) {
    if (sections.hasOwnProperty(key)) {
      sections[key].style.display = "none";
    }
  }
  // Mostrar la sección seleccionada
  if (sections[sectionId]) {
    sections[sectionId].style.display = "";
    // Para la sección inicio, asegurar que el display sea grid
    if (sectionId === "inicio") {
      sections[sectionId].style.display = "grid";
    }
  }
  // Actualizar atributo aria-current en los enlaces
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === "#" + sectionId) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}
// Agregar evento click a los enlaces de navegación
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute("href").substring(1); // Quitar el # del href
    showSection(sectionId);
    // Actualizar la URL sin recargar la página
    history.pushState(null, null, this.getAttribute("href"));
  });
});
// Manejar la navegación por historial (botones atrás/adelante del navegador)
window.addEventListener("popstate", function () {
  const hash = window.location.hash.substring(1) || "inicio";
  showSection(hash);
});
// Mostrar la sección inicial basada en el hash de la URL o 'inicio' por defecto
const initialSection = window.location.hash.substring(1) || "inicio";
showSection(initialSection);

// Navegación interna para la carta
const cartNavLinks = document.querySelectorAll(".cart-nav a");
const cartSections = [
  "promociones",
  "brasas",
  "parrillas",
  "guarniciones",
  "bebidas",
];
// Función para mostrar sección de carta y ocultar las demás
function showCartSection(sectionId) {
  // Ocultar todas las secciones de la carta
  cartSections.forEach((section) => {
    const sectionElement = document.querySelector("." + section);
    if (sectionElement) {
      sectionElement.style.display = "none";
    }
  });
  // Mostrar la sección seleccionada
  const selectedSection = document.querySelector("." + sectionId);
  if (selectedSection) {
    selectedSection.style.display = "grid"; // Mantener el display grid
  }
  // Actualizar clases active en los enlaces
  cartNavLinks.forEach((link) => {
    if (link.getAttribute("href") === "#" + sectionId) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}
// Agregar evento click a los enlaces de navegación de la carta
cartNavLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const sectionId = this.getAttribute("href").substring(1); // Quitar el # del href
    showCartSection(sectionId);
  });
});
// Mostrar promociones por defecto cuando se carga la carta
function initializeCart() {
  if (document.querySelector(".carta-container").style.display !== "none") {
    showCartSection("promociones");
  }
}
// Inicializar carta cuando se muestra por primera vez
initializeCart();
// Modificar showSection para inicializar la carta cuando se activa
const originalShowSection = showSection;
showSection = function (sectionId) {
  originalShowSection(sectionId);
  if (sectionId === "carta") {
    showCartSection("promociones");
  }
};

// Footer toggle functionality
const footerToggle = document.getElementById("footer-toggle");
const footerContent = document.querySelector(".footer-content");
if (footerToggle) {
  footerToggle.addEventListener("click", function () {
    footerContent.classList.toggle("active");
  });
  // Cerrar el footer cuando se hace clic fuera
  document.addEventListener("click", function (event) {
    if (
      !event.target.closest(".footer-container") &&
      footerContent.classList.contains("active")
    ) {
      footerContent.classList.remove("active");
    }
  });
}
// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registro falló: ', registrationError);
      });
  });
}
// Detectar si la app está instalada
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir que Chrome muestre automáticamente el prompt
  e.preventDefault();
  // Guardar el evento para usarlo después
  window.deferredPrompt = e;
  console.log('App puede ser instalada');
});
// Detectar cuando la app se instala
window.addEventListener('appinstalled', (evt) => {
  console.log('App instalada exitosamente');
  // Limpiar el prompt guardado
  window.deferredPrompt = null;
});
