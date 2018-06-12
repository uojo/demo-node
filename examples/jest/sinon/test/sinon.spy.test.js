import sinon from 'sinon'
import data from '../src/data'
import log from '../src/log'

describe('sinon > spy', () => {
  let spy
  beforeEach(() => {
    spy = sinon.spy()
  })
  afterEach(function () {
    // spy.resetHistory()
  })

  it('spy > called', () => {
    // 执行传入的函数
    data.callback(spy)
    sinon.assert.called(spy)
  })

  it('spy > calledWith', () => {
    spy(data.b)
    expect(spy.called).toBe(true)
    sinon.assert.calledWith(spy, data.b)
  })

  it('spy > sinon.spy(fn) > fn()', () => {
    expect(spy.called).toBe(false)
    let spy1 = sinon.spy(data.returnInput)
    data.returnInput(data.c)
    // 原方法执行与 spy 不相关，spy 获取不到任何数据
    expect(spy1.called).toBe(false)
    expect(spy1.returned(data.c)).toBe(false)
    expect(spy1.args.length).toBe(0)
  })

  it('spy > sinon.spy(fn) > spy()', () => {
    let spy1 = sinon.spy(data.returnInput)
    spy1(data.c)
    // 被执行过
    expect(spy1.called).toBe(true)
    // 是否返回指定值
    expect(spy1.returned(data.c)).toBe(true)
    // 获取返回值
    expect(spy1.returnValues[0]).toBe(data.c)
    // 执行时的参数
    expect(spy1.args[0][0]).toBe(data.c)
  })

  it('spy > sinon.spy(object, "method")', () => {
    let spy1 = sinon.spy(data, 'fn1')
    data.fn1()
    // 被执行
    expect(spy1.called).toBe(true)
    // 监听者和原函数是关联的
    expect(data.fn1.called).toBe(true)

    data.fn1(data.a)
    data.fn1(data.b)
    // 被执行次数
    expect(data.fn1.callCount).toBe(3)

    // log(data.fn1.thisValues)
    // expect(data.fn1.thisValues[0]).toBe(obj)
    // 第一次执行时的参数
    expect(data.fn1.firstCall.args.length).toBe(0)
    // 第二次执行时的参数
    expect(data.fn1.secondCall.args[0]).toBe(data.a)
    // 第三次执行时的参数
    expect(data.fn1.thirdCall.calledWith(data.b)).toBe(true)
    // spy1.restore()
    // spy1.reset()
    // spy1.resetHistory()
  })
})
