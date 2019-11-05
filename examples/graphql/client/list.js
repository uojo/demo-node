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
  args: {
    name: {type: GraphQLString}
  },
  resolve (root, params, options) {
    return [{id:1,title:"hello world" + params.name ,}] // 数据库查询
  }
}

let queryRootType = new GraphQLObjectType({
    name: 'getList',
    fields: {
      items: itemsFields,
    }
})

const schema = new GraphQLSchema({
  query: queryRootType
})

graphql(schema, 'query { items(name:"uojo") { id } }').then((response) => {
  console.log('TCL: response', response);
});