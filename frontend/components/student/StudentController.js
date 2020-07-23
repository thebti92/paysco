var studentModule = angular.module('module.student', []);

studentModule.controller('StudentController', function(_, $q,$state, $filter, levels, ngTableDefaults ,$rootScope, $scope, NgTableParams, Toolbar, LevelService, students, StudentService, numero11) {
    Toolbar.Window().maximize();

    $scope.levels = levels;
    $scope.classes = [{_id:'Jasmin'}, {_id:'Violette'}, {_id:'Rose'}, {_id:'Dahlia'}, {_id:'Lilas'}, {_id:'Lys'}, {_id:'Narcisse'}, {_id:'topaze'}, {_id:'A'}, {_id:'B'}, {_id:'C'}];
    // $scope.classes = ['Jasmin', 'Violette', 'Rose', 'Dahlia', 'Lilas', 'Lys', 'Narcisse'];

 
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


    $scope.toDeleteStudent = {};
    $scope.toEditStudent = {};
    $scope.toInserStudent = {};

    $scope.students = students;

    $scope.tableParams = new NgTableParams({}, {
        dataset: $scope.students
    });


    $scope.updateStudent = function(student) {
        StudentService.upsertStudent(student).then(function(usr) {
            //usr is undefined even it is succesfully updated..
            $scope.toEditStudent = {};
        });
    }
    var idTobePrinted = null;
    $scope.insertStudent = function(student) {
        indexToBeRetrieved = _.indexOf(_.pluck($scope.levels, '_id'), student._levelId);
        student.price = $scope.levels[indexToBeRetrieved].price;

        student.products = {
          
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

        
         /*
          student.factures = {
          
           t0: false,
           t1: false,
           t2: false,
           t3: false,
        };
        
        student.timbre = {
          
           t0: false,
           t1: false,
           t2: false,
           t3: false,
        };
        */
        



      

     StudentService.upsertStudent(student).then(function(std) {

            $scope.students.push(std);
            $scope.tableParams.reload();
            $scope.toInserStudent = {};
            idTobePrinted = student._id ;
        }, function(error) {
            alert('Impossible de créer cet Eleve, detail : ' + error);
        })
      
      console.log("inteeeeer"+ idTobePrinted);
      $state.go('printOneStudentF',{id: idTobePrinted});//go for printing! 
   
    
    }

    $scope.deleteStudent = function(student) {
        StudentService.removeStudent(student).then(function(numDeleted) {
            indexToBeDeleted = _.indexOf(_.pluck($scope.students, '_id'), student._id);
            $scope.students.splice(indexToBeDeleted, 1);
            $scope.tableParams.reload();
            $scope.toDeleteStudent = {};
        }, function(error) {
            alert('Impossible de supprimer cet Eleve, detail : ' + error);
        });
    }

    $scope.loadEditedStudent = function(student) {
        $scope.toEditStudent = student;
    }
    $scope.loadDeletedStudent = function(student) {
        $scope.toDeleteStudent = student;

    }
    $scope.loadInsertedStudent = function() {
       
        $scope.toInserStudent = {};
        $scope.vk = StudentService.UpdateCode();
        $scope.toInserStudent.code = "000" +numero11.code;
        
        
         

    }


    //unpayed 
    $scope.checkedTrimester = '';



// ============================================================
  var idTobePrinted = null;
  


 
$scope.filterTable2=  function(student) {

   var trimestre ;
   var tranch ;
 
 //var trimestre ;
 trimestre = $scope.checkedTrimester ;

 //  console.log(trimestre);

if (trimestre == "t0") {tranch = "1er tranche"}

    else if(trimestre == "t1"){ tranch = "2 éme tranche" }

        else if(trimestre == "t2"){tranch = "3 éme tranche"}

            else if(trimestre == "t3"){tranch = "4 éme tranche"}
 // console.log(tranch);

$scope.tranche = tranch ;




 





         //   idTobePrinted = student._id ;    
          
          //  console.log("traitement commence" + idTobePrinted); 
            $state.go('printOneStudentF',{id: idTobePrinted});//go for printing!  
            
         //   console.log("traitement fini");
           
    };


    


    $scope.tableParamsUnpayed = new NgTableParams({
        count: $scope.students.length
    }, {
        getData: getData
    });

    function getData(params) {

       var   filtredData    = $filter('filter')($scope.students, params.filter());
             filtredData    = $filter('orderBy')(filtredData, params.orderBy());
       var filtredData2 = [];         
        if($scope.checkedTrimester!=''){ 
            filtredData.forEach(function(student) {
                //Window.alert(checkedTrimester);

                if(student.products[$scope.checkedTrimester].s==false){
               //   console.log("ABC" + $scope.checkedTrimester);
                    filtredData2.push(student);
                }
            })
        }
        
       return filtredData2;
    }

    $scope.filterTable =  function(){
            $scope.tableParamsUnpayed.reload();
    };

  
        var filename = "student.csv";
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

    csv.push(" Classe;Niveau ;Code ;Nom ;Prenom");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        //console.log("row :_" + row);
          //.innerText
        
        csv.push(row.join(";"));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
//    console.log("csv:_" + csv);

    }


});








