const fg = require('factory-girl');
const factory = fg.factory;
// 参考 https://github.com/aexmachina/factory-girl
// 参考 https://github.com/aexmachina/factory-girl/blob/master/docs/tutorial.md
class Image {
  constructor(attrs={}){
    this.id=""
    this.url = ""
    Object.assign(this,attrs)
  }
}
factory.define('image',Image,{
  id: factory.sequence('Image.id'),
})
// factory.build('image').then(e=>{
//   console.log('TCL: e', e); // {id:1, url:'}
// })
// factory.build('image',{title:'hello'}).then(e=>{
//   console.log('TCL: e', e); // { id: 1, url: '', title: 'hello' }
// })
// factory.attrs('image').then(postAttrs => {
//   console.log('TCL: postAttrs', postAttrs); // { id: 1 }
// });
factory.attrs('image', {title: 'Foo', content: 'Bar'}).then(postAttrs => {
  console.log('TCL: postAttrs', postAttrs); // { id: 1, title: 'Foo', content: 'Bar' }
});

class User {
  constructor(attrs={}){
    this.name = ""
    Object.assign(this,attrs)
  }
}
factory.define('user', User, {
  name:'apple',
  age: 10,
  // 值支持 function、promise
  payload:()=>('world'),
  // seq is an alias for sequence
  email: factory.seq('User.email', (n) => `user${n}@mail.com`),
  // use the chance(http://chancejs.com/) library to generate real-life like data
  about: factory.chance('sentence'),
  // 会将实例化的数据保存到 db 中
  // profileImage:factory.assoc('image','url')
}); 

// factory.create('user').then(e=>{
//   console.log('TCL: e', e);
// })

// factory.build('user').then(e=>{
//   console.log('TCL: e', e);
// })

// factory.buildMany('user',2).then(e=>{
//   console.log('TCL: e', e);
// })

