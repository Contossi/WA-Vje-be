import express from "express";
import pizzeRouter from "./routes/pizze.js";
import narudzbeRouter from "./routes/narudzbe.js"

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(pizzeRouter);
app.use(narudzbeRouter);

app.listen(PORT, error => {
    if (error) {
        console.error(`Greska prilikom pokretanja posluzitelja: ${error.message}`);
    } else {
        console.log(`Server radi na http://localhost:${PORT}/pizze`);
    }
});


