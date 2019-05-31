const fg = require('factory-girl');
const DummyModel = require('./DummyModel')
const factory = fg.factory;

factory.define('user', DummyModel, {
  abc: 10,
  // seq is an alias for sequence
  email: factory.seq('User.email', (n) => `user${n}@mail.com`),

  // use the chance(http://chancejs.com/) library to generate real-life like data
  about: factory.chance('sentence'),

}); 

// factory.create('user').then(e=>{
//   console.log('TCL: e', e);
// })

factory.build('user').then(e=>{
  console.log('TCL: e', e);
})

// factory.buildMany('user',2).then(e=>{
//   console.log('TCL: e', e);
// })