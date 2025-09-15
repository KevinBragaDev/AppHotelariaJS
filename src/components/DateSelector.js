export default function dateContainer() {
    const DateContainer = document.createElement('div');
    DateContainer.className = 'p-4 shadow-lg date-container';

    const regiao = document.createElement('input');
        regiao.type = 'search';
        regiao.placeholder = "Onde voce esta indo?";
        DateContainer.appendChild(regiao);

    const data = document.createElement('input');
        data.type = 'date';
        data.placeholder = "Data de check-in";
        DateContainer.appendChild(data);

    
    const pessoasGroup = document.createElement('div');
    
        pessoasGroup.innerHTML = `
    <div class="combo-box">
  <button class="combo-button" type="button" aria-haspopup="listbox" aria-expanded="false">
    Adultos - 0, Crianças - 0, Quartos - 1
  </button>
  <div class="combo-dropdown" hidden>
    <div class="item">
      <span>Adultos</span>
      <button class="minus" data-target="adultos">-</button>
      <span class="number" id="adultos">0</span>
      <button class="plus" data-target="adultos">+</button>
    </div>
    <div class="item">
      <span>Crianças</span>
      <button class="minus" data-target="criancas">-</button>
      <span class="number" id="criancas">0</span>
      <button class="plus" data-target="criancas">+</button>
    </div>
    <div class="item">
      <span>Quartos</span>
      <button class="minus" data-target="quartos">-</button>
      <span class="number" id="quartos">1</span>
      <button class="plus" data-target="quartos">+</button>
    </div>
  </div>
</div>
        `;
        
            DateContainer.appendChild(pessoasGroup);

    const botao = document.createElement('button');
        botao.type = 'submit';
        botao.textContent = "Entrar";
        DateContainer.appendChild(botao);

        const comboBox = pessoasGroup.querySelector('.combo-box');
const button = comboBox.querySelector('.combo-button');
const dropdown = comboBox.querySelector('.combo-dropdown');

const counts = {
  adultos: 0,
  criancas: 0,
  quartos: 1
};

function updateButtonLabel() {
  button.textContent = `Adultos - ${counts.adultos}, Crianças - ${counts.criancas}, Quartos - ${counts.quartos}`;
}

button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  dropdown.hidden = expanded;
});

dropdown.querySelectorAll('button.plus').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    counts[target]++;
    updateDropdownNumber(target);
    updateButtonLabel();
  });
});

dropdown.querySelectorAll('button.minus').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (counts[target] > (target === 'quartos' ? 1 : 0)) { // quartos min 1
      counts[target]--;
      updateDropdownNumber(target);
      updateButtonLabel();
    }
  });
});

function updateDropdownNumber(target) {
  dropdown.querySelector(`#${target}`).textContent = counts[target];
}

updateButtonLabel();


    return DateContainer;
}


