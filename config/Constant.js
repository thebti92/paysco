var cst = angular.module('Const',[]);

var path = require("path");
//var current = path.resolve(path.dirname());
var current = process.execPath;
var dbUrl = path.join(current, '..','mydb');

//alert(process.execPath+" "+process.cwd()+" "+parent);
//alert('database url : '+dbUrl);
cst.constant('DB_URL', dbUrl);
/*cst.constant('DB_URL', './config/mydb');*/
