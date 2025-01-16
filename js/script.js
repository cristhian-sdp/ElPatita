// Navegación:
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  // Añade la clase 'nav-visible' al elemento nav
  nav.classList.add("nav-visible");

  // Añade un evento de clic a cada enlace de navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
      nav.classList.remove("nav-visible");
      nav.classList.add("nav-hidden");

      // Después de 400ms, cambia las clases y redirige manualmente
      setTimeout(() => {
        nav.classList.remove("nav-hidden");
        nav.classList.add("nav-visible");
        window.location.href = link.href;
      }, 400); // Tiempo de la animación en milisegundos
    });
  });
});

// Pantalla de carga:
window.addEventListener("load", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  const isInitialLoad = !sessionStorage.getItem("initialLoadDone");

  // Establece el tiempo de espera según si es la carga inicial o no
  const timeoutDuration = isInitialLoad ? 1800 : 1000;

  // Después del tiempo de espera, oculta la pantalla de carga
  setTimeout(function () {
    loadingScreen.style.display = "none";
    if (isInitialLoad) {
      sessionStorage.setItem("initialLoadDone", "true");
    }
  }, timeoutDuration);
});

// Modal de la galería:
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("img01");
  const images = document.querySelectorAll(".menu-image");
  const span = document.getElementsByClassName("close")[0];
  
  // Añade un evento de clic a cada imagen del menú
  images.forEach((img) => {
    img.addEventListener("click", function () {
      // Muestra el modal
      modal.style.display = "block";
      // Establece la fuente de la imagen del modal
      modalImg.src = this.src;
      if (window.innerWidth <= 768) {
        // Verifica si es un dispositivo móvil y ajusta el margen superior
        modalImg.style.marginTop = "150px";
      }
      // Añade la clase 'modal-open' al body para deshabilitar el scroll
      document.body.classList.add('modal-open');
    });
  });
  // Cierra el modal cuando se hace clic en el botón de cerrar
  span.onclick = function () {
    modal.style.display = "none";
    modalImg.style.marginTop = "0"; // Restablece el margen superior cuando se cierra el modal
    document.body.classList.remove('modal-open');
  };
});

// Copiar el número de teléfono al portapapeles:
function copyPhoneNumber(button) {
  const phoneNumber = "993229832";
  navigator.clipboard
    .writeText(phoneNumber)
    .then(() => {
      button.classList.add("copied");
      button.disabled = true;
      // Después de 3 segundos, elimina la clase 'copied' y habilita el botón
      setTimeout(() => {
        button.classList.remove("copied");
        button.disabled = false;
      }, 3000);
    })
    .catch((err) => {
      console.error("Error al copiar el número de teléfono: ", err);
    });
}

// Copo de nieve:
function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");

  // Configuración del tamaño del copo de nieve
  const size = Math.random() * 4 + 4;
  snowflake.style.width = `${size}px`;
  snowflake.style.height = `${size}px`;

  // Configuración de la posición horizontal del copo de nieve
  snowflake.style.left = `${Math.random() * 100}vw`;

  // Configuración de la duración de la animación (velocidad de caída)
  const duration = Math.random() * 4 + 3;
  snowflake.style.animationDuration = `${duration}s`;

  document.body.appendChild(snowflake);

  // Eliminar el copo de nieve después de que haya caído
  setTimeout(() => {
    snowflake.remove();
  }, duration * 1000); // Multiplicar por 1000 para convertir a milisegundos
}

// Crear un nuevo copo de nieve cada 200ms
setInterval(createSnowflake, 200);
