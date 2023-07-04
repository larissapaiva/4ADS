const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sFilme = document.querySelector('#m-filme')
const sSala = document.querySelector('#m-sala')
const sHora = document.querySelector('#m-hora')
const eSessao = document.querySelector('#m-estadoSessao')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sFilme.value = itens[index].filme
    sSala.value = itens[index].sala
    sHora.value = itens[index].hora
    
    id = index
  } else {
    sFilme.value = ''
    sSala.value = ''
    sHora.value = ''
    
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function toggleCompleted(index) {
    itens[index].sessao = !itens[index].sessao;
    setItensBD();
    loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement('tr')
  
  if (item.sessao) {
    tr.classList.add('completed');
  }

  tr.innerHTML = `
    <td>${item.filme}</td>
    <td>${item.sala}</td>
    <td>R$ ${item.hora}</td>
    <td>${item.sessao ? 'Finalizada' : ''}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    <td class="acao">
        <button onclick="toggleCompleted(${index})"><i class='bx bx-check'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sFilme.value == '' || sSala.value == '' || sHora.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].filme = sFilme.value
    itens[id].sala = sSala.value
    itens[id].hora = sHora.value
    
  } else {
    itens.push({'filme': sFilme.value, 'sala': sSala.value, 'hora': sHora.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()