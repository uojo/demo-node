const responseSchema = {
  definitions: {
    api1: {
      $ref: '201220222',
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          $id: '#api1_success',
        },
        results: {
          type: 'array',
          items: {
            $id: '#api1_results_item',
            type: 'object',
            properties: {
              uid: { $id: '#api1_results_item_uid' },
            },
          },
        },
      },
    },
    api2: {
      $ref: '200020024',
      type: 'object',
      properties: {
        results: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', $id: '#api2_results_item_id' },
            },
          },
        },
      },
      query: {
        type: 'object',
        properties: {
          ids: { $ref: '#api1_results_item_uid' },
        },
      },
    },
  },

  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      // 取接口A返回值对象的 success 字段值
      $ref: '#api1_success',
    },
    results: {
      type: 'array',
      items: {
        type: 'object',
        allof: [
          { $ref: '#api1_results_item' },
          {
            properties: {
              userID: {
                type: 'number',
                $ref: '#api2_results_item_id',
              },
            },
          },
        ],
      },
    },
  },
};