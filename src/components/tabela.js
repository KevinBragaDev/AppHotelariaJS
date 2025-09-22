export default function tabela() {
  const tabelaContainer = document.createElement('div');
  
  tabelaContainer.innerHTML = `
  <div style="max-width: 1300px; margin: 0 auto;">
    <table class="table table-bordered">
      <thead>
        <tr class="table-primary">
          <th>Categoria de Quarto</th>
          <th>Quantas Pessoas?</th>
          <th>Preço para 4 diárias</th>
          <th>TOTAL A PAGAR</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-primary">
          <td>Quarto Duplo com Banheiro Privativo</td>
          <td>2</td>
          <td>R$ 1.110</td>
          <td>R$ 2.220</td>
        </tr>
        <tr class="table-secondary">
          <td>Quarto Duplo</td>
          <td>2</td>
          <td>R$ 2.381</td>
          <td>R$ 4.762</td>
        </tr>
        <tr class="table-success">
          <td>Quarto Duplo com Banheiro Privativo</td>
          <td>3</td>
          <td>R$ 1.110</td>
          <td>R$ 3.330</td>
        </tr>
        <tr class="table-danger">
          <td>Quarto Duplo</td>
          <td>3</td>
          <td>R$ 2.381</td>
          <td>R$ 7.143</td>
        </tr>
      </tbody>
    </table>

    <!-- Botão PAGAR abaixo da tabela -->
    <div class="text-end mt-3">
      <button class="btn btn-success">PAGAR</button>
    </div>
  `;

  return tabelaContainer;
}
