const td = require('throttle-debounce');
 
const fn1 = td.throttle(100, true, () => {
  console.log('Throttled function');
});
 
// debounce(300, () => {
// });

for(let i=0;i<5;i++){
  fn1()
}
