import express from "express";
import { Proizvod, proizvodi } from "./data.js";
const router = express.Router();


//------------------------------------------------------------------------------------------------------------GET
router.get("/", (req,res) => {
    res.status(200).json(proizvodi);
});

router.get("/:id", (req,res) => {
    const id_req = req.params.id;
    if (isNaN(id_req)) {
        res.status(400).send("ID mora biti broj");
        return;
    }
    const proizvod = proizvodi.find(proizvod => proizvod.id == id_req);

    if(proizvod) {
        res.status(200).json(proizvod);
    } else {
        res.status(404).send("Proizvod nije pronaden");
    }
});

export default router;
