const {
  MongoMemoryServer
} = require('mongodb-memory-server')
const testData = require('./testData.json')
const models = require('./models')

const mongod = new MongoMemoryServer();

const main = async () => {
  const uri = await mongod.getConnectionString();
  // console.log('TCL: uri', uri);
  const ut = models(uri)
  console.log('TCL: main -> ut', ut.User);

  await ut.User.create({
    name: 'aaa'
  })
  
  ut.User.find()
    .then(users => {
      console.log('TCL: users', users);

    })
}

main()
