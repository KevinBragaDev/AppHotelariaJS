import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import Card from "../components/RoomCard.js";

export default function renderHomePage() {
     const nav = document.getElementById('navbar');
       nav.innerHTML = '';
    
       const navbar = Navbar();
       nav.appendChild(navbar);

    const home = document.getElementById('root');
    home.innerHTML = '';

    const carrousel = Hero();
    home.appendChild(carrousel);
    
    Footer();

    const card = Card();
    home.appendChild(card);
}