export async function createRequest(nome, cpf, telefone, email, senha) {
    const dados = {nome, cpf, telefone, email, senha};
    const response = await fetch("api/clientes", {
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
        // Se nao for JSON valido, data permanece null
        data = null;
    }

    return {
        ok: true,
        raw: data
    }    
    
}