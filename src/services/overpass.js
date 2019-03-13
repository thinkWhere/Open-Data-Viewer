import queryOverpass from '@derhuerst/query-overpass';
import osmtogeojson from 'osmtogeojson';

var toGeoJSON = (data) => {    
   const geojson = osmtogeojson(data, {
        flatProperties: true
    });
    return geojson
};

const overpassGeoJSON = async (overpassQuery) => {
    return new Promise((resolve, reject) => {
        queryOverpass(overpassQuery)
        .then((osmData) => {
            const geojson = toGeoJSON({elements: osmData}, {flatProperties: true});
            resolve(geojson);
        })
        .catch((err) => {
            console.error(err);
            reject('Error: the overpass API request was not completed')
        })
    });
}

export default overpassGeoJSON;

