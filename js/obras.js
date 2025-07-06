//Referência aos elementos
document.addEventListener('DOMContentLoaded', () => {
  const obrasKey = 'obras';
  let obras = JSON.parse(localStorage.getItem(obrasKey)) || [];
  const tableBody    = document.querySelector('#obrasTable tbody');
  const btnAddObra   = document.getElementById('btnAddObra');
  const modal        = document.getElementById('modalObra');
  const form         = document.getElementById('formObra');
  const modalTitle   = document.getElementById('modalObraTitle');
  const btnCancel    = document.getElementById('btnCancelObra');
  
  let editId = null;

//Renderiza a tabela de obras
function renderObras() {
tableBody.innerHTML = '';
obras.forEach(o => {
    const tr = document.createElement('tr');
    tr.dataset.id = o.id;
    const dataInicio = new Date(o.dataInicio).toLocaleDateString('pt-BR');
    const dataFim = o.dataFim
    ? new Date(o.dataFim).toLocaleDateString('pt-BR')
    : '';
    tr.innerHTML = `
    <td>${o.nome}</td>
    <td>${o.endereco}</td>
    <td>${dataInicio}</td>
    <td>${dataFim}</td>
    <td>${o.status}</td>
    <td>
        <button class="button-editar">Editar</button>
        <button class="button-excluir">Excluir</button>
    </td>`;
    tableBody.appendChild(tr);
});
}

//Abre modal novo ou edição
function openModal(isEdit, obra = null) {
editId = isEdit ? obra.id : null;
modalTitle.textContent = isEdit ? 'Editar Obra' : 'Nova Obra';
form.reset();

if (isEdit && obra) {
    document.getElementById('nomeInput').value         = obra.nome;
    document.getElementById('enderecoInput').value     = obra.endereco;
    document.getElementById('dataInicioInput').value   = obra.dataInicio;
    document.getElementById('dataFimInput').value      = obra.dataFim || '';
    document.getElementById('statusInput').value       = obra.status;
}

modal.classList.remove('hidden');
}

//Inicial render
renderObras();

//Eventos de edição e exclusão
tableBody.addEventListener('click', (e) => {
const tr = e.target.closest('tr');
if (!tr) return;

const id = tr.dataset.id;
const obra = obras.find(o => o.id === id);

if (e.target.classList.contains('button-editar')) {
    openModal(true, obra);
}
if (e.target.classList.contains('button-excluir')) {
    if (confirm('Deseja realmente excluir esta obra?')) {
    obras = obras.filter(o => o.id !== id);
    localStorage.setItem(obrasKey, JSON.stringify(obras));
    renderObras();
    }
}
});

//Botão +Nova Obra
btnAddObra.addEventListener('click', () => openModal(false));

//Cancelar modal
btnCancel.addEventListener('click', () => {
modal.classList.add('hidden');
editId = null;
});

//Submissão do formulário
form.addEventListener('submit', (e) => {
e.preventDefault();

const nova = {
    id: editId || Date.now().toString(),
    nome: document.getElementById('nomeInput').value.trim(),
    endereco: document.getElementById('enderecoInput').value.trim(),
    dataInicio: document.getElementById('dataInicioInput').value,
    dataFim: document.getElementById('dataFimInput').value,
    status: document.getElementById('statusInput').value
};

if (editId) {
    obras = obras.map(o => o.id === editId ? nova : o);
} else {
    obras.push(nova);
}

localStorage.setItem(obrasKey, JSON.stringify(obras));
renderObras();
modal.classList.add('hidden');
editId = null;
});

//Filtro de busca na tabela
document.getElementById('searchObraInput').addEventListener('input', function() {
const termo = this.value.toLowerCase();
tableBody.querySelectorAll('tr').forEach(row => {
    row.style.display = row.textContent
    .toLowerCase()
    .includes(termo) ? '' : 'none';
});
});
});
