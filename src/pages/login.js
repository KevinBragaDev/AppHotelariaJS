import Form from "../components/form.js";
import Navbar from "../components/Navbar.js";

export default function renderLoginPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';

    const navbar = Navbar();
    nav.appendChild(navbar);
    
    Form()
}
