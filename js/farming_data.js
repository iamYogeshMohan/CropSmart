const cropData = {
    rice: {
        name: "Rice (Paddy)",
        image: "assets/rice.png",
        soil: "Clayey, Loamy",
        temp: "20°C - 35°C",
        rainfall: "High (100-200 cm)",
        water_req: "High",
        irrigation: "Flood Irrigation (Maintain 2-5cm water level)",
        calendar: [
            { stage: "Sowing / Transplanting", time: "June - July", task: "Sow seeds in nursery or transplant seedlings." },
            { stage: "Vegetative Growth", time: "Aug - Sept", task: "Apply Urea (Nitrogen) & remove weeds." },
            { stage: "Flowering", time: "Oct", task: "Critical water stage. Keep field flooded." },
            { stage: "Harvesting", time: "Nov - Dec", task: "Drain water 10 days before harvesting." }
        ],
        fertilizer: {
            npk: "100:50:50 kg/ha",
            organic: "Green Manure / Compost (10 tons/ha)",
            tip: "Apply Zinc Sulphate if leaves turn rusty brown."
        },
        pests: [
            { name: "Stem Borer", severity: "High", solution: "Install pheromone traps or spray Cartap Hydrochloride." },
            { name: "Leaf Folder", severity: "Medium", solution: "Use Neem oil or release Trichogramma wasps." }
        ],
        market: {
            current: "₹2100 / quintal",
            trend: "Stable",
            prediction: "Expected to rise by 5% in Nov."
        }
    },
    wheat: {
        name: "Wheat",
        image: "assets/wheat.png",
        soil: "Loamy, Sandy Loam",
        temp: "10°C - 25°C",
        rainfall: "Moderate (40-75 cm)",
        water_req: "Moderate",
        irrigation: "Sprinkler or Border Strip (5-6 irrigations)",
        calendar: [
            { stage: "Sowing", time: "Nov", task: "Sow seeds at 4-5 cm depth." },
            { stage: "CRI Stage", time: "20-25 Days", task: "Critical watering needed now!" },
            { stage: "Tillering", time: "40-45 Days", task: "Apply second dose of Nitrogen." },
            { stage: "Harvesting", time: "March - April", task: "Harvest when grains are hard and golden." }
        ],
        fertilizer: {
            npk: "120:60:40 kg/ha",
            organic: "Farm Yard Manure",
            tip: "Avoid excess Nitrogen to prevent lodging."
        },
        pests: [
            { name: "Aphids", severity: "Medium", solution: "Spray Imidacloprid or use yellow sticky traps." },
            { name: "Rust", severity: "High", solution: "Spray Propiconazole at first sign of yellow/orange spots." }
        ],
        market: {
            current: "₹2275 / quintal",
            trend: "Rising",
            prediction: "High demand expected in April."
        }
    },
    cotton: {
        name: "Cotton",
        image: "assets/cotton.png",
        soil: "Black Cotton Soil",
        temp: "21°C - 30°C",
        rainfall: "Moderate (50-75 cm)",
        water_req: "Moderate",
        irrigation: "Drip Irrigation (Best for efficiency)",
        calendar: [
            { stage: "Sowing", time: "May - June", task: "Treat seeds with Imidacloprid before sowing." },
            { stage: "Vegetative", time: "July - Aug", task: "Weeding and hoeing. Watch for sucking pests." },
            { stage: "Boll Formation", time: "Sept - Oct", task: "Apply Potassium for better boll quality." },
            { stage: "Picking", time: "Nov - Jan", task: "Pick clean dry bolls in morning hours." }
        ],
        fertilizer: {
            npk: "90:45:45 kg/ha",
            organic: "Vermicompost",
            tip: "Spray Magnesium Sulphate for green leaves."
        },
        pests: [
            { name: "Bollworm", severity: "Critical", solution: "Use BT Cotton varieties. Spray Spinosad if threshold crossed." },
            { name: "Whitefly", severity: "High", solution: "Spray Neem Oil or Acetamiprid." }
        ],
        market: {
            current: "₹6500 / quintal",
            trend: "Fluctuating",
            prediction: "Dip expected next month due to high supply."
        }
    },
    tomato: {
        name: "Tomato",
        image: "assets/soil_red.png", /* Placeholder if tomato icon missing */
        soil: "Loamy, Well-drained",
        temp: "18°C - 27°C",
        rainfall: "Moderate",
        water_req: "Medium",
        irrigation: "Drip Irrigation (Avoid wetting leaves)",
        calendar: [
            { stage: "Transplanting", time: "Day 0", task: "Transplant 3-4 week old seedlings." },
            { stage: "Flowering", time: "Day 35-40", task: "Stake plants for support. Apply Boron." },
            { stage: "Fruiting", time: "Day 50-60", task: "Maintain uniform soil moisture to prevent cracking." },
            { stage: "Harvesting", time: "Day 70+", task: "Pick at breaker stage for transport." }
        ],
        fertilizer: {
            npk: "100:60:60 kg/ha",
            organic: "Neem Cake",
            tip: "Calcium spray prevents Blossom End Rot."
        },
        pests: [
            { name: "Fruit Borer", severity: "High", solution: "Install pheromone traps." },
            { name: "Leaf Miner", severity: "Low", solution: "Remove affected leaves manually." }
        ],
        market: {
            current: "₹15 / kg",
            trend: "Rising",
            prediction: "📈 Price expected to increase by 12% next month."
        }
    }
};
