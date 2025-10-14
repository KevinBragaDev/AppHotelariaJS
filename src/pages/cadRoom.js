import CadQuarto from "../components/cadQuarto.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";

export default function renderCadQuartoPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';

    const navbar = Navbar();
    nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';
    
    const cadQuartoForm = CadQuarto();
    
    const containerRoom = document.createElement('div');
    containerRoom.className = 'cards';
    
    containerRoom.appendChild(cadQuartoForm);
    divRoot.appendChild(containerRoom);
    
    Footer();
}
