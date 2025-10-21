export async function finishedOrder(items) {
    const url = "api/order/reserva";
    const body = {
        cliente_id: 30,

        
        pagamento: "pix",
        quartos: items.map(it => (
            {
                id: it.roomId,
                inicio: it.checkIn,
                fim: it.checkOut
            }
        ))
    };

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "same-origin"
    });

    let data = null;
    try {
        data = await res.json();
    } catch {
        data = null;
    }
    if(!data) {
        const message = `Erro ao finalizar o pedido: ${res.status}`;
        return { ok: false, raw: data, message }; }
        return {
            ok: true,
            raw: data
        }

    if (!res.ok) {
        const message = `Erro ao finalizar o pedido: ${res.status}`;
        throw new Error(message);
    }
    return res.json();
}