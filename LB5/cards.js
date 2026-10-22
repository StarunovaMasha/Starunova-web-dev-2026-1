"use strict";

function makeCard(event) {
    const card = document.createElement("div");
    card.classList.add("dish");
    card.dataset.dish = event.keyword;
    
    if (picked[event.category] && picked[event.category].keyword === event.keyword) {
        card.classList.add("selected");
    }

    const image = document.createElement("img");
    image.src = event.image;
    image.alt = event.name;

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = event.price + " ₽";

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = event.name;

    const count = document.createElement("p");
    count.classList.add("weight");
    count.textContent = event.count;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Добавить";
    button.addEventListener("click", function () { pickEvent(event.keyword); });

    card.appendChild(image);
    card.appendChild(price);
    card.appendChild(name);
    card.appendChild(count);
    card.appendChild(button);
    return card;
}

function drawCards(category) {
    const box = document.querySelector("#" + category + "-dishes");
    box.innerHTML = "";

    const sorted = getFilteredEvents(category).sort(function (a, b) {
        return a.name.localeCompare(b.name, "ru");
    });

    sorted.forEach(function (event) {
        box.appendChild(makeCard(event));
    });
}

function pickEvent(keyword) {
    const event = events.find(function (item) { return item.keyword === keyword; });
    if (!event) return;
    picked[event.category] = event;
    drawCards(event.category);
    syncOrder();
}
