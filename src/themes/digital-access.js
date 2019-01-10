let digitalAccess = {
    Title: "DigitalAccess",
    Headline: "Shows locations of places with digital access services",
    Description: "Long description",
    Author: "MartinClarke",
    OSMFeatures: ["ways", "relations", "nodes"],
    GeoTags: {
        "amenity": ["library", "community_centre"]
    },
    AttributeTags: {
        "internet_access": ["wlan", "yes", "terminal", "wifi", "service"]
    },
    overpassQuery: `[out:json];\
        (way["amenity"~"(library|community_centre)$"]["internet_access"~"(yes|wlan|terminal|wifi|service)$"](around:25000,56.0019,-3.7893);\
        relation["amenity"~"(library|community_centre)$"]["internet_access"~"(yes|wlan|terminal|wifi|service)$"](around:25000,56.0019,-3.7893);\
        node["amenity"~"(library|community_centre)$"]["internet_access"~"(yes|wlan|terminal|wifi|service)$"](around:25000,56.0019,-3.7893););\
        out body;>;out skel qt;`
};

export {
    digitalAccess
};

