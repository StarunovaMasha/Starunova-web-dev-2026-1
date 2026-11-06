"use strict";

const packageOptions = [
    {
        name: "Вариант 1",
        categories: ["kayak", "canoe", "team", "relay"],
        images: [
            "images/kayak.jpg",
            "images/canoe.jpg",
            "images/team.jpg",
            "images/relay.jpg"
        ]
    },
    {
        name: "Вариант 2",
        categories: ["kayak", "canoe", "relay"],
        images: [
            "images/kayak.jpg",
            "images/canoe.jpg",
            "images/relay.jpg"
        ]
    },
    {
        name: "Вариант 3",
        categories: ["kayak", "team", "relay"],
        images: [
            "images/kayak.jpg",
            "images/team.jpg",
            "images/relay.jpg"
        ]
    },
    {
        name: "Вариант 4",
        categories: ["canoe", "team", "relay"],
        images: [
            "images/canoe.jpg",
            "images/team.jpg",
            "images/relay.jpg"
        ]
    },
    {
        name: "Вариант 5",
        categories: ["canoe", "relay"],
        images: [
            "images/canoe.jpg",
            "images/relay.jpg"
        ]
    }
];

const categoryNames = {
    kayak: "Байдарки",
    canoe: "Каноэ",
    team: "Командный старт",
    relay: "Эстафета",
    extra: "Дополнительный старт"
};


function drawPackages() {
    const box = document.querySelector("#packages-grid");

    packageOptions.forEach(function (option) {
        const card = document.createElement("div");
        card.classList.add("package-card");

        const title = document.createElement("h3");
        title.textContent = option.name;
        card.appendChild(title);

        const dishes = document.createElement("div");
        dishes.classList.add("package-dishes");

        option.categories.forEach(function (category, index) {
            const item = document.createElement("div");
            item.classList.add("package-dish");

            const image = document.createElement("img");
            image.src = option.images[index];
            image.alt = categoryNames[category];

            const caption = document.createElement("p");
            caption.textContent = categoryNames[category];

            item.appendChild(image);
            item.appendChild(caption);
            dishes.appendChild(item);
        });

        card.appendChild(dishes);
        box.appendChild(card);
    });
}


function getNotificationText() {
    const selected = [];

    categories.forEach(function (category) {
        if (picked[category]) {
            selected.push(category);
        }
    });

    const mainSelected = selected.filter(function (category) {
        return category !== "extra";
    });

    if (mainSelected.length === 0 && !picked.extra) {
        return "Ничего не выбрано. Выберите соревнования для заявки";
    }

    if (mainSelected.length === 0) {
        return "Выберите каноэ или командный старт";
    }

    const isValid = packageOptions.some(function (option) {
        if (option.categories.length !== mainSelected.length) {
            return false;
        }

        return option.categories.every(function (category) {
            return mainSelected.includes(category);
        });
    });

    if (isValid) {
        return "";
    }

    const missingOnlyRelay = packageOptions.some(function (option) {
        const withoutRelay = option.categories.filter(function (category) {
            return category !== "relay";
        });

        return !mainSelected.includes("relay") &&
            withoutRelay.length === mainSelected.length &&
            withoutRelay.every(function (category) {
                return mainSelected.includes(category);
            });
    });

    if (missingOnlyRelay) {
        return "Выберите эстафету";
    }

    if (mainSelected.includes("kayak") && !mainSelected.includes("canoe") &&
        !mainSelected.includes("team")) {
        return "Выберите каноэ или командный старт";
    }

    if (mainSelected.includes("team") && !mainSelected.includes("kayak") &&
        !mainSelected.includes("canoe")) {
        return "Выберите байдарки или каноэ";
    }

    if (!mainSelected.includes("kayak") && !mainSelected.includes("canoe") &&
        !mainSelected.includes("team")) {
        return "Выберите байдарки, каноэ или командный старт";
    }

    if (!mainSelected.includes("relay")) {
        return "Выберите эстафету";
    }

    return "Состав заявки не соответствует доступным вариантам. Измените выбор";
}

function showNotification(message) {
    const oldNotification = document.querySelector(".notification-overlay");

    if (oldNotification) {
        oldNotification.remove();
    }

    const overlay = document.createElement("div");
    overlay.classList.add("notification-overlay");

    const box = document.createElement("div");
    box.classList.add("notification-box");
    box.setAttribute("role", "alertdialog");
    box.setAttribute("aria-modal", "true");

    const text = document.createElement("p");
    text.textContent = message;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Окей";

    button.addEventListener("click", function () {
        overlay.remove();
    });

    box.appendChild(text);
    box.appendChild(button);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
}

document.querySelector("#order-form").addEventListener("submit", function (event) {
    const message = getNotificationText();

    if (message !== "") {
        event.preventDefault();
        showNotification(message);
    }
});

drawPackages();
