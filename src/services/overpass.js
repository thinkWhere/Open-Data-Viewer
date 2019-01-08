import query_overpass from "query-overpass";

export default class OverPassAPIService {
    getTheme(callback) {
        const query = `[out:json];(way[amenity=library](around:25000, 56.0019,-3.7893);\
                             relation[amenity=library](around:25000, 56.0019,-3.7893);\
                             node[amenity=library](around:25000, 56.0019,-3.7893););\
                             out body;>;out skel qt;`;

        const options = {
            flatProperties: true
        };

        query_overpass(query, callback, options);
    }

    dataHandler = (error, osmData) => {
        if (!error && osmData.features !== undefined) {
            return osmData;
        }
    }
}
