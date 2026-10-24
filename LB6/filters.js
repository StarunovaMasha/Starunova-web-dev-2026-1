"use strict";

function getFilteredEvents(category) {
    return events.filter(function (event) {
        return event.category === category &&
            (activeFilters[category] === "all" ||
             event.kind === activeFilters[category]);
    });
}

function setupFilters() {
    document.querySelectorAll(".filter-button").forEach(function (button) {
        button.addEventListener("click", function () {
            const group = button.closest(".filters");
            const category = group.dataset.category;
            const kind = button.dataset.kind;

            if (kind === activeFilters[category] && kind !== "all") {
                activeFilters[category] = "all";
            } else {
                activeFilters[category] = kind;
            }

            group.querySelectorAll(".filter-button").forEach(function (item) {
                item.classList.toggle(
                    "active",
                    item.dataset.kind === activeFilters[category]
                );
            });

            drawCards(category);
        });
    });
}

function showAllCards() {
    categories.forEach(function (category) {
        drawCards(category);
    });
}

setupFilters();
showAllCards();
