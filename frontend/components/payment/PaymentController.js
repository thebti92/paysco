var paymentModule = angular.module('module.payment', []);

paymentModule.controller('PaymentController', function(_, PaymentService, $state ,$rootScope, $scope, NgTableParams, $filter, $modal, ngTableParams, StudentService, levels , students, payments, numero2) {

   $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}, {_id:'topaze'}, {_id:'A'}, {_id:'B'}, {_id:'C'}];
   $scope.levels = levels;

    var fs = require('fs');
    $scope.tax = PaymentService.tax();

    var fs = require('fs');
    $scope.timbre = PaymentService.timbre();
 

    window.sc = $scope;
    $scope.students = students;
    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.students
    });

    $scope.toAddCheque = {};
    $scope.toAddChequePayment = {};

    
     $scope.undo = function(t,p) {
       //  $scope.toPayStudent.timbre[t] = false;
        $scope.newlyClickedTimbre[t] = false;
        $scope.toPayStudent.products[t][p] = false;
        $scope.newlyClickedProducts[t][p] = false;//this will be used for calculate amount
    }

 
//to be migrated to the frontend to compare performance !!!!!

    var modalConfirmStart2 = $modal({
        scope: $scope,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.confirm.start2.html',
        show: false
    });


    var modalConfirmStart = $modal({
        scope: $scope,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.confirm.start.html',
        show: false
    });

    var modalConfirmProduct = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.confirm.product.html',
        show: false
    });

    var modalPayment1 = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.step1.html',
        show: false
    });
    var modalPayment2 = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.step2.html',
        show: false
    });


   
    $scope.confirmStart = function(student) {
        //init all variables
        resetScope();
        $scope.toPayStudent = student;
        modalConfirmStart.$promise.then(modalConfirmStart.show);
    }


     $scope.confirmStart2 = function(student, payments) {
        //init all variables
        resetScope();

        $scope.toPayStudent = student;
        modalConfirmStart2.$promise.then(modalConfirmStart2.show);
    }


    $scope.confirmProduct = function(t,p) {
         $scope.newlyClickedProducts[t][p] = true;//this will be used for calculate amount
         $scope.clickedProduct = {t:t,p:p};
         modalConfirmProduct.$promise.then(modalConfirmProduct.show);
    
    }

    $scope.confirmTimbre = function(t) {
         $scope.newlyClickedTimbre[t] = true; //this will be used for calculate amount
         $scope.clickedTimbre = {t:t};
         modalConfirmProduct.$promise.then(modalConfirmProduct.show);
    
    }


    $scope.confirmProduct2 = function(t,p) {
         $scope.newlyClickedProducts[t][p] = true;//this will be used for calculate amount
         $scope.clickedProduct = {t:t,p:p};
         modalConfirmProduct.$promise.then(modalConfirmProduct.show);
    
    }



    $scope.paymentStep1 = function() {
        modalPayment1.$promise.then(modalPayment1.show);
    }

    $scope.paymentStep2 = function(student) {
    //  console.log("toPayStudent$"+ student);
    //  $scope.newlyClickedTimbre, 
        amount = $rootScope.calculateAmount($scope.newlyClickedProducts,student.price);
        $scope.amount = amount;
        $scope.amountttc = $rootScope.calculateAmountTTC($scope.newlyClickedTimbre,amount);

      

        modalPayment2.$promise.then(modalPayment2.show);
        
    }


 function calculateEntredAmount() {
        return  (calculateChequesAmount() + $scope.payment.amount.brutAmount).valueOf().toFixed(1);
    }


    function calculateChequesAmount() {
        var chequeAmount = 0;

        $scope.payment.amount.cheques.forEach(function(cheque) {
            chequeAmount = chequeAmount + cheque.amount;
        });
        return chequeAmount;
    }
    
  //init all variables
    resetScope();

    //only cheque amount
    $scope.chequeAmount = calculateChequesAmount;

    //cheques + brut amount
    $scope.entredAmount = calculateEntredAmount;

    $scope.tableChequeParams = new NgTableParams({}, {
        counts: [], //no pagination
        dataset: $scope.payment.amount.cheques
    });

    $scope.addCheque = function(toPayStudent) {
       
      $scope.toAddCheque.firstname = $scope.toPayStudent.firstname ;
 // console.log($scope.toPayStudent.firstname);
        $scope.toAddCheque.lastname = $scope.toPayStudent.lastname ;
// console.log($scope.toPayStudent.lastname);

        if($scope.toAddCheque.number>0&&$scope.toAddCheque.amount>0&& typeof $scope.toAddCheque.bank!="undefined"&& typeof $scope.toAddCheque.dateE!="undefined" ){
   var now = moment(new Date()).format("YYYY-MM-DD");
   if ($scope.toAddCheque.dateE == now) {

$scope.toAddCheque.optradio = "reçu";

   } else{

    $scope.toAddCheque.optradio = "Avoir non perçu";
   }       
           
 $scope.payment.amount.cheques.push($scope.toAddCheque);


            $scope.toAddCheque = {};
            $scope.tableChequeParams.reload();    
        }else{
            alert("Vérifiez vos données de cheque!");
        }
    }

  // this method for update payment
  

  $scope.addChequePayment = function(payment) {
       
       $scope.toAddCheque.firstname = $scope.payment.firstname ;
  // console.log($scope.payment.firstname);
        $scope.toAddCheque.lastname = $scope.payment.lastname ;
  // console.log($scope.payment.lastname);

        if($scope.toAddCheque.number>0&&$scope.toAddCheque.amount>0&& typeof $scope.toAddCheque.bank!="undefined"&& typeof $scope.toAddCheque.dateE!="undefined" ){
  var now = moment(new Date()).format("YYYY-MM-DD");
   if ($scope.toAddCheque.dateE == now) {

  $scope.toAddCheque.optradio = "reçu";

   } else{

    $scope.toAddCheque.optradio = "Avoir non perçu";
   }       
           
  $scope.payment.amount.cheques.push($scope.toAddCheque);


            $scope.toAddCheque = {};
            $scope.tableChequeParams.reload();    
        }else{
            alert("Vérifiez vos données de cheque!");
        }
}




  //------------------------------  


