import express from 'express';
const router = express.Router();

export const pizze = [
    { id: 1, naziv: 'Margerita', cijena: 7.0 },
    { id: 2, naziv: 'Capricciosa', cijena: 9.0 },
    { id: 3, naziv: 'Šunka sir', cijena: 8.0 },
    { id: 4, naziv: 'Vegetariana', cijena: 12.0 },
    { id: 5, naziv: 'Quattro formaggi', cijena: 15.0 }
];


//--------------------------------GET
router.get('/', (req, res) => {
 res.json(pizze);
});

router.get("/pizze/:id", (req,res) => {
    const id_pizza = req.params.id;
    const pizza = pizze.find(pizza => pizza.id == id_pizza)
    if (isNaN(id_pizza)) {
        res.status(400).json({ message: "prosljedili ste parametar id koji nije broj!" });
        return;
    }
    if (pizza) {
        res.json(pizza);
    } else {
        res.status(404).json({message: "Pizza s trazenim IDem ne postoji." });
    }
});


//------------------------------PUT
router.put('/pizze/:id', (req, res) => {
    const id_pizza = req.params.id;
    const nova_pizza = req.body;
    nova_pizza.id = id_pizza; 
    const index = pizze.findIndex(pizza => pizza.id == id_pizza);
    if (index !== -1) {
    pizze[index] = nova_pizza;
    res.status(200).json(pizze[index]);
    } else {
    res.status(404).json({ message: 'Pizza s traženim ID-em ne postoji.' });
    }
});
//----------------------------------PATCH
router.patch('/pizze/:id', (req, res) => {
    const id_pizza = req.params.id;
    const nova_pizza = req.body;
    const index = pizze.findIndex(pizza => pizza.id == id_pizza);
    if (index !== -1) {
    for (const key in nova_pizza) {
    pizze[index][key] = nova_pizza[key];
    }
    res.json(pizze[index]);
    } else {
    res.status(404).json({ message: 'Pizza s traženim ID-em ne postoji.' });
    }
    });
//------------------------------------DELETE
router.delete('/pizze/:id', (req, res) => {
    const id_pizza = req.params.id;
     const index = pizze.findIndex(pizza => pizza.id == id_pizza);
    if (index !== -1) {
    pizze.splice(index, 1);
     res.stastus(200).json({ message: 'Pizza uspješno obrisana.' });
    } else {
    res.status(404).json({ message: 'Pizza s traženim ID-em ne postoji.' });
    }
});  

export default router;