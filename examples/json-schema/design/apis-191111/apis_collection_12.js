/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 * @description 串行接口，即 api_2 依赖 api_1
 */

const api_1_response = {
  success: true,
  results: [{ id: 1, name: 'color', aid: 1 }],
};

const api_2_response = {
  success: true,
  results: [{ id: 1, name: 'green' }],
};

const api_12_response = {
  success: true,
  results: [
    {
      id: 1,
      name_2: 'red',
      aid: 1,
      api_2: { id: 1, name: 'green' },
    },
  ],
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
      // sourcePath 描述的是当前接口返回值内的数据路径，所以必须以自己的 #name 开头。
      sourcePath: '#name2.$response.results.$items',
      sourceMapCondition: '#sourcePath.id==#name1.$response.results.$items.aid',
      sourceProperties: ['id', 'name'],
      // target 描述的是挂载到哪，非自身。
      targetPath: '#name1.results.$items',
      // 挂载到目标路径上的字段，如果该字段不存在将会创建，反之覆盖。
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
      // target 描述的是挂载到哪，非自身。
      targetPath: '#name1.results.$items',
      // 挂载到目标路径上的字段，如果该字段不存在将会创建，反之覆盖。
      targetField: 'api_2',
      targetMapCondition: '#targetPath.aid==#name2.$response.results.$items.id',
      // sourcePath 描述的是当前接口返回值内的数据路径，所以必须以自己的 #name 开头。
      sourcePath: '#name2.$response.results.$items',
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
        pageNo: '$payload.pageNo',
        pageSize: '$pageload.pageSize',
      },
    },
    {
      apiId: '2',
      name: 'name2',
      method: 'get',
      data: {
        // 当值的指向的是集合数据($items、$keys)时，实际解析结果为由分隔符组成的字符串
        ids: '#name1.$response.results.$items.aid',
        // 与下方定义方式等效
        // ids: {
        //   ref: '#name1.$response.results.$items.aid',
        //   separator: ',',
        // },
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
      // path 的值描述的是返回值对象($response)内挂载数据的路径，如果该路径不存在，将会创建。
      path: '$response.results.$items.api_2',
      // matchOf 字段仅在集合数据需要匹配目标数据时才需要定义。
      matchOf: {
        // 当来源数据是集合（$items、$keys）时，进行遍历匹配
        ref: '#name2.$response.results.$items',
        condition: '$response.results.$items.aid==#name2.$response.results.$items.id',
        properties: ['id', 'name'],
      },
    },
  ],
};
