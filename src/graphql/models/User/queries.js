import { User } from "./types.js";
import { GraphQLString, GraphQLList } from "graphql";
import { signInResolver, getAllUsersResolver } from "./resolvers.js";
import _ from "lodash";

const signIn = {
  type: User,
  args: {
    method: { type: GraphQLString },
  },
  resolve: signInResolver,
};

const getAllUsers = {
  type: new GraphQLList(User),
  resolve: getAllUsersResolver,
};

const queries = _.merge({ signIn }, { getAllUsers });

export const userQueries = {
  name: "Query",
  fields: queries,
};
