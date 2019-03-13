import queryOverpass from '@derhuerst/query-overpass';

const overpassGeoJSON = async (overpassQuery) => {
    return new Promise((resolve, reject) => {
        queryOverpass(overpassQuery)
        .then((osmData) => {
            resolve(osmData);
        })
        .catch((err) => {
            console.error(err);
            reject('Error')
        })
    });
}

export default overpassGeoJSON;

