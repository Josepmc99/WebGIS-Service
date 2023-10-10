let toggle = document.querySelector('.toggle');
let menu = document.querySelector('.menu');
toggle.onclick = function(){
    menu.classList.toggle('active')
};

 //------------------------------------------- BOTÓN PARA ESCONDER EL DROP-FILE TRAVÉS DEL CIRCULAR MENÚ-------------------------------------------------------/
    //Ocultar drop-area a través del botón del circular-menu
    document.addEventListener("DOMContentLoaded", function () {
        const cloudUploadButton = document.getElementById("cloud-upload-button");
        const dropArea = document.querySelector(".drop-area");
    
        cloudUploadButton.addEventListener("click", function () {
        // Alternar la clase 'active' en el drop-area para mostrar u ocultar
        dropArea.classList.toggle("active");
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        const layerControlIcon = document.getElementById("LayerControl");
        const layerDropdown = document.querySelector(".nav_menu");
    
        layerControlIcon.addEventListener("click", function (event) {
            // Evita que el enlace se comporte como un enlace normal (cambiando la URL)
            event.preventDefault();
    
            // Alternar la clase 'active' en el dropdown para mostrar u ocultar
            layerDropdown.classList.toggle("active");
        });
    });