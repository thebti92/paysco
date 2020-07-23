var factureModule = angular.module('module.facture', []);


factureModule.controller('FactureController', function(_, $q, $rootScope, $modal, $filter, $scope, StudentService, levels, NgTableParams, PaymentService, FactureService,student, payments, numero) {

    $scope.produtOK = " ";
     $scope.entrer = false;

    $scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}, {_id:'topaze'}, {_id:'A'}, {_id:'B'}, {_id:'C'}];
    $scope.now =  moment(new Date()).format("YYYY-MM-DD");
    var now =  moment(new Date()).format("YYYY-MM-DD");
    $rootScope.printOneHistory = false;
    
var test = 1 ;

    $scope.loadEditedStudent = function(student) {
        $scope.toEditStudent = student;
    }

    var fs = require('fs');
    $scope.timbre = PaymentService.timbre();
    $rootScope.tax = PaymentService.tax();
    $scope.tax = PaymentService.tax();
    $scope.student = student ;

    var aux = window.localstorage ;
   
  //******* persistance de dbfilepath

 $scope.dbFilePath ={
                      _id : '',
                      value : '',
                      years : '',
                      school : '',
                      code : '',
                    };


//$***************************************
/*
   if(window.localstorage == "T0"){
     student.factures.t0 = true; 

        StudentService.upsertStudent(student).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditStudent = {};

        });


    }

    if(window.localstorage == "T1"){
     student.factures.t1 = true; 

     StudentService.upsertStudent(student).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditStudent = {};

        });

    }

    if(window.localstorage == "T2"){
     student.factures.t2 = true;

        StudentService.upsertStudent(student).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditStudent = {};

        });

    }

    if(window.localstorage == "T3"){
     student.factures.t3 = true; 

        StudentService.upsertStudent(student).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditStudent = {};

        });

    }

 */ 
 
/*
  var nonpaye = 1;
 
 payments.forEach(function(payment){

 

// -----------------------T0 --------------------
 if (aux == "T0"){
   if (payment.currentPayedProd.t0.length > 0 ) {  
               payment.amount.cheques.forEach(function(cheque) {

            var now = moment(new Date()).format("YYYY-MM-DD");
       
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
             
            if (cheque.optradio == "Avoir non perçu") {
         
                
                nonpaye = 0;
                  
                }
              }


              });
             }
}

// -----------------------T1 --------------------
 if (aux == "T1"){
   if (payment.currentPayedProd.t1.length > 0 ) {  
               payment.amount.cheques.forEach(function(cheque) {

            var now = moment(new Date()).format("YYYY-MM-DD");
             
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
            
            if (cheque.optradio == "Avoir non perçu") {
         
                console.log("cccccccccccccc");
                nonpaye = 0;
                  
                }
              }


              });
             }
}

// -----------------------T2 --------------------

 if (aux == "T2"){
   if (payment.currentPayedProd.t2.length > 0 ) {  
               payment.amount.cheques.forEach(function(cheque) {

            var now = moment(new Date()).format("YYYY-MM-DD");
            console.log("student.firstname "+ student.firstname);
             console.log("student.lastname "+ student.lastname);
             console.log("cheque.firstname "+ cheque.firstname);
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
            console.log("test eleve bien determine");
            if (cheque.optradio == "Avoir non perçu") {
         
                console.log("cccccccccccccc");
                nonpaye = 0;
                  
                }
              }


              });
             }
}

// -----------------------T3 --------------------
 if (aux == "T3"){
   if (payment.currentPayedProd.t3.length > 0 ) {  
               payment.amount.cheques.forEach(function(cheque) {

            var now = moment(new Date()).format("YYYY-MM-DD");
            console.log("student.firstname "+ student.firstname);
             console.log("student.lastname "+ student.lastname);
             console.log("cheque.firstname "+ cheque.firstname);
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
            console.log("test eleve bien determine");
            if (cheque.optradio == "Avoir non perçu") {
         
                console.log("cccccccccccccc");
                nonpaye = 0;
                }
              }
});
             }
}


           }); 


 
 console.log("-------|| nonpayé ||------ "+ nonpaye);

sessionStorage.setItem("nonpayé", nonpaye);

*/



 payments.forEach(function(payment){
   
               payment.amount.cheques.forEach(function(cheque) {

            var now = moment(new Date()).format("YYYY-MM-DD");

            if (cheque.optradio === "Avoir non perçu") {
         

              if (cheque.dateE >= now ) {
 
             cheque.optradio = "reçu" ;

            

                 }
                }


              });
           }); 

