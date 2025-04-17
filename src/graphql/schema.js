import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { createSchema } from "graphql-yoga";
import { userQueries, userMutations } from "./models/User/index.js";
import { addressQueries, addressMutations } from "./models/Address/index.js";
import { vendorQueries, vendorMutations } from "./models/Vendor/index.js";
import { productQueries, productMutations } from "./models/Product/index.js";
import { cartQueries, cartMutations } from "./models/Cart/index.js";
import _ from "lodash";
import {
  prescriptionQueries,
  prescriptionMutations,
} from "./models/Prescriptions/index.js";

const queries = _.merge(
  userQueries,
  addressQueries,
  vendorQueries,
  productQueries,
  cartQueries,
  prescriptionQueries,
);
const mutations = _.merge(
  userMutations,
  addressMutations,
  vendorMutations,
  productMutations,
  cartMutations,
  prescriptionMutations,
);

const gqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType(queries),
  mutation: new GraphQLObjectType(mutations),
});

export const schema = createSchema({ typeDefs: gqlSchema });
