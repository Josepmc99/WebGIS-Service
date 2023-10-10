var map = L.map('map').setView([39.09567618381688, -0.219680134361635], 16);


//Capa base WMS Ortofoto 2022
var wms2022 = L.tileLayer.wms("https://terramapas.icv.gva.es/0202_2022CVAL0025", {
            maxZoom: 25,
            layers: "2022CVAL0025_RGB",
            format: "image/png",
            transparent: true,
            attribution: "Atribución de la capa WMS"
        }).addTo(map)


