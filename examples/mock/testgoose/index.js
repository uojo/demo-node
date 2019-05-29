const testgoose = require('testgoose');

// Stub out the Mongoose Task model
const ts = testgoose.model.stub();
ts.static.findById.returns(null, { id: 1234, name: "fix gutters", priority: 4 });

// Call the Task model stub just like a real Mongoose model
ts.findById(1234, (err, task) => {
  // console.log('TCL: task', task);
});

ts.find().then(e=>{
console.log('TCL: e', e);
  
})

