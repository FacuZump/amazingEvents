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
        const upCategories = createCategoryStatistics(upcomingEvents, arrayCategories, 'estimate')
        const pastCategories = createCategoryStatistics(pastEvents, arrayCategories, 'assistance')
        printEventStatistics(pastEvents, allEvents)
        printCategoryStatistics(upCategories, 'upcoming-statistics')
        printCategoryStatistics(pastCategories, 'past-statistics')
    })

function highestAttendance(events) {
    const hightAttendanceEvent = events.sort((b, a) => ((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity))
    return hightAttendanceEvent[0]
}

function lowestAttendance(events) {
    const lowAttendanceEvent = events.sort((a, b) => ((a.assistance * 100) / a.capacity) - ((b.assistance * 100) / b.capacity))
    return lowAttendanceEvent[0]
}

function largerCapacity(events) {
    const largerCapacityEvent = events.sort((b, a) => a.capacity - b.capacity);
    return largerCapacityEvent[0]
}

function createPastEvents(events, currentDate) {
    const pastEvents = events.filter((e) => e.date < currentDate)
    return pastEvents
}

function createUpcomingEvents(events, currentDate) {
    const upcomingEvents = events.filter((e) => e.date > currentDate)
    return upcomingEvents
}

function createCategoryStatistics(events, categories, key) {
    let catStats = []
    let fn = (acc, current) => acc + current
    for (let i = 0; i < categories.length; i++) {
        catStats[i] = {
            category: categories[i],
            revenue: events.filter(e => e.category == categories[i]).map(e => (e[key]) * e.price).reduce(fn, 0),
            attendance: events.filter(e => e.category == categories[i]).map(e => (e[key] * 100) / e.capacity).reduce(fn, 0) / events.filter(e => e.category == categories[i]).length
        }
    }
    return catStats.sort((b, a) => a.revenue - b.revenue)
}

function printCategoryStatistics(events, container) {
    let statContainer = document.getElementById(container)
    events.forEach(e => {
        if (e.revenue != 0)
            statContainer.innerHTML += `<tr>
                                <td>${e.category}</td>
                                <td>$${e.revenue}</td>
                                <td>${e.attendance.toFixed(1)}%</td>
                                </tr>`
    });
}

function printEventStatistics(pastEvents, allEvents) {
    const statisticsContainer = document.getElementById('event-statistics')
    const highAtt = highestAttendance(pastEvents).name
    const lowAtt = lowestAttendance(pastEvents).name
    const largeCap = largerCapacity(allEvents).name
    statisticsContainer.innerHTML = `<td>${highAtt}</td>
                                        <td>${lowAtt}</td>
                                        <td>${largeCap}</td>`

}