// remise
        indexToBeRetrieved = _.indexOf(_.pluck($scope.levels, '_id'), student._levelId);
        $scope.prixsc = $scope.levels[indexToBeRetrieved].price.t0.s;
       
$scope.prixeleve = student.price.t0.s;

if ($scope.prixeleve<$scope.prixsc) {

  $scope.remise = $scope.prixsc - $scope.prixeleve;
  $scope.tremise0 = ( ($scope.remise* 100) / $scope.prixsc).valueOf().toFixed(1) ;

 
// window.alert("GOOOD");
}

// 2 eme cas 


 indexToBeRetrieved1 = _.indexOf(_.pluck($scope.levels, '_id'), student._levelId);
        $scope.prixsc1 = $scope.levels[indexToBeRetrieved1].price.t1.s;
        
$scope.prixeleve1 = student.price.t1.s;

if ($scope.prixeleve1<$scope.prixsc1) {

  $scope.remise1 = $scope.prixsc1 - $scope.prixeleve1;
  $scope.tremise1 = ( ($scope.remise1 * 100) / $scope.prixsc).valueOf().toFixed(1) ;

  //window.alert("GOOOD");
}

// 3 eme cas 2 eme trimestre


 indexToBeRetrieved2 = _.indexOf(_.pluck($scope.levels, '_id'), student._levelId);
        $scope.prixsc2 = $scope.levels[indexToBeRetrieved2].price.t2.s;
        
$scope.prixeleve2 = student.price.t2.s;

if ($scope.prixeleve2<$scope.prixsc2) {

  $scope.remise2 = $scope.prixsc2 - $scope.prixeleve2;
  $scope.tremise2 = ( ($scope.remise2 * 100) / $scope.prixsc).valueOf().toFixed(1) ;

  //window.alert("GOOOD");
}

// 3 eme cas 3 eme trimestre


 indexToBeRetrieved3 = _.indexOf(_.pluck($scope.levels, '_id'), student._levelId);
        $scope.prixsc3 = $scope.levels[indexToBeRetrieved3].price.t3.s;
 $scope.prixeleve3 = student.price.t3.s;

if ($scope.prixeleve3<$scope.prixsc3) {

  $scope.remise3 = $scope.prixsc3 - $scope.prixeleve3;
  $scope.tremise3 = ( ($scope.remise3 * 100) / $scope.prixsc).valueOf().toFixed(1) ;
 // window.alert("GOOOD");
}










if ($scope.prixeleve>=$scope.prixsc) {

  $scope.remise0 = 0;
  $scope.tremise0= 0 ;

  $scope.remise1 = 0;
  $scope.tremise1= 0 ;

  $scope.remise2 = 0;
  $scope.tremise2= 0 ;

  $scope.remise3 = 0;
  $scope.tremise3 = 0 ;

 }

    $scope.printOneHistoryFire = function() {

     var printButton = document.getElementById("printpagebutton");
        printButton.style.visibility = 'hidden';
        window.print()
       // printButton.style.visibility = 'visible';
        $rootScope.printOneHistory = false;
    };

    $scope.search = {
        dateDebutPayment: "2016-02-01",
        dateFinPayment : now
    }

   // $scope.numFacture = Math.random().toString(8).slice(7);

     $scope.printOneHistoryFire = function() {
     window.print();
     $rootScope.printOneHistory = false;
    };  

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

      if (test == 0 ) {
        $rootScope.printOneHistory = true;
        
        $scope.toShowPayment = payment;
        $scope.chequeAmount = calculateChequesAmount(payment);

        modalShowDetail.$promise.then(modalShowDetail.show);

      }
    };


   function calculateTotal(pmts) {
     var timbre = PaymentService.timbre();
    if(typeof pmts == "undefined")
        return ;
        
         var totale = 0;
         var rtotale =0;
         var totalht = 0 ;
         
         var tax = PaymentService.tax();
         var now = moment(new Date()).format("YYYY-MM-DD");

         
         pmts.forEach(function(payment) {
        
         if($scope.radios=="all") {
                totale = totale  + payment.payedAmount;
         }
 
            //    if(payment.datePayment<=now){
                  rtotale = rtotale + payment.payedAmount;
            //    }
         
         });

$scope.payments.forEach(function(payment){
        if (payment.firstname == student.firstname && payment.lastname == student.lastname && payment._levelId == student._levelId) {

      
      if (aux == "T0") {
                if (payment.currentPayedProd.t0.length!=0) {
                    totalht = totalht + payment.amount.payedAmount;
                     
                    
                }
           }
     
     if (aux == "T1") {
                if (payment.currentPayedProd.t1.length!=0) {
                    totalht = totalht + payment.amount.payedAmount;
                    
                    
                }
           }
    if (aux == "T2") {
                if (payment.currentPayedProd.t2.length!=0) {
                    totalht = totalht + payment.amount.payedAmount;
                     
                }
           }
    if (aux == "T3") {
                if (payment.currentPayedProd.t3.length!=0) {
                    totalht = totalht + payment.amount.payedAmount;
                     
                }
           }

            var i = 0 ;
            
         
          }   
        });
        $scope.rtotale = rtotale.toFixed(3);
        $scope.totale = totale;
     
        $scope.totalht = totalht;
      };



