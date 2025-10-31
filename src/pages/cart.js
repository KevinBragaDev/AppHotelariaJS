import Navbar from "../components/Navbar.js";
import Footer from "../components/footer.js";
import tabela from "../components/tabela.js";
import { clearHotel_Cart, getCart, getTotalItems } from "../store/cartStore.js";

export default function renderCartPage() {
    const nav = document.getElementById('navbar');
        nav.innerHTML = '';
    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';
    divRoot.style.height = '50vh';
        const navbar = Navbar();
        nav.appendChild(navbar);

        const total = getTotalItems();
        const reservations = getCart();
        const container = document.createElement('div');
        container.className = 'container mt-4';

        const header = document.createElement('div');
        header.className = 'd-flex justify-content-between align-items-between mb-3';

        header.innerHTML = 
        `
            <h3"class mb-0">Reservas</h3>
            <div>
                <button id="btnClear" class"btn btn-outline-center btn-sm">Limpar Carrinho</button>
            </div>
        `
        const table = document.createElement('div');
        if (reservations.length === 0) {
            table.innerHTML = `<div> class="alert alert-info" >Nenhuma reserva no carrinho.</div>`;
        } else {
            table.innerHTML = `
            <div class="table-responsive">
                <table class="table table-striped table-hover align-middle">
                    <thead class="table-success">
                        <tr>
                            <th>Nome do Quarto</th>
                            <th>Data de check-in</th>
                            <th>Data de check-out</th>
                            <th>Subtotal</th>
                        </tr>    
                    </thead>
                    <tbody>
                        ${reservations.map(item =>
                            `
                            <tr>
                                <td>${item.nome}</td>
                                <td>${item.checkIn}</td>
                                <td>${item.checkOut}</td>
                                <td>R$ ${item.subtotal}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th><th>
                            <th>
                                <h3 style="font-size: 19px">Total: R$${total}</h3>
                            </th>
                            <th>
                                <button id="btnFinalizar" class"btn btn-outline-success btn-sm"
                                data-bs-toggle="modal" data-bs-target="$ctaModal">Finalizar compra</button>

                            </th>
                        </tr>
                    </tfoot>
                </table>
            </div>
           `
         }    

        container.appendChild(header);
        container.appendChild(table);
        divRoot.appendChild(container);
                
        const btnClear = header.querySelector('btnClear');
            if(btnClear){
                addEventListener('click', () => {
                clearHotel_Cart();
                renderCartPage();
            });
        }
        
       

    const btnFinalizar = document.getElementById('btnFinalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener("click", async () => {
            const metodoPagamento = 'pix';
            try {
                const result = await finishedOrder(metodoPagamento, reservations);
                if(result.ok) {
                    alert('Compra efetuada com sucesso!');
                    clearHotel_Cart();
                    renderCartPage();
                } else {
                    alert(result.message ||'Erro ao realizar reserva.');
                }
            }catch(error) {
                alert(erro?.message || 'Erro na comunicação com o servidor.');
 
            }
           
        })
    }
}