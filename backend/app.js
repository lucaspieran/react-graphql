const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const characterType = new GraphQLObjectType({
  name: "Character",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    status: { type: GraphQLString },
    species: { type: GraphQLString },
    gender: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    humanCharacters: {
      type: new GraphQLList(characterType),
      resolve() {
        return axios
          .get("https://rickandmortyapi.com/api/character", {
            params: {
              species: "human",
            },
          })
          .then((response) => response.data.results);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT);
