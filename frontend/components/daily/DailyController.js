var dailyModule = angular.module('module.daily', []);


   dailyModule.controller('DailyController', function(_, $q, $rootScope, $modal, $filter, $scope, levels, NgTableParams, PaymentService, payments) {
    $scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}];
    $scope.modePay = [{_id:'Espece'}, {_id:'cheques'}, {_id:'paiement mixte'},];

    $scope.now =  moment(new Date()).format("YYYY-MM-DD");
    $rootScope.printOneHistory = false;

    var fs = require('fs');
    $scope.timbre = PaymentService.timbre();

    $scope.tax = PaymentService.tax();


    $scope.printOneHistoryFire = function() {
   
     
    };

   

    
    
    $scope.printOneHistoryFire = function() {
     window.print();
     $rootScope.printOneHistory = false;
    };

    $scope.search = {
        dateDebutPayment: $scope.now,
        dateFinPayment : $scope.now
    }

    $scope.payments = payments;


    function calculateChequesAmount(payment) {
        var chequeAmount = 0;

        payment.amount.cheques.forEach(function(cheque) {
            chequeAmount = chequeAmount + cheque.amount;
        });
        return chequeAmount;
    }

    var modalShowDetail = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'DailyController',
        template: 'frontend/components/daily/views/daily.detail.html',
        show: false
        
    });


    $scope.showDetail = function(payment) {
        $rootScope.printOneHistory = true;

        $scope.toShowPayment = payment;
        $scope.chequeAmount = calculateChequesAmount(payment);

        modalShowDetail.$promise.then(modalShowDetail.show);
    };

      function calculateTotal(pmts) {


var tax = PaymentService.tax();
    
    if(typeof pmts == "undefined")
        return ;
        
         var totale = 0;
         var totale2 = 0;
         var rtotale =0;
         var rtotaleHt =0;

         var rtotaleProduct = 0;
         var now = moment(new Date()).format("YYYY-MM-DD");

         pmts.forEach(function(payment) {
            if($scope.radios=="all") {
                totale = totale  + payment.payedAmount;
               // console.log("***_payment.amount.payedAmount_***" + payment.amount.payedAmount);
            //    rtotaleHt = rtotaleHt  + payment.amount.payedAmount;
             //   console.log("rtotaleHt__:"+rtotaleHt);
            } else {


              payment.currentPayedProd.t0.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale2 = totale2 + prod.price;
                });


                payment.currentPayedProd.t1.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale2 = totale2 + prod.price;
                });
                payment.currentPayedProd.t2.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale2 = totale2 + prod.price;
                });
                payment.currentPayedProd.t3.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale2 = totale2 + prod.price;
                });
            }



            // ****************************************              // ****************************************
    payments.forEach(function(payment) {
        if(payment.datePayment>=$scope.search.dateDebutPayment&&payment.datePayment<=$scope.search.dateFinPayment){

            if($scope.radios=="all") {
            //    totale = totale  + payment.amount.payedAmount;
            } else {

                payment.currentPayedProd.t0.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale = totale + prod.price;
                });
                 
             

                payment.currentPayedProd.t1.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale = totale + prod.price;
                });
                payment.currentPayedProd.t2.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale = totale + prod.price;
                });
                payment.currentPayedProd.t3.forEach(function(prod){
                    if(prod.product==$scope.radios)
                        totale = totale + prod.price;
                });
            }

         


                if(payment.datePayment<=now){
                  rtotaleHt = rtotaleHt + payment.amount.payedAmount;
             //     console.log("payment.amount.payedAmount______: " + payment.amount.payedAmount);
              //    console.log("rtotaleHt______: " + rtotaleHt);
                }



           }

         });
            //*****************************************




                if(payment.datePayment<=now){
                  rtotaleProduct = rtotaleProduct + totale2;
                }

                if(payment.datePayment<=now){
                  rtotale = rtotale + payment.payedAmount;
                }



         });

        $scope.rtotaleProduct = rtotaleProduct.toFixed(2);
        $scope.rtotaleProductHt = (rtotaleProduct / (1 + tax/100)).toFixed(2);

        $scope.rtotale = rtotale.toFixed(2);
        $scope.totale = totale.toFixed(2);

      //  $scope.rtotaleHt = (rtotale / (1 + tax/100)).toFixed(2);

        $scope.rtotaleHt = rtotaleHt.toFixed(2);


      };




