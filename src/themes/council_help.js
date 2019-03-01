let councilHelpAdvice = {
    Name: "councilHelp",
    Title: "Council Help & Advice",
    Headline: "Shows locations of places where council advice is provided",
    Description: "Shows the location of Falkirk council advice centres",
    Author: "MartinClarke",
    OSMFeatures: ["ways", "relations", "nodes"],
    GeoTags: {
        "office": ["government"],
    },

    AttributeTags: [
        {   attributeName: "Council Advice",
            attributeTag: "amenity",
            attributeValues: ["advice_service"],
            icon: "question-circle"
        }
    ],

    overpassQuery: `[out:json];\
        (way["office"="government"]["amenity"="advice_service"]["government"="services"](around:20000,56.0019,-3.7893);\
        node["office"="government"]["amenity"="advice_service"]["government"="services"](around:20000,56.0019,-3.7893););\
        out body;>;out skel qt;`,
    mapConfig: {
         mapIcon: "question-circle",
         color: "orange"
    }
    };

export {
    councilHelpAdvice
};
