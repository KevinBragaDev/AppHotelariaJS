import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import Card from "../components/RoomCard.js";
import dateContainer from "../components/DateSelector.js";

export default function renderHomePage() {
     const nav = document.getElementById('navbar');
       nav.innerHTML = '';
    
       const navbar = Navbar();
       nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';

    const carrousel = Hero();
    divRoot.appendChild(carrousel);
    
    const selector = dateContainer();
    divRoot.appendChild(selector);
    Footer();
    
    const cardDiv = document.createElement('div');
    cardDiv.style.display ='grid';
    cardDiv.style.gridTemplateColumns ='auto auto auto';
    cardDiv.className = 'cards';
    cardDiv.style.gap = '15px';
 
    for(var i=0; i < 6; i++){
        const card = Card();
        cardDiv.appendChild(card);
    }
 
    divRoot.appendChild(cardDiv);
}