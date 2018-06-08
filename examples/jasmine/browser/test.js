describe('just a test', function () {
  it('test showName', function () {
    var a = 'ck';
    var exp = 'my name is ck';
    expect(exp).toEqual(showName(a));
  });
});