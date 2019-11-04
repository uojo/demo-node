var { 
  graphql,
  GraphQLSchema,
  buildSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql');

const ItemType = new GraphQLObjectType({
  name:"Item",
  fields:{
    id:{type:GraphQLID},
    title:{type:GraphQLString}
  }
})

const itemsFields = {
  type: new GraphQLList(ItemType),
  args: {},
  resolve (root, params, options) {
    return [{id:1,title:"hello world",}] // 数据库查询
  }
}

let queryType = new GraphQLObjectType({
    name: 'getAllList',
    fields: {
      items: itemsFields,
    }
})

const schema = new GraphQLSchema({
  query: queryType
})

graphql(schema, 'query { items { id } }').then((response) => {
  console.log('TCL: response', response);
});