import Form from "../components/form.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import { createRequest } from "../api/clientesAPI.js";

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
   const inputNome = document.createElement('input');
   inputNome.type = 'text';
   inputNome.placeholder = "Digite seu nome";

   const Inputcpf = document.createElement('input');
    Inputcpf.type = 'text';
    Inputcpf.placeholder = "Digite seu CPF";

    const inputTelefone = document.createElement('input');
    inputTelefone.type = 'text';
    inputTelefone.placeholder = "Digite seu telefone";
    
   /*Para adicionar input nome ao contentForm, localizo onde está input email pois 
   quero necessariamente adicionar anteriormente a ele */
   const inputEmail = formulario.querySelector('input[type="email"]');
   contentForm.insertBefore(inputNome, inputEmail);

    contentForm.insertBefore(inputNome, inputEmail);
    contentForm.insertBefore(Inputcpf, contentForm.children[1]);
    contentForm.insertBefore(inputTelefone, contentForm.children[2]);

   const confSenha = document.createElement('input');
   confSenha.type = 'password';
   confSenha.placeholder = "Confirme sua senha";

    /*Adicionar confSenha como "child" de form que já contem
    4 elementos: input nome[0] input email[1] input password[2]
    button btn[3] ao adicionar conftSenha antes de btn[3] 
    portanto utilizar inserBefore() e identificar a posição */

   contentForm.insertBefore(confSenha, contentForm.children[5]);

   const btnRegister = formulario.querySelector('button');
   btnRegister.textContent = "Criar conta"; 
   Footer();

   contentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const nome = inputNome.value.trim();
      const cpf = Inputcpf.value.trim();
      const telefone = inputTelefone.value.trim();
      const email = inputEmail.value.trim();
      const password = inputNome.value.trim();
   

      try {
      const result = createRequest(nome, cpf, telefone, email, password);
      }
      catch{
         console.log("Erro inesperado!");
      }
   });
}