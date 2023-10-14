const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector('h2');
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
let files;

button.addEventListener('click', (e) => {
    input.click();
});

input.addEventListener("change", (e) => {
    files = e.target.files; // Corrige 'this' a 'e.target'
    dropArea.classList.add("active");
    showFiles(files);
    dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("active");
    dragText.textContent = "Suelta para cargar el archivo";
});

dropArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta el archivo";
});

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files);
    dropArea.classList.remove("active");
    dragText.textContent = "Arrastra y suelta el archivo";
});

function showFiles(files) {
    for (const file of files) { // Arregla el bucle 'for' para iterar sobre 'files'
        processFile(file);
    }
}
// Agrega esta función para cargar archivos GeoJSON o KML en el mapa Leaflet
function loadGeoJSONorKMLString(geoString) {
    try {
      // Parsea el archivo como GeoJSON
      const geojson = JSON.parse(geoString);
  
      // Crea una capa de GeoJSON y agrégala al mapa
      L.geoJSON(geojson).addTo(map);
  
      // Ajusta la vista del mapa para mostrar las geometrías cargadas
      map.fitBounds(L.geoJSON(geojson).getBounds());
    } catch (e) {
      alert("No es un archivo GeoJSON o KML válido.");
    }
  }

// Modifica la función processFile para cargar archivos GeoJSON o KML
function processFile(file) {
    const docType = file.type;
  
    // Definir las extensiones válidas (GeoJSON y KML)
    const validExtensions = ['application/geo+json'];
  
    if (validExtensions.indexOf(docType) !== -1) {
      // Archivo válido
      const fileReader = new FileReader();
  
      fileReader.addEventListener('load', (e) => {
        const fileContent = fileReader.result;
  
        // Carga el archivo GeoJSON o KML en el mapa
        loadGeoJSONorKMLString(fileContent);
      });
  
      fileReader.readAsText(file);
    } else {
      alert("No es un archivo GeoJSON o KML válido.");
    }
  }


async function uploadFile(file, id) {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch('http://localhost:8080/geoserver/Costas/file.geojson', {
          method: "POST",
          body: formData,
      });

        const responseText = await response.text();
        console.log(responseText);

        document.querySelector(`#${id} .status-text`
        ).innerHTML = `<span class="success">Archivo subido correctamente ...</span>`
    } catch (error) {
        document.querySelector(`#${id} .status-text`
        ).innerHTML = `<span class="failure">El archivo no pudo subirse ...</span>`
    }
}

