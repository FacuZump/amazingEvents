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
            <p><a href="./descript.html">More Info</a></p>
        </div>
    </div>
</div>`
        fragment.appendChild(div)
    }
    return cardsContainer.appendChild(fragment)
}

function createPastEvents(data) {
    const pastEvents = []
    for (let i = 0; i < data.events.length; i++) {
        if (data.events[i].date < data.currentDate) {
            pastEvents.push(data.events[i])
        }
    }
    return pastEvents
}

function createUpcomingEvents(data) {
    const upcomingEvents = []
    for (let i = 0; i < data.events.length; i++) {
        if (data.events[i].date > data.currentDate) {
            upcomingEvents.push(data.events[i])
        }
    }
    return upcomingEvents
}

const pastEvents = createPastEvents(data)
const upcomingEvents = createUpcomingEvents(data)
const allEvents = data.events

const allCategories = allEvents.filter((e) => e.category).map((e) => e.category)
const categories = new Set(allCategories)
const arrayCategorias = Array.from(categories)


function printCategories(categories, conteiner) {
    let template = ''
    categories.forEach((e) =>
        template += `<div>
                    <input type="checkbox" value="${e}" name="${e}" id="${e}" checked>
                    <label for="${e}">${e}</label>
                    </div>`);
    conteiner.innerHTML += template
}

let form = document.getElementById('main-form')
printCategories(arrayCategorias, form)
form.addEventListener('change', () => {
    let check = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(e => e.value)
    if (document.getElementById('home-cards') != null) {
        let eventosFiltrados = categoriesFilter(allEvents, check)
        printCards(eventosFiltrados, 'home-cards')
    } else if (document.getElementById('past-cards') != null) {
        let eventosFiltrados = categoriesFilter(pastEvents, check)
        printCards(eventosFiltrados, 'past-cards')
    } else if (document.getElementById('upcoming-cards') != null) {
        let eventosFiltrados = categoriesFilter(upcomingEvents, check)
        printCards(eventosFiltrados, 'upcoming-cards')
    }
})

function categoriesFilter(allEvents, check) {
    let fn = e => check.includes(e.category)
    let filterEvents = allEvents.filter(fn)
    console.log(filterEvents)
    return filterEvents
}

//ternarios, pintan las cartas la 1era vez
document.getElementById('home-cards')     ? printCards(allEvents, 'home-cards') : 
document.getElementById('past-cards')     ? printCards(pastEvents, 'past-cards') :
document.getElementById('upcoming-cards') ? printCards(upcomingEvents, 'upcoming-cards') : ''