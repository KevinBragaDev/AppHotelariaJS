import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import Card from "../components/RoomCard.js";
import DateSelector from "../components/DateSelector.js";
import { listAvailableRoomsRequest } from "../api/roomsAPI.js";


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
    Divcard.innerHTML = '';

    btnSearchRoom.addEventListener("click", async (e) => {
        e.preventDefault();

        const inicio = (dateCheckIn?.value || "").trim();
        const fim = (dateCheckOut?.value || "").trim(); 
        const qtd = parseInt(guestAmount?.value || "0", 10);

        if (!inicio || !fim || Number.isNaN(qtd) || qtd <= 0) {
            console.log("preencha todos os campos!");
            return;
        }

        const dtInicio = new Date(inicio);
        const dtFim = new Date(fim);
         
        if (isNaN(dtInicio) || isNaN(dtFim) || dtInicio >= dtFim) {
            console.log("a data de check-out deve ser posterior ao check-in!")
        }

        console.log("Buscando quartos disponiveis...");

        try {
            const result = await listAvailableRoomsRequest({inicio, fim, qtd });
            if(!result.length) {
                console.log("Nenhum quarto disponivel para esse periodo!");
                return;
            }
            //Após intervalo: preencher as infos dos quartos nos cards ou avisar ao cliente que não há quarto disp.
            cardsGroup.innerHTML = '';
            result.forEach((card, i) => {
                cardsGroup.appendChild(RoomCard(itemCard, i));
            });
        }
        catch(error) {
            console.log(error);
        }
    });

    
    for(var i = 0; i<3; i++){
        const card = Card(i);
        Divcard.appendChild(card);
    }

    divRoot.appendChild(Divcard);
    Footer();
}