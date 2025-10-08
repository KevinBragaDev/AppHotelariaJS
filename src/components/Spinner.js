export default function Spinner() {
    const spinnerContainer = document.createElement('div');
    spinnerContainer.className = 'spinner-container';
    spinnerContainer.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Carregando...</span>
            </div>
        </div>
        <div class="text-center">
            <p class="text-muted mt-2">Buscando quartos disponíveis...</p>
        </div>
    `;
    return spinnerContainer;
}