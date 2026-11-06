"use strict";

const ORDERS_URL = "https://6aecb53afc3b911e6fd586bb.mockapi.io/orders";

function makeText(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.classList.add(className);
    }
    element.textContent = text;
    return element;
}

function calcTotal() {
    let total = 0;
    categories.forEach(function (category) {
        if (picked[category]) {
            total += picked[category].price;
        }
    });
    return total;
}

function removeEvent(category) {
    picked[category] = null;
    saveSelection();
    renderCheckout();
}

function renderOrderCards() {
    const box = document.querySelector("#order-dishes");
    box.innerHTML = "";

    let any = false;

    categories.forEach(function (category) {
        const event = picked[category];
        if (!event) return;

        any = true;

        const card = makeCard(event, "Удалить", function () {
            removeEvent(category);
        });
        card.classList.remove("selected");
        box.appendChild(card);
    });

    document.querySelector("#empty-order-message").style.display = any ? "none" : "block";
}

function renderSummary() {
    categories.forEach(function (category) {
        const item = document.querySelector("#selected-" + category + "-item");
        const event = picked[category];

        item.innerHTML = "";

        if (event) {
            item.appendChild(makeText("p", "selected-name", event.name));
            item.appendChild(makeText("p", "", event.count));
            item.appendChild(makeText("p", "", event.price + " ₽"));
        } else {
            item.appendChild(makeText("p", "", "Соревнование не выбрано"));
        }
    });

    const total = calcTotal();
    document.querySelector("#total-price").textContent = total;
    document.querySelector("#order-total").style.display = total ? "block" : "none";
}

function renderCheckout() {
    renderOrderCards();
    renderSummary();
}

const form = document.querySelector("#order-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const message = getNotificationText();
    if (message !== "") {
        showNotification(message);
        return;
    }

    categories.forEach(function (category) {
        document.querySelector("#" + category + "-keyword").value =
            picked[category] ? picked[category].keyword : "";
    });

    const data = Object.fromEntries(new FormData(form).entries());
    data.total = calcTotal();

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        const response = await fetch(ORDERS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Ошибка сервера: " + response.status);
        }

        clearSelection();
        form.reset();
        renderCheckout();
        showNotification("Заявка успешно оформлена!");
    } catch (error) {
        
        console.error("Не удалось отправить заявку:", error);
        showNotification("Не удалось оформить заявку. Проверьте подключение и попробуйте ещё раз.");
    } finally {
        submitButton.disabled = false;
    }
});

loadDishes()
    .then(function () {
        restoreSelection();
        renderCheckout();
    })
    .catch(function (error) {
        console.error("Не удалось загрузить данные:", error);
        document.querySelector("#order-dishes").innerHTML =
            "<p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>";
    });
