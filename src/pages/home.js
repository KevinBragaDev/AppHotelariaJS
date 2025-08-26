import Hero from "../components/hero.js";
import Navbar from "../components/Navbar.js";

export default function renderHomePage() {
     const nav = document.getElementById('navbar');
       nav.innerHTML = '';
    
       const navbar = Navbar();
       nav.appendChild(navbar);

    const home = document.getElementById('root');
    home.innerHTML = '';

    const carousel = Hero();
    home.appendChild(carousel);
}