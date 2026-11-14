"use strict";


const API_KEY = "998998a3-0db4-49c0-b7e3-9b2e7ae55a5e";

const AUTH_ERROR = "Для получения доступа к API необходимо пройти процедуру авторизации. " +
    "Для этого нужно передать в запросе персональный API Key.";

const API_URL = "https://6aecb53afc3b911e6fd586bb.mockapi.io/events";

const events = [];

const categories = ["kayak", "canoe", "team", "relay", "extra"];
const picked = { kayak: null, canoe: null, team: null, relay: null, extra: null };
const activeFilters = { kayak: "all", canoe: "all", team: "all", relay: "all", extra: "all" };

function hasApiKey() {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(API_KEY);
}


function withKey(url) {
    if (!hasApiKey()) {
        const error = new Error(AUTH_ERROR);
        error.code = "NO_KEY";
        throw error;
    }

    return url + "?api_key=" + encodeURIComponent(API_KEY);
}


function errorText(error, fallback) {
    return error && error.code === "NO_KEY" ? AUTH_ERROR : fallback;
}


async function loadDishes() {
    const response = await fetch(withKey(API_URL));

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
}

function showLoadError(error) {
    const text = errorText(error, "Не удалось загрузить данные. Попробуйте обновить страницу.");

    categories.forEach(function (category) {
        const box = document.querySelector("#" + category + "-dishes");
        const message = document.createElement("p");
        message.textContent = text;
        box.innerHTML = "";
        box.appendChild(message);
    });
}
