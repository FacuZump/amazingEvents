url = ('https://amazing-events.herokuapp.com/api/events')
fetch(url)
    .then(response => response.json())
    .then(eventsFetch => {
        const allEvents = eventsFetch.events
        const queryString = location.search
        const params = new URLSearchParams(queryString)
        const id = params.get("id")
        const detailCard = allEvents.find(e => e._id === id)
        let detailContainer = document.getElementById('detail-container')
        detailContainer.innerHTML = `<div class="descript-card-container">
                        <div class="descript-card">
                            <div>
                                <img class="card-img" src=${detailCard.image} alt="${detailCard.category}">
                            </div>
                        </div>
                        <div class="descript-card">
                            <div>
                                <h2>${detailCard.name}</h2>
                                <h4>Place: ${detailCard.place}</h4>
                                <h4>Description: ${detailCard.description}</h4>
                                <h4>Date: ${detailCard.date}</h4>
                                <h4>Category: ${detailCard.category}</h4>
                                <h4>Capacity: ${detailCard.capacity}</h4>
                                <h4>Assistanse: ${detailCard.assistance !== undefined ? detailCard.assistance : detailCard.estimate }</h4>
                                <h4>Precio: ${detailCard.price}</h4>
                            </div>
                        </div>
                    </div>`
    })



