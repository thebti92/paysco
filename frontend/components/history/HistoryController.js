var historyModule = angular.module('module.history', []);


historyModule.controller('HistoryController', function(_, $q, $rootScope, $modal, $filter, $scope, levels, NgTableParams, PaymentService, payments) {
    $scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}];
    $scope.now =  moment(new Date()).format("YYYY-MM-DD");
    $rootScope.printOneHistory = false;

    var fs = require('fs');
    $scope.timbre = PaymentService.timbre();
    $scope.tax = PaymentService.tax();
    
    $scope.printOneHistoryFire = function() {
     window.print();
     $rootScope.printOneHistory = false;
    };

    $scope.search = {
        dateDebutPayment: $scope.now,
        dateFinPayment :  $scope.now
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
        controller: 'HistoryController',
        template: 'frontend/components/history/views/history.detail.html',
        show: false
    });


    $scope.showDetail = function(payment) {
        $rootScope.printOneHistory = true;

        $scope.toShowPayment = payment;
        $scope.chequeAmount = calculateChequesAmount(payment);

        modalShowDetail.$promise.then(modalShowDetail.show);
    };

// ****************** calcul totat


   function calculateTotal(pmts) {


var tax = PaymentService.tax();
    
    if(typeof pmts == "undefined")
        return ;
        
         var totale = 0;
         var totaleHt = 0;
         var totale2 = 0;

         var rtotale = 0;
         var rtotaleHt = 0;

         var rtotaleProduct = 0;
         var now = moment(new Date()).format("YYYY-MM-DD");
/*
         pmts.forEach(function(payment) {
            if($scope.radios=="all") {

              var chequeAmount = calculateChequesAmount(payment);
              var amount = payment.amount.brutAmount + chequeAmount ;
//              console.log("----amount---" + amount);

              totale = totale + amount;


                
              if(payment.datePayment<=now){
                  rtotale = rtotale + payment.payedAmount;
                  console.log("rtotaleSS______: " + payment.payedAmount);
              }
    
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

          });
         */

            // ****************************************              // ****************************************
    payments.forEach(function(payment) {
        if(payment.datePayment>=$scope.search.dateDebutPayment&&payment.datePayment<=$scope.search.dateFinPayment){

            if($scope.radios=="all") {

          var chequeAmount = calculateChequesAmount(payment);
              var amount = payment.amount.brutAmount + chequeAmount ;
            //  console.log("----amount---" + amount);
              totale = totale + amount;  


              
            totaleHt = totaleHt + payment.amount.payedAmount;
          //  console.log("totaleHt----"+ totaleHt)

            if(payment.datePayment<=now){
           //   console.log("payment_____: "+ payment);
            
            var chequeAmount2 = calculateChequesAmount(payment);
              var amount2 = payment.amount.brutAmount + chequeAmount2 ;
            // console.log("----ramount---" + amount2);
              rtotale = rtotale + amount2;
//              console.log("----rtotale>>>>>---" + rtotale);
 


              // **********
                  rtotaleHt = rtotaleHt + payment.amount.payedAmount;
                //  console.log("payment.amount.payedAmount______: " + payment.amount.payedAmount);
                 // console.log("rtotaleHt______: " + rtotaleHt);
            }

                

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

         


                



           }

        
            //*****************************************




                if(payment.datePayment<=now){
                  rtotaleProduct = rtotaleProduct + totale2;
                }

                if(payment.datePayment<=now){
               //   rtotale = rtotale + payment.payedAmount;
                }

 });

      //   };

        $scope.rtotaleProduct = rtotaleProduct.toFixed(2);
        $scope.rtotaleProductHt = (rtotaleProduct / (1 + tax/100)).toFixed(2);

        $scope.rtotale = rtotale.toFixed(2);
        $scope.totale = totale.toFixed(2);

        $scope.totaleHt = totaleHt.toFixed(2);

        $scope.rtotaleHt = rtotaleHt.toFixed(2);


      };

// ******************

   $scope.radios = "all";

    $scope.tableParams = new NgTableParams({
        sorting: { name: "asc" },
        count: $scope.payments.length
    }, {
        getData: getData
    });

    function getData(params) {
       
       var filtredData    = $filter('filter')($scope.payments, params.filter());

        if(params.orderBy()[0]=="+name")
             filtredData    = $filter('orderBy')(filtredData, ["+datePayment"]);
         else
             filtredData    = $filter('orderBy')(filtredData, params.orderBy());

       var filtredData2 = [];         
        if((typeof $scope.search.dateDebutPayment!= "undefined")&&$scope.search.dateDebutPayment && (typeof $scope.search.dateFinPayment!="undefined")&&$scope.search.dateFinPayment){
            
            filtredData.forEach(function(pay){

                if(pay.datePayment>=$scope.search.dateDebutPayment&&pay.datePayment<=$scope.search.dateFinPayment){
                    filtredData2.push(pay);
                }
            }) 
        }

        calculateTotal(filtredData2);
        
       return filtredData2;
    }


    var filename = "history.csv";
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

    csv.push("Niveau ; Classe ; Nom ; Prenom; Mode Paiment;Date ;Montant en HT;Produits");
    
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
//    console.log("csv:_" + csv);

    }


    $scope.filterTable =  function(){
            $scope.tableParams.reload();
    }

    $scope.$watch('radios', function() {
          $scope.filterTable();
    });

});


historyModule.controller('HistoryPrinterController', function( $scope, NgTableParams, PaymentService, payment, levels) {

  
   var fs = require('fs');
    $scope.timbre = PaymentService.timbre();
   $scope.tax = PaymentService.tax();
   
//   console.log("GOOOD"+ $scope.tax);
//  window.alert("GOOOD"+ $scope.tax);


    $scope.payment = payment;
    $scope.tableChequeParams = new NgTableParams({
        sorting: { name: "asc" } 
    }, {
        dataset: $scope.payment.amount.cheques
    });

       $scope.especepaye = payment.amount.brutAmount.toFixed(1);

     function calculateChequesAmount(){
        var chequeAmount = 0;

        $scope.payment.amount.cheques.forEach(function(cheque) {
            chequeAmount = chequeAmount + cheque.amount;
        });
        return chequeAmount;
    }

    var chequeAmount = calculateChequesAmount();
        $scope.chequeAmount = chequeAmount.toFixed(1)

    //  $scope.TotalpayeHT = ((chequeAmount + payment.amount.brutAmount)/ (1 + $scope.tax/100)).toFixed(1);
      $scope.TotalpayeHT = payment.amount.payedAmount;

      $scope.TotalpayeTTC = (chequeAmount + payment.amount.brutAmount);



});


historyModule.controller('HistoryPrinterController2', function( $scope, NgTableParams, PaymentService, payment, levels, student) {
    
 
   var fs = require('fs');
    $scope.timbre = PaymentService.timbre();
    $scope.tax = PaymentService.tax();
 
     
    $scope.student = student ;

   $scope.tranche = $scope.tranche;

 
     var now = moment(new Date()).format("DD/MM/YYYY");
});


historyModule.controller('HistoryPrinterController3', function( $scope, NgTableParams, PaymentService) {
    
 
   var fs = require('fs');
    $scope.timbre = PaymentService.timbre();
    $scope.tax = PaymentService.tax();
 
     
   // $scope.student = student ;

    /*
    console.log("rrrrrrrrrr" + student);

    $scope.code = student.code ;
    $scope.filename = student.filename ;
    $scope.lastname = student.lastname ;
    $scope.class = student.class ;
    $scope._levelId = student._levelId ;

    */

    var now = moment(new Date()).format("DD/MM/YYYY");
});
