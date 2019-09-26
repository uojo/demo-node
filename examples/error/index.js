var TypedError=require("error/typed");
var WrappedError=require("error/wrapped");
const err0 = new Error('hello')

var ServerError = TypedError({
  type: 'server.5xx',
  message: '{title} server error, status={statusCode}',
  title: null,
  statusCode: null
});

var error = ServerError({
  title:'some title',
  statusCode: 500
});
console.log('TCL: error', error.type, err0.type);

var ServerListenError = WrappedError({
  message: 'server: {causeMessage}',
  type: 'server.listen-failed',
  a: null,
});


// console.log('TCL: err0', err0);

const err1 = ServerListenError(err0,{
  a:1
})

// console.log('TCL: err1', err1);
