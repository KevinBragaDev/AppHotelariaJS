import { createRoom } from '../api/roomsAPI.js';

export default function CadQuarto() {
    
    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';

    divRoot.style.height = '100vh';

    const container = document.createElement('div');
    container.className = 'card p-4 shadow-lg';
    container.style.width = '100%';
    container.style.maxWidth = '600px';
    container.style.marginTop = '-200px';

    const container2 = document.createElement('div');
    container2.className = 'container2';
    container2.style.display = 'flex';
    container2.style.justifyContent = 'center';
    container2.style.alignItems = 'center';

    container2.appendChild(container);
    divRoot.appendChild(container2);

    const titulo = document.createElement('h1');
    titulo.textContent = 'Cadastrar Novo Quarto';
    titulo.className = 'titulo';
    titulo.style.textAlign = 'center';
    titulo.style.marginBottom = '30px';

    const formulario = document.createElement('form');
    formulario.className = 'd-flex flex-column';
    formulario.id = 'formCadQuarto';

    // Campo Nome do Quarto
    const labelNome = document.createElement('label');
    labelNome.textContent = 'Nome do Quarto:';
    labelNome.style.marginBottom = '5px';
    labelNome.style.fontWeight = 'bold';

    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.name = 'nome';
    inputNome.placeholder = "Ex: Suíte Master, Quarto Deluxe";
    inputNome.className = 'form-control mb-3';
    inputNome.required = true;

    // Campo Número do Quarto
    const labelNumero = document.createElement('label');
    labelNumero.textContent = 'Número do Quarto:';
    labelNumero.style.marginBottom = '5px';
    labelNumero.style.fontWeight = 'bold';

    const inputNumero = document.createElement('input');
    inputNumero.type = 'number';
    inputNumero.name = 'numero';
    inputNumero.placeholder = "Ex: 101, 205";
    inputNumero.className = 'form-control mb-3';
    inputNumero.required = true;
    inputNumero.min = '1';

    // Campo Quantidade de Camas de Casal
    const labelCamaCasal = document.createElement('label');
    labelCamaCasal.textContent = 'Quantidade de Camas de Casal:';
    labelCamaCasal.style.marginBottom = '5px';
    labelCamaCasal.style.fontWeight = 'bold';

    const inputCamaCasal = document.createElement('input');
    inputCamaCasal.type = 'number';
    inputCamaCasal.name = 'qtd_casal';
    inputCamaCasal.placeholder = "Ex: 1";
    inputCamaCasal.className = 'form-control mb-3';
    inputCamaCasal.required = true;
    inputCamaCasal.min = '0';

    // Campo Quantidade de Camas de Solteiro
    const labelCamaSolteiro = document.createElement('label');
    labelCamaSolteiro.textContent = 'Quantidade de Camas de Solteiro:';
    labelCamaSolteiro.style.marginBottom = '5px';
    labelCamaSolteiro.style.fontWeight = 'bold';

    const inputCamaSolteiro = document.createElement('input');
    inputCamaSolteiro.type = 'number';
    inputCamaSolteiro.name = 'qtd_solteiro';
    inputCamaSolteiro.placeholder = "Ex: 2";
    inputCamaSolteiro.className = 'form-control mb-3';
    inputCamaSolteiro.required = true;
    inputCamaSolteiro.min = '0';

    // Campo Preço
    const labelPreco = document.createElement('label');
    labelPreco.textContent = 'Preço por Noite (R$):';
    labelPreco.style.marginBottom = '5px';
    labelPreco.style.fontWeight = 'bold';

    const inputPreco = document.createElement('input');
    inputPreco.type = 'number';
    inputPreco.name = 'preco';
    inputPreco.placeholder = "Ex: 250.00";
    inputPreco.className = 'form-control mb-3';
    inputPreco.required = true;
    inputPreco.min = '0';
    inputPreco.step = '0.01';

    // Campo Disponibilidade
    const labelDisponivel = document.createElement('label');
    labelDisponivel.textContent = 'Disponível:';
    labelDisponivel.style.marginBottom = '5px';
    labelDisponivel.style.fontWeight = 'bold';

    const selectDisponivel = document.createElement('select');
    selectDisponivel.name = 'disponivel';
    selectDisponivel.className = 'form-control mb-4';
    selectDisponivel.required = true;

    const optionSim = document.createElement('option');
    optionSim.value = '1';
    optionSim.textContent = 'Sim';

    const optionNao = document.createElement('option');
    optionNao.value = '0';
    optionNao.textContent = 'Não';

    selectDisponivel.appendChild(optionSim);
    selectDisponivel.appendChild(optionNao);

    // Campo Upload de Imagem
    const labelImagem = document.createElement('label');
    labelImagem.textContent = 'Imagem do Quarto:';
    labelImagem.style.marginBottom = '5px';
    labelImagem.style.fontWeight = 'bold';

    // substituído: inputImagem como elemento input -> agora é um container com input habilitado (id=formFileMultiple, name=imagem)
    const inputImagemContainer = document.createElement('div');
    inputImagemContainer.innerHTML = `
    <div class="mb-3">
      <label for="formFileMultiple" class="form-label">Escolher imagens (opcional)</label>
      <input class="form-control" type="file" id="formFileMultiple" name="imagem" accept="image/*" multiple>
    </div>
    `;

    // Preview da imagem (suporta múltiplas)
    const previewContainer = document.createElement('div');
    previewContainer.className = 'mb-3';
    previewContainer.style.textAlign = 'center';

    const previewGrid = document.createElement('div');
    previewGrid.id = 'preview-imagens';
    previewGrid.style.display = 'flex';
    previewGrid.style.flexWrap = 'wrap';
    previewGrid.style.gap = '8px';
    previewGrid.style.justifyContent = 'center';
    previewGrid.style.marginTop = '10px';

    const previewLabel = document.createElement('p');
    previewLabel.id = 'preview-label';
    previewLabel.textContent = 'Nenhuma imagem selecionada';
    previewLabel.style.color = '#666';
    previewLabel.style.fontSize = '14px';
    previewLabel.style.marginTop = '10px';

    previewContainer.appendChild(previewGrid);
    previewContainer.appendChild(previewLabel);

    // Event listener para preview da imagem (mostra todas as selecionadas)
    const formFileInput = inputImagemContainer.querySelector('#formFileMultiple');
    if (formFileInput) {
        formFileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files || []);
            const previewGridEl = document.getElementById('preview-imagens');
            const previewLabelEl = document.getElementById('preview-label');

            // limpar previews anteriores
            previewGridEl.innerHTML = '';

            if (files.length > 0) {
                previewLabelEl.style.display = 'none';
                files.forEach((file) => {
                    if (!file.type.startsWith('image/')) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        const img = document.createElement('img');
                        img.src = ev.target.result;
                        img.style.maxWidth = '150px';
                        img.style.maxHeight = '120px';
                        img.style.objectFit = 'cover';
                        img.style.border = '1px solid #ddd';
                        img.style.borderRadius = '6px';
                        img.style.padding = '2px';
                        previewGridEl.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                previewLabelEl.style.display = 'block';
            }
        });
    }

    // Botões
    const divBotoes = document.createElement('div');
    divBotoes.className = 'd-flex gap-2 justify-content-center';

    const btnCadastrar = document.createElement('button');
    btnCadastrar.type = 'submit';
    btnCadastrar.textContent = 'Cadastrar Quarto';
    btnCadastrar.className = 'btn btn-primary';
    btnCadastrar.style.flex = '1';

    const btnCancelar = document.createElement('button');
    btnCancelar.type = 'button';
    btnCancelar.textContent = 'Cancelar';
    btnCancelar.className = 'btn btn-secondary';
    btnCancelar.style.flex = '1';

    divBotoes.appendChild(btnCadastrar);
    divBotoes.appendChild(btnCancelar);

    // Adicionar elementos ao formulário
    formulario.appendChild(labelNome);
    formulario.appendChild(inputNome);
    formulario.appendChild(labelNumero);
    formulario.appendChild(inputNumero);
    formulario.appendChild(labelCamaCasal);
    formulario.appendChild(inputCamaCasal);
    formulario.appendChild(labelCamaSolteiro);
    formulario.appendChild(inputCamaSolteiro);
    formulario.appendChild(labelPreco);
    formulario.appendChild(inputPreco);
    formulario.appendChild(labelDisponivel);
    formulario.appendChild(selectDisponivel);
    formulario.appendChild(labelImagem);
    formulario.appendChild(inputImagemContainer);
    formulario.appendChild(previewContainer);
    formulario.appendChild(divBotoes);

    // Adicionar elementos ao container
    container.appendChild(titulo);
    container.appendChild(formulario);

    // Event listeners
    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = inputNome.value.trim();
        const numero = parseInt(inputNumero.value.trim(), 10);
        const qtd_casal = parseInt(inputCamaCasal.value.trim(), 10);
        const qtd_solteiro = parseInt(inputCamaSolteiro.value.trim(), 10);
        const preco = parseFloat(inputPreco.value.trim());
        const disponivel = selectDisponivel.value === '1' ? true : false;

        try {
            const result = createRoom(nome,numero,qtd_casal,qtd_solteiro,preco,disponivel);
            alert('Quarto cadastrado com sucesso!');
        } catch {
            console.log("erro inesperado!");
        }
    });

    btnCancelar.addEventListener('click', () => {
        // Voltar para a página anterior ou home
        window.history.back();
    });

    return container;
}
