console.log("SCRIPTORIA AI MODULE LOADED");

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("screenplayBtn")
        .addEventListener("click", generateScreenplay);

    document.getElementById("characterBtn")
        .addEventListener("click", generateCharacters);

    document.getElementById("breakdownBtn")
        .addEventListener("click", generateBreakdown);

    document.getElementById("soundBtn")
        .addEventListener("click", generateSound);
});


// ---------------- SCREENPLAY ----------------
async function generateScreenplay() {

    const idea = document.getElementById("idea").value;
    if (!idea) return alert("Enter idea first.");

    const res = await fetch("http://127.0.0.1:5000/api/generate-screenplay", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ script_text: idea })
    });

    const data = await res.json();

    document.getElementById("screenplayResult").innerHTML =
        `<h3>📝 Screenplay</h3><pre>${data.screenplay}</pre>`;
}


// ---------------- CHARACTERS ----------------
async function generateCharacters() {

    const idea = document.getElementById("idea").value;
    if (!idea) return alert("Enter idea first.");

    const res = await fetch("http://127.0.0.1:5000/api/generate-characters", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ script_text: idea })
    });

    const data = await res.json();

    document.getElementById("characterResult").innerHTML =
        `<h3>👤 Characters</h3><pre>${data.characters}</pre>`;
}


// ---------------- BREAKDOWN ----------------
async function generateBreakdown() {

    const idea = document.getElementById("idea").value;
    if (!idea) return alert("Enter idea first.");

    const res = await fetch("http://127.0.0.1:5000/api/generate-breakdown", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ script_text: idea })
    });

    const data = await res.json();

    document.getElementById("sceneResult").innerHTML =
        `<h3>🎬 Scene Breakdown</h3><pre>${data.breakdown}</pre>`;
}


// ---------------- SOUND ----------------
async function generateSound() {

    const idea = document.getElementById("idea").value;
    if (!idea) return alert("Enter idea first.");

    const res = await fetch("http://127.0.0.1:5000/api/generate-sound", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ script_text: idea })
    });

    const data = await res.json();

    document.getElementById("soundResult").innerHTML =
        `<h3>🎧 Sound Design</h3><pre>${data.sound_design}</pre>`;
}
document.getElementById("screenplayBtn").addEventListener("click", generateScreenplay);
document.getElementById("screenplayBtn").addEventListener("click", generateScreenplay);
const fileInput = document.getElementById("fileInput");

if (fileInput) {
    fileInput.addEventListener("change", function() {
        const file = this.files[0];
        if (!file) return;
        document.getElementById("fileName").innerText = file.name;
    });
}