function calculoDiarias(checkIn, checkOut) {
    // const checkIn = "2026-01-01";
    // const checkOut = "2026-01-05";

    const [yin, min, din] = String(checkIn).split('-').map(Number);
    const [yout, mout, dout] = String(checkOut).split('-').map(Number);

    const tzin = Date.UTC(yin, min - 1, din);
    const tzout = Date.UTC(yout, mout - 1, dout);
    return Math.floor((tzout - tzin) / (1000 * 60 * 60 * 24));

}


export default function RoomCard(itemCard, index = 0) {
const {
  id,
  nome,
  numero,
  qnt_cama_casal,
  qnt_cama_solteiro,
  preco
} = itemCard || {};

const title = nome;

const camas = [
  (qnt_cama_casal != null ? `${qnt_cama_casal} cama(s) de casal` : null),
  (qnt_cama_solteiro != null ? `${qnt_cama_solteiro} cama(s) de solteiro` : null),
].filter (Boolean).join(' - ');



const containerCard = document.createElement('div');
  containerCard.className = 'containerCard';
  containerCard.innerHTML = `
  <div class="card" style="width: 18rem;">

  <div id="carouselRoom-${index}" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselRoom-${index}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselRoom-${index}" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselRoom-${index}" data-bs-slide-to="2" aria-label="Slide 3"></button>
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
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselRoom-${index}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselRoom-${index}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>



  <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <ul class=list-unstyled mb-2">
                ${camas? `<li>${camas}` : ""}
                ${preco != null ? `<li>Preco diária: R$ ${Number(preco).toFixed(2)}</li>` : ""}
            </ul>
            <a href="#" class="btn btn-primary btn-reservar">Reservar</a>
        </div>
    </div>
    `;
    containerCard.querySelector('.btn-reservar').addEventListener('click', async (e) => {
        e.preventDefault();

        //Ler informaçoes setadas nos inputs dateCkeckin, date Checkout e guestAmount
        const idDateCheckin = document.getElementById('date-check-in');
        const idDateCheckout = document.getElementById('date-check-out');
        const idguestAmount = document.getElementById('guest-amount');

        const inicio = (idDateCheckin?.value || "");
        const fim = (idDateCheckout?.value || "");
        const qtd = parseInt(idguestAmount?.value || "0", 10);

        if (!inicio || !fim || Number.isNaN(qtd) || qtd <= 0) {
                    console.log("Dados incompletos para reserva");
        }
        
        const daily = calculoDiarias(inicio, fim);
        
        //Calculo do subtotal do quarto (preco * diarias)
        const subtotal = Number(preco) * daily;

        const novoItemReserva = {
            id,
            nome,
            checkIn: inicio,
            checkOut: fim,
            guests: qtd,
            daily,
            subtotal
        };

        addItemToHotel_Cart(novoItemReserva);
        alert(`Reserva do quarto adicionada: ${nome} - Preço/diaria: R$ ${preco}
          -Número de diárias: ${daily} - Subtotal: R$ ${subtotal}`);
                 
    });
  
    return containerCard;
}