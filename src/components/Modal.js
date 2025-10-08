export default function Modal(type = 'fields') {
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    
    let title, message, buttons;
    
    switch(type) {
        case 'fields':
            title = 'Campos Obrigatórios';
            message = `
                <p>Por favor, preencha todos os campos obrigatórios:</p>
                <ul>
                    <li>Data de Check-in</li>
                    <li>Data de Check-out</li>
                    <li>Número de hóspedes (deve ser maior que 0)</li>
                </ul>
            `;
            buttons = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Entendi</button>`;
            break;
            
        case 'date':
            title = 'Erro de Data';
            message = `
                <p>A data de check-out deve ser posterior à data de check-in.</p>
                <p>Por favor, verifique as datas selecionadas e tente novamente.</p>
            `;
            buttons = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Entendi</button>`;
            break;
            
        case 'no-rooms':
            title = 'Quartos Indisponíveis';
            message = `
                <p>Não há quartos disponíveis para o período selecionado.</p>
                <p>Tente alterar as datas ou o número de hóspedes e faça uma nova busca.</p>
            `;
            buttons = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Entendi</button>`;
            break;
            
        default:
            title = 'Aviso';
            message = '<p>Algo deu errado. Tente novamente.</p>';
            buttons = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>`;
    }
    
    modalContainer.innerHTML = `<div class="modal fade" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">${title}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ${message}
      </div>
      <div class="modal-footer">
        ${buttons}
      </div>
    </div>
  </div>
</div>`;
    return modalContainer;
}