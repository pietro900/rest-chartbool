$(document).ready(function () {

    //chiamata ajax per recuperare i dati;
    $.ajax({
        'url' : 'http://157.230.17.132:4015/sales',
        'method' : 'GET',
        'success' : function(item){

            var mesi = {};
            for (var i = 0; i < item.length; i++) {
                var oggetto_corrente = item[i]
                console.log(oggetto_corrente);
                var ammontare = oggetto_corrente.amount
                console.log(ammontare);
                var data = oggetto_corrente.date
                console.log(data);

                var oggi = moment(data, "DD-MM-YYYY")
                var mese = oggi.format('MMMM');
                console.log(mese);

                //verifico se l'oggetto dei mesi contiene gia le chiavi del mese corrente;
                if(!mesi.hasOwnProperty(mese)){
                    mesi[mese] = ammontare;
                }else {
                    mesi[mese] += ammontare;
                };
            }
            console.log(mesi);
            var chiavi = Object.keys(mesi);
            console.log(chiavi);
            var valori = Object.values(mesi);
            console.log(valori);


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
