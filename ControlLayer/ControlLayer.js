document.addEventListener("DOMContentLoaded", function () {
    var mymap = L.map("map").setView([39.09567618381688, -0.219680134361635], 16);

    // Agrega una capa base, por ejemplo, una capa de OpenStreetMap
    var baseLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
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
  
    // -----------GEOJSON-----------
    var wmsL_C_2017 = L.layerGroup(); 
    var wmsL_C_2022 = L.layerGroup();
    var wmsEdif_Bajo = L.layerGroup();
    var wmsEdif_Medio = L.layerGroup();
    var wmsEdif_Alto = L.layerGroup();
    var wmsPrediction30years = L.layerGroup();

    //Agregar Geojson
    var wmsL_C_2017 = L.geoJSON(playa2017,{
        onEachFeature: function(feature,layer){
            layer.bindPopup('<b>Superficie de playa en </b>' + feature.properties.Year)
        },
        style:{
            fillColor: '#8f8863',
            fillOpacity:0.7,
            color: '#6f6b56',
            weight: 1,
        }
    });

    var wmsL_C_2022 = L.geoJSON(playa2022,{
        onEachFeature: function(feature,layer){
            layer.bindPopup('<b>Superficie de playa en </b>' + feature.properties.Year)
        },
        style:{
            fillColor: '#e9e0b2',
            fillOpacity:0.7,
            color: '#b9b080',
            weight: 1,
        }
    });

    var wmsErosion = L.geoJSON(perdida_ganancia,{
        onEachFeature: function(feature,layer){
            layer.bindPopup(feature.properties.Cambios + '<b> de arena </b>')
        },
        style: function(feature) {
            var columna = feature.properties.Cambios;

            //Asignar colores según categoría
            var fillColor = columna === 'Pérdida' ? 'red' : 'green';
            var fillOpacity = 0.4;
            var color = 'none';

            return {
                fillColor: fillColor,
                fillOpacity: fillOpacity,
                color: color
            };
        }
    });

    var wmsEdif_Bajo = L.geoJSON(edif_bajo,{
        onEachFeature: function(feature,layer){
            layer.bindPopup('<b> Valor económico </b>' + feature.properties.Valor)
        },
        style:{ 
            fillColor: 'green',
            fillOpacity: 0.2,
            color: 'green',   
            weight: 0.2,
        }
    });

    var wmsEdif_Medio = L.geoJSON(edif_medio,{
        onEachFeature: function(feature,layer){
            layer.bindPopup('<b> Valor económico </b>' + feature.properties.Valor)
        },
        style:{ 
            fillColor: 'yellow',
            fillOpacity: 0.2,
            color: 'yellow',   
            weight: 0.2,
        }
    });

    var wmsEdif_Alto = L.geoJSON(edif_alto, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<b> Valor económico </b>' + feature.properties.Valor);
        },
        style:{ 
            fillColor: 'red',
            fillOpacity: 0.2,
            color: 'red',   
            weight: 0.2,
        }
    });

    var wmsPrediction30years = L.geoJSON(prediction30years, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<b> Riesgo de inundación </b>');
        },
        style:{ 
            fillColor: 'red',
            fillOpacity: 0.2,
            color: 'red',   
            weight: 0.2,
        }
    });



    


    // -----------WMS-----------
    // var wmsL_C_2017 = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:L_C_2017",
    //      maxZoom: 29,
    //      atribution: '<a>&copy IMEDES</a>'
    // });
    
    // var wmsL_C_2022 = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:L_C_2022",
    //     maxZoom: 29,
    // });
    
    // var wmsEdif = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:Edif",
    //     maxZoom: 29,
    // });

    // var wmsEdif_Bajo = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:Edif_bajo",
    //     maxZoom: 29,
    //     atribution: '&copy IMEDES',
    // });

    // var wmsEdif_Medio = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:Edif_medio",
    //     maxZoom: 29,
    //     atribution: '&copy IMEDES',
    // });

    // var wmsEdif_Alto = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:Edif_alto",
    //     maxZoom: 29,
    //     atribution: '&copy IMEDES',
    // });
    
    // var wmsErosion = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:erosion",
    //     maxZoom: 29,
    // });

    // var wmsPrediction30years = L.Geoserver.wms("http://localhost:8080/geoserver/Proyecto_Costas/wms?service=WMS", {
    //     layers: "Proyecto_Costas:prediction_30_years",
    //     maxZoom: 29,
    // });

    // -----------AJUSTES LAYER CONTROL-----------

    //------------------------------------------- CAPAS PRINCIPALES -------------------------------------------------------/
    document.getElementById("checkboxCapa1").click();
    document.getElementById("checkboxCapa2").click();
    // document.getElementById("checkboxCapa3").click();
    //------------------------------------------- CAPAS SECUNDARIAS -------------------------------------------------------/
    
    document.getElementById("checkboxSub1").addEventListener("click", function () {
        // Obtén el estado actual del checkbox
        var sub1Checked = this.checked;

        // Cambia la visibilidad de la capa 1 según el estado del checkbox
        if (sub1Checked) {
            mymap.addLayer(wmsL_C_2017);
        } else {
            mymap.removeLayer(wmsL_C_2017);
        }
    });
        // Activa la capa por defecto al cargar la página
        document.getElementById("checkboxSub1").click();