// get mode paiement
      payments.forEach(function(pay) {
        // t0
         
        if(aux == "T0"){
        if (pay.firstname == student.firstname && pay.lastname == student.lastname && pay._levelId == student._levelId && pay.currentPayedProd.t0.length!=0) {
               
        $scope.modePay = pay.modePay ;
    

         }
        }

 // t1
        if(aux == "T1"){
        if (pay.firstname == student.firstname && pay.lastname == student.lastname && pay._levelId == student._levelId && pay.currentPayedProd.t1.length!=0) {
           
        $scope.modePay = pay.modePay ;
        

         }
        }
  // t2
        if(aux == "T2"){
        if (pay.firstname == student.firstname && pay.lastname == student.lastname && pay._levelId == student._levelId && pay.currentPayedProd.t2.length!=0) {
               
        
        $scope.modePay = pay.modePay ;
     

         }
        }
  // t3
        if(aux == "T3"){
        if (pay.firstname == student.firstname && pay.lastname == student.lastname && pay._levelId == student._levelId && pay.currentPayedProd.t3.length!=0) {
               
         
        $scope.modePay = pay.modePay ;
         
         }
        }



      });


  
function decomposerPayments(pay){
 var list22  = new Array();
 

// window.alert("PAY ="+ pay);
 
   

    

if (pay.amount.brutAmount>0) {
  var list  = [];

list.amount = pay.amount.brutAmount; 
list.firstname = pay.firstname ;
list.lastname = pay.lastname ;
list._levelId = pay._levelId ;
list.class = pay.class ;
list.currentPayedProd = pay.currentPayedProd ;
 

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
   
list.firstname = pay.firstname ;
list.lastname = pay.lastname ;
list._levelId = pay._levelId ;
list.class = pay.class ;
list.currentPayedProd = pay.currentPayedProd ;
list.datePayment = cheque.dateE ;
list.modePay = "Cheques" ;

 list.payedAmount = cheque.amount ;

//list.payedAmount = "111"; 

  
list22.push(list);
 


});


// list22.push(list);
 
return list22;

list22 = null ;
$scope.tableParams.reload();
window.alert("GO :" + list22.length);
     }

   $scope.radios = "all";

  $scope.radiot = window.localstorage ;
   
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
    if (pay.firstname == student.firstname && pay.lastname == student.lastname && pay._levelId == student._levelId) {

      
                decomposerPay = decomposerPayments(pay);

               

                decomposerPay.forEach(function(pay2){

                if (pay2.firstname == student.firstname && pay2.lastname == student.lastname && pay2._levelId == student._levelId) {
                  //  if(pay2.datePayment>=$scope.search.dateDebutPayment&&pay2.datePayment<=$scope.search.dateFinPayment){
                

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

  

                 }
                });

              }
            })
        }

        calculateTotal(filtredData2);
        
       return filtredData2 ;
    }

    $scope.filterTable =  function(){
            $scope.tableParams.reload();

    }

    $scope.$watch('radios', function() {
          $scope.filterTable();
    });

     $scope.$watch('radiot', function() {
          $scope.filterTable();
    });
//}
//}

// Eregistrement .................





 function myFunction(filtredData3) {
       
     
        var filtredData2 = [];         
            
        $scope.payments.forEach(function(pay){
        if (pay.firstname == student.firstname && pay.lastname == student.lastname && pay._levelId == student._levelId) {

      
              decomposerPay = decomposerPayments(pay);
              decomposerPay.forEach(function(pay2){

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

                });
              }
            })
       

        calculateTotal(filtredData2);
        filtredData3 = filtredData2 ;
          console.log("terminé");
       return filtredData2 ;
     

    }

