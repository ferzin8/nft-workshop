const attributes = [
    {
        name: "Body color",
        required: true,
        values: ["Green body", "Yellow-green body", "Red body",
            "Purple body", "Grey-blue body", "Blue body",
            "Yellow body", "Orange body", "Brown body"]
    },
    {
        name: "Skin pattern",
        required: true,
        values: ["Dots pattern", "Horizontal lines pattern", "Vertical lines pattern",
            "Rare dots pattern", "Chess vertical lines pattern", {
                value: "Without pattern", weight: 4,
            }]
    },
    {
        name: "Hand shape",
        required: true,
        values: ["Original hand", "PunkRock hand", "Duuude hand", "Fcuk hand",
            "Okay hand", "Reptilian hand"]
    },
    {
        name: "Eyes",
        required: true,
        values: ["Green eye", "Pink eye", "Blue eye", "Yellow eye",
            "Red eye", "Dark-blue eye", "Black with white corners eye",
            "Suspicious eye", "Yellow glasses", "Blue glasses",
            "Pink glasses", {value: "Default eye", weight: 7}]
    },
    {
        name: "Head",
        required: true,
        values: ["Violet hair", "Grey hair", "Green hair", "Blue hair with beard",
            "Red hair", "Loki hat", "Cap", "Pirate hat", "Blue hair", "Yellow hair",
            "Green hair with beard", "Yellow hair with beard",
            "Pink mask", {value: "Empty head", weight: 7}]
    },
    {
        name: "Mouth",
        required: true,
        values: ["Black mouth v1", "Black mouth v2", "White mouth", "Pink mouth",
            "Green mouth", "Blue mouth", "Light-blue mouth", "Yellow mouth",
            "Red blood", "Light-blue blood", "BDSM GAG", {value: "Default mouth", weight: 7}]
    },
    {
        name: "Cigarette",
        required: true,
        values: [
            "It's just a cigarette",
            "Green cigarette",
            "Smoking pipe",
            {value: "Do not smoke", weight: 3},
        ]
    }
];

module.exports = attributes;
