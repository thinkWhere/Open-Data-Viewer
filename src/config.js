/* App config.
mapConfig stores options for Leaflet maps.   tileLayer defines the provider
for background mapping.
*/

let mapConfig = {};
mapConfig.params = {
    center: [56.0019, -3.789],
    zoom: 13,
    attributionControl: true,
    zoomControl: false,
    maxBounds: ([[55.7, -4.3], [56.3, -3.1]]),
};

mapConfig.tileLayer = {
    uri: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",
    params: {
        minZoom: 11,
        attribution: "&copy; OpenStreetMap contributors &amp; <a href=&quot;https://wikimediafoundation.org/wiki/Maps_Terms_of_Use&quot;>Wikimedia</a>",
        id: '',
        accessToken: ''
    }
};

mapConfig.search = {
    // Defines the parameter for OSM nominatim search
    // See https://wiki.openstreetmap.org/wiki/Nominatim for details on search params
    viewbox: "-3.9,55.9,-3.6,56.1",
    bounded: 1,
    limit: 10
};

export {
    mapConfig
};
