import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import RoomCard from "../components/RoomCard.js";
import DateSelector from "../components/DateSelector.js";
import { listAvailableRoomsRequest } from "../api/roomsAPI.js";
import Modal from "../components/Modal.js";
import Spinner from "../components/Spinner.js";
import CardLounge from "../components/cardLounge.js";

// Função para mostrar modal de erro de data
function showDateErrorModal() {
    const modalElement = Modal('date');
    document.body.appendChild(modalElement);
    
    // Mostrar o modal usando Bootstrap
    const modal = new bootstrap.Modal(modalElement.querySelector('.modal'));
    modal.show();
    
    // Remover o modal do DOM quando fechado
    modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modalElement);
    });
}

// Função para mostrar modal de quartos indisponíveis
function showNoRoomsModal() {
    const modalElement = Modal('no-rooms');
    document.body.appendChild(modalElement);
    
    // Mostrar o modal usando Bootstrap
    const modal = new bootstrap.Modal(modalElement.querySelector('.modal'));
    modal.show();
    
    // Remover o modal do DOM quando fechado
    modalElement.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modalElement);
    });
}

export default function renderHomePage() {
    
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';

    const navbar = Navbar();
    nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';
    
    const carrousel = Hero();
    divRoot.appendChild(carrousel);
    
    const selector = DateSelector();
    divRoot.appendChild(selector);

    const [dateCheckIn, dateCheckOut] = selector.querySelectorAll('input[type="date"]');
    const guestAmount = selector.querySelector('select');
    const btnSearchRoom = selector.querySelector('button');

    const Divcard = document.createElement('div');
    Divcard.className = 'cards';
    Divcard.id = 'card-result';

    /*path: é o nome do arquivo que esta em assets/img */
    const loungeItems = [
        {path: "restaurante.jpg", title: "Restaurante", text: "Nosso restaurante é um espaço agradavel e familiar!"},
        {path: "spa.jpg", title: "SPA", text: "Nosso SPA é ideal para momentos de relaxamento!"},
        {path: "bar.jpg", title: "Bar", text: "Nosso bar oferece drinks sem metanol, confia!"}
    ];
    //Percorre a array loungeItems
    for (let i = 0; i < loungeItems.length; i++) {
        const cardLoungeElement = CardLounge (loungeItems[i], i);
        Divcard.appendChild(cardLoungeElement);
    }


    btnSearchRoom.addEventListener("click", async (e) => {
        e.preventDefault();

        const inicio = (dateCheckIn?.value || "").trim();
        const fim = (dateCheckOut?.value || "").trim(); 
        const qtd = parseInt(guestAmount?.value || "0", 10);

        if (!inicio || !fim || Number.isNaN(qtd) || qtd <= 0) {
            const modalElement = Modal('fields');
            document.body.appendChild(modalElement);
            
            // Mostrar o modal usando Bootstrap
            const modal = new bootstrap.Modal(modalElement.querySelector('.modal'));
            modal.show();
            
            // Remover o modal do DOM quando fechado
            modalElement.addEventListener('hidden.bs.modal', () => {
                document.body.removeChild(modalElement);
            });
            
            return;
        } 
    
        

        const dtInicio = new Date(inicio);
        const dtFim = new Date(fim);
         
        if (isNaN(dtInicio) || isNaN(dtFim) || dtInicio >= dtFim) {
            console.log("A data de check-out deve ser posterior ao check-in!");
            showDateErrorModal();
            return;
        }

        console.log("Buscando quartos disponíveis...");
        
        // Mostrar spinner de loading
        const spinnerElement = Spinner();
        Divcard.appendChild(spinnerElement);

        try {
            const result = await listAvailableRoomsRequest({inicio, fim, qtd });
            if(!result.length) {
                console.log("Nenhum quarto disponível para esse período!");
                showNoRoomsModal();
                return;
            }
            //Após intervalo: preencher as infos dos quartos nos cards ou avisar ao cliente que não há quarto disp.
            Divcard.innerHTML = '';
            
            // Grupo para incorporar cada div de cada card, para aplicar display-flex
            const cardsGroup = document.createElement('div');
            cardsGroup.className = "cards";
            
            result.forEach((itemCard, i) => {
                cardsGroup.appendChild(RoomCard(itemCard, i));
            });
            
            Divcard.appendChild(cardsGroup);
        }
        catch(error) {
            console.log(error);
            // Limpar spinner em caso de erro
            Divcard.innerHTML = '';
        }
    });


    divRoot.appendChild(Divcard);
    Footer();
}