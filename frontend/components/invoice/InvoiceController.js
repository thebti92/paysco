var invoiceModule = angular.module('module.invoice', []);
invoiceModule.controller('InvoiceController', function(_, $q, $rootScope, $filter, $scope,$state, levels, NgTableParams, factures) {
// , $modal , StudentService , PaymentService , InvoiceService
  


    $scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}, {_id:'topaze'}, {_id:'A'}, {_id:'B'}, {_id:'C'}];
    $scope.now =  moment(new Date()).format("YYYY-MM-DD");
    $rootScope.printOneHistory = false;

    var fs = require('fs');

      $scope.printOneHistoryFire = function() {
      window.print();
      $rootScope.printOneHistory = false;
    };

    $scope.search = {
        dateDebutPayment: "2016-02-01",
        dateFinPayment : $scope.now
    }

    $scope.factures = factures;



    $scope.tableParams = new NgTableParams({
        sorting: { name: "asc" },
        count: $scope.factures.length
    }, {
        getData: getData
    });

    function getData(params) {
       
       var   filtredData    = $filter('filter')($scope.factures, params.filter());

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

       // calculateTotal(filtredData2);
        
       return filtredData2;
    }

  // Export Excel

    var filename = "invoice.csv";
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

    csv.push("Facture n° ; Date ; Prenom ;Nom ;Niveau ; Classe;Total HT;TVA;Timbre;Total TTC;Modalite de Paiement; Produit");
    // ; Produit
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


  //**************

    $scope.filterTable =  function(){
            $scope.tableParams.reload();
    }

    $scope.$watch('radios', function() {
          $scope.filterTable();
    });




// go to print

    $scope.confirmStart2=  function(facture) {

   var idTobePrinted = null;
   
   idTobePrinted = facture._id ;
   console.log("idTobePrinted" + idTobePrinted);
    
 $state.go('printoneInvoice',{id: idTobePrinted});//go for printing! 

    }

  

});





invoiceModule.controller('InvoicePrinterController', function(_, $q, $rootScope, $modal, $filter, $scope, levels, $state, NgTableParams, InvoiceService,PaymentService, facture, payments) {
    
    $scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}, {_id:'topaze'}];
  //  $scope.now =  moment(new Date()).format("YYYY-MM-DD");
    $rootScope.printOneHistory = false;

    var fs = require('fs');
   
    $scope.printOneHistoryFire = function() {
     window.print();
     $rootScope.printOneHistory = false;
    };





//    console.log("facture__" + facture);
  //  console.log("facture.length__" + facture.length);

    $scope.now = facture.datePayment ;
    $scope.id = facture.id;
  //  $scope.totalht = facture.totalht ;
    $scope.tax = facture.tax ;
  //  $scope.rtotale = facture.rtotale ;
    $scope.timbre = facture.timbre ;
  //  $scope.netapayer = facture.netapayer ;

$scope.facture = facture;


  $scope.radios = "all";

  $scope.radiot = window.localstorage ;
//  console.log("$scope.radiot -----" +$scope.radiot);
$scope.payments = payments ;
 var now = moment(new Date()).format("YYYY-MM-DD");
 $scope.search = {
        dateDebutPayment: "2016-02-01",
        dateFinPayment : now
    }


function decomposerPayments(pay){
 var list22  = new Array();
 

// window.alert("PAY ="+ pay);
 
//   console.log(pay.firstname);
  // console.log(pay.lastname);
   //console.log(pay.amount);
   //console.log(pay.class);
   //console.log(pay.modPay);
   //console.log("pay.brutAmount =" + pay.amount.brutAmount);

   //console.log("test : " + pay.amount.brutAmount>0);

if (pay.amount.brutAmount>0) {
  var list  = [];

list.amount = pay.amount.brutAmount; 
list.firstname = pay.firstname ;
list.lastname = pay.lastname ;
list._levelId = pay._levelId ;
list.class = pay.class ;
list.currentPayedProd = pay.currentPayedProd ;
//console.log("list.product =" + list.product);

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
list._levelId = pay._levelId ;
list.class = pay.class ;
list.currentPayedProd = pay.currentPayedProd ;
list.datePayment = cheque.dateE ;
list.modePay = "Cheques" ;

 list.payedAmount = cheque.amount ;

//list.payedAmount = "111"; 

//console.log("chek" + list.payedAmount); 
list22.push(list);
//console.log("list22=" + list22)


});


