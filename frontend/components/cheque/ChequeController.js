var chequeModule = angular.module('module.cheque', []);


chequeModule.controller('ChequeController', function(_, $q, $modal, $filter, $scope, NgTableParams, PaymentService, StudentService, payments) {

  $scope.now =  moment(new Date()).format("YYYY-MM-DD");  
    $scope.search = {
        dateDebutCheque: $scope.now,
        dateFinCheque : $scope.now
    }


          payments.forEach(function(payment){  
               payment.amount.cheques.forEach(function(cheque) {

            var now = moment(new Date()).format("YYYY-MM-DD");

            if (cheque.optradio === "Avoir non perçu") {
         

              if (cheque.dateE <= now ) {

             cheque.optradio = "reçu" ;



                 }
                }


              });
           }); 








 $scope.filterTable =  function(){
            
    $scope.cheques = [];
    $scope.total = 0;
    $scope.rtotal = 0;
    
    

    $scope.dateDebutCheque =$scope.search.dateDebutCheque ;
    $scope.dateFinCheque = $scope.search.dateFinCheque ;
   
/*
      $scope.addSection = function() {
        var firstname = $scope.cheques.length+1;
        $scope.cheques.push({lastname});
      }

       $scope.addSection = function() {
        var lastname = $scope.cheques.length+1;
        $scope.cheques.push({firstname});
      }
    */
    
    var now = moment(new Date()).format("YYYY-MM-DD");

            if((typeof $scope.search.dateDebutCheque== "undefined")&&(typeof $scope.search.dateFinPayment=="undefined")){
   
          window.alert("la date n'est pas définie");
       }
    

    payments.forEach(function(payment){
        payment.amount.cheques.forEach(function(cheque){

       
            if (cheque.dateE>=$scope.search.dateDebutCheque&&cheque.dateE<=$scope.dateFinCheque) {
          //     window.alert(cheque.firstname);
              $scope.total =  ($scope.total + cheque.amount);
              $scope.cheques.push(cheque);
           } 
  if (cheque.dateE<=now&& cheque.dateE >=$scope.search.dateDebutCheque) {

 $scope.rtotal =  ($scope.rtotal + cheque.amount);
 
  }


        });
    }); 

         

    $scope.tableParams = new NgTableParams({
        count: $scope.cheques.length
    }, {
        dataset: $scope.cheques
    });
    

         
                 $scope.tableParams.reload();

    }

    //Object {number: 6565, amount: 40, bank: "jjjj", dateE: "2015-10-25"}
  

/*
  $scope.updatedCheque = function() {
  payments.forEach(function(pay){
     pay.amount.cheques.forEach(function(cheque){

    var now = moment(new Date()).format("YYYY-MM-DD");

         if(cheque.dateE>=now){
       
        $scope.updatedCheque.firstname = cheque.firstname ;
        $scope.updatedCheque.lastname = cheque.lastname ;
        
        $scope.updatedCheque.number = cheque.number ;
         
        $scope.updatedCheque.amount = cheque.amount ;
        $scope.updatedCheque.bank = cheque.bank ;
         
        $scope.updatedCheque.dateE= cheque.dateE ;
        $scope.updatedCheque.optradio = "reçu";

      //  console.log($scope.updatedCheque.optradio);
            
        $scope.tableParams.reload();  

        }  
        
   })
 });

    }

 */

});

