export async function loginRequest(email, senha) {
    const dados = {email, password: senha};

    // Tenta primeiro como cliente
    let response = await fetch ("api/login/client", {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
         body:JSON.stringify(dados),
       credentials: "same-origin"
    });
       
    //Interpreta a resposta como JSON
    let data = null;
    try {
        data = await response.json();
    }
    catch{
        data = null;
    }
    
    // Se o login como cliente foi bem-sucedido, retorna o resultado
    if (data && data.token) {
        return {
            ok: true,
            token: data.token,
            raw: data,
            userType: 'client'
        };
    }

    // Se não funcionou como cliente, tenta como employee
    response = await fetch ("api/login/employee", {
        method: "POST",
        headers: {
            "Accept":"application/json",
            "Content-Type": "application/json"
        },
         body:JSON.stringify(dados),
       credentials: "same-origin"
    });
       
    //Interpreta a resposta como JSON
    try {
        data = await response.json();
    }
    catch{
        data = null;
    }
    
    if (data && data.token) {
        return {
            ok: true,
            token: data.token,
            raw: data,
            userType: 'employee'
        };
    }

    // Se nenhum dos dois funcionou, retorna erro
    const message = "Credenciais inválidas ou usuário não encontrado";
    return {ok: false, token: null, raw: data, message};
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