var list9 = [];
var filtredData3 = [];

 list9 = myFunction(filtredData3);
  
  list9 = filtredData3 ;
    
 var facture = {
                 id: '',
                code: '',
                firstname: '',
                lastname: '',
                _levelId : '',
                class : '',
                datePayment :  new  Date (),
                totalht : '',
                tax : '',
                rtotale : '',
                timbre : '',
                netapayer : '',
                cheques: []
                // ,product : ''
                  };

  //*******************************************
    var squadra = [];
      
   function exportTable(){
        var csv = [];
        
     var rows = document.getElementById("myTable");
     console.log("rrrrrrrrrrrrrr:" + rows.length);
 
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
//          console.log("row :_" + row);
          //.innerText
        
        csv.push(row.join(";"));
       
    }
     squadra.push(csv.join("\n")); 


    // Download CSV file
   // downloadCSV(csv.join("\n"), filename);
    
    //console.log("csv:_" + csv);

    }



  //*******************************************
 
  //----------------------------------------------
    
   function getProduct(pay){
     $scope.produto = " ";
     $scope.box = " ";
     $scope.payments.forEach(function(pay){
          if (pay.firstname == student.firstname && pay.lastname == student.lastname && pay._levelId == student._levelId) {

          
         if ($scope.radiot == "T0") {  
            if(pay.currentPayedProd.t0.length!=0){
              console.log("TOOOOOOOOOOOOOOOOO");
              pay.currentPayedProd.t0.forEach(function(prod) {

              $scope.box = $scope.box + prod.product + " ";
              
             
            });
              $scope.produto =  " T0 : " + $scope.box;
              console.log("$scope.produtoooo"+ $scope.produto);

            }
          }

     if ($scope.radiot == "T1") {  
            if(pay.currentPayedProd.t1.length!=0){
              console.log("TOOOOOOOOOOOOOOOOO");
              pay.currentPayedProd.t1.forEach(function(prod) {

              $scope.box = $scope.box + prod.product + " ";
              
             
            });
              $scope.produto =  " T1 : " + $scope.box;
              console.log("$scope.produtoooo"+ $scope.produto);

            }
          }


      if ($scope.radiot == "T2") {  
            if(pay.currentPayedProd.t2.length!=0){
              console.log("T2222222222");
              pay.currentPayedProd.t2.forEach(function(prod) {

              $scope.box = $scope.box + prod.product + " ";
              
             
            });
              $scope.produto =  " T2 : " + $scope.box;
              console.log("$scope.produtoooo"+ $scope.produto);

            }
          }

         if ($scope.radiot == "T3") {  
            if(pay.currentPayedProd.t3.length!=0){
              console.log("T3");
              pay.currentPayedProd.t3.forEach(function(prod) {

              $scope.box = $scope.box + prod.product + " ";
              
             
            });
              $scope.produto =  " T3 : " + $scope.box;
              console.log("$scope.produtoooo"+ $scope.produto);

            }
          }

           }

          })
          
          $scope.produtOK = $scope.produto;
          console.log("$scope.produtOKkkkkkk" + $scope.produtOK )
        }
  //----------------------------------------------


  getProduct(payments);
  exportTable();
  finalPayment(student);


  function finalPayment(student) {
   //  var facture = [];
     var now = moment(new Date()).format("YYYY-MM-DD");
     

 
  
 
     //  $scope.payment.datePayment = moment($scope.payment.datePayment).format("YYYY-MM-DD");
      // $scope.payment.datePayment =$scope.payment.datePayment ;
    //    $scope.payment.modePay = getModepay();
    //    $scope.payment.amount.payedAmount = $scope.amount;
       // facture.id=$scope.id;
        facture.code = student.code;
        facture.firstname = student.firstname;
        facture.lastname = student.lastname;
        facture._levelId = student._levelId;
        facture.class = student.class;
        facture.datePayment = $scope.now ;
        facture.totalht = $scope.totalht ;
        facture.tax = $scope.tax ;
        facture.rtotale = $scope.rtotale ;
        facture.timbre = $scope.timbre ;
        facture.modePay = $scope.modePay;
        facture.netapayer = $scope.netapayer ;
        facture.cheques = squadra ;
       
        console.log("BRAVOOOOOOOOOOO " + facture.cheques);

        facture.produit = $scope.produtOK ;
        console.log("okkkkkkkkkkkkkk " + facture.produit);

 PaymentService.UpdateIdFacture().then(function(pmtds) {

           $scope.id = "000"+numero.value + '/'+ numero.years ;
           facture.id=$scope.id;
       
            return $scope.id;

        }, function(error) {
            alert('Impossible de procéder le facture, detail : ' + error);
        }).then(function(usr) {

        
        FactureService.insertFacture(facture);

        }, function(error) {
            alert("Impossible de mettre à jours l'eleve, detail : " + error);
        });
  
    };
 });