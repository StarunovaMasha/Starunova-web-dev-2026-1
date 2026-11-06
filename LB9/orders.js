"use strict";

const ORDERS_URL = "https://6aecb53afc3b911e6fd586bb.mockapi.io/orders";

let orders = [];
let currentModal = null;

function el(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

function formatDate(iso) {
    const time = Date.parse(iso);

    if (!iso || isNaN(time)) {
        return "—";
    }

    return new Date(time).toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }).replace(",", "");
}

function formatAge(age) {
    return age ? String(age).replace("-", "–") + " лет" : "—";
}

function getItems(order) {
    const items = [];

    categories.forEach(function (category) {
        const keyword = order[category];
        if (!keyword) return;

        const event = events.find(function (item) {
            return item.keyword === keyword;
        });

        items.push({
            category: category,
            name: event ? event.name : keyword,
            price: event ? event.price : 0
        });
    });

    return items;
}

function getTotal(order) {
    const saved = Number(order.total);

    if (order.total !== undefined && order.total !== "" && !isNaN(saved)) {
        return saved;
    }

    return getItems(order).reduce(function (sum, item) {
        return sum + item.price;
    }, 0);
}

function sortOrders(list) {
    return list.slice().sort(function (a, b) {
        const dateA = Date.parse(a.created_at) || 0;
        const dateB = Date.parse(b.created_at) || 0;

        if (dateA !== dateB) {
            return dateB - dateA;
        }

        return Number(b.id) - Number(a.id);
    });
}

async function loadOrders() {
    const response = await fetch(ORDERS_URL);

    if (!response.ok) {
        throw new Error("Ошибка сервера: " + response.status);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
        throw new Error("Сервер вернул данные в неверном формате");
    }

    return data;
}

const ICON_VIEW =
    '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
const ICON_EDIT =
    '<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>';
const ICON_DELETE =
    '<polyline points="3 6 5 6 21 6"/>' +
    '<path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>' +
    '<line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>';

function iconButton(label, iconPath, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "icon-btn";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.innerHTML =
        '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" ' +
        'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        iconPath + '</svg>';
    button.addEventListener("click", onClick);
    return button;
}

function renderOrders() {
    const table = document.querySelector("#orders-table");
    const body = document.querySelector("#orders-body");
    const message = document.querySelector("#orders-message");

    body.innerHTML = "";

    if (orders.length === 0) {
        table.style.display = "none";
        message.style.display = "block";
        message.innerHTML =
            'Заявок пока нет. Чтобы оформить первую, перейдите на страницу ' +
            '<a href="lunch.html">Собрать заявку</a>.';
        return;
    }

    message.style.display = "none";
    table.style.display = "table";

    orders.forEach(function (order, index) {
        const row = document.createElement("tr");

        const names = getItems(order).map(function (item) {
            return item.name;
        }).join(", ");

        row.appendChild(el("td", "", index + 1));
        row.appendChild(el("td", "", formatDate(order.created_at)));
        row.appendChild(el("td", "orders-composition", names || "—"));
        row.appendChild(el("td", "", getTotal(order) + " ₽"));
        row.appendChild(el("td", "", formatAge(order.age)));

        const actions = el("td", "row-actions");
        actions.appendChild(iconButton("Подробнее", ICON_VIEW, function () { showDetails(order); }));
        actions.appendChild(iconButton("Редактирование", ICON_EDIT, function () { showEdit(order); }));
        actions.appendChild(iconButton("Удаление", ICON_DELETE, function () { showDelete(order); }));
        row.appendChild(actions);

        body.appendChild(row);
    });
}

function closeModal() {
    if (currentModal) {
        currentModal.remove();
        currentModal = null;
    }
}

function openModal(title, content, buttons) {
    closeModal();

    const overlay = el("div", "modal-overlay");
    const box = el("div", "modal-box");
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", title);

    const header = el("div", "modal-header");
    header.appendChild(el("h3", "", title));

    const closeButton = el("button", "modal-close", "×");
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Закрыть");
    closeButton.addEventListener("click", closeModal);
    header.appendChild(closeButton);

    const footer = el("div", "modal-footer");
    const created = buttons.map(function (item) {
        const button = el("button", item.className || "", item.text);
        button.type = "button";
        button.addEventListener("click", item.onClick);
        footer.appendChild(button);
        return button;
    });

    box.appendChild(header);
    box.appendChild(content);
    box.appendChild(footer);
    overlay.appendChild(box);

    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closeModal();
        }
    });

    document.body.appendChild(overlay);
    currentModal = overlay;

    return created;
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});

function infoRow(label, value) {
    const row = el("div", "modal-row");
    row.appendChild(el("span", "", label));
    row.appendChild(el("span", "", value));
    return row;
}

function appendComposition(body, order) {
    const items = getItems(order);

    body.appendChild(el("h4", "modal-section", "Состав заявки"));

    if (items.length === 0) {
        body.appendChild(el("p", "modal-text", "Состав не указан"));
    }

    items.forEach(function (item) {
        body.appendChild(infoRow(categoryNames[item.category], item.name + " (" + item.price + " ₽)"));
    });

    body.appendChild(el("p", "modal-total", "Стоимость: " + getTotal(order) + " ₽"));
}

