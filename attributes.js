const attributes = [
    { name: "Body color",   count: 9, required: true, attrNames: ["Green body", "Yellow-green body", "Red body",
                                                                  "Purple body", "Grey-blue body", "Blue body",
                                                                  "Yellow body", "Orange body", "Brown body"]},
    { name: "Skin pattern", count: 9, required: true, attrNames: ["Dots pattern", "Horizontal lines pattern", "Vertical lines pattern",
                                                                  "Rare dots pattern", "Chess vertical lines pattern", "Without pattern",
                                                                  "Without pattern", "Without pattern", "Without pattern"] },
    { name: "Hand shape",   count: 6, required: true, attrNames: ["Original hand", "PunkRock hand", "Duuude hand", "Fcuk hand",
                                                                  "Okay hand", "Reptilian hand"] },
    { name: "Eyes",         count: 18, required: true, attrNames: ["Green eye", "Pink eye", "Blue eye", "Yellow eye",
                                                                    "Red eye", "Dark-blue eye", "Black with white corners eye",
                                                                    "Suspicious eye", "Yellow glasses", "Blue glasses",
                                                                    "Pink glasses", "Default eye", "Default eye", "Default eye",
                                                                    "Default eye", "Default eye", "Default eye", "Default eye"] },
    { name: "Head",         count: 20, required: true, attrNames: ["Violet hair", "Grey hair", "Green hair", "Blue hair with beard",
                                                                    "Red hair", "Loki hat", "Cap", "Pirate hat", "Blue hair", "Yellow hair",
                                                                    "Green hair with beard", "Yellow hair with beard",
                                                                    "Pink mask", "Empty head", "Empty head", "Empty head",
                                                                    "Empty head", "Empty head", "Empty head", "Empty head"]},
    { name: "Mouth",        count: 18, required: true, attrNames: ["Black mouth v1", "Black mouth v2", "White mouth", "Pink mouth",
                                                                   "Green mouth", "Blue mouth", "Light-blue mouth", "Yellow mouth",
                                                                   "Red blood", "Light-blue blood", "BDSM GAG", "Default mouth",
                                                                   "Default mouth", "Default mouth", "Default mouth", "Default mouth",
                                                                   "Default mouth", "Default mouth"] },
    { name: "Cigarette",    count: 5, required: true, attrNames: ["It's just a cigarette", "Green cigarette", "Smoking pipe", "Do not smoke",
                                                                  "Do not smoke"] }
  ];

module.exports = attributes;
