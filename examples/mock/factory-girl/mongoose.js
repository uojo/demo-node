const fg = require('factory-girl');
const mongoose = require('mongoose')
const factory = fg.factory;
const adapter = new fg.MongooseAdapter()

mongoose.connect("mongodb://localhost:27017/test",{useNewUrlParser: true})
.then(e=>{
// main-start

// #email
const Email = mongoose.model('Email', new mongoose.Schema({
  subject: String,
  // 与表 thread 的关联，类型为 ObjectId
  thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread' },
}));

// 定义
factory.define('email', Email, {
  subject: "hello",
  // 没有在原型内定义的对象，不会在生成出现
  desc: 'ttt',
  // 在 thread 表生成记录，并将 _id 属性赋值给 thread 字段，在 create 时可以，附一个 thread 表中已有的记录的 _id
  thread: factory.assoc('thread', '_id'),
});

// 创建一条记录并保存到 db
// factory.create('email').then(e=>{
//   console.log('TCL: e', e);
// })

// 创建一条记录，但不保存到 db
// factory.buildMany('email',3).then(e=>{
//   console.log('TCL: e', e);
// })

// #thread
const Thread = mongoose.model('Thread', new mongoose.Schema({}));
factory.define('thread', Thread, {});

// let thread;
// factory.create('thread')
// .then(created => (thread = created))
// .then(() => factory.create('email', { thread: thread._id }))
// .then(email => (email.thread === thread._id ))
// .then(e=>{
//   console.log('TCL: e', e); // true
// })
factory.build('thread').then(e=>{
console.log('TCL: e', e); // {_id: 5cefb6597ddc485abe46bd9b}
  
})


// #kitten
// const kittySchema = mongoose.Schema({
//   name: String,
// });
// const Kitten = mongoose.model('Kitten', kittySchema);
// const kitten = adapter.build(Kitten, { name: 'smellyCat' });
// // console.log('TCL: kitten', kitten);
// adapter.save(kitten,Kitten).then(()=>{
//   return Kitten.count()
// }).then(count=>{
//   console.log('TCL: count', count); // 1
// })

// main-end
},
err=>{
console.log('TCL: err', err);
  
})



