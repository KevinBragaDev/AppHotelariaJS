export async function loginRequest(email, senha) {
    const dados = {email, password: senha};


    const response = await fetch ("api/login/client", {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
         body:JSON.stringify(dados),
        //body: new URLSearchParams({ "email":email, "password":senha }).toString(),

        /* URL da requisição é a mesma da origem do front (mesmo protocolo http/
        mesmo dominio - local/mesma porta 80 do servidor web apache)
        Front: http://localhost/PaginaWeb/public/index.html 
        Back: http://localhost/PaginaWeb/api/login.php 
        */
       credentials: "same-origin"
    });
       
    //Interpreta a resposta como JSON
    let data = null;
    try {
        data = await response.json();
    }
    catch{
        // Se nao for JSON valido, data permanece null
        data = null;
    }
    
    if (!data || !data.token) {
        const message = "Resposta invalida do servidor. Token ausente";
        return {ok: false, token: null, raw: data, message};
    }

    return {
        ok: true,
        token: data.token,
        raw: data
    }    
}
/*Função para salvar a chave token apos autenticação confirmada,
ao salvar no local storage, o ususario podera mudar de pagina, fechar
o site e ainda assim permanecer logado, DESDE QUE O TEMPO NAO TENHA EXPIRADO(1h)*/
export function saveToken(token) {
    localStorage.setItem("auth_token", token);
}

//Recuperar a chave a cada página que o usuario navegar
export function getToken() {
    localStorage.getItem("auth_token");
}

//Funçao para remover a chave token quandom o usuario deslogar
export function clearToken(){
    localStorage.removeItem("auth_token");
}

