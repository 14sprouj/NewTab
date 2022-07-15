var imgList = [
	"img/nature/03d4d9a2-5ad1-4a55-85ba-87103a98b2e4.jpeg",
	"img/nature/pexels-asad-photo-maldives-1591373.jpeg",
	"img/nature/pexels-francisco-buduba-5092153.jpeg",
	"img/nature/pexels-frans-van-heerden-624015.jpeg",
	"img/nature/pexels-jaime-reimer-2662116.jpeg",
	"img/nature/pexels-jeremy-bishop-3464632.jpeg",
	"img/nature/pexels-jess-loiterton-4319752.jpeg",
	"img/nature/pexels-luis-del-río-15286.jpeg",
	"img/nature/pexels-lumn-167699.jpeg",
	"img/nature/pexels-mirco-violent-blur-4072840.jpeg",
	"img/nature/pexels-stein-egil-liland-3408744.jpeg",
	"img/nature/pexels-tobias-bjørkli-1693095.jpeg",
	"img/nature/pexels-trace-hudson-2770933.jpeg"
];
var img = imgList[Math.floor(Math.random() * imgList.length)];
document.getElementsByTagName("body")[0].style.backgroundImage = "url('" + img + "')";