//---------------------------------------------------------------------------------------//
    document.getElementById("checkboxSub2").addEventListener("change", function () {
        // Obtén el estado actual del checkbox
        var sub2Checked = this.checked;

        // Cambia la visibilidad de la capa 2 según el estado del checkbox
        if (sub2Checked) {
            mymap.addLayer(wmsL_C_2022);
        } else {
            mymap.removeLayer(wmsL_C_2022);
        }
    });
        // Activa la capa por defecto al cargar la página
        document.getElementById("checkboxSub2").click();
//---------------------------------------------------------------------------------------//
    document.getElementById("checkboxSub3").addEventListener("click", function () {
        // Obtén el estado actual del checkbox
        var sub3Checked = this.checked;

        // Cambia la visibilidad de la Subcapa 1 según el estado del checkbox
        if (sub3Checked) {
            mymap.addLayer(wmsErosion);
        } else {
            mymap.removeLayer(wmsErosion);
        }
    });
        // Activa la capa por defecto al cargar la página
        document.getElementById("checkboxSub3").click();
//---------------------------------------------------------------------------------------//
    document.getElementById("checkboxSub4").addEventListener("click", function () {
        // Obtén el estado actual del checkbox
        var sub4Checked = this.checked;

        // Cambia la visibilidad de la Subcapa 1 según el estado del checkbox
        if (sub4Checked) {
            mymap.addLayer(wmsEdif_Bajo);
        } else {
            mymap.removeLayer(wmsEdif_Bajo);
        }
    });
        // Activa la capa por defecto al cargar la página
        document.getElementById("checkboxSub4").click();
//---------------------------------------------------------------------------------------//
    document.getElementById("checkboxSub5").addEventListener("click", function () {
        // Obtén el estado actual del checkbox
        var sub5Checked = this.checked;

        // Cambia la visibilidad de la Subcapa 1 según el estado del checkbox
        if (sub5Checked) {
            mymap.addLayer(wmsEdif_Medio);
        } else {
            mymap.removeLayer(wmsEdif_Medio);
        }
    });
        // Activa la capa por defecto al cargar la página
        document.getElementById("checkboxSub5").click();
//---------------------------------------------------------------------------------------//
    document.getElementById("checkboxSub6").addEventListener("click", function () {
        // Obtén el estado actual del checkbox
        var sub6Checked = this.checked;

        // Cambia la visibilidad de la Subcapa 1 según el estado del checkbox
        if (sub6Checked) {
            mymap.addLayer(wmsEdif_Alto);
        } else {
            mymap.removeLayer(wmsEdif_Alto);
        }
    });
        // Activa la capa por defecto al cargar la página
        document.getElementById("checkboxSub6").click();

