//Referências aos elementos
document.addEventListener('DOMContentLoaded', () => {
  const tableBody       = document.querySelector('#lancamentosTable tbody');
  const btnAddMovimento = document.getElementById('btnAddMovimento');
  const modal           = document.getElementById('modalLancamento');
  const form            = document.getElementById('formLancamento');
  const modalTitle      = document.getElementById('modalTitle');
  const btnCancel       = document.getElementById('btnCancel');

  let editRow = null; //armazena a tr que está em edição

//Abre modal para criar lançamento
function openModal(tipo, row) {
    editRow = row;
    modalTitle.textContent = row ? 'Editar Lançamento' : 'Novo Movimento';
    form.reset();

    if (row) {
      form.obraInput.value      = row.cells[0].textContent;
      form.tipoInput.value      = row.cells[1].textContent;
      form.dataInput.value      = row.cells[2].textContent.split('/').reverse().join('-');
      form.valorInput.value     = row.cells[3].textContent.replace(/[^\d,]/g, '').replace(',', '.');
      form.descricaoInput.value = row.cells[4].textContent;
    }

    modal.classList.remove('hidden');
  }

//Eventos para editar/excluir
tableBody.addEventListener('click', e => {
  const tr = e.target.closest('tr');
  if (!tr) return;
  if (e.target.classList.contains('button-editar')) {
    openModal(tr.cells[1].textContent, tr);
  } else if (e.target.classList.contains('button-excluir')) {
    if (confirm('Deseja realmente excluir este lançamento?')) {
      tr.remove();
    }
  }
});

//Fecha modal
btnCancel.addEventListener('click', () => {modal.classList.add('hidden');});

//Evento de +movimento
btnAddMovimento.addEventListener('click', () => openModal('Movimento'));

//Submissão do formulário
form.addEventListener('submit', e => {
  e.preventDefault();
  const obra  = form.obraInput.value;
  const tipo  = form.tipoInput.value;
  const dataObj = form.dataInput.valueAsDate;
  const data    = dataObj.toLocaleDateString('pt-BR');
  const valor = Number(form.valorInput.value).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const desc  = form.descricaoInput.value;

  if (editRow) {
    //Atualiza linha existente
    editRow.cells[0].textContent = obra;
    editRow.cells[1].textContent = tipo;
    editRow.cells[2].textContent = data;
    editRow.cells[3].textContent = valor;
    editRow.cells[4].textContent = desc;
  } else {
    //Cria nova linha
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${obra}</td>
      <td>${tipo}</td>
      <td>${data}</td>
      <td>${valor}</td>
      <td>${desc}</td>
      <td>
        <button class="button-editar">Editar</button>
        <button class="button-excluir">Excluir</button>
      </td>`;
    tableBody.appendChild(tr);

  }

  modal.classList.add('hidden');
  editRow = null;
});

//Filtrar na tabela
document.getElementById('searchInput').addEventListener('input', function() {
  const termo = this.value.toLowerCase();
  tableBody.querySelectorAll('tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(termo)
      ? '' : 'none';
  });
});
});