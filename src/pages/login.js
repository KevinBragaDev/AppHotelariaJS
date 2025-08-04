import LoginForm from "../components/loginForm.js";

export default function renderLoginPage() {
    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '<h1>Login</h1>';
    const formulario = LoginForm();
    divRoot.appendChild(formulario);
}
