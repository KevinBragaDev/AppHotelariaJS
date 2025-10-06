export default function dateContainer() {
    const DateContainer = document.createElement('div');
    DateContainer.className = 'p-4 shadow-lg date-container';
    const dateCheckIn = document.createElement('input');
    dateCheckIn.type = 'date';
    dateCheckIn.className = 'card p-3 shadow-lg inputDate';
    const dateCheckOut = document.createElement('input');
    dateCheckOut.type = 'date';
    dateCheckOut.className = 'card p-3 shadow-lg inputDate';
    const guestAmount = document.createElement('select');
    guestAmount.className = 'card p-3 shadow-lg inputDate';
    guestAmount.innerHTML =
    `
    <option value="">Quantas Pessoas?</option>
    <option value="1">1 pessoa</option>
    <option value="2">2 pessoas</option>
    <option value="3">3 pessoas</option>
    <option value="4">4 pessoas</option>
    <option value="5">5 ou mais pessoas</option>`;
    const btnSearchRoom = document.createElement('button');
    btnSearchRoom.type = 'submit';
    btnSearchRoom.textContent = 'Pesquisar';
    btnSearchRoom.className = 'btn btn-primary';
    DateContainer.appendChild(dateCheckIn);
    DateContainer.appendChild(dateCheckOut);
    DateContainer.appendChild(guestAmount);
    DateContainer.appendChild(btnSearchRoom);
    return DateContainer;

}


