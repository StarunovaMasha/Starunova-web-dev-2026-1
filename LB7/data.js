"use strict";

const API_URL = "https://6aecb53afc3b911e6fd586bb.mockapi.io/events";

const events = [];

const categories = ["kayak", "canoe", "team", "relay", "extra"];
const picked = { kayak: null, canoe: null, team: null, relay: null, extra: null };
const activeFilters = { kayak: "all", canoe: "all", team: "all", relay: "all", extra: "all" };

async function loadDishes() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Ошибка сервера: " + response.status);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Сервер вернул данные в неверном формате");
        }

        events.length = 0;
        data.forEach(function (item) {
            item.price = Number(item.price);
            events.push(item);
        });

        showAllCards();
    } catch (error) {
        console.error("Не удалось загрузить данные:", error);
        showLoadError();
    }
}

function showLoadError() {
    categories.forEach(function (category) {
        const box = document.querySelector("#" + category + "-dishes");
        box.innerHTML = "<p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>";
    });
}