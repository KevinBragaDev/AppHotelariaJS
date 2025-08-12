import LoginForm from "../components/loginForm.js";
import Navbar from "../components/Navbar.js";

export default function renderLoginPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';

    const navbar = Navbar();
    nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';



    const titulo = document.createElement('h1');
    titulo.textContent = 'Faça login ou crie uma conta';
    titulo.className = 'titulo';
    titulo.style.texaAlign = 'center';

    const container = document.createElement('div');
    container.className = 'card p-4 shadow-lg';
    container.style.width = '100%';
    container.style.maxWidth = '500px';

    divRoot.appendChild(container);
    const formulario = LoginForm();



    container.appendChild(titulo);
    container.appendChild(formulario);
}
