import { User } from "./types.js";
import {
  createUserResolver,
  deleteUserResolver,
  editUserResolver,
} from "./resolvers.js";
import {
  CreateUserInputType,
  EditUserInputType,
  DeleteUserInputType,
} from "./types.js";
import _ from "lodash";
import { DeleteAddressResult } from "../Address/types.js";
import { GraphQLString } from "graphql";

const createUser = {
  type: User,
  args: {
    user: { type: CreateUserInputType },
    method: { type: GraphQLString },
  },
  resolve: createUserResolver,
};

const editUser = {
  type: User,
  args: { user: { type: EditUserInputType } },
  resolve: editUserResolver,
};

const deleteUser = {
  type: DeleteAddressResult,
  args: { user: { type: DeleteUserInputType } },
  resolve: deleteUserResolver,
};

const mutations = _.merge({ createUser }, { editUser }, { deleteUser });

export const userMutations = {
  name: "Mutation",
  fields: mutations,
};
