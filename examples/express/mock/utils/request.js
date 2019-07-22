import mockRequest from './mockRequest';

/**
 * 公共请求方法
 * @param originApi API 配置
 * @param data 参数
 * @param header 请求头
 * @param showLoading 请求加载loading 默认false
 * @param noWarning 不显示警告, 默认false
 * @param rawData 返回原生数据，否则直接获取results结果
 * @param needHeader 返回内容包含header信息
 */
export const request = async (originApi = {}, data, header, showLoading, noWarning, rawData = false, needHeader = false) => {
  // ...
  return Promise.resolve(res.data)
  // return Promise.reject(res.data);
};

/**
 * 使用参看 createService
 * @param {Object} api
 */
export const createMockService = (api) => {
  // eslint-disable-next-line no-param-reassign
  api.onRequest = apiInfo => new Promise(async (resolve) => {
    mockRequest(apiInfo)
      .then((rlt) => {
        resolve(rlt);
      })
      .catch(async () => {
        // 当 mock 数据获取失败

        const res = await wxRequestPromise(api);
        resolve(res);
      });
  });
  return request.bind(null, api);
};