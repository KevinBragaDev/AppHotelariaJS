import LoginForm from "../components/form.js";

export default function renderRegisterPage() {
    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';



    const titulo = document.createElement('h1');
    titulo.textContent = 'Crie uma conta';
    titulo.className = 'titulo';
    titulo.style.texaAlign = 'center';

    const container = document.createElement('div');
    container.className = 'card p-4 shadow-lg';
    container.style.width = '100%';
    container.style.maxWidth = '500px';
    container.style.marginTop = '-300px';
    

    divRoot.appendChild(container);
    const formulario = Form();

    const nome = document.createElement('input');
    nome.placeholder = "Digite seu nome";

    const confPassword = document.createElement('input');
    confPassword.type = 'password';
    confPassword.placeholder = "Confirme a sua senha";
    

   
     const btnRegister = formulario.querySelector('button');
    btnRegister.textContent = "Criar conta";

    formulario.insertBefore(nome, formulario.firstChild);
    formulario.insertBefore(confPassword, formulario.children[3]);



    container.appendChild(titulo);
    container.appendChild(formulario);
    
    
    
}