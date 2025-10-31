import { getToken } from "./authAPI.js";

export async function finishedOrder(metodoPagamento, reservations) {
    const url = "api/order/reservas";
    const body = {
        pagamento: metodoPagamento,
        quartos: reservations.map(item => (
            {
                id: item.id,
                inicio: item.checkIn,
                fim: item.checkOut
            }
        ))
    };
    
    const token = getToken?.();
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        credentials: "same-origin",
        body: JSON.stringify(body)
    });
    let data = null;
    try {
        //Retorno em json() da requisição armazenado em data
        data = await res.json();
    }
    catch { data = null; }
    if (!res.ok) {
        const message = `Erro ao enviar pedido: ${res.status}`;
        return {ok: false, raw: data, message}; }
    return {
        ok: true,
        raw: data
    }}