// list22.push(list);

  
//console.log(list22);
//console.log("longueur list22 =" + list22.length);

return list22;

list22 = null ;
$scope.tableParams.reload();
window.alert("GO :" + list22.length);
     }
/*
    
    $scope.tableParams = new NgTableParams({
        sorting: { name: "asc" } 
    }, {
        dataset: $scope.facture.cheques
    });
*/

 function calculateTotal(pmts) {
     var timbre = PaymentService.timbre();
    if(typeof pmts == "undefined")
        return ;
        
         var totale = 0;
         var rtotale =0;
         var totalht =0;
        var tax = PaymentService.tax();

         var now = moment(new Date()).format("YYYY-MM-DD");

         pmts.forEach(function(payment) {
            if($scope.radios=="all") {
                totale = totale  + payment.payedAmount;
           }

                if(payment.datePayment<=now){
                  rtotale = rtotale + payment.payedAmount;
                }
          



         });

        $scope.rtotale = rtotale.valueOf().toFixed(1);
        $scope.totale = totale;
        $scope.netapayer = (timbre + rtotale).valueOf().toFixed(1) ;
        $scope.totalht = (rtotale/(1 + tax/100)).valueOf().toFixed(1) ;
      };


$scope.tableParams = new NgTableParams({
        sorting: { name: "asc" },
        count: $scope.payments.length
    }, {
        getData: getData
    });

    function getData(params) {
       
       var   filtredData    = $filter('filter')($scope.payments, params.filter());

        if(params.orderBy()[0]=="+name")
             filtredData    = $filter('orderBy')(filtredData, ["+datePayment"]);
         else
             filtredData    = $filter('orderBy')(filtredData, params.orderBy());

       var filtredData2 = [];         
        if((typeof $scope.search.dateDebutPayment!= "undefined")&&$scope.search.dateDebutPayment && (typeof $scope.search.dateFinPayment!="undefined")&&$scope.search.dateFinPayment){
            
            filtredData.forEach(function(pay){
      
              decomposerPay = decomposerPayments(pay);

//                console.log("decomposerPay =" + decomposerPay);

                decomposerPay.forEach(function(pay2){

                if (pay2.firstname == facture.firstname && pay2.lastname == facture.lastname && pay2._levelId == facture._levelId) {
        //    if(pay2.datePayment<=facture.datePayment){
                

                 if ($scope.radiot == "T0") {
                 if(pay2.currentPayedProd.t0.length!=0 ){
  
                      filtredData2.push(pay2);
                   }
                 }

                  if ($scope.radiot == "T1") {
                 if(pay2.currentPayedProd.t1.length!=0 ){
  
                      filtredData2.push(pay2);
                   }
                 }
                 

                   if ($scope.radiot == "T2") {
                 if(pay2.currentPayedProd.t2.length!=0 ){
  
                      filtredData2.push(pay2);
                   }
                 }


                   if ($scope.radiot == "T3") {
                 if(pay2.currentPayedProd.t3.length!=0 ){
  
                      filtredData2.push(pay2);
                   }
                 }

  
               //  }
               }
                });


                    
             //   }
            })
        }

        calculateTotal(filtredData2);
        
       return filtredData2 ;
    }


/*
  $scope.tableParams = new NgTableParams({
        count: $scope.facture.cheques.length
    }, {
        dataset: $scope.facture.cheques
    });
*/    



});
