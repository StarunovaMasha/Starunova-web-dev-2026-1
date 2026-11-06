"use strict";

function syncOrder() {
    let total = 0;
    let hasAny = false;
    
    categories.forEach(function (category) {
        const block = document.querySelector("#selected-" + category);
        const item = document.querySelector("#selected-" + category + "-item");
        
        if (picked[category]) {
            hasAny = true;
            total += picked[category].price;
            item.innerHTML = '<p class="selected-name">' + picked[category].name + '</p>' +
                '<p>' + picked[category].count + '</p><p>' + picked[category].price + ' ₽</p>';
            block.style.display = "block";
        } else {
            item.innerHTML = "<p>Соревнование не выбрано</p>";
            block.style.display = hasAny ? "block" : "none";
        }
    });
    
    document.querySelector("#empty-order").style.display = hasAny ? "none" : "block";
    document.querySelector("#total-price").textContent = total;
    document.querySelector("#order-total").style.display = total ? "block" : "none";
}

document.querySelector("#order-form").addEventListener("submit", function () {
    categories.forEach(function (category) {
        document.querySelector("#" + category + "-keyword").value =
            picked[category] ? picked[category].keyword : "";
    });
});

const resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", function () {
    categories.forEach(function (category) {
        picked[category] = null;
    });
    
    document.querySelectorAll(".dish").forEach(function (card) {
        card.classList.remove("selected");
    });
    
    document.querySelector("#order-form").reset();
   
    syncOrder();
});

syncOrder();