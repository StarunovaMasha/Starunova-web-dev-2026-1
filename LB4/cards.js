"use strict";

const kayakBox = document.querySelector("#kayak-dishes");
const canoeBox = document.querySelector("#canoe-dishes");
const teamBox = document.querySelector("#team-dishes");


function makeCard(dish) {
    const card = document.createElement("div");
    card.classList.add("dish");
    card.dataset.dish = dish.keyword;

    const image = document.createElement("img");
    image.src = dish.image;
    image.alt = dish.name;

    const price = document.createElement("p");
    price.classList.add("price");
    price.textContent = dish.price + " ₽";

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = dish.name;

    const count = document.createElement("p");
    count.classList.add("weight");
    count.textContent = dish.count;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Добавить";

    card.appendChild(image);
    card.appendChild(price);
    card.appendChild(name);
    card.appendChild(count);
    card.appendChild(button);

    button.addEventListener("click", function () {
        pickDish(dish.keyword);
    });

    return card;
}


function drawCards() {
    kayakBox.innerHTML = "";
    canoeBox.innerHTML = "";
    teamBox.innerHTML = "";

    const sorted = [...dishes].sort(function (a, b) {
        return a.name.localeCompare(b.name, "ru");
    });

    sorted.forEach(function (dish) {
        const card = makeCard(dish);

        if (dish.category === "kayak") kayakBox.appendChild(card);
        if (dish.category === "canoe") canoeBox.appendChild(card);
        if (dish.category === "team") teamBox.appendChild(card);
    });
}


function pickDish(keyword) {
    const dish = dishes.find(function (item) {
        return item.keyword === keyword;
    });

    if (!dish) return;

    picked[dish.category] = dish;

    const cards = document.querySelectorAll(".dish");
    cards.forEach(function (card) {
        card.classList.remove("selected");
    });

    const selected = document.querySelector('[data-dish="' + keyword + '"]');
    if (selected) selected.classList.add("selected");

    syncOrder();
}

drawCards();
