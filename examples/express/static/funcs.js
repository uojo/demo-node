function add1(val) {
  let a = val + 0
  if(!a)throw new Error('fail!')
  return a + 1
}

function add2(val) {
  let a = val + 1
  return a + 1
}

function add3 (v0){
  let v1
  try{
    v1 = add1(v0)
  }catch(err){
    v1 = 1
  }
	let v2 = add2(v1)
  console.log('TCL: v2', v2)
  return v2
}

function try1(){
	try{
		add3(0)
	}catch(err){
 		console.log('TCL: }catch -> err', err);
	}
}


function domAppend(dom){
  dom.innerHTML = "<p>Hello</p>"
}

function domAttrModifiy(dom){
  dom.title = 'hello'
}

function handle_dom_1(){
  const tdom1 = document.getElementById("tdom1")
  domAppend(tdom1)
  domAttrModifiy(tdom1)
}

function handle_xhr_1(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'json';
  
  xhr.onload = function() {
    console.log(xhr.response);
  };
  
  xhr.onerror = function() {
    console.log("Oops, error");
  };
  
  xhr.send();
}

function handle_fetch_1(url) {
  fetch(url).then(function(response) {
    console.log('TCL: response', response);
    return response.json();
  }).then(function(data) {
    console.log(data);
  }).catch(function(err) {
    console.log("Oops, error",err);
  });
}