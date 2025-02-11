// Pantalla de carga:
window.addEventListener("load", function () {
    const loadingScreen = document.querySelector(".loading-screen");
    const isInitialLoad = !sessionStorage.getItem("initialLoadDone");
  
    // Establece el tiempo de espera según si es la carga inicial o no
    const timeoutDuration = isInitialLoad ? 650 : 600;
  
    // Después del tiempo de espera, oculta la pantalla de carga
    setTimeout(function () {
      loadingScreen.style.display = "none";
      if (isInitialLoad) {
        sessionStorage.setItem("initialLoadDone", "true");
      }
    }, timeoutDuration);
  });

// Animación de Escritura:
document.addEventListener("DOMContentLoaded", function() {
  const heroTextButton = document.querySelector('.hero-text-button');
  heroTextButton.classList.add('typing-animation');
});

//Animación del pie de página
document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('.footer-content');

  function checkFooterInView() {
      const rect = footer.getBoundingClientRect();
      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

      if (rect.top <= windowHeight) {
          footer.classList.add('fade-in');
          window.removeEventListener('scroll', checkFooterInView);
      }
  }

  window.addEventListener('scroll', checkFooterInView);
  checkFooterInView();
});

//Animación de la carta
document.querySelectorAll('.carta-image').forEach(image => {
  image.addEventListener('click', () => {
      image.classList.toggle('zoomed');
  });
});
