const cards = document.querySelector('#cards')

// reusable button component (as a class)
class Button {
    constructor(url, text, category) {
        this.url = url
        this.text = text
        this.category = category.toLowerCase()
    }

    render() {
        if (!this.url) return ''
        return `<a class="card__link card__link--${this.category}" href="${this.url}">${this.text}</a>`
    }
}

const createCard = (park) => {

    // Do not create a card if the park has no image
    if (!park.image) {
        return
    }

    const card = document.createElement('div')
    card.classList.add('card', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-xs-12')

    const btn = new Button(park.link, park.linkText, park.category)

    // populate card element
    card.innerHTML = `
        <div class="card__container">
            <div>
                <div class="card__banner card__banner--${park.category.toLowerCase()}">${park.category}</div>
                <img class="card__image" src="${park.image}" alt="${park.name}" />
                <div class="card__title card__title--${park.category.toLowerCase()}">${park.title || "National Park"}</div>
                <div class="card__body">${park.body}</div>
            </div>
            <div>
                ${btn.render()}
            </div>
        </div>
    `
    return card
}

const loadData = async () => {

    // Get the data from the JSON file
    const response = await fetch('./data/dataset1.json')
    const data = await response.json()
    const parks = data.parks

    // Loop through the data
    Object.keys(parks).forEach((key) => {
        const park = parks[key]

        // Do not create a card if the park has no image
        if (park.image) {
            const card = createCard(park)
            cards.appendChild(card)
        }
    })
}

loadData()