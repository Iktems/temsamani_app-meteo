// $(document).ready(function () {

//     // LIEN VERS MON GOOGLE SHEETS : https://docs.google.com/spreadsheets/d/1_Widjy7eFcDozJ_yi1nFFB-c4DvSiCHNj4bYWF9FpYA/edit#gid=0

//     $.getJSON({
//         // 1) on définit le fichier vers lequel on envoye la requête POST , 

//         url: 'https://sheets.googleapis.com/v4/spreadsheets/1_Widjy7eFcDozJ_yi1nFFB-c4DvSiCHNj4bYWF9FpYA/values/students?key=AIzaSyAJiGonV9z_YJkpJPb9So3iJIyzXS8KAbU',

//         // 2/ on spécifie la méthode  
//         type: 'GET', // Le type de la requête HTTP, ici  GET

//         // 4) format de retour du fichier php dans "data"
//         dataType: 'json',

//         // 5) fonction à effectuer en cas de succès
//         success: function (data) { //  contient le HTML renvoyé
//             // console.log(data);

//             var html = "";


//             console.log(data.values);

//             for (i = 1; i < data.values.length; i++) {

//                 nom = data.values[i][0];
//                 prenom = data.values[i][1];
//                 statut = data.values[i][2];
//                 titre = data.values[i][3];
//                 avis = data.values[i][4];
//                 image = data.values[i][5];
//                 id = data.values[i][6];

//                 html += '<div class="ikik flex flex-col md:flex-row" style="transform: translateX(-100%)">';
//                 html += '<div class="mt-14 md:flex">';
//                 html += '<div class="relative img ">';
//                 html += '<img class=" lg:w-full sm:w-96 xl:h-96 h-full object-contain" src="img/' + image + '" alt="image of profile" class="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"/>';
//                 html += '<div class="w-12 md:flex hidden items-center justify-center absolute top-0 -mr-[15px] -mt-[13px] right-0 h-12 bg-amber-200 norounded-full font-extrabold text-xl text-amber-800">' + id + '</div>';
//                 html += '</div>';
//                 html += '</div>';
//                 html += '<div class="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-12 mt-2 flex flex-col justify-between">';
//                 html += '<div>';
//                 html += '<h1 class=" mt-12 md:mt-0 text-3xl font-semibold text-gray-800  ">' + titre + '</h1>';
//                 html += '<p class="text-base font-medium leading-6 mt-4 text-gray-600   ">' + avis + '</p>';
//                 html += '</div>';
//                 html += '<div class="md:mt-0 mt-8">';
//                 html += '<p class="text-lg font-medium leading-4 text-gray-800  ">' + nom + '<span> ' + prenom + '</span></p>';
//                 html += '<p class="text-base leading-4 mt-2 mb-4 text-gray-600   ">' + statut + '</p>';
//                 html += '</div>';
//                 html += '</div>';
//                 html += '</div>';
//                 html += '</div>';


//             } // for

//             $('.ik').html(html);

//             setTimeout(() => {
//                 gsap.to('.img', {
//                     duration: .75,
//                     x: 20,
//                     opacity: 1,
//                     // stagger: 0.1
//                 })
//             }, "500")



//             // Ce slider a été fournis avec le design sur tailwinduikit
//             let slides = document.querySelectorAll(".ik>div");
//             let slideSayisi = slides.length;
//             let prev = document.getElementById("prev");
//             let next = document.getElementById("next");
//             for (let index = 0; index < slides.length; index++) {
//                 const element = slides[index];
//                 element.style.transform = "translateX(" + 100 * index + "%)";
//             }
//             let loop = 0 + 1000 * slideSayisi;

//             function goNext() {
//                 loop++;
//                 for (let index = 0; index < slides.length; index++) {
//                     const element = slides[index];
//                     element.style.transform = "translateX(" + 100 * (index - (loop % slideSayisi)) + "%)";
//                 }
//             }

//             function goPrev() {
//                 loop--;
//                 for (let index = 0; index < slides.length; index++) {
//                     const element = slides[index];
//                     element.style.transform = "translateX(" + 100 * (index - (loop % slideSayisi)) + "%)";
//                 }
//             }

//             next.addEventListener("click", goNext);
//             prev.addEventListener("click", goPrev);

//         } // success


//     }); // intro ajax function


// });