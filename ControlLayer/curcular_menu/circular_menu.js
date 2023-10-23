let toggle = document.querySelector('.toggle');
let menu = document.querySelector('.menu');
toggle.onclick = function(){
    menu.classList.toggle('active')
};

 //------------------------------------------- BOTÓN PARA ESCONDER EL DROP-FILE A TRAVÉS DEL CIRCULAR MENÚ-------------------------------------------------------/
    //Ocultar drop-area a través del botón del circular-menu
    document.addEventListener("DOMContentLoaded", function () {
        const cloudUploadButton = document.getElementById("cloud-upload-button");
        const dropAreaCM = document.querySelector(".drop-area");
    
        cloudUploadButton.addEventListener("click", function () {
        // Alternar la clase 'active' en el drop-area para mostrar u ocultar
        dropAreaCM.classList.toggle("active");
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const layerControlIcon = document.getElementById("layercontrol-icon");
        // const layerDropdown = document.querySelector(".nav_menu");
    
        layerControlIcon.addEventListener("click", function (event) {
            // Evita que el enlace se comporte como un enlace normal (cambiando la URL)
            event.preventDefault();
    
            // Alternar la clase 'active' en el dropdown para mostrar u ocultar
            layerDropdown.classList.toggle("active");
        });
    });

     //------------------------------------------- BOTÓN PARA ESCONDER EL BASE-LAYERS A TRAVÉS DEL CIRCULAR MENÚ-------------------------------------------------------/
    const baselayerIcon = document.getElementById("settings-icon");
    const uiBaseLayerIcon = document.getElementById("base-layers-icon");

    baselayerIcon.addEventListener("click", function() {
        // Verifica si los iconos de los assets están ocultos
        if (uiBaseLayerIcon.classList.contains("hidden")) {
            // Si está oculto, muéstralo
            uiBaseLayerIcon.classList.remove("hidden");
        } else {
            // Si está visible, ocúltalo
            uiBaseLayerIcon.classList.add("hidden");
        }
    });

    const LayerControlIcon = document.getElementById("settings-icon");
    const uiLayerControlIcon = document.getElementById("layercontrol-icon");

    LayerControlIcon.addEventListener("click", function() {
        if (uiLayerControlIcon.classList.contains("hidden")) {
            uiLayerControlIcon.classList.remove("hidden");
        } else {
            uiLayerControlIcon.classList.add("hidden");
        }
    });

    const legendIcon = document.getElementById("settings-icon");
    const uiLegendIcon = document.getElementById("legent-icon");

    legendIcon.addEventListener("click", function() {
        if (uiLegendIcon.classList.contains("hidden")) {
            uiLegendIcon.classList.remove("hidden");
        } else {
            uiLegendIcon.classList.add("hidden");
        }
    });

    const ExpandIcon = document.getElementById("settings-icon");
    const uiExpandIcon = document.getElementById("expand-icon");

    ExpandIcon.addEventListener("click", function() {
        if (uiExpandIcon.classList.contains("hidden")) {
            uiExpandIcon.classList.remove("hidden");
        } else {
            uiExpandIcon.classList.add("hidden");
        }
    });