function showDetails(order) {
    const body = el("div", "modal-body");

    body.appendChild(infoRow("Дата оформления", formatDate(order.created_at)));

    body.appendChild(el("h4", "modal-section", "Участник"));
    body.appendChild(infoRow("ФИО", order.fio || "—"));
    body.appendChild(infoRow("Телефон", order.phone || "—"));
    body.appendChild(infoRow("Email", order.email || "—"));
    body.appendChild(infoRow("Возрастная категория", formatAge(order.age)));

    body.appendChild(el("h4", "modal-section", "Комментарий"));
    body.appendChild(el("p", "modal-text", order.comment || "—"));

    appendComposition(body, order);

    openModal("Просмотр заявки", body, [
        { text: "Ок", onClick: closeModal }
    ]);
}

function fieldRow(labelText, id, input) {
    const row = el("div", "modal-row");
    const label = el("label", "", labelText);
    label.htmlFor = id;
    input.id = id;
    row.appendChild(label);
    row.appendChild(input);
    return row;
}

function showEdit(order) {
    const form = document.createElement("form");
    form.className = "modal-body";
    form.addEventListener("submit", function (event) { event.preventDefault(); });

    form.appendChild(infoRow("Дата оформления", formatDate(order.created_at)));
    form.appendChild(el("h4", "modal-section", "Участник"));

    const fio = document.createElement("input");
    fio.type = "text";
    fio.required = true;
    fio.value = order.fio || "";
    form.appendChild(fieldRow("ФИО", "edit-fio", fio));

    const phone = document.createElement("input");
    phone.type = "text";
    phone.required = true;
    phone.value = order.phone || "";
    form.appendChild(fieldRow("Телефон", "edit-phone", phone));

    const email = document.createElement("input");
    email.type = "email";
    email.required = true;
    email.value = order.email || "";
    form.appendChild(fieldRow("Email", "edit-email", email));

    const age = document.createElement("select");
    age.required = true;
    [["", "Выберите категорию"], ["18-25", "18–25 лет"], ["26-35", "26–35 лет"],
     ["36-50", "36–50 лет"], ["50+", "50+ лет"]].forEach(function (pair) {
        const option = document.createElement("option");
        option.value = pair[0];
        option.textContent = pair[1];
        age.appendChild(option);
    });
    age.value = order.age || "";
    form.appendChild(fieldRow("Возрастная категория", "edit-age", age));

    form.appendChild(el("h4", "modal-section", "Комментарий"));
    const comment = document.createElement("textarea");
    comment.rows = 4;
    comment.id = "edit-comment";
    comment.setAttribute("aria-label", "Комментарий");
    comment.value = order.comment || "";
    form.appendChild(comment);

    appendComposition(form, order);

    const buttons = openModal("Редактирование заявки", form, [
        { text: "Отмена", className: "btn-secondary", onClick: closeModal },
        { text: "Сохранить", className: "btn-primary", onClick: save }
    ]);

    async function save() {
        if (!form.reportValidity()) {
            return;
        }

        const updated = Object.assign({}, order, {
            fio: fio.value.trim(),
            phone: phone.value.trim(),
            email: email.value.trim(),
            age: age.value,
            comment: comment.value.trim()
        });

        buttons.forEach(function (button) { button.disabled = true; });

        try {
            const response = await fetch(ORDERS_URL + "/" + order.id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updated)
            });

            if (!response.ok) {
                throw new Error("Ошибка сервера: " + response.status);
            }

            const saved = await response.json();
            const index = orders.findIndex(function (item) { return item.id === order.id; });

            if (index !== -1) {
                orders[index] = Object.assign({}, updated, saved);
            }

            closeModal();
            renderOrders();
            showNotification("Заявка успешно изменена");
        } catch (error) {
            console.error("Не удалось изменить заявку:", error);
            buttons.forEach(function (button) { button.disabled = false; });
            showNotification("Не удалось сохранить изменения. Проверьте подключение и попробуйте ещё раз.");
        }
    }
}

function showDelete(order) {
    const body = el("div", "modal-body");
    body.appendChild(el("p", "modal-text", "Вы уверены, что хотите удалить заявку?"));

    const buttons = openModal("Удаление заявки", body, [
        { text: "Отмена", className: "btn-secondary", onClick: closeModal },
        { text: "Да", className: "btn-danger", onClick: remove }
    ]);

    async function remove() {
        buttons.forEach(function (button) { button.disabled = true; });

        try {
            const response = await fetch(ORDERS_URL + "/" + order.id, { method: "DELETE" });

            if (!response.ok) {
                throw new Error("Ошибка сервера: " + response.status);
            }

            orders = orders.filter(function (item) { return item.id !== order.id; });

            closeModal();
            renderOrders();
            showNotification("Заявка успешно удалена");
        } catch (error) {
            console.error("Не удалось удалить заявку:", error);
            buttons.forEach(function (button) { button.disabled = false; });
            showNotification("Не удалось удалить заявку. Проверьте подключение и попробуйте ещё раз.");
        }
    }
}

Promise.all([loadDishes(), loadOrders()])
    .then(function (results) {
        orders = sortOrders(results[1]);
        renderOrders();
    })
    .catch(function (error) {
        console.error("Не удалось загрузить заявки:", error);
        document.querySelector("#orders-message").textContent =
            "Не удалось загрузить заявки. Попробуйте обновить страницу.";
    });
