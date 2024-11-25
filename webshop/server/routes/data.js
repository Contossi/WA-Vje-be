// server/data.js

class Proizvod {
  constructor(id, naziv, cijena, velicine, opis, slike, dostupne_boje, karakteristike) {
    this.id = id;
    this.naziv = naziv;
    this.cijena = cijena;
    this.velicine = velicine;
    this.opis = opis;
    this.slike = slike;
    this.dostupne_boje = dostupne_boje;
    this.karakteristike = karakteristike;
  }
}

const proizvodi = [
  new Proizvod(1, 'Obična crna majica', 80, ['XS', 'S', 'M', 'L'], "Jako dobra pamucna crna majica", "https://s3.amazonaws.com/prod-wp-tunota/wp-content/uploads/2024/11/principal-chill-guy-meme-png-para-usar-de-perfil-y-compartir-2024-11-21_seo_ba.jpg", ["crna", "bijela", "plava",], "vuna"),
  new Proizvod(2, "Levi's 501 traperice", 110, ['S', 'M', 'L'],"top", "https://www.fjallraven.com/4afad1/globalassets/catalogs/fjallraven/f1/f121/f12100/f1210000/f12100006/f020/fjallraven_heavy_beanie_12100006-020_a_main_fjr.jpg?width=680&height=680&rmode=BoxPad&bgcolor=fff&quality=100",["crna", "bijela", "plava",], "vuna"),
  new Proizvod(3, 'Zimska kapa', 40, 'onesize', "Jako dobra kapa", "https://www.fjallraven.com/4afad1/globalassets/catalogs/fjallraven/f1/f121/f12100/f1210000/f12100006/f020/fjallraven_heavy_beanie_12100006-020_a_main_fjr.jpg?width=680&height=680&rmode=BoxPad&bgcolor=fff&quality=100",["crna", "bijela", "plava",], "vuna"),
  new Proizvod(4, 'Čarape Adidas', 20, ['34-36', '37-39', '40-42'], "top", "https://www.fjallraven.com/4afad1/globalassets/catalogs/fjallraven/f1/f121/f12100/f1210000/f12100006/f020/fjallraven_heavy_beanie_12100006-020_a_main_fjr.jpg?width=680&height=680&rmode=BoxPad&bgcolor=fff&quality=100",["crna", "bijela", "plava",], "vuna"),
  new Proizvod(5, 'Tenisice Nike', 200, ['38', '39', '40', '41', '42', '43', '44', '45'], "top", "https://www.fjallraven.com/4afad1/globalassets/catalogs/fjallraven/f1/f121/f12100/f1210000/f12100006/f020/fjallraven_heavy_beanie_12100006-020_a_main_fjr.jpg?width=680&height=680&rmode=BoxPad&bgcolor=fff&quality=100",["crna", "bijela", "plava",], "vuna")
];

export { proizvodi, Proizvod };