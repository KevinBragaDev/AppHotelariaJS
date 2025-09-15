export default function Card() {
const containerCard = document.createElement('div');
  containerCard.className = 'card';
  containerCard.innerHTML = `
  <div class="card-content">
      <div class="carouselCard">
        <img src="publics/assets/img/suite1.jpg" alt="Imagem 1" class="carousel-image active" />
        <img src="publics/assets/img/suite2.jpg" alt="Imagem 2" class="carousel-image" />
        <img src="publics/assets/img/suite3.jpg" alt="Imagem 3" class="carousel-image" />
      </div>
      <div class="card-text">
        <h2>Suíte Luxo</h2>
        <p>Desfrute do conforto da nossa Suíte Luxo.</p>
        <button>Reservar</button>
      </div>
    </div>
  `;

   // Carrossel simples: troca imagens a cada 3 segundos
  const images = containerCard.querySelectorAll('.carousel-image');
  let currentIndex = 0;

  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 3000);

  return containerCard;
}