//var list  = [];
  //var list22  = [];

function decomposerPayments(pay){
 var list22  = [];
 

// window.alert("PAY ="+ pay);
 
//   console.log(pay.firstname);
////   console.log(pay.lastname);
//   console.log(pay.amount);
//   console.log(pay.class);
//   console.log(pay.modPay);
 //  console.log("pay.brutAmount =" + pay.amount.brutAmount);

 //  console.log("test : " + pay.amount.brutAmount>0);

if (pay.amount.brutAmount>0) {
  var list  = [];
  list.amount = pay.amount.brutAmount; 
list.firstname = pay.firstname ;
list.lastname = pay.lastname ;
list._levelId = pay._levelId ;
list.class = pay.class ;
list.currentPayedProd = pay.currentPayedProd ;
// console.log("list.product =" + list.product);

list.datePayment = pay.datePayment ;
list.modePay = "Espece" ;
list.payedAmount = pay.amount.brutAmount;
 

list22.push(list);
}
//window.alert("cheques long= " + pay.amount.cheques.length);

// for (var i = 1; i < pay.amount.cheques.length; i++) {

pay.amount.cheques.forEach(function(cheque) {
  
 var list  = [];
 list.amount = cheque ;
// console.log("list.amount =" + list.amount);  
list.firstname = pay.firstname ;
list.lastname = pay.lastname ;
list._levelId =pay._levelId ;
  list.class= pay.class ;
 list.currentPayedProd = pay.currentPayedProd ;
   list.datePayment = cheque.dateE ;
  list.modePay = "Cheques" ;

 list.payedAmount = cheque.amount ;

//list.payedAmount = "111"; 




// console.log("chek" + list.payedAmount); 
list22.push(list);
 // console.log("list22=" + list22)


});


// list22.push(list);

 
 //console.log(list22);
 //console.log("longueur list22 =" + list22.length);

return list22;

     }

   $scope.radios = "all";

    $scope.tableParams = new NgTableParams({
        sorting: { name: "asc" },
        count: $scope.payments.length
    }, {
        getData: getData
    });

    function getData(params) {

       var   filtredData    = $filter('filter')($scope.payments, params.filter());
             filtredData    = $filter('orderBy')(filtredData, params.orderBy());
       var filtredData2 = []; 
       var decomposerPay = [];
       

        if((typeof $scope.search.dateDebutPayment!= "undefined")&&$scope.search.dateDebutPayment && (typeof $scope.search.dateFinPayment!="undefined")&&$scope.search.dateFinPayment){
            
            filtredData.forEach(function(pay){

           //     if(pay.datePayment>=$scope.search.dateDebutPayment&&pay.datePayment<=$scope.search.dateFinPayment){
                  
              decomposerPay = decomposerPayments(pay);

               // console.log("decomposerPay =" + decomposerPay);

                decomposerPay.forEach(function(pay){
                    if(pay.datePayment>=$scope.search.dateDebutPayment&&pay.datePayment<=$scope.search.dateFinPayment){
                      filtredData2.push(pay);
                   }
                });


                    
             //   }
            })
        }

        calculateTotal(filtredData2);
        
       return filtredData2;
      // console.log("filtredData2" + filtredData2);
    }

    $scope.filterTable =  function(){
            $scope.tableParams.reload();
    }

var filename = "daily.csv";
    function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}
   

   $scope.exportTableToCSV =  function(){
        var csv = [];
        var rows = document.querySelectorAll("table tr");
        

    csv.push("Niveau ; Classe ; Nom ; Prenom; Mode Paiment;Date;Montant TTC ;Produits");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
//          console.log("row :_" + row);
          //.innerText
        
        csv.push(row.join(";"));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
    
    //console.log("csv:_" + csv);

    }


    $scope.$watch('radios', function() {
          $scope.filterTable();
    });

});                                                                                                                             