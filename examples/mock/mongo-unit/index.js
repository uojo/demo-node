const mongoUnit = require('mongo-unit')
const testData = require('./testData.json')
const models = require('./models')

const m = mongoUnit.start()
console.log('TCL: m', m);


m.then(url => {
  console.log('TCL: url', url);
  const ut = models(url)
  mongoUnit.load(testData);

  ut.User.create({name:'aaa'})
  ut.User.find().limit(1)
    .then(users => {
      console.log('TCL: users', users);

    })
    
})