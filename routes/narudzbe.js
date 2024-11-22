import express from 'express';
import pizzeRouter from "./pizze.js";
import {pizze} from "./pizze.js";
const router = express.Router();

router.use(pizzeRouter);

let listanarudzbe = [];
let listanarudzbejavno = [];   

router.get("/narudzbe", (req,res) => {
    res.json(listanarudzbejavno);
});

router.get("/narudzbe/:id", (req,res) => {
    const id_narudzbe = req.params.id;
    const narudzbe = listanarudzbejavno.find(listanarudzbejavno => listanarudzbejavno.id == id_narudzbe)
    if(isNaN(id_narudzbe)) {
        res.status(404).json({message: "prosljedili ste parametar id koji nije broj!"});
        return;
    }
    if(id_narudzbe){
        res.json(narudzbe);
    } else {
        res.status(404).json({message: "Narudzba s trazenim IDem ne postoji."});
    }
   

});

let novi_id = 1;
router.post("/naruci", (req,res) => {
    let { narudzba, klijent } = req.body;
    let ukupna_cijena = 0;
    let message = "Vasa narudzba za ";

    if (!Array.isArray(narudzba)) {
        return res.status(400).send("Narudzba mora sadrzavati listu pizza");
    }
    

    for (let i = 0; i < narudzba.length; i++) {
        const kljucevi = Object.keys(narudzba[i]);

        if (!(kljucevi.includes("pizza") && kljucevi.includes("velicina") && kljucevi.includes("kolicina"))) {
            return res.status(400).send("Niste poslali sve potrebne podatke za narudzbu!");
        }
        if (!pizze.find(pizza => pizza.naziv == narudzba[i].pizza)) {
            return res.status(400).send(`Jedna ili vise pizza koju ste narucili ne postoji`);
        }

        
        const pizza = pizze.find(pizza => pizza.naziv == narudzba[i].pizza) 
        
        ukupna_cijena= ukupna_cijena + pizza.cijena * narudzba[i].kolicina;
        
        message += `${narudzba[i].kolicina} ${narudzba[i].pizza} (${narudzba[i].velicina})`;
        
        if (i < narudzba.length - 1) {
            message += " i ";
        } else {
            message += " je uspješno zaprimljena!";
        }    
    }

    const kljucevia = Object.keys(klijent || {});
        if (!(kljucevia.includes("prezime") && kljucevia.includes("adresa") && kljucevia.includes("broj_telefona"))) {
         return res.status(404).send("Niste poslali sve potrebne podatke za narudzbu!");
        }

    let narudzbaid = {"id": novi_id, narudzba, klijent, ukupna_cijena};
    listanarudzbe.push(narudzbaid);
    let narudzbaidjavno = { "id": novi_id, narudzba, ukupna_cijena};
    listanarudzbejavno.push(narudzbaidjavno);
        
    novi_id++;
    console.log(`Primljeni podaci: `, narudzba );
    
    

    res.status(200).json({
        message,
        prezime: klijent.prezime,
        adresa: klijent.adresa,
        ukupna_cijena: ukupna_cijena
    });
});

router.delete("/narudzbe/:id", (req,res) => {
    const narudzba_id = req.params.id;

    const index = listanarudzbejavno.findIndex(listanarudzbejavno => listanarudzbejavno.id == narudzba_id);

    if(index !== -1) {
        listanarudzbejavno.splice(index, 1);
        listanarudzbe.splice(index,1);
        res.status(200).json({message: "narudzba uspjesno obrisana."});
    } else {
        res.status(404).json({message: "narudzba s trazenim Idem ne postoji."});
    }
});
export default router;