//---------------------------------------------------------------------------------------//
    document.getElementById("checkboxSub7").addEventListener("click", function () {
        // Obtén el estado actual del checkbox
        var sub7Checked = this.checked;

        // Cambia la visibilidad de la Subcapa 1 según el estado del checkbox
        if (sub7Checked) {
            mymap.addLayer(wmsPrediction30years);
        } else {
            mymap.removeLayer(wmsPrediction30years);
        }
    });
        // Activa la capa por defecto al cargar la página
        // document.getElementById("checkboxSub7").click();



    //------------------------------------------- CAPAS PRINCIPALES CONTROLAN LAS CAPAS SECUNDARIAS -------------------------------------------------------/

    // Obtén una referencia al checkbox "checkboxCapa1"
    const checkboxCapa1 = document.getElementById("checkboxCapa1");

    // Obtén una lista de todos los checkboxes de subcapas dentro de "dropdown_sub"
    const checkboxSubcapas1 = document.querySelectorAll(".dropdown_sub .checktoggle.capa1");

    // Obtén una lista de los layers correspondientes a las subcapas
    const subcapaLayers1 = {
        checkboxSub1: wmsL_C_2017,
        checkboxSub2: wmsL_C_2022,
        checkboxSub3: wmsErosion,
    };
    // Agrega un evento de cambio al checkbox "checkboxCapa1"
    checkboxCapa1.addEventListener("change", function () {
        // Verifica si el checkbox "checkboxCapa1" está desactivado
        if (!checkboxCapa1.checked) {
            // Desactiva todos los checkboxes de subcapas
            checkboxSubcapas1.forEach(function (checkbox) {
                checkbox.checked = false;
            });
            // Desactiva todos los layers correspondientes a las subcapas
            for (const subcapaId in subcapaLayers1) {
                const layer = subcapaLayers1[subcapaId];
                mymap.removeLayer(layer);
            }

        } else {
            // Desactiva todos los checkboxes de subcapas
            checkboxSubcapas1.forEach(function (checkbox) {
                checkbox.checked = true;
                // También puedes ocultar o realizar otras acciones según tus necesidades
            });
            // Activa todos los layers correspondientes a las subcapas
            for (const subcapaId in subcapaLayers1) {
                const layer = subcapaLayers1[subcapaId];
                mymap.addLayer(layer);
                // También puedes realizar otras acciones según tus necesidades
            }
        }
    });

    //------------------------------------------------------------------------//

    // Obtén una referencia al checkbox "checkboxCapa1"
    const checkboxCapa2 = document.getElementById("checkboxCapa2");

    // Obtén una lista de todos los checkboxes de subcapas dentro de "dropdown_sub"
    const checkboxSubcapas2 = document.querySelectorAll(".dropdown_sub .checktoggle.capa2");

    const subcapaLayers2 = {
        checkboxSub4: wmsEdif_Bajo,
        checkboxSub5: wmsEdif_Medio,
        checkboxSub6: wmsEdif_Alto,
    };

    // Agrega un evento de cambio al checkbox "checkboxCapa1"
    checkboxCapa2.addEventListener("change", function () {
        // Verifica si el checkbox "checkboxCapa1" está desactivado
        if (!checkboxCapa2.checked) {
            // Desactiva todos los checkboxes de subcapas
            checkboxSubcapas2.forEach(function (checkbox) {
                checkbox.checked = false;
            });
            // Desactiva todos los layers correspondientes a las subcapas
            for (const subcapaId in subcapaLayers2) {
                const layer = subcapaLayers2[subcapaId];
                mymap.removeLayer(layer);
            }

        } else {
            // Desactiva todos los checkboxes de subcapas
            checkboxSubcapas2.forEach(function (checkbox) {
                checkbox.checked = true;
                // También puedes ocultar o realizar otras acciones según tus necesidades
            });
            // Activa todos los layers correspondientes a las subcapas
            for (const subcapaId in subcapaLayers2) {
                const layer = subcapaLayers2[subcapaId];
                mymap.addLayer(layer);
                // También puedes realizar otras acciones según tus necesidades
            }
        }
    });

    //------------------------------------------------------------------------//

    // Obtén una referencia al checkbox "checkboxCapa1"
    const checkboxCapa3 = document.getElementById("checkboxCapa3");

    // Obtén una lista de todos los checkboxes de subcapas dentro de "dropdown_sub"
    const checkboxSubcapas3 = document.querySelectorAll(".dropdown_sub .checktoggle.capa3");

    const subcapaLayers3 = {
        checkboxSub7: wmsPrediction30years,
    };

    // Agrega un evento de cambio al checkbox "checkboxCapa1"
    checkboxCapa3.addEventListener("change", function () {
        // Verifica si el checkbox "checkboxCapa3" está desactivado
        if (!checkboxCapa3.checked) {
            // Desactiva todos los checkboxes de subcapas
            checkboxSubcapas3.forEach(function (checkbox) {
                checkbox.checked = false;
            });
            // Desactiva todos los layers correspondientes a las subcapas
            for (const subcapaId in subcapaLayers3) {
                const layer = subcapaLayers3[subcapaId];
                mymap.removeLayer(layer);
            }

        } else {
            // Desactiva todos los checkboxes de subcapas
            checkboxSubcapas3.forEach(function (checkbox) {
                checkbox.checked = true;
                // También puedes ocultar o realizar otras acciones según tus necesidades
            });
            // Activa todos los layers correspondientes a las subcapas
            for (const subcapaId in subcapaLayers3) {
                const layer = subcapaLayers3[subcapaId];
                mymap.addLayer(layer);
                // También puedes realizar otras acciones según tus necesidades
            }
        }
    });



    //------------------------------------------- ASSET ADD BASE LAYERS -------------------------------------------------------/

    // Agrega un manejador de eventos clic a la opción "Estándar"
    const standardMapOption = document.querySelector("[data-layer=layer_base]");
    standardMapOption.addEventListener("click", function() {
        // Remueve el mapa actual
        mymap.eachLayer(function(layer) {
            mymap.removeLayer(layer);
        });

        // Agrega el mapa base de Open Street Maps
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 29,
        }).addTo(mymap);
    });

    // Agrega un manejador de eventos clic a la opción "Satélite 2022"
    const orto2017Option = document.querySelector("[data-layer=layer_orto2017]");
    orto2017Option.addEventListener("click", function() {
        // Remueve el mapa actual
        mymap.eachLayer(function(layer) {
            mymap.removeLayer(layer);
        });

        // Agrega la ortofoto
        var orto2017 = L.tileLayer.wms("https://terramapas.icv.gva.es/0202_2017CVAL0025?service=wms&request=getcapabilities", {
            maxZoom: 25,
            layers: "2017CVAL0025_RGB",
            format: "image/png",
            transparent: true,
        })
        orto2017.addTo(mymap);
    });

    // Agrega un manejador de eventos clic a la opción "Satélite 2022"
    const orto2022Option = document.querySelector("[data-layer=layer_orto2022]");
    orto2022Option.addEventListener("click", function() {
        // Remueve el mapa actual
        mymap.eachLayer(function(layer) {
            mymap.removeLayer(layer);
        });

        var orto2022 = L.tileLayer.wms("https://terramapas.icv.gva.es/0202_2022CVAL0025", {
            maxZoom: 25,
            layers: "2022CVAL0025_RGB",
            format: "image/png",
            transparent: true,
        });
        orto2022.addTo(mymap);
    });

    // Agrega un manejador de eventos clic a la opción "Satélite 2022"
    const sioseOption = document.querySelector("[data-layer=layer_siose]");
    sioseOption.addEventListener("click", function() {
        // Remueve el mapa actual
        mymap.eachLayer(function(layer) {
            mymap.removeLayer(layer);
        });

        var siose = L.tileLayer.wms("https://terramapas.icv.gva.es/04_SIOSE", {
            maxZoom: 25,
            layers: "siose2015",
            format: "image/png",
            transparent: true,
        });
        siose.addTo(mymap);
    });

    //------------------------------------------- ASSET ADD BASE LAYERS DE DETALLE -------------------------------------------------------/
    // Desactivar solo las capas de detalle al volver a clicar sobre ellas
    const baseLayers = {
        layer_catastro: null,
        layer_nomenclator: null,
        layer_areas_gestion: null,
    };

    // Función para evitar que desaparezca la capa base activa cuando se activa el Mapa de detalle
    function toggleBaseLayer(layerName, layer) {
        if (baseLayers[layerName] === null) {
            baseLayers[layerName] = layer.addTo(mymap);
        } else {
            mymap.removeLayer(baseLayers[layerName]);
            baseLayers[layerName] = null;
        }
    }

    // Agrega un manejador de eventos clic a la opción "Catastro"
    const catastroOption = document.querySelector("[data-layer=layer_catastro]");
    catastroOption.addEventListener("click", function() {
        toggleBaseLayer("layer_catastro", L.tileLayer.wms("http://ovc.catastro.meh.es/cartografia/INSPIRE/spadgcwms.aspx", {
            maxZoom: 25,
            layers: "CP.CadastralParcel",
            format: "image/png",
            transparent: true,
        }));
        catastro.addTo(mymap);
    });

    // Agrega un manejador de eventos clic a la opción "Nomenclator"
    const nomenclatorOption = document.querySelector("[data-layer=layer_nomenclator]");
    nomenclatorOption.addEventListener("click", function() {
        toggleBaseLayer("layer_nomenclator", L.tileLayer.wms("http://terramapas.icv.gva.es/toponimia_base", {
            layers: "NOMENCLATOR_ICV",
            format: "image/png",
            transparent: true,
        }));
        nomenclator.addTo(mymap);
    });

    // Agrega un manejador de eventos clic a la opción "Areas de Gestión Residuos"
    const gestionOption = document.querySelector("[data-layer=layer_areas_gestion]");
    gestionOption.addEventListener("click", function() {
        toggleBaseLayer("layer_areas_gestion", L.tileLayer.wms("http://carto.icv.gva.es/arcgis/services/tm_medio_ambiente/residuos/MapServer/WmsServer?", {
            layers: "2",
            maxZoom: 25,
            format: "image/png",
            transparent: true,
        }));
        areas_gestion.addTo(mymap);
    });

    //------------------------------------------- DRAWING ASSET FROM CIRCULAR MENU -------------------------------------------------------/
    const DrawingButton = document.getElementById("drawing-icon");
    let drawingActive = false; // Variable para controlar si la capacidad de dibujo está activa

    // Agrega un evento de clic al botón de dibujo
    DrawingButton.addEventListener("click", function () {
        // Alterna la clase 'active' en el botón para mostrar u ocultar
        DrawingButton.classList.toggle("active");

        // Actualiza el estado de la variable drawingActive
        drawingActive = !drawingActive;

        if (drawingActive) {
            // Habilita la capacidad de dibujo
            mymap.on('click', startDrawingPolygon);
            mymap.on('dblclick', finishDrawingPolygon);
            DrawingButton.classList.add('draw-cursor-enabled'); // Cambiar el estilo del cursor
        } else {
            // Deshabilita la capacidad de dibujo
            mymap.off('click', startDrawingPolygon);
            mymap.off('dblclick', finishDrawingPolygon);
            DrawingButton.classList.remove('draw-cursor-enabled'); // Restablece el estilo del cursor
        }
    });

    let drawingMode = null; // Variable para almacenar el polígono dibujado

    function startDrawingPolygon(e) {
        if (drawingMode === null) {
            drawingMode = L.polygon([e.latlng], { color: 'blue' }).addTo(mymap);
        } else {
            drawingMode.addLatLng(e.latlng);
        }
    }

    function finishDrawingPolygon(e) {
        if (drawingMode) {
            mymap.off('click', startDrawingPolygon);
            mymap.off('dblclick', finishDrawingPolygon);

            var coordinates = drawingMode.getLatLngs();
            console.log('Polígono guardado:', coordinates);

            drawingMode = null;

            if (drawingActive) {
                // Reactivar la capacidad de dibujar un nuevo polígono
                mymap.on('click', startDrawingPolygon);
                mymap.on('dblclick', finishDrawingPolygon);
            }
        }
    }


});
