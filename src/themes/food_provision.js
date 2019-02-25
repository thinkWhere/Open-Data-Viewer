let foodProvision = {
    Name: "foodProvision",
    Title: "Community Food Provision",
    Headline: "Shows locations of places with food is provided",
    Description: "Long description",
    Author: "MartinClarke",
    OSMFeatures: ["ways", "relations", "nodes"],
    GeoTags: {
        "amenity": ["social_facility"],
        "social_facility": ["food_bank"]
    },
    AttributeTags: [
        {   attributeName: "Information",
            type: "description",
            attributeTag: "description",
            attributeValues: [],
            icon: "info-circle",
            iconColor: "#6495ED"
        }
    ],
    overpassQuery: `[out:json];\
        (way["amenity"="social_facility"]["social_facility"~"(food_bank|soup_kitchen)$"](around:20000,56.0019,-3.7893);\
        node["amenity"="social_facility"]["social_facility"~"(food_bank|soup_kitchen)$"](around:20000,56.0019,-3.7893););\
        out body;>;out skel qt;`,
    mapConfig: {
         mapIcon: "utensils",
         color: "purple"
    }
    };

export {
    foodProvision
};

