/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 * @description 串行接口，即 api_2 依赖 api_1，且 api_3 也依赖 api_1
 */

const api_1_response = {
  success: true,
  results: [{ id: 1, name: 'color', aid: 1, bid: 1 }],
};

const api_2_response = {
  success: true,
  results: [{ id: 1, name: 'green' }],
};

const api_3_response = {
  success: true,
  results: [{ id: 1, name: 'blue' }],
};

const api_12_13_response = {
  success: true,
  results: [
    {
      id: 1,
      name: 'color',
      aid: 1,
      api_2: { id: 1, name: 'green' },
      api_3: { id: 1, name: 'blue' },
    },
  ],
};

const api_12_13_config = [
  {
    apiId: '1',
    name: 'name1',
    method: 'get',
    data: {
      pageNo: 1,
      pageSize: 10,
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
      sourcePath: '$response.results.$items',
      sourceMapCondition: '#sourceMapPath.id==#name1.$response.results.$items.aid',
      sourceFields: ['id', 'name'],
      targetPath: '#name1.$response.results.$items',
      targetField: 'api_2',
    },
  },
  {
    apiId: '3',
    name: 'name3',
    method: 'get',
    data: {
      ids: '#name1.$response.results.$items.bid',
    },
    prependInfo: {
      sourcePath: '$response.results.$items',
      sourceMapCondition: '#sourceMapPath.id==#name1.$response.results.$items.bid',
      sourceFields: ['id', 'name'],
      targetPath: '#name1.$response.results.$items',
      targetField: 'api_2',
    },
  },
];
