app.config(function($stateProvider, $urlRouterProvider,$locationProvider) {
//do not use html5 mode!
$urlRouterProvider.otherwise('/login');
    $stateProvider
                .state('login', {
                                      url: '/login',
                                      templateUrl: 'frontend/common/login/views/login.html',
																			controller: 'LoginController',
                                      resolve: {
                                        $title: function() { 
                                          return 'Connexion'; 
                                        }
                                      }
                                })
                $stateProvider
                    .state('manage', {
                        abstract: true,
                        templateUrl: 'manage.html',
                        url: '/manage'
                     })

                .state('manage.level', {
                                      url: '/level',
                                      templateUrl: 'frontend/components/level/views/level.html',
																			controller: 'LevelController',
                                      resolve: {
                                           levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvs) {
                                                   defer.resolve(lvs);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer Niveaux'; 
                                              }
                                       }
                                })


                  .state('manage.param', {
                                      url: '/parametre',
                                      templateUrl: 'frontend/components/payment/views/param.html',
                                      controller: 'PaymentController',
                                      resolve: {

                                          numero2: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getNumFacture().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                         payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           
                                           $title: function() { 
                                                return 'Prametre'; 
                                              }
                                       }
                                })


                .state('manage.student', {
                                      url: '/student',
                                      templateUrl: 'frontend/components/student/views/student.html',
                                      controller: 'StudentController',
                                      resolve: {
                                         numero11: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getCode().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            $title: function() { 
                                                return 'Ajouter Eleves'; 
                                              }
                                       }
                                })
                .state('manage.user', {
                                      url: '/user',
                                      templateUrl: 'frontend/common/user/views/user.html',
                											controller: 'UserController',
                                             resolve: {
                                               users: function (UserService, $q) {
                                                   var defer = $q.defer();
                                                  
                                                   UserService.getAllUsers().then(function(users) {
                                                       defer.resolve(users);
                                                   });
                                                  
                                                   return defer.promise;
                                                 },
                                               $title: function() { 
                                                return 'Gerer Utilisateurs'; 
                                                }
                                              }
                                })



                .state('manage.payment', {
                                      url: '/payment',
                                      templateUrl: 'frontend/components/payment/views/payment.html',
                                      controller: 'PaymentController',
                                      resolve: {
                                           numero2: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getNumFacture().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },

                                               payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer les Paiments'; 
                                              }
                                       }

                                })



                   .state('manage.invoice', {
                                      url: '/invoice',
                                      templateUrl: 'frontend/components/invoice/views/invoice.html',
                                      controller: 'InvoiceController',
                                      resolve: {
                                           factures: function (InvoiceService, $q) {
                                               var defer = $q.defer();
                                              
                                               InvoiceService.getAllFactures().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer les facture'; 
                                              }
                                       }

                                })
                  .state('manage.history', {
                                      url: '/history',
                                      templateUrl: 'frontend/components/history/views/history.html',
                                      controller: 'HistoryController',
                                      resolve: {
                                           payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer les Historiques'; 
                                              }
                                       }

                                })   
                                 .state('manage.daily', {
                                      url: '/daily',
                                      templateUrl: 'frontend/components/daily/views/daily.html',
                                      controller: 'DailyController',
                                      resolve: {
                                           payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Journal des paiments'; 
                                              }
                                       }

                                })

                             .state('manage.cheque', {
                                      url: '/cheque',
                                      templateUrl: 'frontend/components/cheque/views/cheque.html',
                                      controller: 'ChequeController',
                                      resolve: {
                                           payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           $title: function() { 
                                                return 'Gerer cheques'; 
                                              }
                                       }

                                })

                      .state('manage.manageStudent', {
                                      url: '/manageStudent',
                                      templateUrl: 'frontend/components/student/views/student.manage.html',
                                      controller: 'StudentController',
                                      resolve: {
                                            numero11: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getCode().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },

                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            $title: function() { 
                                                return 'Gerer Eleves'; 
                                              }
                                       }

                                })


                      .state('manage.managePayment', {
                                      url: '/managePayment',
                                      templateUrl: 'frontend/components/payment/views/payment.manage.html',
                                      controller: 'UpdatePaymentController',
                                      resolve: {
                                        numero2: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getNumFacture().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },

                                           

                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            $title: function() { 
                                                return 'Gerer Payment'; 
                                              }
                                       }

                                })


                  .state('manage.unpayed', {
                                      url: '/unpayed',
                                      templateUrl: 'frontend/components/student/views/student.unpayed.html',
                                      controller: 'StudentController',
                                      resolve: {

                                            numero11: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getCode().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           students: function (StudentService, $q) {
                                               var defer = $q.defer();
                                              
                                               StudentService.getAllStudents().then(function (sts) {
                                                   defer.resolve(sts);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            $title: function() { 
                                                return 'Gerer les Eleves Impayés'; 
                                              }
                                       }

                                })

                                     .state('printOne', {
                                      url: '/printone/:id',
                                      templateUrl: 'frontend/components/payment/views/payment.one.print.html',
																			controller: 'HistoryPrinterController',
                                      resolve: {

 
                                           

                                           payment: function (PaymentService, $q, $stateParams) {
                                               var defer = $q.defer();
                                               PaymentService.getPaymentById($stateParams.id).then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                          
                                               return defer.promise;
                                           },

                                           numero: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getNumFacture().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                             
                                            
                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;

                                           },



                                           $title: function() { 
                                                return 'Impression'; 
                                              }
                                       }
                                })







                           .state('printOneFacture', {
                                      url: '/printoneFacture/:id',
                                      templateUrl: 'frontend/components/payment/views/facture.one.print.html',
                                      controller: 'FactureController',
                                  resolve: {
 
                                           payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },

                                           numero: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getNumFacture().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve daily route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },


                                               student : function (StudentService, $q, $stateParams) {
                                               var defer = $q.defer();
                                               StudentService.getStudentById($stateParams.id).then(function (stds) {
                                                   defer.resolve(stds);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },

                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                         


                                           $title: function() { 
                                                return 'Impression facture'; 
                                              }
                                       }

                                })



                                     .state('printOneStudentF', {
                                      url: '/printoneStudentF/:id',
                                      templateUrl: 'frontend/components/student/views/student.print.html',
                                      controller: 'HistoryPrinterController3',
                                  resolve: {

                                                $title: function() { 
                                                return 'Impression fiche élève'; 
                                              }
                                       }

                                })
 

                                       .state('printoneInvoice', {
                                      url: '/printoneInvoice/:id',
                                      templateUrl: 'frontend/components/invoice/views/invoice.detail.html',
                                      controller: 'InvoicePrinterController',
                                      resolve: {


                                          payments: function (PaymentService, $q) {
                                               var defer = $q.defer();
                                              
                                               PaymentService.getAllPayments().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           /*

                                            factures: function (InvoiceService, $q) {
                                               var defer = $q.defer();
                                              
                                               InvoiceService.getAllFactures().then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },
                                           */

                                           facture: function (InvoiceService, $q, $stateParams) {
                                               var defer = $q.defer();
                                               InvoiceService.getFactureById($stateParams.id).then(function (stsm) {
                                                   defer.resolve(stsm);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                          
                                               return defer.promise;
                                           },

                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;
                                           },
                                            
                                           $title: function() { 
                                                return 'Impression'; 
                                              }
                                       }
                                })











                                      .state('printOneStudent', {
                                      url: '/printoneStudent/:id',
                                      templateUrl: 'frontend/components/student/views/upayed.one.print.html',
                                      controller: 'HistoryPrinterController2',
                                     resolve: {
                                        payment: function (PaymentService, $q, $stateParams) {
                                               var defer = $q.defer();
                                               PaymentService.getPaymentById($stateParams.id).then(function (sts) {
                                                   defer.resolve(sts);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                          
                                               return defer.promise;
                                           },

                                          student: function (StudentService, $q, $stateParams) {
                                               var defer = $q.defer();
                                               StudentService.getStudentById($stateParams.id).then(function (stds) {
                                                   defer.resolve(stds);
                                               },function(error){
                                                   alert('failed to resolve history route :  '+error);
                                               });
                                              
                                               return defer.promise;
                                           },




                                            levels: function (LevelService, $q) {
                                               var defer = $q.defer();
                                              
                                               LevelService.getAllLevels().then(function (lvl) {
                                                   defer.resolve(lvl);
                                               });
                                              
                                               return defer.promise;

                                              
                                           },
                                            
                                           $title: function() { 
                                                return 'Impression'; 
                                              }
                                       }
                    
                                    
                                })



});
