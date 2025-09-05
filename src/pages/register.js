import Form from "../components/form.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";

export default function renderRegisterPage() {
    
   const nav = document.getElementById('navbar');
   nav.innerHTML = '';

   const navbar = Navbar();
   nav.appendChild(navbar);

   const formulario = Form();
    
   const titulo = formulario.querySelector('h1');
   titulo.textContent = "Cadastre-se";

    //Selecione o elemento form que esta presente em ./components/Form.js
   const contentForm = formulario.querySelector('form');
    
   //Crio o input para nome e adiciono em contentForm
   const nome = document.createElement('input');
   nome.type = 'text';
   nome.placeholder = "Digite seu nome";
    
   /*Para adicionar input nome ao contentForm, localizo onde está input email pois 
   quero necessariamente adicionar anteriormente a ele */
   const inputEmail = formulario.querySelector('input[type="email"]');
   contentForm.insertBefore(nome, inputEmail);

   const confSenha = document.createElement('input');
   confSenha.type = 'password';
   confSenha.placeholder = "Confirme sua senha";

    /*Adicionar confSenha como "child" de form que já contem
    4 elementos: input nome[0] input email[1] input password[2]
    button btn[3] ao adicionar conftSenha antes de btn[3] 
    portanto utilizar inserBefore() e identificar a posição */

   contentForm.insertBefore(confSenha, contentForm.children[3]);

   const btnRegister = formulario.querySelector('button');
   btnRegister.textContent = "Criar conta"; 

   Footer();
}