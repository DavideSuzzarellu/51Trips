# Mapa Interactivo de Ciudades

Este proyecto es una prueba técnica que muestra un mapa interactivo con una lista de ciudades. Al seleccionar una ciudad, se muestra su ubicación en el mapa y se resalta el país al que pertenece.

## Funcionalidades

* **Lista de ciudades:** Una lista con nombres de ciudades visitadas durante el día.
* **Mapa interactivo:** Un mapa que muestra la ubicación de las ciudades al seleccionarlas.
* **Resaltado de país:** Al seleccionar una ciudad, se resalta el país al que pertenece en el mapa.
* **Personalización de color:** Permite cambiar el color del marcador de la ciudad y del fondo del país.
* **Fecha actual:** Muestra la fecha actual al abrir la página, permitiendo registrar las ubicaciones diarias.
* **Visualización de países con GeoJSON:**   La aplicación consume datos GeoJSON desde una URL externa para mostrar la forma de los países en el mapa, con la posibilidad de navegar entre ellos.


## Tecnologías utilizadas

* HTML
* CSS
* JavaScript
* Leaflet (librería para mapas)
* Tailwind CSS (framework CSS)

## Notas

* Este proyecto no tiene un `package.json` ya que no utiliza ningún gestor de paquetes.
* Se ha utilizado Tailwind CSS a través de la CDN para simplificar la configuración.
* El código JavaScript se encuentra en el archivo `app.js`.