/*
 $scope.updatedCheque = function() {
  payments.forEach(function(pay){
     pay.amount.cheques.forEach(function(cheque){

    

         if(cheque.dateE>=now){
       
        $scope.updatedCheque.firstname = cheque.firstname ;
        $scope.updatedCheque.lastname = cheque.lastname ;
        
        $scope.updatedCheque.number = cheque.number ;
         
        $scope.updatedCheque.amount = cheque.amount ;
        $scope.updatedCheque.bank = cheque.bank ;
         
        $scope.updatedCheque.dateE= cheque.dateE ;
        $scope.updatedCheque.optradio = "reçu";
            
        $scope.tableChequeParams.reload();  

        }  
        
   })
 });

    }


*/


// =============================================================================
 
function testpayment(student) {
    
 var aux = window.localstorage ;
   // console.log("-----auuux------"+ aux);

  var nonpaye = 1;
 
 payments.forEach(function(payment){

  // console.log("auuuuuuuuuuuuuux"+ aux);

// -----------------------T0 --------------------
 if (aux == "T0"){
   if (payment.currentPayedProd.t0.length > 0 ) {  
               payment.amount.cheques.forEach(function(cheque) {

            var now = moment(new Date()).format("YYYY-MM-DD");
         //   console.log("student.firstname "+ student.firstname);
         //    console.log("student.lastname "+ student.lastname);
         //    console.log("cheque.firstname "+ cheque.firstname);
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
         //   console.log("test eleve bien determine");
            if (cheque.optradio == "Avoir non perçu") {
         
//                console.log("cccccccccccccc");
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
          //   console.log("student.firstname "+ student.firstname);
          //   console.log("student.lastname "+ student.lastname);
          //   console.log("cheque.firstname "+ cheque.firstname);
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
          //  console.log("test eleve bien determine");
            if (cheque.optradio == "Avoir non perçu") {
         
              //  console.log("cccccccccccccc");
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
          //  console.log("student.firstname "+ student.firstname);
          //   console.log("student.lastname "+ student.lastname);
          //   console.log("cheque.firstname "+ cheque.firstname);
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
          //  console.log("test eleve bien determine");
            if (cheque.optradio == "Avoir non perçu") {
         
         //       console.log("cccccccccccccc");
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
           //  console.log("student.firstname "+ student.firstname);
        //   console.log("student.lastname "+ student.lastname);
         //    console.log("cheque.firstname "+ cheque.firstname);
            

 if (cheque.firstname == student.firstname && cheque.lastname == student.lastname) {
          //  console.log("test eleve bien determine");
            if (cheque.optradio == "Avoir non perçu") {
         
              //  console.log("cccccccccccccc");
                nonpaye = 0;
                  
                }
              }


              });
             }
}


           }); 


 
// console.log("-------|| nonpayé ||------ "+ nonpaye);

return nonpaye ;

}
//==============================================================================
   $scope.removeCheque = function(cheque) {
        indexToBeDeleted = _.indexOf(_.pluck($scope.payment.amount.cheques, 'number'), cheque.number);
        $scope.payment.amount.cheques.splice(indexToBeDeleted, 1);
        $scope.tableChequeParams.reload();
    }

    $rootScope.calculateAmount = function(products, price) {
        var amount = 0;
       

        Object.keys(price).forEach(function(t) {
            Object.keys(price[t]).forEach(function(p) {
                if (products[t][p] == true) {
                    amount = amount + price[t][p];
                    
                    $scope.payment.currentPayedProd[t].push({product: p, price: price[t][p]});
                }
            });
        });

       return amount;
    }




 $rootScope.calculateAmountTTC = function(timbre ,amount) {

// console.log("timbre" + timbre);

    

        var amountttc = 0;
        var amountTOT = 0;
        amountttc = (amount + (amount * $scope.tax)/100);
   

   Object.keys(timbre).forEach(function(t) {
//            console.log("timbre[t]"+ timbre[t]);
                if (timbre[t] == true) {
                    amountTOT = (amountttc + $scope.timbre).toFixed(1);
                   // console.log("gooooool"+ timbre[t]);
                    
                }
           
        });

   if (amountTOT > 0) {
     
     amountttc = amountTOT ;

   }


       return amountttc;
    }


   


 
    function resetScope() {

          $scope.newlyClickedProducts = {
             t0: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            },
            t1: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            },
            t2: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            },
            t3: {
                s: false,
                c: false,
                g: false,
                p: false,
                a: false
            }
        };


        $scope.newlyClickedTimbre = {
           
                t0: false,
                t1: false,
                t2: false,
                t3: false
            
        };

       $scope.payment = {
                amount: {
                    payedAmount :0,
                    brutAmount: 0,
                    cheques: []
                },
                currentPayedProd: {
                    t0: [],
                    t1: [],
                    t2: [],
                    t3: []
                },
                datePayment :new Date(),
                modePay: '',
                code: '',
                firstname: '',
                lastname: '',
                _levelId : '',
                class : '',
            };
    }

    function getModepay() {
        if($scope.payment.amount.brutAmount!=0 && $scope.payment.amount.cheques.length==0){
            return "Espece";
        }
        if($scope.payment.amount.brutAmount!=0 && $scope.payment.amount.cheques.length!=0){
            return "paiement mixte";
        }
        if($scope.payment.amount.brutAmount==0 && $scope.payment.amount.cheques.length!=0){
            return "Cheques";
        }
        return "ModePay inconnu!";
    }


    //final payment


  //  $scope.payment.datePayment = null ;
    $scope.finalPayment = function(student) {
var now = moment(new Date()).format("YYYY-MM-DD");


 $scope.payment.datePayment = moment($scope.payment.datePayment).format("YYYY-MM-DD");
     //  $scope.payment.datePayment = moment($scope.payment.datePayment).format("YYYY-MM-DD");
      // $scope.payment.datePayment =$scope.payment.datePayment ;
        $scope.payment.modePay = getModepay();
        $scope.payment.amount.payedAmount = $scope.amount;
        $scope.payment.code = student.code;
        $scope.payment.firstname = student.firstname;
        $scope.payment.lastname = student.lastname;
        $scope.payment._levelId = student._levelId;
        $scope.payment.class = student.class;
      

        

        var idTobePrinted = null;
        PaymentService.insertPayment($scope.payment).then(function(pmt) {
            //usr is undefined even it is succesfully updated..
            idTobePrinted = pmt._id; 
            return StudentService.upsertStudent(student);//next to other operation
        }, function(error) {
            alert('Impossible de procéder le paiment, detail : ' + error);
        }).then(function(usr) {

            
 var now = moment(new Date()).format("YYYY-MM-DD");
            //usr is undefined even it is succesfully updated..
       //     alert('operation terminé avec succès ');

           
            var fs = require('fs');
    var tax = PaymentService.tax();


            $state.go('printOne',{id: idTobePrinted});//go for printing!

        }, function(error) {
            alert("Impossible de mettre à jours l'eleve, detail : " + error);
        });

       resetScope();


    };
 



