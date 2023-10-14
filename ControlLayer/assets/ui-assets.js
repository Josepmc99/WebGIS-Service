 //------------------------------------------- ASSET BASE LAYER ACTIVE -------------------------------------------------------/

// Obtén referencias a los elementos del DOM
const baseLayersIcon = document.getElementById("base-layers-icon");
const baseLayersPopup = document.getElementById("base-layers-popup");
const closeBtn = document.querySelector(".close-btn");

// Agrega un manejador de eventos clic al icono .ui-base-layers
baseLayersIcon.addEventListener("click", function() {
    baseLayersPopup.style.display = "block";
    baseLayersIcon.classList.add("active-option");
});

// Agrega un manejador de eventos clic al botón close-btn
closeBtn.addEventListener("click", function() {
    baseLayersPopup.style.display = "none";
    baseLayersIcon.classList.remove("active-option");
});

// Variable para llevar un registro de la capa activa actual
let activeLayer = null;

// Función para cambiar el estilo de una capa base
function changeLayerStyle(image, span) {
    // Si hay una capa activa, desactívala
    if (activeLayer) {
        const activeImage = activeLayer.querySelector("img");
        const activeSpan = activeLayer.querySelector("span");
        activeImage.style.border = "none";
        activeSpan.style.color = "initial";
    }

    // Activa la nueva capa
    image.style.border = "2px solid red";
    span.style.color = "red";

    // Actualiza la capa activa actual
    activeLayer = image.parentElement;
}

// Agrega un manejador de eventos clic al icono .ui-base-layers
baseLayersIcon.addEventListener("click", function() {
    baseLayersPopup.style.display = "block";
    baseLayersIcon.classList.add("active-option");
});

// Agrega un manejador de eventos clic al botón close-btn
closeBtn.addEventListener("click", function() {
    baseLayersPopup.style.display = "none";
    baseLayersIcon.classList.remove("active-option");
});

// Agrega un manejador de eventos clic a las imágenes de capas base
const baseLayerImages = document.querySelectorAll(".popup_base_item img");
baseLayerImages.forEach(function(image) {
    image.addEventListener("click", function() {
        const span = image.nextElementSibling;
        changeLayerStyle(image, span);
    });
});

 //------------------------------------------- MAXIMIZE FULL SCREEN -------------------------------------------------------/
var expandIcon = document.getElementById('expand-icon');

expandIcon.addEventListener('click', function () {
    toggleFullscreen();
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        // Si el documento no está en modo de pantalla completa, entra en él.
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari y Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    } else {
        // Si el documento está en modo de pantalla completa, sal de él.
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari y Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}