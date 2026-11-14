"use strict";

const STORAGE_KEY = "rowingOrder";

function readSavedKeywords() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const list = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) ? list : [];
    } catch (error) {
        console.error("Не удалось прочитать localStorage:", error);
        return [];
    }
}

function saveSelection() {
    const keywords = [];

    categories.forEach(function (category) {
        if (picked[category]) {
            keywords.push(picked[category].keyword);
        }
    });

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
    } catch (error) {
        console.error("Не удалось записать в localStorage:", error);
    }
}

function restoreSelection() {
    readSavedKeywords().forEach(function (keyword) {
        const event = events.find(function (item) {
            return item.keyword === keyword;
        });

        if (event) {
            picked[event.category] = event;
        }
    });
}

function clearSelection() {
    categories.forEach(function (category) {
        picked[category] = null;
    });

    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error("Не удалось очистить localStorage:", error);
    }
}
