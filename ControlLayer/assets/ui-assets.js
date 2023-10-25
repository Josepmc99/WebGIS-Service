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
 var mapSection = document.getElementById('map');
 
 expandIcon.addEventListener('click', function () {
     toggleFullscreen(mapSection);
 });
 
 function toggleFullscreen(element) {
     if (!document.fullscreenElement) {
         // Si el documento no está en modo de pantalla completa, entra en él.
         if (element.requestFullscreen) {
             element.requestFullscreen();
         } else if (element.mozRequestFullScreen) { // Firefox
             element.mozRequestFullScreen();
         } else if (element.webkitRequestFullscreen) { // Chrome, Safari y Opera
             element.webkitRequestFullscreen();
         } else if (element.msRequestFullscreen) { // IE/Edge
             element.msRequestFullscreen();
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

 //------------------------------------------- AJUSTES CONTROL LAYER -------------------------------------------------------/

 //----------------- ABRIR/CERRAR MENÚ AL CLICAR EN EL ICONO DE LAYER CONTROL -----------------//

// Obtén una referencia al botón "ui-LayerControl"
const layerControlIcon = document.getElementById('layercontrol-icon');
// Obtén una referencia al LayerControl_popup
const layerControlPopup = document.getElementById('layer-control-popup');

var layerControlHide = layerControlPopup.style.display = "none" 

// Agrega un manejador de eventos al botón para mostrar u ocultar el popup
layerControlIcon.addEventListener('click', function() {
    // Verifica el estado actual del LayerControl_popup
    if (layerControlPopup.style.display === "none" || layerControlPopup.style.display === "") {
        // Si está oculto, muestra el popup
        layerControlPopup.style.display = "block";
        layerControlIcon.classList.add("active-option");
    } else {
        // Si está visible, oculta el popup
        layerControlPopup.style.display = "none";
        layerControlIcon.classList.remove("active-option");
    }
});
 
 //----------------- ABRIR/CERRAR MENÚ AL CLICAR EN LA CAPA PRINCIPAL-----------------//

// Obtén una lista de todos los elementos de flecha
var arrowLayers = document.querySelectorAll('.dropdown_arrow');

// Agrega un manejador de eventos de clic a cada elemento de flecha
arrowLayers.forEach(function(arrowLayer) {
    arrowLayer.addEventListener('click', function() {
        // Obtén el valor del atributo "data-target" para determinar qué menú desplegable debe abrirse o cerrarse
        var targetMenu = arrowLayer.getAttribute('data-target');

        // Busca el menú desplegable correspondiente utilizando el atributo "data-menu"
        var dropdownLayer = document.querySelector('.dropdown_sub[data-menu="' + targetMenu + '"]');

        // Verifica si el menú desplegable está visible o no y cambia su visibilidad
        if (dropdownLayer.style.display === 'none' || dropdownLayer.style.display === '') {
            dropdownLayer.style.display = 'block'; // Abre el menú desplegable
        } else {
            dropdownLayer.style.display = 'none'; // Cierra el menú desplegable
        }
    });
});

// Para editar el texto del Layer Control

const dropdownSpan = document.querySelector('.dropdown_span');

dropdownSpan.addEventListener('dblclick', function() {
    // Habilitar la edición
    this.contentEditable = true;
    this.focus(); // Colocar el foco en el elemento editado
});

dropdownSpan.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Guardar el nuevo contenido al presionar Enter
        event.preventDefault();
        this.blur(); // Deshabilitar la edición
        // Aquí puedes guardar el nuevo nombre, por ejemplo, en una variable o enviarlo al servidor si es necesario
    }
});

dropdownSpan.addEventListener('blur', function() {
    // Deshabilitar la edición cuando se hace clic fuera del elemento
    this.contentEditable = false;
    // Aquí también puedes guardar el nuevo nombre
});
