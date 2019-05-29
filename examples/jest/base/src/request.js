const axios = require('axios')

module.exports = function (options) {
  return axios(options)
  .then((e)=>{
    return e
  });
};