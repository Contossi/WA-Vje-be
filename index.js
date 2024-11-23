import express from "express";
import fs from "fs-extra";


const app = express();
app.use(express.json());

app.get("/zaposlenici", async (req,res) => {
  let godine_staza_min = req.query.godine_staza_min;
  let godine_staza_max = req.query.godine_staza_max;
  let pozicija_query = req.query.pozicija;
  let sortiraj_po_godinama = req.query.sortiraj_po_godinama;
  try {
    const data = await fs.readFile("data/zaposlenici.json", "utf8");
    const zaposlenici = JSON.parse(data);

    if(godine_staza_min) {
      zaposlenici = zaposlenici.filter(
        (zaposlenik) => zaposlenik.godine_staza >= godine_staza_min
      );
    }

    if(godine_staza_max) {
      zaposlenici = zaposlenici.filter(
        (zaposlenik) => zaposlenik.godine_staza <= godine_staza_max
      );
    }

    if (pozicija_query) {
      const filtered_zaposlenici = zaposlenici.filter(zaposlenik => zaposlenik.pozicija === pozicija_query);
      res.status(200).send(filtered_zaposlenici);
    } else {
      res.status(200).send(zaposlenici);
    }

    if(sortiraj_po_godinama){
      if(sortiraj_po_godinama === "uzlazno") {
        zaposlenici.sort((a,b) => a.godine_staza - b.godine_staza);
      } else if (sortiraj_po_godinama === "silazno") {
        zaposlenici.sort((a,b) => b.godine_staza - a.godine_staza);
      }
    }
    res.status(200).json(zaposlenici);

  } catch (error) {
      console.error("Neuspjesno procitan txt:", error);
      res.status(500).send("Neuspjesno procitan txt.");
  }

});

app.get("/zaposlenici/:id", async (req,res) => {
    let zaposleniciid = req.params.id;
    try {
      const data = await fs.readFile("data/zaposlenici.json", "utf8");
      const zaposlenici = JSON.parse(data);
      const zaposlenik = zaposlenici.find(zaposlenik => zaposlenik.id == zaposleniciid);
      if (zaposlenik) {
        res.status(200).send(zaposlenik);
      } else {
        res.status(404).send("Zaposlenik nije pronaden.");
      }
    } catch (error) {
      console.error("Greska prilikom citanja datoteke:", error);
      res.status(500).send("Greska prilikom citanja datoteke");
    }
});
let noviid = 6;
app.post("/zaposlenici", async (req,res) => {
  const zaposlenik = req.body;
  const kljucevi = Object.keys(zaposlenik);

  if (Object.keys(zaposlenik).length === 0) {
    return res.status(400).send("Niste poslali podatke.");
  }
  if (!(kljucevi.includes("ime") && kljucevi.includes("prezime") && kljucevi.includes("godine_staza") && kljucevi.includes("pozicija") )) {
    res.send('Niste poslali sve potrebne podatke za narudžbu!');
    return;
    }
  if (isNaN(zaposlenik.godine_staza)) {
    return res.status(400).send("Godine staza moraju biti broj!");
  }
  if (zaposlenik.godine_staza < 0) {
    return res.status(400).send("Godine staza nesmije biti negativni");
  }
  if (typeof zaposlenik.ime !== 'string' || typeof zaposlenik.prezime !== 'string' || typeof zaposlenik.pozicija !== 'string') {
    return res.status(400).send("Ime, prezime i pozicija moraju biti string!");
  }
  try{

    const zaposlenici = await fs.readJson("data/zaposlenici.json");

    zaposlenik.id = noviid;
    zaposlenici.push(zaposlenik);
    noviid++;

    await fs.writeJson("data/zaposlenici.json", zaposlenici);

    console.log("Podaci uspjesno zapisani u datoteku.");
    res.status(200).send("Podaci uspjesno zapisani u datoteku");
  } catch (error) {
    console.error("Greska prilikom pohrane u datoteku: ", error);
    res.status(500).send("Greska prilikom pohrane u datoteku.");
  }
});

app.listen(3000, () => {
    console.log("posluzitelj je pokrenut na portu 3000");
});