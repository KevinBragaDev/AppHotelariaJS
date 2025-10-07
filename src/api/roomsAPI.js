// /* getToken() é uma função que retorna o valor do token armazenado no localStorage(),
// para que o usuario permaneça logado mesmo que mude de pagina e nao tenha que "re-logar"*/
// import { getToken } from "./authAPI";
// /* Listar todos os quartos independente de filtro */
// export async function listAllRoomsRequest() {
//     /* Retorna o valor do token armazenado (que comprova a autenticação do usuario) */
//     const token = getToken();
//     /* A função para listar os quartos precisa ser assincrona, pois epera-se uma "promise" de que ao chamar
//     o endpoint api/rooms (que executa o arquivo rooms.php no qual contem todas as requisiçoes possiveis),
//     este arquivo conversa com a Controller que, por sua vez, conversa com a Model (onde está a query SELECT) */
//     const response = await fetch("api/rooms", {
//         method: "GET",
//         headers: {
//             "Accept":"application/json",
//             "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
        

//     });

// }

export async function listAvailableRoomsRequest({ inicio, fim, qtd }) {
    const params = new URLSearchParams();
    if (inicio) params.set("inicio", inicio);
    if (fim) params.set("fim", fim);
    if (qtd !== null && qtd !== "") params.set("qtd", String(qtd));
    const url = `api/quartos/disponiveis?${params.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Accept": "application/json",
        },
            credentials: "same-origin"
        });

    let data = null;
    try {
        data = await response.json();
    }
    catch {
        data = null;
    }
    if (!response.ok) {
        const msg = data?.message || "Falha ao buscar quartos disponíveis!";
        throw new Error(msg);
    }
    const quartos = Array.isArray(data?.quartos) ? data.quartos : [];
    console.log(quartos);
    return quartos;
}
