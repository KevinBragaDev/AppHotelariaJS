import renderLoginPage from "./pages/login.js";
import renderRegisterPage from "./pages/register.js";   
import renderHomePage from "./pages/home.js";

const routes = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage,
    "/home": renderHomePage
    //Novas paginas aqui adicionadas conforme desenvolvidas
}

//Obtem o caminho atual a partir do nome
function getPath() {
    // Exemplo: Obtem "/login"
    const url = (location.pathname || "").replace("/paginaWeb/", "/").trim();
    //retorna url se começar com "/", se nao, retorna "/home" como padrao
    return url && url.startsWith("/") ? url : "/home";
}

//Decide o que renderizar com base na rota atual
function renderRoutes() {
    const url = getPath(); //Lê a rota atual, ex. "/register"
    const render = routes[url] || routes["/home"]; //Busca esta rota no mapa
    render(); //Executa a função de render na pagina atual
}

//Renderização
document.addEventListener('DOMContentLoaded', renderRoutes);