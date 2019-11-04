var { 
  graphql,
  GraphQLSchema,
  buildSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql');

var schema = new GraphQLSchema({
  query:new GraphQLObjectType({
    name:'rootQueryType', // 全局唯一
    fields:{
      title:{
        type:GraphQLString,
        args: {
          name: {type: GraphQLString, description: '演示参数'}
        },
        resolve(root,args,context,info){
          return 'hello ' + args.name
        }
      }
    }
  }),
  mutation:new GraphQLObjectType({
    name:'rootMutationType', // 全局唯一
    fields:{
      title:{
        type:GraphQLString,
        resolve(root,args,context){
          return 'orange'
        }
      }
    }
  })
})

// 查询操作
graphql(schema, 'query { title(name:"bbc") }').then((response) => {
  console.log('TCL: response', response);
});

// 修改操作
graphql(schema, 'mutation { title }').then((response) => {
  console.log('TCL: response', response);
});