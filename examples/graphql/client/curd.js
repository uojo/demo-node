var {
  graphql,
  GraphQLSchema,
  buildSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInputObjectType
} = require ('graphql');

const outputType = new GraphQLObjectType ({
  name: 'output',
  fields: () => ({
    id: {type: GraphQLString},
    success: {type: GraphQLBoolean},
  }),
});

const inputType = new GraphQLInputObjectType ({
  name: 'input',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString}
  }),
});

let mutationRootType = new GraphQLObjectType ({
  name: 'Mutations',
  fields: () => ({
    addOne: {
      type: outputType,
      description: 'add',
      args: {
        listObj: {type: inputType},
      },
      resolve: (value, args) => {
        console.log('TCL: args', args);
        return {id:1,title:"apple"};
      },
    },
    delOne: {
      type: outputType,
      description: 'del',
      args: {
        id: {type: GraphQLString},
      },
      resolve: (value, args) => {
        // let result = delOne (args);
        return 2;
      },
    },
    editOne: {
      type: outputType,
      description: 'edit',
      args: {
        listObj: {type: inputType},
      },
      resolve: (value, args) => {
        // let result = editOne (args.listObj);
        return 3;
      },
    },
    tickOne: {
      type: outputType,
      description: 'tick',
      args: {
        id: {type: GraphQLString},
        checked: {type: GraphQLBoolean},
      },
      resolve: (value, args) => {
        // let result = tickOne (args);
        return 4;
      },
    },
  }),
});

const schema = new GraphQLSchema ({
  query: mutationRootType,
});

graphql (schema, `
query { 
  addOne(listObj:{id:"1",title:"hello"}) {id} 
  aliasA:tickOne(id:"1",checked:false) {id}
}
`).then (response => {
  console.log ('TCL: response', response);
});
