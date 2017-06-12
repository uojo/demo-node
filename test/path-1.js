var path = require("path");

var p1="a/b/c";
var p2="a\\b\\c\\d";
var p3="a\b\c\d";

var r1 = path.normalize(p1),
	r2 = path.normalize(p2)

console.log( 1, p1, r1 )
console.log( 2, p2, r2 )
console.log( 3, r1==p2 )

var rxp1= new RegExp(r1);

console.log( 4, p2.search(rxp1) )
console.log( 5, p1.split("/")  )
console.log( 6, p2.split( path.sep )  )
