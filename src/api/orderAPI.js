export async function finishedOrder(items) {
    const url = "api/order/reserva";
    const body = {
        pagamento: "pix",
        quatos: items.map(it => (
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

    if (!res.ok) {
        const message = `Erro ao finalizar o pedido: ${res.status}`;
        throw new Error(message);
    }
    return res.json();
}