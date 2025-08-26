import Form from "../components/form.js";
import Navbar from "../components/Navbar.js";
import renderRegisterPage from "./register.js";

export default function renderLoginPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';

    const navbar = Navbar();
    nav.appendChild(navbar);
    
    const FormContainer = Form()



    const signupLink = document.createElement('p');
    signupLink.innerHTML = `Não possui uma conta? <a href="#" id="signup-link">Cadastre-se</a>`;
    signupLink.style.textAlign = 'center';
    signupLink.style.marginTop = '20px';

    FormContainer.appendChild(signupLink);

    document.getElementById('signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        renderRegisterPage();
    });
    
}
