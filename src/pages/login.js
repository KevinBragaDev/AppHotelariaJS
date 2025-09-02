import { loginRequest } from "../api/authAPI.js";
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
    signupLink.innerHTML = `Não possui uma conta? <a href="register" id="signup-link">Cadastre-se</a>`;
    signupLink.style.textAlign = 'center';
    signupLink.style.marginTop = '20px';

    FormContainer.appendChild(signupLink);

    document.getElementById('signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        renderRegisterPage()
    
    });
    //Inputs e botão presentes no form
    const inputEmail = contentForm.querySelector('input[type="email"]');
    const inputSenha = contentForm.querySelector('input[type="password"]');
    const btn = contentForm.querySelector('button[type="submit"]');

    //Monitora o clique no botão para acionar um evento de submeter os dados do form
    contentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        try {
            const result = await loginRequest(email, senha);
            console.log("Login realizado com sucesso");
            //window.location.pathname = /home;
        }
        
        catch {
            console.log("Erro inesperado!");
        }
    });

}
