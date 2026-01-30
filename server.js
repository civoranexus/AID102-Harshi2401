const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("SoilSense Backend Running...");
});

app.post("/analyze", (req, res) => {

    const { ph, nitrogen, phosphorus, potassium, organic } = req.body;

    let soilStatus = "Good";
    let soilType = "Neutral";
    let confidence = "High";

    let recommendations = [];
    let alerts = [];

    if (ph < 5.5) {
        soilType = "Acidic";
        soilStatus = "Poor";
        recommendations.push("Apply lime to increase soil pH.");
        alerts.push("Low soil pH detected.");
    } else if (ph > 7.5) {
        soilType = "Alkaline";
        soilStatus = "Moderate";
        recommendations.push("Use compost to reduce alkalinity.");
    }

    if (nitrogen < 50) {
        soilStatus = "Poor";
        recommendations.push("Add nitrogen-rich fertilizer.");
        alerts.push("Nitrogen deficiency detected.");
    }

    if (phosphorus < 30) {
        recommendations.push("Apply phosphorus fertilizer.");
    }

    if (potassium < 100) {
        recommendations.push("Increase potassium using potash.");
    }

    if (organic < 2) {
        recommendations.push("Increase organic matter using compost.");
    }

    res.json({
        ph,
        nitrogen,
        phosphorus,
        potassium,
        soilStatus,
        soilType,
        confidence,
        recommendations,
        alerts
    });

});

app.listen(PORT, () => {
    console.log(`SoilSense Backend Running at http://localhost:${PORT}`);
});
