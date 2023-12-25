const lista = document.querySelector('tbody')
const adicionar = document.querySelector('.adicionar')
const input = document.querySelector('.input')
const botao = document.querySelector('.botao')

const fetchLastest = async () => {
    const response = await fetch('http://localhost:3333/lastest')
    const tickets =  await response.json()

    return tickets
}

const add = async (event) =>{
    event.preventDefault()

    const ticket = {
        numero: input.value
    }

    await fetch('http://localhost:3333/new', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(ticket)
    })

    
    loadLastest()
    input.value = ''
}

const add_botao = async (event) => {
    if (input.value == '') {
        return
    }

    event.preventDefault()

    const ticket = {
        numero: input.value
    }

    await fetch('http://localhost:3333/new', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(ticket)
    })

    
    loadLastest()
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

const loadLastest = async () => {
    const lastest = await fetchLastest()

    lista.innerHTML = ''

    lastest.forEach((ticket) => {
       const tr = createRow(ticket)
       lista.appendChild(tr)
    });
}

adicionar.addEventListener('submit', add)
botao.addEventListener('click', add_botao)

loadLastest()