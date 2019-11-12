/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 * @description 串行接口，即 api_2 依赖 api_1
 */

const api_1_response = {
  success: true,
  results: { id: 1, name: 'color', aid: 1 },
};

const api_2_response = {
  success: true,
  results: { id: 1, name: 'green' },
};

const api_12_response = {
  success: true,
  results: {
    id: 1,
    name_2: 'red',
    aid: 1,
    api_2: { id: 1, name: 'green' },
  },
};

const api_12_config_by_source = [
  {
    apiId: '1',
    name: 'name1',
    method: 'get',
    data: {
      pageNo: '$payload.pageNo',
      pageSize: '$pageload.pageSize',
    },
  },
  {
    apiId: '2',
    name: 'name2',
    method: 'get',
    data: {
      ids: '#name1.$response.results.$items.aid',
    },
    prependInfo: {
      // source 描述的是从自身接口返回值中，挑选挂载数据。所以 sourcePath 一定要以自身开头 #name
      sourcePath: '#name2.$response.results',
      sourceProperties: ['id', 'name'],
      // target 描述的是挂载到哪，非自身。
      targetPath: '#name1.results',
      targetField: 'api_2',
    },
  },
];

const api_12_config_by_target = [
  {
    apiId: '1',
    name: 'name1',
    method: 'get',
    data: {
      pageNo: '$payload.pageNo',
      pageSize: '$pageload.pageSize',
    },
  },
  {
    apiId: '2',
    name: 'name2',
    method: 'get',
    data: {
      ids: '#name1.$response.results.$items.aid',
    },
    prependInfo: {
      // 挂载到目标对象的路径
      targetPath: '#name1.results',
      // 挂载到目标路径上的字段，如果该字段不存在将会创建，反之覆盖。
      targetField: 'api_2',
      // sourcePath 描述的是当前接口返回值内的数据路径，所以必须以自己的 #name 开头。
      sourcePath: '#name2.$response.results',
      sourceProperties: ['id', 'name'],
    },
  },
];

const api_12_config_by_schema = {
  apis: [
    {
      apiId: '1',
      name: 'name1',
      method: 'get',
      data: {
        id: '$payload.id',
      },
    },
    {
      apiId: '2',
      name: 'name2',
      method: 'get',
      data: {
        ids: '#name1.$response.results.aid',
      },
    },
  ],
  response: [
    {
      // path 字段的默认值是 $response，即最终返回对象的根。
      path: '$response',
      allOf: '#name1.$response',
    },
    {
      path: '$response.results.$items.api_2',
      allOf: '#name2.$response.results',
    },
  ],
};
