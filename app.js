const cities = [
    { name: "Madrid", coords: [40.4168, -3.7038], ISO: "ESP" },
    { name: "Barcelona", coords: [41.3851, 2.1734], ISO: "ESP" },
    { name: "Sevilla", coords: [37.3886, -5.9823], ISO: "ESP" },
    { name: "Valencia", coords: [39.4699, -0.3763], ISO: "ESP" },
    { name: "Zaragoza", coords: [41.6488, -0.8891], ISO: "ESP" },
    { name: "París", coords: [48.8566, 2.3522], ISO: "FRA" },
    { name: "Lyon", coords: [45.7640, 4.8357], ISO: "FRA" }
];

const cityList = document.getElementById('cityList');
let countryLayer = null;
let currentMarker = null;
let previousCityLayer = null;
let activeCityListItem = null;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        try {
            const timestamp = position.timestamp;
            const date = new Date(timestamp);
            const formattedDate = date.toLocaleDateString('es-ES');
            document.getElementById('date').textContent = formattedDate;
        } catch (error) {
            console.error("Error al obtener la ubicación: ", error);
        }
    });
} else {
    alert("Tu navegador no soporta la geolocalización.");
}

const map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    dragging: false,
    boxZoom: false,
    touchZoom: false
}).setView([41.3851, 2.1734], 7);

L.tileLayer('', {
    noWrap: true,
}).addTo(map);

const backgroundColorInput = document.getElementById('backgroundColor');
const initialBackgroundColor = backgroundColorInput.value;

backgroundColorInput.addEventListener('input', (event) => {
    const newColor = event.target.value;
    if (countryLayer) {
        countryLayer.setStyle({
            fillColor: newColor,
        });
    }
});

function selectFirstCity() {
    const firstCityListItem = cityList.querySelector('li:first-child');
    if (firstCityListItem) {
        firstCityListItem.click();
    }
}

cities.forEach((city) => {
    const listItem = document.createElement('li');
    listItem.classList.add('cursor-pointer', 'flex', 'items-center', 'gap-2', 'w-auto');
    listItem.classList.add('hover:bg-gray-100');

    const markerIcon = document.createElement('i');
    markerIcon.classList.add('fas', 'fa-location-dot');
    markerIcon.style.color = "#F39171";

    const cityName = document.createElement('span');
    cityName.classList.add('w-auto');
    cityName.style.cssText = "hover:text-blue-500";
    cityName.innerText = city.name;

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.value = '#F39171';
    colorInput.classList.add('ml-2', 'cursor-pointer', 'w-8', 'h-5', 'ms-auto');

    colorInput.addEventListener('input', (event) => {
        const newColor = event.target.value;
        markerIcon.style.color = newColor;

        if (currentMarker) {
            const newIcon = L.divIcon({
                className: 'custom-marker',
                html: `<i class="fas fa-location-dot" style="color: ${newColor}; font-size: 24px;"></i>`,
                iconSize: [24, 24],
                iconAnchor: [12, 24],
            });
            currentMarker.setIcon(newIcon);
        }
    });

    listItem.appendChild(markerIcon);
    listItem.appendChild(cityName);
    listItem.appendChild(colorInput);

    listItem.addEventListener('click', () => {
        if (currentMarker) {
            currentMarker.remove();
        }

        if (activeCityListItem) {
            activeCityListItem.classList.remove('active');
        }

        listItem.classList.add('active');
        activeCityListItem = listItem;

        const iconColor = colorInput.value;
        const cityMarkerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<i class="fas fa-location-dot" style="color: ${iconColor}; font-size: 26px;"></i>`,
            iconSize: [24, 24],
            iconAnchor: [12, 24],
        });

        const cityMarker = L.marker(city.coords, { icon: cityMarkerIcon }).addTo(map);
        currentMarker = cityMarker;

        if (countryLayer) {
            countryLayer.remove();
        }

        const geoJsonUrl = `https://raw.githubusercontent.com/johan/world.geo.json/master/countries/${city.ISO}.geo.json`;
        fetch(geoJsonUrl)
            .then((response) => response.json())
            .then((geoJson) => {

                if (previousCityLayer) {
                    previousCityLayer.setStyle({
                        fillColor: backgroundColorInput.value || initialBackgroundColor,
                    });
                }

                countryLayer = L.geoJson(geoJson, {
                    style: {
                        weight: 0,
                        color: 'transparent',
                        fillColor: backgroundColorInput.value || initialBackgroundColor,
                        fillOpacity: 2,
                    },
                }).addTo(map);
                map.fitBounds(countryLayer.getBounds());

                countryLayer.eachLayer(function (layer) {
                    if (layer.feature.properties.name === city.name) {
                        layer.setStyle({ fillColor: 'red' });
                        previousCityLayer = layer;
                    }
                });

            });
    });

    cityList.appendChild(listItem);
});

const style = document.createElement('style');
style.textContent = `
  li.active span {
    color: red !important; 
  }
`;
document.head.appendChild(style);

selectFirstCity(); 