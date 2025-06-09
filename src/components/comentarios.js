export function Comentarios() {
  const section = document.createElement('section');
  section.className = 'reseñas';
  section.id = "reseñas";
  section.innerHTML = `
    <h2 class="reseñas-titulo anim-down">Reseñas</h2>
    <div class="elfsight-app-58c9909e-9645-410c-bb92-53aa5d541052 anim-down" data-elfsight-app-lazy></div>
  `;

  // Animaciones por scroll
  const animElements = section.querySelectorAll('.anim-down');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  animElements.forEach(el => observer.observe(el));

  if (!document.getElementById('reseñas-style')) {
    const style = document.createElement("style");
    style.id = 'reseñas-style';
    style.innerHTML = `
      .reseñas-titulo {
        font-family: 'Aloja Extended', sans-serif;
        font-size: 2rem;
        font-weight: 700;
        color: white;
        border: none;
        margin-bottom: 30px;
        background-attachment: fixed;
        background-color: var(--main-color) !important;
        display: inline-block;
        border-radius: 10px;
        padding: 15px 40px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        text-align: center;
      }
      .anim-down {
        opacity: 0;
        transform: translateY(60px);
        transition: opacity 0.8s, transform 0.8s cubic-bezier(.4,2,.6,1);
      }
      .anim-visible {
        opacity: 1 !important;
        transform: translateX(0) translateY(0) !important;
      }
      @media (max-width: 700px) {
        .reseñas-titulo {
          font-size: 1.3rem;
          padding: 10px 10vw;
        }
      }
    `;
    document.head.appendChild(style);
  }

  return section;
}