export default function Form() {
    
    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';

    divRoot.style.height = '100vh';

    const container = document.createElement('div');
    container.className = 'card p-4 shadow-lg ';
    container.style.width = '100%';
    container.style.maxWidth = '500px';
    container.style.marginTop = '-300px';

    const container2 = document.createElement('div');
    container2.className = 'container2';
    container2.style.display = 'flex';
    container2.style.justifyContent = 'center';
    container2.style.alignItems = 'center';

    container2.appendChild(container)

    divRoot.appendChild(container2);

    const titulo = document.createElement('h1');
    titulo.textContent = 'Faça seu login';
    titulo.className = 'titulo';

    const formulario = document.createElement('form');
    formulario.className = 'd-flex flex-column';


    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = "Digite seu e-mail";
    formulario.appendChild(inputEmail);


    const inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.placeholder = "Digite sua senha";
    formulario.appendChild(inputPassword);

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = "Entrar";
    btn.className = 'btn btn-primary';
    formulario.appendChild(btn);


    container.appendChild(titulo);
    container.appendChild(formulario);
    
    
    return container;
}