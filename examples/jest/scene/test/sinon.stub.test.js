import sinon from 'sinon'
import data from '../src/data'
import log from '../src/log'

describe('sinon > stub', () => {
  let stub1

  beforeEach(() => {
    stub1 = sinon.stub()
  })

  afterEach(function () {
    stub1.reset()
  })

  it('stub > withArgs', () => {
    // 参数与返回值的设定
    stub1.withArgs('number').returns(data.a)
    expect(stub1('number')).toBe(data.a)

    // ?
    // stub1.withArgs('error').throws('name', 'abc')
    // expect(stub1('error')).toThrowError('abc')

    expect(stub1.called).toBe(true)
  })

  it('stub > promise.resolve', (done) => {
    stub1.withArgs('promise.resolve').returns(Promise.resolve(data.a))
    stub1('promise.resolve').then((e) => {
      expect(e).toBe(data.a)
      done()
    })
  })

  it('stub > promise.reject', (done) => {
    stub1.withArgs('promise.reject').returns(Promise.reject(data.a))
    stub1('promise.reject').catch((e) => {
      expect(e).toBe(data.a)
      done()
    })
  })

  it('stub > resolve', (done) => {
    stub1.withArgs('resolve').resolves(data.a)
    stub1('resolve').then((e) => {
      expect(e).toBe(data.a)
      done()
    }, (e) => {

    })
  })

  it('stub > reject', (done) => {
    stub1.withArgs('reject').rejects(data.a)
    stub1('reject').then((e) => {
    }, (e) => {
      expect(e).toBe(data.a)
      done()
    })
  })

  it('stub > callsFake', () => {
    // 原方法返回
    expect(data.returnInput(data.a)).toBe(data.a)
    const cf = () => {
      return data.b
    }
    // stub包裹后，fake 返回
    let stub = sinon.stub(data, 'returnInput').callsFake(cf)
    expect(data.returnInput(data.a)).toBe(data.b)
    stub.restore()
  })

  it('stub > callsFake,callThrough', () => {
    // 原方法返回
    expect(data.returnInput(data.a)).toBe(data.a)
    const cf = () => {
      return data.c
    }

    let stub = sinon.stub(data, 'returnInput')
    data.returnInput.callsFake(cf)
    data.returnInput.callThrough()
    expect(data.returnInput(data.a)).toBe(data.c)
    stub.restore()
  })

  it('stub > yieldsTo', () => {
    sinon.stub(data, 'callbackByOps')
    data.callbackByOps.yieldsTo('s3', [data.a])
    const ops = {
      s2: (e) => {
        log('s2', e)
        return e
      },
      s3: (e) => {
        log('s3', e)
        return e
      }
    }
    data.callbackByOps(ops)
    // expect(r1[0]).toBe(data.a)
    data.callbackByOps.restore()
  })

  it('stub > yieldTo', () => {
    let stub = sinon.stub()
    stub({
      s2: (e) => {
        log('s2', e)
        return e
      },
      s3: (e) => {
        log('s3', e)
        return e
      }
    })
    stub.yieldTo('s3', data.b)
  })

  it('stub > callsArg,callsArgWith 忽略原方法的上下文', () => {
    // 正常方法执行
    let r1 = data.callback(data.returnInput)
    expect(r1).toBe('callback')

    // 仅执行某个函数参数，忽略上下文
    let stub2 = sinon.stub(data, 'callback').callsArg(0)
    let r2 = data.callback(data.returnInput)
    expect(r2).toBe(undefined)
    stub2.restore()

    sinon.stub(data, 'fn2').callsArgWith(2, 10).returns(3)
    expect(data.fn2(1, 2, data.returnInput)).toBe(3)
  })

  // context ?
  it('stub > callsArgOn', () => {
    // 正常方法执行
    let r1 = data.callback(data.returnInput)
    expect(r1).toBe('callback')

    // 仅执行某个函数参数
    sinon.stub(data, 'callback').callsArgOn(0, 11)
    let r2 = data.callback(data.returnInput)
    expect(r2).toBe(undefined)
  })
})