const curl = require('curl')
const url = require('url')

// curl.get("https://mama.dxy.net/user/logout",{},(err,res,body)=>{
//   // console.log('TCL: res', res.request.uri);
//   const urlObj= url.parse(res.request.uri.path,true)
//   console.log('TCL: query', urlObj.query);
// })

const getLoginToken = (callback)=>{
curl.get("https://mama.dxy.net/user/logout",{},(err,res,body)=>{
  console.log('TCL: getLoginToken -> res', res);
  // console.log('TCL: res', res.request.uri);
  const urlObj= url.parse(res.request.uri.path,true)
  // console.log('TCL: query', urlObj.query);
  const token = urlObj.query.token || null
  console.log('TCL: getLoginToken -> token', token);
  if(token){
    callback && callback(token)
  }
})
}

const ab = ()=>{
  curl.get("https://mama.dxy.net/japi/platform/200020999",{},(err,res,body)=>{
    // console.log('TCL: res', res.request.uri);
    if(!err){
      const bodyObj = JSON.parse(body)
      if(!bodyObj.results.loggedIn){
        getLoginToken((token)=>{
          console.log('TCL: token', token);
          
        })
      }
    }
  })
}


getLoginToken()