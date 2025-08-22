import renderLoginPage from "./pages/login.js";
import renderRegisterPage from "./pages/register.js";   

const routes = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage
    //Novas paginas aqui adicionadas conforme desenvolvidas
}

//Obtem o caminho atual a partir do hash da URL
function getPath() {
    //Obtem o hash (ex. "$/login"), remove o # e tira espaços
    const url = (location.hash || "").replace(/^#/, "").trim();
    //retorna url se começar com "/", se nao, retorna "/login" como padrao, posteriormente será /home
    return url && url.startsWith("/") ? url : "login";
}

//Decide o que renderizar com base na rota atual
function renderRoutes() {
    const url = getPath(); //Lê a rota atual, ex. "/register"
    const render = routes[url] || routes["/login"]; //Busca esta rota no mapa
    render(); //Executa a função de render na pagina atual
}

window.addEventListener("hashchange", renderRoutes);
//Renderização
document.addEventListener('DOMContentLoaded', renderRoutes);