document.addEventListener("DOMContentLoaded", function () {
    var mymap = L.map("map").setView([39.09567618381688, -0.219680134361635], 16);

    // Agrega una capa base, por ejemplo, una capa de OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 29,
    }).addTo(mymap);

 //------------------------------------------- BOTÓN PARA AÑADIR MARCADORES A TRAVÉS DEL CIRCULAR MENÚ-------------------------------------------------------/

                // Variable global para rastrear el estado de activación de la función de añadir marcadores
                let addMarkerActive = false;

                //------------Herramienta ACTIVA - Si está activa el icono cambia al color blanco, si está desactivada vulve a su estado anterior------------/

                const menuItems = document.querySelectorAll(".menu li a");
                const activeOptions = {};

                menuItems.forEach(function (menuItem) {
                    menuItem.addEventListener("click", function () {
                        const id = menuItem.id;
                        if (activeOptions[id]) {
                            menuItem.style.backgroundColor = "";
                            menuItem.style.color = "white";
                            activeOptions[id] = false;
                        } else {
                            menuItem.style.backgroundColor = "white";
                            menuItem.style.color = "black";
                            activeOptions[id] = true;
                        }
                    });
                });
                
                //------------Herramienta ACTIVA - Si está activa permite añadir marcadores cuando clicas en el mapa ------------/

                // Obtén una referencia al botón de location por su ID
                const locationButton = document.getElementById("location-icon");

                // Agrega un evento de clic al botón de location
                locationButton.addEventListener("click", function () {
                    // Alterna la clase 'active' en el botón para mostrar u ocultar
                    locationButton.classList.toggle("active");

                    // Actualiza el estado de la variable addMarkerActive
                    addMarkerActive = !addMarkerActive;
                });

                // Manejador de clic en el mapa para agregar marcadores
                mymap.on("click", function (e) {
                    if (addMarkerActive) {
                        // Si la variable addMarkerActive está en true, agrega un marcador en el punto exacto del clic
                        const latlng = e.latlng;
                        L.marker(latlng).addTo(mymap);
                    }
                });

    

 //------------------------------------------- BOTÓN ZOOM A TRAVÉS DEL CIRCULAR MENÚ-------------------------------------------------------/

                // Obtén una referencia al botón "Home" por su ID
                const zoomButton = document.getElementById('zoomButton');

                // Agrega un evento de clic al botón
                zoomButton.addEventListener('click', function (event) {
                    // Evita que el enlace haga una recarga de página
                    event.preventDefault();

                    // Define las coordenadas a las que deseas hacer zoom
                    const newLatLng = L.latLng(39.09567618381688, -0.219680134361635);
                    const zoomLevel = 16

                    // Hacer zoom a la ubicación deseada
                    mymap.setView(newLatLng, zoomLevel)
                });


 //------------------------------------------- -------------------------------------------------------/
        


  //------------------------------------------- CONTROL LAYER -------------------------------------------------------/
  
    // -----------CAPAS PRINCIPALES-----------
    
    // -----------CAPAS SECUNDARIAS-----------

    var wmsL_C_2017 = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
        layers: "Proyecto_Costas:L_C_2017",
         maxZoom: 29,
    });
    
    var wmsL_C_2022 = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
        layers: "Proyecto_Costas:L_C_2022",
        maxZoom: 29,
    });
    
    var wmsEdif = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
        layers: "Proyecto_Costas:Edif",
        maxZoom: 29,
    });
    
    var wmsErosion = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
        layers: "Proyecto_Costas:perdida_ganancia",
        maxZoom: 29,
    });

    // var wmsPrediction30years = L.Geoserver.wms("http://localhost:8080/geoserver/wms", {
    //     layers: "Proyecto_Costas:prediction_30_years",
    //     maxZoom: 29,
    // });

    // -----------CAPAS BASE-----------
        
    //Ortofoto 2022
    var orto2022 = L.tileLayer.wms("https://terramapas.icv.gva.es/0202_2022CVAL0025", {
        maxZoom: 25,
        layers: "2022CVAL0025_RGB",
        format: "image/png",
        transparent: true,
        attribution: "Atribución de la capa WMS"
    });

    // -----------AJUSTES LAYER CONTROL-----------

     // Obtén el checkbox de la Capa 1
    var checkboxCapa1 = document.querySelector(".dropdown_list input[type='checkbox']");

    // Obtén el elemento .dropdown_content
    var dropdownContent = document.querySelector(".dropdown_list");

    // Escucha los cambios en el estado del checkbox
    checkboxCapa1.addEventListener("change", function () {
        // Verifica si el checkbox está marcado
        if (checkboxCapa1.checked) {
            // Si está marcado, muestra el desplegable de las subcapas
            dropdownContent.style.setProperty("--rows", "1fr");
        } else {
            // Si no está marcado, oculta el desplegable de las subcapas
            dropdownContent.style.setProperty("--rows", "0fr");
        }
    });


        var wmsL_C_2017Visible = false;
        var wmsL_C_2022Visible = false;
        var wmsEdifVisible = false;
        var wmsErosionVisible = false;
        var wmsPrediction30yearsVisible = false;
        var orto2022Visible = false;


    document.querySelector(".sub_capa1").addEventListener("click", function () {
        // Cambia la visibilidad de la capa 1 cuando se hace clic en el menú
        if (wmsL_C_2017Visible) {
            mymap.removeLayer(wmsL_C_2017);
        } else {
            mymap.addLayer(wmsL_C_2017);
        }
        wmsL_C_2017Visible = !wmsL_C_2017Visible;
    });

    document.querySelector(".sub_capa2").addEventListener("click", function () {
        // Cambia la visibilidad de la capa 2 cuando se hace clic en el menú
        if (wmsL_C_2022Visible) {
            mymap.removeLayer(wmsL_C_2022);
        } else {
            mymap.addLayer(wmsL_C_2022);
        }
        wmsL_C_2022Visible = !wmsL_C_2022Visible;
    });

    document.querySelector(".sub_capa3").addEventListener("click", function () {
        // Cambia la visibilidad de la capa 2 cuando se hace clic en el menú
        if (wmsErosionVisible) {
            mymap.removeLayer(wmsErosion);
        } else {
            mymap.addLayer(wmsErosion);
        }
        wmsErosionVisible = !wmsErosionVisible;
    });

    document.querySelector(".sub_capa4").addEventListener("click", function () {
        // Cambia la visibilidad de la capa 2 cuando se hace clic en el menú
        if (wmsEdifVisible) {
            mymap.removeLayer(wmsEdif);
        } else {
            mymap.addLayer(wmsEdif);
        }
        wmsEdifVisible = !wmsEdifVisible;
    });

    document.querySelector(".sub_capa5").addEventListener("click", function () {
        // Cambia la visibilidad de la capa 2 cuando se hace clic en el menú
        if (wmsPrediction30yearsVisible) {
            mymap.removeLayer(wmsPrediction30years);
        } else {
            mymap.addLayer(wmsPrediction30years);
        }
        wmsPrediction30yearsVisible = !wmsPrediction30yearsVisible;
    });

    document.querySelector(".sub_capa6").addEventListener("click", function () {
        // Cambia la visibilidad de la capa 2 cuando se hace clic en el menú
        if (orto2022Visible) {
            mymap.removeLayer(orto2022);
        } else {
            mymap.addLayer(orto2022);
        }
        orto2022Visible = !orto2022Visible;
    });
    
});
