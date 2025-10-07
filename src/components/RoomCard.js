export default function Card(itemCard, i = 0) {
const {
  nome,
  numero,
  qtd_cama_casal,
  qtd_cama_solteiro,
  preco
} = itemCard || {};

const title = nome;

const camas = [
  (qtd_cama_casal != null ? `${qtd_cama_casal} cama(s) de casal` : null),
  (qtd_cama_solteiro != null ? `${qtd_cama_solteiro} cama(s) de solteiro` : null),
].filter (Boolean).join(' - ');



const containerCard = document.createElement('div');
  containerCard.className = 'containerCard';
  containerCard.innerHTML = `
  <div class="card" style="width: 18rem;">

  <div id="carouselExampleIndicators-${index}" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="publics/assets/img/suite1.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="publics/assets/img/suite2.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="publics/assets/img/suite3.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators-${index}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>


  <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <ul class=list-unstyled mb-2">
                ${camas? `<li>${camas}` : ""}
                ${preco != null ? `<li>Preco: R$ ${Number(preco).toFixed(2)}</li>` : ""}
            </ul>
            <a href="#" class="btn btn-primary">Reservar</a>
        </div>
    </div>
    `;
  return containerCard;

}