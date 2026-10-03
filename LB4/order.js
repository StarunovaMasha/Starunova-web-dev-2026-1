"use strict";

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


const resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", function () {
    picked.kayak = null;
    picked.canoe = null;
    picked.team = null;

    document.querySelectorAll(".dish").forEach(function (card) {
        card.classList.remove("selected");
    });

    syncOrder();
});

syncOrder();