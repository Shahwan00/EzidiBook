document.addEventListener("DOMContentLoaded", function () {
    let name = localStorage.getItem("fullname");
    if (name) {
        document.getElementById("fullname").innerText = name;
        document.getElementById("username").innerText = "@" + name.trim().toLowerCase().replace(/\s+/g, '_');
    }

    document.getElementById("birth").innerText = localStorage.getItem("birth") || "--";
    document.getElementById("zodiac").innerText = localStorage.getItem("zodiac") || "--";
    document.getElementById("gender").innerText = localStorage.getItem("gender") || "--";
    document.getElementById("social").innerText = localStorage.getItem("social") || "--";
    document.getElementById("ezidiClass").innerText = localStorage.getItem("ezidiClass") || "--";
    document.getElementById("country").innerText = localStorage.getItem("country") || "--";
    document.getElementById("region").innerText = localStorage.getItem("region") || "--";
    document.getElementById("job").innerText = localStorage.getItem("job") || "--";

    let langs = localStorage.getItem("language") || "--";
    let level = localStorage.getItem("level");
    document.getElementById("language").innerText = level ? langs + " (" + level + ")" : langs;
});
