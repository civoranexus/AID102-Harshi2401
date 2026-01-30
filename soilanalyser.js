const soilData = JSON.parse(localStorage.getItem("soilData"));

if (!soilData) {
    alert("No soil data found. Please enter soil details first.");
}

const ph = parseFloat(soilData.ph);
const nitrogen = parseFloat(soilData.nitrogen);
const phosphorus = parseFloat(soilData.phosphorus);
const potassium = parseFloat(soilData.potassium);
const organic = parseFloat(soilData.organic);

document.getElementById("phValue").innerText = ph;
document.getElementById("nitrogenValue").innerText = nitrogen;
document.getElementById("phosphorusValue").innerText = phosphorus;
document.getElementById("potassiumValue").innerText = potassium;

let soilStatus = "Good";
let soilType = "Balanced";
let confidence = "High";
let recommendations = [];
let alerts = [];

if (ph < 5.5) {
    soilType = "Acidic";
    soilStatus = "Poor";
    recommendations.push("Apply lime to raise soil pH.");
    alerts.push("Soil pH is too low (acidic).");
} else if (ph > 7.5) {
    soilType = "Alkaline";
    soilStatus = "Moderate";
    recommendations.push("Add organic compost to reduce alkalinity.");
} else {
    soilType = "Neutral";
}

if (nitrogen < 50) {
    soilStatus = "Poor";
    recommendations.push("Use nitrogen-rich fertilizers such as urea.");
    alerts.push("Low nitrogen level detected.");
}

if (phosphorus < 30) {
    recommendations.push("Apply phosphorus fertilizers like SSP or DAP.");
}

if (potassium < 100) {
    recommendations.push("Increase potassium using potash fertilizers.");
}

if (organic < 2) {
    recommendations.push("Increase organic matter using compost or manure.");
}

document.getElementById("soilStatus").innerText = soilStatus;
document.getElementById("soilType").innerText = soilType;
document.getElementById("confidence").innerText = confidence;

const recList = document.getElementById("recommendations");
recList.innerHTML = "";

recommendations.forEach(rec => {
    const li = document.createElement("li");
    li.innerText = rec;
    recList.appendChild(li);
});

const alertBox = document.getElementById("alerts");
alertBox.innerHTML = "";

if (alerts.length === 0) {
    alertBox.innerHTML = "<p>No critical alerts detected.</p>";
} else {
    alerts.forEach(alertMsg => {
        const p = document.createElement("p");
        p.className = "alert-high";
        p.innerText = alertMsg;
        alertBox.appendChild(p);
    });
}