var idTobePrinted = null;

     $scope.factureTable=  function(student,cheque) {

  var i ;
  var radi;
        //init all variables
        resetScope();
        idTobePrinted = student._id ;
       var dok = document.getElementsByName("radiot");

        var len = dok.length;
      //  console.log("len" + len);  

    for (i=0;i<len;i++) {
      if(dok[i].checked){

       // console.log("bonjouuuuuuuuuuuuur" + dok[i].value);

        radi = dok[i].value ;
      }
    
     if(dok[i].checked){

       // console.log("bonjouuuuuuuuuuuuur" + dok[i].value);
         radi = dok[i].value ;
      }


      if(dok[i].checked){

      //  console.log("bonjouuuuuuuuuuuuur" + dok[i].value);
         radi = dok[i].value ;
      }


      if(dok[i].checked){

      //  console.log("bonjouuuuuuuuuuuuur" + dok[i].value);
         radi = dok[i].value ;
      }




    }



  window.localstorage = radi;
  $state.go('printOneFacture',{id: idTobePrinted});//go for printing! 


/*

  if(radi == "T0"){

  if (student.factures.t0 == false) {

   $state.go('printOneFacture',{id: idTobePrinted});//go for printing! 

  }else{

    window.alert("une facture est déja généré à cette élève pour cette trimestre");
  }

}


  if(radi == "T1"){

  if (student.factures.t1 == false) {

   $state.go('printOneFacture',{id: idTobePrinted});//go for printing! 

  }else{

    window.alert("une facture est déja généré à cette élève pour cette trimestre");
  }

}


  if(radi == "T2"){

  if (student.factures.t2 == false) {

   $state.go('printOneFacture',{id: idTobePrinted});//go for printing! 

  }else{

    window.alert("une facture est déja généré à cette élève pour cette trimestre");
  }

}


  if(radi == "T3"){

  if (student.factures.t3 == false) {

   $state.go('printOneFacture',{id: idTobePrinted});//go for printing! 

  }else{

    window.alert("une facture est déja généré à cette élève pour cette trimestre");
  }

}




// test non payé
/*
if (testpaye == 1) {

    $state.go('printOneFacture',{id: idTobePrinted});//go for printing! 

}else{

     window.alert("Cette facture n'est pas totalement payé pour cette trimestre");
}
*/
 
    };


