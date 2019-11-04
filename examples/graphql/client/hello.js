var { 
  graphql,
  GraphQLSchema,
  buildSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

graphql(schema, 'query { hello }').then((response) => {
  console.log('TCL: response', response);
});
