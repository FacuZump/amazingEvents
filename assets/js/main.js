function printCards(events, id) {
    let fragment = new DocumentFragment()
    const cardsContainer = document.getElementById(id)
    cardsContainer.innerHTML = ''
    for (let card of events) {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `<div>
            <img class="card-img" src=${card.image} alt="${card.category}">
        </div>
        <div>
        <div class="card-title">
            <h3>${card.name}</h3>
            <p>${card.description}</p>
        </div>
        <div class="card-info">
        <div>
            <p>Price: $ ${card.price}</p>
        </div>
        <div class="more-info">
            <p><a href="./details.html?id=${card._id}">More Info</a></p>
        </div>
    </div>
</div>`
        fragment.appendChild(div)
    }
    return cardsContainer.appendChild(fragment)
}

function createPastEvents(events, currentDate) {
    const pastEvents = events.filter((e) => e.date > currentDate)
    return pastEvents
}

function createUpcomingEvents(events, currentDate) {
    const upcomingEvents = events.filter((e) => e.date < currentDate)
    return upcomingEvents
}

function printCategories(categories, container) {
    let checkboxes = ''
    categories.forEach((e) =>
        checkboxes += `<div>
    <input type="checkbox" value="${e}" name="${e.split(' ').join('').toLowerCase()}" id="${e.split(' ').join('').toLowerCase()}" checked>
    <label for="${e.split(' ').join('').toLowerCase()}">${e}</label>
    </div>`);
    container.innerHTML += checkboxes
}

function checkboxFilter(events, checked) {
    let filterEvents = events.filter(e => checked.includes(e.category))
    return filterEvents
}
function searchFilter(events, searchValue) {
    let filterSearch = events.filter(e => e.name.toLowerCase().trim().includes(searchValue))
    return filterSearch
}

let form = document.getElementById('main-form')
let search = document.getElementById('search')
let home = document.getElementById('home-cards')
let past = document.getElementById('past-cards')
let upcoming = document.getElementById('upcoming-cards')

const currentDate = data.currentDate
const allEvents = data.events
const pastEvents = createPastEvents(allEvents, currentDate)
const upcomingEvents = createUpcomingEvents(allEvents, currentDate)

const allCategories = allEvents.map((e) => e.category)
const categories = new Set(allCategories)
const arrayCategorias = Array.from(categories)


if (form) {
    form.addEventListener('change', () => {
        let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => e.value)
        let searchValue = search.value.toLowerCase().trim()
        if (document.getElementById('home-cards') != null) {
            let eventFilter = checkboxFilter(allEvents, checked)
            let searchFilterr = searchFilter(eventFilter, searchValue)
            printCards(searchFilterr, 'home-cards')
        } else if (document.getElementById('past-cards') != null) {
            let eventFilter = checkboxFilter(pastEvents, checked)
            let searchFilterr = searchFilter(eventFilter, searchValue)
            printCards(searchFilterr, 'past-cards')
        } else if (document.getElementById('upcoming-cards') != null) {
            let eventFilter = checkboxFilter(upcomingEvents, checked)
            let searchFilterr = searchFilter(eventFilter, searchValue)
            printCards(searchFilterr, 'upcoming-cards')
        }
    })
}

if (search) {
    search.addEventListener('keyup', () => {
        let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => e.value)
        let searchValue = search.value.toLowerCase().trim()
        if (document.getElementById('home-cards') != null) {
            let eventFilter = checkboxFilter(allEvents, checked)
            let searchFilterr = searchFilter(eventFilter, searchValue)
            printCards(searchFilterr, 'home-cards')
        } else if (document.getElementById('past-cards') != null) {
            let eventFilter = checkboxFilter(pastEvents, checked)
            let searchFilterr = searchFilter(eventFilter, searchValue)
            printCards(searchFilterr, 'past-cards')
        } else if (document.getElementById('upcoming-cards') != null) {
            let eventFilter = checkboxFilter(upcomingEvents, checked)
            let searchFilterr = searchFilter(eventFilter, searchValue)
            printCards(searchFilterr, 'upcoming-cards')
        }
    })
}
//pinta las categorias
if (form) printCategories(arrayCategorias, form)
//ternarios, pintan las cartas la 1era vez
home ? printCards(allEvents, 'home-cards') :
    past ? printCards(pastEvents, 'past-cards') :
        upcoming ? printCards(upcomingEvents, 'upcoming-cards') : ''