$scope.toEditParam = numero2.value ;
     $scope.updateParam =  function(toEditParam) {
   //  console.log("OK !!" + toEditParam);
     PaymentService.UpdateIdFactureParam(toEditParam);

     };

});
//----------------------------------------------------------------------------------
paymentModule.controller('UpdatePaymentController', function(_, PaymentService, $state ,$rootScope, $scope, NgTableParams, $filter, $modal, ngTableParams, StudentService,levels , students, payments) {

$scope.getLevels = function () {
    var defer = $q.defer();
    LevelService.getAllLevels().then(function(lvs) {
    if(lvs)
        defer.resolve(lvs);  
    else
        defer.reject('erreur inconnue');
    });

    return defer.promise;
};

 $scope.tax = PaymentService.tax();




     var modalManagePayment = $modal({
        scope: $scope,
        backdrop: 'static',
        keyboard: false,
        controller: 'PaymentController',
        template: 'frontend/components/payment/views/payment.edit.html',
        show: false
    });

      $scope.removeCheque = function(cheque) {
        indexToBeDeleted = _.indexOf(_.pluck($scope.payment.amount.cheques, 'number'), cheque.number);
        $scope.payment.amount.cheques.splice(indexToBeDeleted, 1);
       // $scope.tableChequeParams.reload();
    }
   

      function getModepay() {
        if($scope.payment.amount.brutAmount!=0 && $scope.payment.amount.cheques.length==0){
            return "Espece";
        }
        if($scope.payment.amount.brutAmount!=0 && $scope.payment.amount.cheques.length!=0){
            return "paiement mixte";
        }
        if($scope.payment.amount.brutAmount==0 && $scope.payment.amount.cheques.length!=0){
            return "Cheques";
        }
        return "ModePay inconnu!";
    }
    
      $scope.addChequePayment = function(payment) {
       
       $scope.toAddCheque.firstname = $scope.payment.firstname ;
// console.log($scope.payment.firstname);
        $scope.toAddCheque.lastname = $scope.payment.lastname ;
// console.log($scope.payment.lastname);

        if($scope.toAddCheque.number>0&&$scope.toAddCheque.amount>0&& typeof $scope.toAddCheque.bank!="undefined"&& typeof $scope.toAddCheque.dateE!="undefined" ){
  var now = moment(new Date()).format("YYYY-MM-DD");
   if ($scope.toAddCheque.dateE == now) {

$scope.toAddCheque.optradio = "reçu";

   } else{

    $scope.toAddCheque.optradio = "Avoir non perçu";
   }       
           
 $scope.payment.amount.cheques.push($scope.toAddCheque);


            $scope.toAddCheque = {};
  //          $scope.tableChequeParams.reload();    
        }else{
            alert("Vérifiez vos données de cheque!");
        }
     }



     function calculateChequesAmount() {
        var chequeAmount = 0;

        $scope.payment.amount.cheques.forEach(function(cheque) {
            chequeAmount = chequeAmount + cheque.amount;
        });
        return chequeAmount;
    }


//       $scope.tableChequeParams = new NgTableParams({}, {
//        counts: [], //no pagination
//        dataset: $scope.payment.amount.cheques
//    });

 $scope.toAddCheque = {};

 function calculateEntredAmount() {
        return  (calculateChequesAmount() + $scope.payment.amount.brutAmount).valueOf().toFixed(1);
    }


   
    $scope.toDeletePayment = {};
    $scope.toEditPayment = {};
   
    $scope.toInserStudent = {};

    $scope.payments = payments;

    $scope.tableParamsPayment = new NgTableParams({}, {
        dataset: $scope.payments
    });

   

    

     function addAmount(payment) {

         toAddAmount = {};
       
      //  $scope.toAddAmount.payedAmount = $scope.payment.amount.payedAmount ;
        $scope.toAddCheque.brutAmount = payment.amount.brutAmount ;
        $scope.toAddCheque.cheques = payment.amount.cheques ;

        $scope.payment.amount.push($scope.toAddAmount);
      
     }



    $scope.updatePayment = function(payment) {

   //   var myJSON = angular.toJson(payment.currentPayedProd);
   //   payment.currentPayedProd = myJSON;

       console.log("TEST  1~~~~~~~~ :" + payment.currentPayedProd);
 
        $scope.payment.modePay = getModepay();

        PaymentService.upsertPayment(payment).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditPayment = {};
        });

    }
  

    $scope.deletePayment = function(payment) {

     var toDeletePayment= payment;
    
      function modStudent (toDeletePayment){
//           console.log("modStudent START .......");
        students.forEach(function(student) {
         // console.log("modStudent student" + student.firstname);

       if (toDeletePayment.firstname == student.firstname && toDeletePayment.lastname == student.lastname && toDeletePayment._levelId == student._levelId) {
              
  
              if (toDeletePayment.currentPayedProd.t0.length > 0) {
                 student.products.t0.s = false ;
                 student.products.t0.c = false ;
                 student.products.t0.g = false ;
                 student.products.t0.p = false ;
                 student.products.t0.a = false ;
                // student.timbre.t0 = false ;
                StudentService.upsertStudent(student);
              }
              if (toDeletePayment.currentPayedProd.t1.length > 0) {
                 student.products.t1.s = false ;
                 student.products.t1.c = false ;
                 student.products.t1.g = false ;
                 student.products.t1.p = false ;
                 student.products.t1.a = false ;
                // student.timbre.t1 = false ;
                StudentService.upsertStudent(student);
              }
              if (toDeletePayment.currentPayedProd.t2.length > 0) {
                 student.products.t2.s = false ;
                 student.products.t2.c = false ;
                 student.products.t2.g = false ;
                 student.products.t2.p = false ;
                 student.products.t2.a = false ;
               //  student.timbre.t2 = false ;
                StudentService.upsertStudent(student);
              }
              if (toDeletePayment.currentPayedProd.t3.length > 0) {
                 student.products.t3.s = false ;
                 student.products.t3.c = false ;
                 student.products.t3.g = false ;
                 student.products.t3.p = false ;
                 student.products.t3.a = false ;
               //  student.timbre.t3 = false ;
                StudentService.upsertStudent(student);
              }
         
      }
  });
}



   //  console.log("toDeletePayment.firstname : " + toDeletePayment.firstname);
        PaymentService.removePayment(payment).then(function(numDeleted) {

          //  modStudent (toDeletePayment);

          // student.factures.t0 = false ;
          //  StudentService.upsertStudent(student);

            indexToBeDeleted = _.indexOf(_.pluck($scope.payments, '_id'), payment._id);
            $scope.payments.splice(indexToBeDeleted, 1);
             modStudent (toDeletePayment);
            $scope.tableParamsPayment.reload();
            $scope.toDeletePayment = {};
        }, function(error) {
            alert('Impossible de supprimer ce payment, detail : ' + error);
        });
    }


     $rootScope.calculateAmountTTC = function(amount) {
        var amountttc = 0;
        var amountc = 0;
        amountc = (amount + (amount * $scope.tax/100));
        amountttc = amountc.toFixed(1);
        return amountttc;
    }



    $scope.loadEditedPayment = function(payment) {
   $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}, {_id:'topaze'}];
   $scope.levels = levels;
     //   $scope.toEditPayment = payment;
        $scope.payment = payment;
        $scope.amount = payment.amount.payedAmount;
        $scope.amountttc = $rootScope.calculateAmountTTC($scope.amount);

         $scope.entredAmount = calculateEntredAmount;

        modalManagePayment.$promise.then(modalManagePayment.show);
    }






    $scope.loadDeletedPayment = function(payment) {
        $scope.toDeletePayment = payment;
    }

    $scope.loadInsertedStudent = function() {
        $scope.toInserStudent = {};
    }

});