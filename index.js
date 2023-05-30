/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

//(e) 2014 Dünya kupası finali kazananı*/

const { fifaData } = require('./fifa.js')


//(a) Evsahibi takım ismi
const finalMatch = fifaData.filter((match) => match.Year === 2014 && match.Stage === "Final")[0];
const homeTeamName = finalMatch["Home Team Name"];
console.log(homeTeamName);

//(b) Deplasman takım ismi
const awayTeamName = finalMatch["Away Team Name"];
console.log(awayTeamName);

//(c) Ev sahibi takım golleri
const homeTeamGoals = finalMatch["Home Team Goals"];
console.log(homeTeamGoals);

//(d) Deplasman takım golleri
const awayTeamGoals = finalMatch["Away Team Goals"];
console.log(awayTeamGoals);

//(e) Kazanan takım
let winner;
if (homeTeamGoals > awayTeamGoals) {
  winner = homeTeamName;
} else if (homeTeamGoals < awayTeamGoals) {
  winner = awayTeamName;
} else {
  winner = "Berabere";
}
console.log(winner);

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
	return data.filter((match) => match.Stage === "Final");
  }
  

  const finalMatches = Finaller(fifaData);
  console.log(finalMatches);
  



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

	function Yillar(data, callback) {
		const finalMatches = callback(data);
		const years = finalMatches.map((match) => match.Year);
		return years;
	  }
	  
	 
	  const finalYears = Yillar(fifaData, Finaller);
	  console.log(finalYears);
	  


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

	
	function Kazananlar(data, callback) {
		const finalMatches = callback(data);
		const winners = finalMatches.map((match) => {
		  if (match["Home Team Goals"] > match["Away Team Goals"]) {
			return match["Home Team Name"];
		  } else if (match["Home Team Goals"] < match["Away Team Goals"]) {
			return match["Away Team Name"];
		  } else {
			return "Berabere";
		  }
		});
		return winners;
	  }
	  
	  // Kullanım örneği:
	  const finalWinners = Kazananlar(fifaData, Finaller);
	  console.log(finalWinners);
	  

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/


function YillaraGoreKazananlar(dataDizi, finCB, yilCB, kazananCB) {
	const Finaller = finCB(dataDizi);
	const Yillar = yilCB(dataDizi, finCB);
	const Kazananlar = kazananCB(dataDizi, finCB);
  
	console.log(
	  "yillara göre kısmi datalar:",
	  Finaller.length,
	  Yillar.length,
	  Kazananlar.length
	);
  
	const sonuclarMetin = Finaller.map((mac, index) => {
	  const yil = Yillar[index];
	  const ulke = Kazananlar[index];
	  return `${yil} yılında, ${ulke} dünya kupasını kazandı!`;
	});
  
	return sonuclarMetin;
  }
  
  console.log(
	"Görev 5",
	YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar)
  );
  

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(finaller) {
	const macBasiToplamGol = finaller.map((mac) => {
	  return mac["Home Team Goals"] + mac["Away Team Goals"];
	});
  
	const toplamGol = macBasiToplamGol.reduce((toplam, macGol) => {
	  return toplam + macGol;
	}, 0);
  
	console.log("macBasiToplamGol:", macBasiToplamGol);
	console.log("toplamGol:", toplamGol);
  
	return (toplamGol / macBasiToplamGol.length).toFixed(2);
  }
  
  console.log("Görev 6:", OrtalamaGolSayisi(Finaller(fifaData)));
  
  

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
