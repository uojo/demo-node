var { 
  graphql,
  GraphQLSchema,
  buildSchema,
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

var schema1 = buildSchema(`
  type Query {
    hello: String
  }
`);

var schema2 = new GraphQLSchema({
  query:new GraphQLObjectType({
    name:'rootQueryType', // 全局唯一
    fields:{
      title:{
        type:GraphQLString,
        args: {
          name: {type: GraphQLString, description: '演示参数'}
        },
        resolve(root,args,context,info){
          return 'apple ' + args.name
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

graphql(schema2, 'query { title(name:"bbc") }').then((response) => {
  console.log('TCL: response', response);
});

graphql(schema2, 'mutation { title }').then((response) => {
  console.log('TCL: response', response);
});