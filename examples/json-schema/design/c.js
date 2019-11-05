const responseSchema = {
  // 假设 A与B接口都是对象，将B接口的返回值覆盖给A接口的返回值
  responseSchema1: `$api1<$api2`,
  // 重新设计返回值结构
  responseSchema2: `{
    success:$api1.success,
    results:[$api1.results.$$item],
  }`,
  // 重新设计返回值结构，列表项数据被覆盖
  responseSchema3: `{
    success:$api1.success,
    results:[$api1.results.$$item<{uid:$api2.results.$$item.id}],
  }`,
} 