document.addEventListener("DOMContentLoaded", function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // A animação dispara quando 15% da seção aparece na tela
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(section => {
    observer.observe(section);
  });

  // ---------- CARROSSEL DE TRABALHOS ----------
  const carousel = document.getElementById('carousel');
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (carousel && track) {
    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    let current = slides.findIndex(s => s.classList.contains('is-active'));
    if (current < 0) current = 0;
    const AUTOPLAY_MS = 8000;
    let timer = null;

    // Criar os pontos (dots) de navegação
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === current ? ' is-active' : '');
      dot.setAttribute('aria-label', `Ir para foto ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

    function render() {
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      render();
      resetTimer();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer() {
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // Pausa o autoplay ao passar o mouse, retoma ao sair
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', startTimer);

    render();
    startTimer();
  }
});