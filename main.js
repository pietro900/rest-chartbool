$(document).ready(function () {

    //chiamata ajax per recuperare i dati;
    $.ajax({
        'url' : 'http://157.230.17.132:4015/sales',
        'method' : 'GET',
        'success' : function(item){
            var totale = 0;
            var venditori = {};
            var mesi = {};
            //uso il for per leggere i dati;
            for (var i = 0; i < item.length; i++) {
                var oggetto_corrente = item[i]
                console.log(oggetto_corrente);

                //leggo le chiavi e i suo valori;
                var ammontare = oggetto_corrente.amount
                console.log(ammontare);

                totale = totale + ammontare

                var data = oggetto_corrente.date
                console.log(data);

                var nome = oggetto_corrente.salesman
                console.log(nome);

                //sfrutto moment per gestire le date;
                var oggi = moment(data, "DD-MM-YYYY")
                var mese = oggi.format('MMMM');
                console.log(mese);

                verifica(mesi, mese, ammontare, venditori , nome , totale);
            }
            console.log(totale);
            console.log(venditori);
            console.log(mesi);

            //convertitore(venditori, mesi)

            var chiavi_bis = Object.keys(venditori);
            console.log(chiavi_bis);
            var valori_bis = Object.values(venditori);
            console.log(valori_bis);

            var chiavi = Object.keys(mesi);
            console.log(chiavi);
            var valori = Object.values(mesi);
            console.log(valori);

            grafico('line', chiavi, 'Vedite per mese', valori)

            grafico('pie', chiavi_bis, 'vendite per venditore', valori_bis)

            //disegna il grafico;
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chiavi ,
                    datasets: [{
                        label: 'Vedite per mese',
                        data: valori,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

                    },
                'error' : function () {
                    alert('si è verificato un errore!');
                    }
                });
});

function verifica(mesi, mese, ammontare, venditori , nome , totale) {
    //verifico se l'oggetto dei mesi contiene gia le chiavi del mese corrente;
    //se no lo creo;
    if(!mesi.hasOwnProperty(mese)){
        mesi[mese] = ammontare;
    }
    //altrimenti sommo i valori;
    else {
        mesi[mese] += ammontare;
    };

    if(!venditori.hasOwnProperty(nome)){
        venditori[nome] = ammontare*100/totale;
    }
    //altrimenti sommo i valori;
    else {
        venditori[nome] += ammontare*100/totale;
    };
}

    //trasformo le chiavi e i valori dell' oggetto in arrey;
// function convertitore(venditori, mesi) {
//
// }

function grafico(val_a, val_b, val_c, val_d) {
    var ctx = document.getElementById('myCharts').getContext('2d');
    var myChart = new Chart(ctx, {
        type: val_a,
        data: {
            labels: val_b,
            datasets: [{
                label: val_c,
                data: val_d,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }


    });
}
