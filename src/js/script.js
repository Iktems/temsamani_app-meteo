$(document).ready(function () {

    $(".partieinf button").click(function () {
        $(".partiemilieu1" ).toggle( "slow", function() {
            $(".partieinf button").removeClass("calendrier").addClass("accueil1");
            // $(".partiemilieu1").addClass("hidden").removeClass("flex");
            // $(".partiemilieu2").removeClass("hidden").addClass("flex");
        });
    });

    $("button.accueil1").click(function () {
        $(".partiemilieu2" ).toggle( "slow", function() {
            $("button.accueil1").removeClass("accueil1").addClass("calendrier");
            // $(".partiemilieu1").addClass("hidden").removeClass("flex");
            // $(".partiemilieu2").removeClass("hidden").addClass("flex");
        });
    });
    
    // $("button.accueil1").click(function () {
    //     $(this).removeClass("accueil1").addClass("calendrier");
    //     $(".partiemilieu2").removeClass("flex");
    //     $(".partiemilieu2").addClass("hidden");
    //     $(".partiemilieu1").addClass("flex");
    //     $(".partiemilieu1").removeClass("hidden");
    // });

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

                console.log(monArray);


                var html = '';
                console.log(monArray);

                $("#location").html(monArray.city_info.name);
                $("h2.temp span").html(monArray.current_condition.tmp);
                $("h3.descri").html(monArray.current_condition.condition);
                $(".conditions img").attr('src', 'img/' + monArray.current_condition.condition_key + '.png').attr('alt', monArray.current_condition.condition);


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



            } // success


        }); //  ajax function         

    } // fonction loadmeteo





    // $('#ville').click(function () {
    //     var ville = $(this).val();
    //     loadmeteo('https://www.prevision-meteo.ch/services/json/' + ville, "search");

    // }); // click

    var v = document.getElementById("ville");
    v.oninput = function () {
        var ville = $('#ville').val();
        loadmeteo('https://www.prevision-meteo.ch/services/json/' + ville, "search");
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

                    //   console.log(data);
                    //   console.log("______________________");
                    console.log(data);

                    // monArray.forEach(function(ligne,i) {


                    // $('h1').text(data.results[0].formatted_address)
                    setTimeout(() => {
                        $("#location").html(data.results[0].address_components[0].long_name);
                    }, "500")

                    // video à 1h32




                    //    }); // foreach


                } // success
            }); // intro ajax function  

        })

    } else {

        console.log("Browser doesn't support geolocalisation !")

    }







}); // ready