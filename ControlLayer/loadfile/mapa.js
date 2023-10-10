// Crea un mapa centrado en Valencia
let mapa = L.map('mapa').setView([39.46975, -0.37739], 13);

// Agrega una capa de mapa base (por ejemplo, OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mapa);










