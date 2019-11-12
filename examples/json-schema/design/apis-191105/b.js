const responseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      // 取接口A返回值的 success 字段值
      default: '$apiA.success',
    },
    results: {
      type: 'array',
      items: {
        type: 'object',
        default: '$apiA.results.$$item',
        properties: {
          uid: {
            type: 'number',
            default: '$apiB.results.$$item.id',
          },
        },
      },
    },
  },
};

const payload = {
  apis: [
    {
      id: 1,
      name: 'apiA',
    },
    {
      id: 2,
      name: 'apiB',
      linkFields: {
        ids: '$apiA.results.$$item.uid',
      },
    },
  ],
  // 使用 JSON-Schema 语法定义返回值
  responseSchema,
};