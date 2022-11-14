fetch('https://amazing-events.herokuapp.com/api/events')
    .then(response => response.json())
    .then(eventsFetch => {
        const allEvents = eventsFetch.events
        const currentDate = eventsFetch.currentDate
        const pastEvents = createPastEvents(allEvents, currentDate)
        const upcomingEvents = createUpcomingEvents(allEvents, currentDate)
        const allCategories = allEvents.map((e) => e.category)
        const categories = new Set(allCategories)
        const arrayCategories = Array.from(categories)
        if (form) printCategories(arrayCategories, form)
        home ? printCards(allEvents, 'home-cards') :
        past ? printCards(pastEvents, 'past-cards') :
        upcoming ? printCards(upcomingEvents, 'upcoming-cards') : ''
        if (form) {
            form.addEventListener('change', () => {
                let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => e.value)
                let searchValue = search.value.toLowerCase().trim()
                if (home != null) {
                    let eventFilter = checkboxFilter(allEvents, checked)
                    let searchFilterr = searchFilter(eventFilter, searchValue)
                    printCards(searchFilterr, 'home-cards')
                } else if (past != null) {
                    let eventFilter = checkboxFilter(pastEvents, checked)
                    let searchFilterr = searchFilter(eventFilter, searchValue)
                    printCards(searchFilterr, 'past-cards')
                } else if (upcoming != null) {
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
    })

function printCards(events, id) {
    let fragment = new DocumentFragment()
    const cardsContainer = document.getElementById(id)
    cardsContainer.innerHTML = ''
    events.forEach((e) => {
        let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `<div>
            <img class="card-img" src=${e.image} alt="${e.category}">
        </div>
        <div>
        <div class="card-title">
            <h3>${e.name}</h3>
            <p>${e.description}</p>
        </div>
        <div class="card-info">
        <div>
            <p>Price: $ ${e.price}</p>
        </div>
        <div class="more-info">
            <p><a href="./details.html?id=${e._id}">More Info</a></p>
        </div>
    </div>
</div>`
        fragment.appendChild(div)
    })
    return cardsContainer.appendChild(fragment)
}

function createPastEvents(events, currentDate) {
    const pastEvents = events.filter((e) => e.date < currentDate)
    return pastEvents
}

function createUpcomingEvents(events, currentDate) {
    const upcomingEvents = events.filter((e) => e.date > currentDate)
    return upcomingEvents
}

function printCategories(categories, container) {
    let checkboxes = ''
    categories.forEach((e) =>
        checkboxes += `<div class="main.form">
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

const form = document.getElementById('main-form')
const search = document.getElementById('search')
const home = document.getElementById('home-cards')
const past = document.getElementById('past-cards')
const upcoming = document.getElementById('upcoming-cards')