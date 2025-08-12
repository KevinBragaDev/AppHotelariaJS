
export default function LoginForm() {
    const formulario = document.createElement('form');
    formulario.className = 'd-flex flex-column';

    const email = document.createElement('input');
    email.type = 'email';
    email.placeholder = "Digite seu e-mail";
    formulario.appendChild(email);

    const password = document.createElement('input');
    password.type = 'password';
    password.placeholder = "Digite sua senha";
    formulario.appendChild(password);

    const btnAauth = document.createElement('button');
    btnAauth.type = 'submit';
    btnAauth.textContent = "Entrar";
    btnAauth.className = 'btn btn-primary';

    formulario.appendChild(btnAauth);

    return formulario;
}
