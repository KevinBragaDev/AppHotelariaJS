import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import tabela from "../components/tabela.js";
export default function renderCartPage() {
    const nav = document.getElementById('navbar');
        nav.innerHTML = '';
    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';
    divRoot.style.height = '50vh';
        const navbar = Navbar();
        nav.appendChild(navbar);
        
        const cart = tabela();
        
        divRoot.appendChild(cart);
        Footer();
}