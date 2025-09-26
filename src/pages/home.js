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