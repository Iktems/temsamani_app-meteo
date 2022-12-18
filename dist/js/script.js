$(document).ready(function () {


    $(".partieinf button.accueil1").hide()
    $(".partiemilieu2").hide()

    $(".partieinf button.calendrier").on("click", function (e) {
        e.preventDefault()
        $(this).hide()
        $(".partieinf button.accueil1").show()
        $(".partiemilieu2").show()
        $(".partiemilieu1").hide()
    })

    $(".partieinf button.accueil1").on("click", function (e) {
        e.preventDefault()
        $(this).hide()
        $(".partieinf button.calendrier").show()
        $(".partiemilieu1").show()
        $(".partiemilieu2").hide()
    })


    function loadmeteo(url) {
        $.ajax({
            // 1) on définit le fichier vers lequel on envoye la requête POST
            url: url,

            // 2/ on spécifie la méthode  
            type: 'GET', // Le type de la requête HTTP, ici  POST

            // 3) on définit les variables POST qui sont ennvoyées au fichier .php qui les récupère sous forme de $_POST["nom"] 
            data: {}, // On fait passer nos variables au script coucou.php

            // 4) format de retour du fichier php dans "data"
            dataType: 'json',

            // 5) fonction à effectuer en cas de succès
            success: function (monArray) { //  contient le HTML renvoyé

                if (monArray.city_info.name == "Bruxelles 1") {
                    monArray.city_info.name = "Bruxelles";
                }

                $("#location").html(monArray.city_info.name);
                $("h2.temp span").html(monArray.current_condition.tmp);
                $("h3.descri").html(monArray.current_condition.condition);
                $(".conditions img").attr('src', 'img/' + monArray.current_condition.condition_key + '.png').attr('alt', monArray.current_condition.condition);

                //PARTIE CALENDRIER
                $(".max").html(monArray.fcst_day_0.tmax);
                $(".min").html(monArray.fcst_day_0.tmin);
                $(".cond").html(monArray.current_condition.condition);
                $(".cond-meteo img").attr('src', 'img/' + monArray.current_condition.condition_key + '.png').attr('alt', monArray.current_condition.condition);
                $("#humidity").html(monArray.current_condition.humidity);
                $("#precipitations").html(monArray.fcst_day_0.hourly_data["2H00"].APCPsfc);
                $("#vent").html(monArray.current_condition.wnd_spd);

                var html = '';
                var j = '';

                for (j = 1; j < 5; j++) {

                    html += `<div class="j1 w-[48%] p-2 mr-1 ml-1 mb-3 flex flex-col items-center">`;
                    html += `<h3>` + monArray['fcst_day_' + j].day_long + `</h3>`;
                    html += `<img class="h-10" src="img/` + monArray['fcst_day_' + j].condition_key + `.png" alt="conditions">`;
                    html += `<p>` + monArray['fcst_day_' + j].tmax + `<span class="text-xs text-gray-400">/<span>` + monArray['fcst_day_' + j].tmin + `</span>°</span></p>`;
                    html += `</div>`
                    $(".semaine").html(html);

                }


                // doc trouvé sur internet dans un forum de discussions/entraide
                // Making 2 variable month and day
                var mois = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
                var jours = ["Dimanche,", "Lundi,", "Mardi,", "Mercredi,", "Jeudi,", "Vendredi,", "Samedi,"];

                // make single object
                var datejr = new Date();
                // make current time
                datejr.setDate(datejr.getDate());
                // setting date and time
                $('.date').html(jours[datejr.getDay()] + " " + datejr.getDate() + ' ' + mois[datejr.getMonth()] + ' ' + datejr.getFullYear());

                setInterval(function () {
                    // Create a datejr() object and extract the minutes of the current time on the visitor's
                    var minutes = new Date().getMinutes();
                    // Add a leading zero to the minutes value
                    $("p.minutes").html((minutes < 10 ? "0" : "") + minutes);
                }, 1000);

                setInterval(function () {
                    // Create a datejr() object and extract the hours of the current time on the visitor's
                    var hours = new Date().getHours();
                    // Add a leading zero to the hours value
                    $("p.heure").html((hours < 10 ? "0" : "") + hours + ':');

                }, 1000);

                if (!monArray.current_condition.condition_key.includes('nuit')) {
                    $("img.fond").attr('src', 'img/sunrise.svg').attr('alt', monArray.city_info.sunrise);
                    $("body").addClass("bg-mauveik");
                    $(".partieinf button.calendrier").css("background-color", "#421A3A");
                    $(".partieinf button.calendrier").hover(function () {
                        $(this).css("background-color", "pink");
                    }, function () {
                        $(this).css("background-color", "#421A3A");
                    });
                    $(".partieinf button.accueil1").hover(function () {
                        $(this).css("background-color", "#421A3A");
                    }, function () {
                        $(this).css("background-color", "pink");
                    });
                    $(".ojd, .j1, .j2, .j3, .j4").css("background-color", "#421a3a96");



                } else {
                    $("img.fond").attr('src', 'img/sunset.svg').attr('alt', monArray.city_info.sunset);
                    $("body").addClass("bg-bleuik");
                    $(".partieinf button.calendrier").hover(function () {
                        $(this).css("background-color", "#BCE7F6");
                    }, function () {
                        $(this).css("background-color", "#1F1F45");
                    });
                    $(".partieinf button.accueil1").hover(function () {
                        $(this).css("background-color", "#1F1F45");
                    }, function () {
                        $(this).css("background-color", "#BCE7F6");
                    });

                }

            } // success


        }); //  ajax function         

    } // fonction loadmeteo


    var v = document.getElementById("ville");
    v.oninput = function () {
        var ville = $('#ville').val();
        if (ville == 'bruxelles') {
            ville = "bruxelles-1"
        }
        loadmeteo('https://www.prevision-meteo.ch/services/json/' + ville);
    }



    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            loadmeteo('https://www.prevision-meteo.ch/services/json/lat=' + lat + 'lng=' + lng);

            $.ajax({
                // 1) on définit le fichier vers lequel on envoye la requête POST , 

                url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&result_type=locality&key=AIzaSyCKcTQ-zk45bUB2U-0mIhYELU1CKbrSFTI',
                //https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding

                // 2/ on spécifie la méthode  
                type: 'GET', // Le type de la requête HTTP, ici  GET

                // 4) format de retour du fichier php dans "data"
                dataType: 'json',

                // 5) fonction à effectuer en cas de succès
                success: function (data) { //  contient le HTML renvoyé

                    var monArray = data.results;

                    setTimeout(() => {
                        $("#location").html(data.results[0].address_components[0].long_name);
                    }, "500")


                } // success
            }); // intro ajax function  

        })

    } else {

        console.log("Browser doesn't support geolocalisation !")

    }


}); // ready