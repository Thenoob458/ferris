const lista = document.querySelector('tbody')
const busca = document.querySelector('.adicionar')
const input = document.querySelector('.input')
const botao = document.querySelector('.botao')

const fetchAll = async () => {
    const response = await fetch('http://localhost:3333/tickets')
    const tickets =  await response.json()

    return tickets
}

const searchAll = async (event) =>{
    event.preventDefault()

    lista.innerHTML = ''

    const response = await fetch(`http://localhost:3333/searchAll/${input.value}`)
    const search = await response.json()

    search.forEach((ticket) => {
        const tr = createRow(ticket)
       lista.appendChild(tr)
    })

    input.value = ''
}

const searchAll_botao = async (event) =>{
    event.preventDefault()

    if (input.value == '') {
        return
    }

    lista.innerHTML = ''

    const response = await fetch(`http://localhost:3333/searchAll/${input.value}`)
    const search = await response.json()

    search.forEach((ticket) => {
        const tr = createRow(ticket)
       lista.appendChild(tr)
    })

    input.value = ''
}



const createElement = (tag, innerText = '') => {
    const elemento = document.createElement(tag)
    elemento.innerText = innerText

    return elemento
}

const createRow = (ticket) => {
    const { numero, data } = ticket

    const tr = createElement('tr')
    const tdNumero = createElement('td', numero)
    const tdData = createElement('td', data)

    tr.appendChild(tdNumero)
    tr.appendChild(tdData)
    
    return tr
}

const loadAll = async () => {
    const tickets = await fetchAll()

    lista.innerHTML = ''

    tickets.forEach((ticket) => {
       const tr = createRow(ticket)
       lista.appendChild(tr)
    });
}

busca.addEventListener('submit', searchAll)
botao.addEventListener('click', searchAll_botao)


loadAll()

