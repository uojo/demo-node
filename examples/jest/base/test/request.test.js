const request = require('../src/request')
const axios = require('axios')

// jest.mock('axios',()=>{
//   return (res)=>Promise.resolve(1)
// })

// jest.mock('axios',()=>{
//   return jest.fn((res)=>Promise.resolve(1))
// })

// const fn1 = jest.fn().mockImplementation(res => {
//   return Promise.resolve({data:1});
// });
// jest.doMock("axios",() => {return fn1;});

jest.mock('axios',(e)=>{
  return jest.fn((res)=>{
    console.log('res: ', res);
    return Promise.resolve(1)
  })
})

test('mock module', () => {

  const reqOps = {
    method:'get',
    url:'xxx',
    data:{
      name:123
    }
  }

  request(reqOps)
  expect(axios).toBeCalled();
  // expect(axios).toBeCalledWith(expect.objectContaining({method:'get'}));
});