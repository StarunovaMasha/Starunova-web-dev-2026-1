"use strict";

const dishes = [
    {
        keyword: "k1_classic",
        name: "K-1 классика",
        price: 1500,
        category: "kayak",
        count: "500 м",
        image: "https://avatars.mds.yandex.net/i?id=721faa57ea7a30a2054d9515aaf38153808f6eec-5147050-images-thumbs&n=13"
    },
    {
        keyword: "k1_marathon",
        name: "K-1 марафон",
        price: 2000,
        category: "kayak",
        count: "3000 м",
        image: "https://yastatic.net/naydex/yandex-search/js8Rht903/52fd94F4j/B-g9-wkCd-Z_3cW4M7qGnRn6n9kWtErFe_Wj5ExTd6TBf4z8T46spoH9HC0urXy_2kwbd93_PvGg0_aZ50lvBwrgKOo4D3OPFpjpzQaKmrkJh7OsNrVWtDPZ_4kROlLBuBuQ4fo-IWNMVOWgyiiJY7sZZ26Jk0qx7XcE"
    },
    {
        keyword: "k1_sprint",
        name: "K-1 спринт",
        price: 1200,
        category: "kayak",
        count: "200 м",
        image: "https://avatars.mds.yandex.net/i?id=ab83ca32ea88c914ae4716fe7b612fef02c7097e-5530612-images-thumbs&n=13"
    },
    {
        keyword: "c1_classic",
        name: "C-1 классика",
        price: 1500,
        category: "canoe",
        count: "500 м",
        image: "https://im2.kommersant.ru/Issues.photo/NEWS/2024/08/08/KMO_200417_00008_1_t222_154305.jpg"
    },
    {
        keyword: "c1_marathon",
        name: "C-1 марафон",
        price: 2000,
        category: "canoe",
        count: "250 м",
        image: "https://avatars.mds.yandex.net/i?id=1c476e2766420d76966226e1120acc8e0a62ca55-5386020-images-thumbs&n=13"
    },
    {
        keyword: "c1_sprint",
        name: "C-1 спринт",
        price: 1200,
        category: "canoe",
        count: "200 м",
        image: "https://avatars.mds.yandex.net/i?id=279bf907a9b34ba84816a9245306a519580d6a7e-6295814-images-thumbs&n=13"
    },
    {
        keyword: "family_start",
        name: "Семейный старт",
        price: 1050,
        category: "team",
        count: "2000 м",
        image: "https://avatars.mds.yandex.net/i?id=ba23ccc5530d7cb10a580fa3424729024fea20c2-8906573-images-thumbs&n=13"
    },
    {
        keyword: "k2_team",
        name: "K-2 командная гонка",
        price: 1100,
        category: "team",
        count: "1000 м",
        image: "https://avatars.mds.yandex.net/i?id=1385791fefaf8021d31d8740304ae48b84483bec-16281477-images-thumbs&n=13"
    },
    {
        keyword: "k4_relay",
        name: "K-4 эстафета",
        price: 1200,
        category: "team",
        count: "1000 м",
        image: "https://avatars.mds.yandex.net/i?id=6794bc7362441d211eb8ae9c92516afc2a35ddfd-4598969-images-thumbs&n=13"
    }
];

const picked = {
    kayak: null,
    canoe: null,
    team: null
};

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


function syncOrder() {
    const emptyOrder = document.querySelector("#empty-order");
    const kayakBlock = document.querySelector("#selected-kayak");
    const canoeBlock = document.querySelector("#selected-canoe");
    const teamBlock = document.querySelector("#selected-team");

    const kayakItem = document.querySelector("#selected-kayak-item");
    const canoeItem = document.querySelector("#selected-canoe-item");
    const teamItem = document.querySelector("#selected-team-item");

    emptyOrder.style.display = "none";

    if (picked.kayak) {
        kayakBlock.style.display = "block";
        kayakItem.innerHTML =
            '<p class="selected-name">' + picked.kayak.name + '</p>' +
            '<p>' + picked.kayak.count + '</p>' +
            '<p>' + picked.kayak.price + ' ₽</p>';
    } else {
        kayakBlock.style.display = "block";
        kayakItem.innerHTML = "<p>Соревнование не выбрано</p>";
    }

    if (picked.canoe) {
        canoeBlock.style.display = "block";
        canoeItem.innerHTML =
            '<p class="selected-name">' + picked.canoe.name + '</p>' +
            '<p>' + picked.canoe.count + '</p>' +
            '<p>' + picked.canoe.price + ' ₽</p>';
    } else {
        canoeBlock.style.display = "block";
        canoeItem.innerHTML = "<p>Соревнование не выбрано</p>";
    }

    if (picked.team) {
        teamBlock.style.display = "block";
        teamItem.innerHTML =
            '<p class="selected-name">' + picked.team.name + '</p>' +
            '<p>' + picked.team.count + '</p>' +
            '<p>' + picked.team.price + ' ₽</p>';
    } else {
        teamBlock.style.display = "block";
        teamItem.innerHTML = "<p>Соревнование не выбрано</p>";
    }

    const hasAny = picked.kayak || picked.canoe || picked.team;

    if (!hasAny) {
        emptyOrder.style.display = "block";
        kayakBlock.style.display = "none";
        canoeBlock.style.display = "none";
        teamBlock.style.display = "none";
    }

    calcTotal();
}


function calcTotal() {
    let total = 0;

    if (picked.kayak) total += picked.kayak.price;
    if (picked.canoe) total += picked.canoe.price;
    if (picked.team) total += picked.team.price;

    const totalBlock = document.querySelector("#order-total");
    const totalPrice = document.querySelector("#total-price");

    totalPrice.textContent = total;

    if (total === 0) {
        totalBlock.style.display = "none";
    } else {
        totalBlock.style.display = "block";
    }
}


const form = document.querySelector("#order-form");

form.addEventListener("submit", function () {
    const kayakKey = document.querySelector("#kayak-keyword");
    const canoeKey = document.querySelector("#canoe-keyword");
    const teamKey = document.querySelector("#team-keyword");

    kayakKey.value = picked.kayak ? picked.kayak.keyword : "";
    canoeKey.value = picked.canoe ? picked.canoe.keyword : "";
    teamKey.value = picked.team ? picked.team.keyword : "";
});


drawCards();
syncOrder();