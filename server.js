const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let positions = [];

app.get("/", (req, res) => {
    res.send("Carte Familiale API OK");
});

app.post("/position", (req, res) => {

    const nouvellePosition = {
        nom: req.body.nom,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        date: new Date()
    };

    const index = positions.findIndex(
        p => p.nom === nouvellePosition.nom
    );

    if (index !== -1) {

        positions[index] = nouvellePosition;

    } else {

        positions.push(
            nouvellePosition
        );

    }

    res.json({
        success: true
    });

});

app.get("/positions", (req, res) => {
    res.json(positions);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Serveur démarré sur le port " + PORT);
});
