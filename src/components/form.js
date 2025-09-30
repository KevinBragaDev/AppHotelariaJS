export default function Form() {
    
    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';

    divRoot.style.height = '100vh';

    const container = document.createElement('div');
    container.className = 'card p-4 shadow-lg formDiv';
    container.style.width = '100%';
    container.style.maxWidth = '500px';
    container.style.marginTop = '-300px';

    divRoot.appendChild(container);

    const titulo = document.createElement('h1');
    titulo.textContent = 'Faça seu login';
    titulo.className = 'titulo';

    const formulario = document.createElement('form');
    formulario.className = 'd-flex flex-column';


    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = "Digite seu e-mail";
    formulario.appendChild(inputEmail);


    const password = document.createElement('input');
    password.type = 'password';
    password.placeholder = "Digite sua senha";
    formulario.appendChild(password);

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = "Entrar";
    btn.className = 'btn btn-primary';
    formulario.appendChild(btn);


    container.appendChild(titulo);
    container.appendChild(formulario);
    
    
    return container;
}