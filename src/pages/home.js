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

    const btnSearchRoom = selector.querySelector('button');

    btnSearchRoom.addEventListener("click", async (e) => {
        e.preventDefault();

        const inicio = "2025-09-15"; //Estou setando só para testar pq ainda vamos pegar valor diretamente do input
        const fim = "2025-09-24";
        const qtd = 2;

        try {
            const result = await listAvailableRoomsRequest({inicio, fim, qtd });
            //Após intervalo: preencher as infos dos quartos nos cards ou avisar ao cliente que não há quarto disp.
        }
        catch(error) {
            console.log(error);
        }
    });

    const Divcard = document.createElement('div');
    Divcard.innerHTML = '';
    Divcard.className = 'cards';

    for(var i = 0; i<3; i++){
        const card = Card(i);
        Divcard.appendChild(card);
    }

    divRoot.appendChild(Divcard);
    Footer();
}