document.addEventListener("DOMContentLoaded", function () {

    const button = document.getElementById("newProjectBtn");
    const grid = document.getElementById("projectGrid");

    if (!button || !grid) return;

    button.addEventListener("click", function () {

        const name = prompt("Enter project name:");

        if (!name) return;

        const card = document.createElement("div");
        card.className = "project-card";

        card.innerHTML = `
            <h3>${name}</h3>
            <p>Status: New</p>
        `;

        grid.appendChild(card);
    });

});