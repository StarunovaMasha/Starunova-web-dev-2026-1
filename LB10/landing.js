"use strict";

const FEEDBACK_URL = "https://httpbin.org/post";

const feedbackForm = document.querySelector("#feedback-form");
const formAlert = document.querySelector("#form-alert");

function showFormAlert(type, text) {
    formAlert.className = "alert alert-" + type;
    formAlert.textContent = text;
}

feedbackForm.addEventListener("submit", async function (event) {
    event.preventDefault();


    if (!feedbackForm.checkValidity()) {
        feedbackForm.classList.add("was-validated");
        return;
    }

    const submitButton = feedbackForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    try {
        const response = await fetch(FEEDBACK_URL, {
            method: "POST",
            body: new FormData(feedbackForm)
        });

        if (!response.ok) {
            throw new Error("Ошибка сервера: " + response.status);
        }

        showFormAlert("success", "Спасибо! Ваше сообщение отправлено.");
        feedbackForm.reset();
        feedbackForm.classList.remove("was-validated");
    } catch (error) {
        console.error("Не удалось отправить сообщение:", error);
        showFormAlert("danger", "Не удалось отправить сообщение. Попробуйте ещё раз позже.");
    } finally {
        submitButton.disabled = false;
    }
});
