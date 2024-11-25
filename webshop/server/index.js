import express from "express";
import proizvodiRouter from "./routes/proizvodi.js";
import narudzbeRouter from "./routes/narudzbe.js";
import { Proizvod, proizvodi } from "./routes/data.js";

import cors from 'cors';

const app = express();
app.use(cors());

app.use("/proizvodi", proizvodiRouter);
app.use("/narudzbe", narudzbeRouter);
app.use(express.json());

const PORT = 3000;

app.get("/", (req,res) => {
    res.send("Webshop API");
});

app.listen(PORT, error => {
    if (error) {
        console.error(`Greska prilikom pokretanja posluzitelja: ${error.message}`);
    } else {
        console.log(`Server dela na http://localhost:${PORT}`);
    }
});


