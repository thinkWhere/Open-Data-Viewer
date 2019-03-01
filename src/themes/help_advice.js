let helpAdvice = {
    Name: "helpAdvice",
    Title: "Community Information and Advice ",
    Headline: "Shows locations of places where advice is provided",
    Description: "Shows community based help and advice offices",
    Author: "MartinClarke",
    OSMFeatures: ["ways", "relations", "nodes"],
    GeoTags: {
        "amenity": ["social_facility"]
    },
    AttributeTags: [
        {   attributeName: "Citizens Advice",
            attributeTag: "social_facility",
            attributeValues: ["citizens_advice"],
            icon: "hands-helping"
        },
        {
            attributeName: "Financial Support",
            attributeTag: "social_facility",
            attributeValues: ["financial_services"],
            icon: "hands-helping"
        },
        {
            attributeName: "Family Support & Social Advice",
            attributeTag: "social_facility",
            attributeValues: ["advice_service"],
            icon: "users"
        },
        {
            attributeName: "Mental Health Support",
            attributeTag: "healthcare",
            attributeValues: ["mental_health"],
            icon:"hands-helping"
        },
    ],
    overpassQuery: `[out:json];\
        (way["amenity"="social_facility"][~"^(healthcare|social_facility)$"~"(financial_services|advice_service|mental_health|citizens_advice)$"](around:20000,56.0019,-3.7893);\
        node["amenity"="social_facility"][~"^(healthcare|social_facility)$"~"(financial_services|advice_service|mental_health|citizens_advice)$"](around:20000,56.0019,-3.7893););\
        out body;>;out skel qt;`,
    mapConfig: {
         mapIcon: "hands-helping",
         color: "darkblue"
    }
    };

export {
    helpAdvice
};

