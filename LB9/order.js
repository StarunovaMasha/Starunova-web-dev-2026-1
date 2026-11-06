"use strict";

function syncOrder() {
    const panel = document.querySelector("#checkout-panel");
    const link = document.querySelector("#checkout-link");
    const hint = document.querySelector("#panel-hint");

    let total = 0;
    let hasAny = false;

    categories.forEach(function (category) {
        if (picked[category]) {
            hasAny = true;
            total += picked[category].price;
        }
    });

    document.querySelector("#panel-total").textContent = total;
    panel.style.display = hasAny ? "flex" : "none";

    const message = getNotificationText();

    if (message === "") {
        link.setAttribute("href", "checkout.html");
        link.classList.remove("disabled");
        link.removeAttribute("aria-disabled");
        hint.textContent = "";
    } else {
        link.removeAttribute("href");
        link.classList.add("disabled");
        link.setAttribute("aria-disabled", "true");
        hint.textContent = message;
    }
}
