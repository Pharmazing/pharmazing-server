import { Prescription } from "./types.js";
import {
  getPrescriptionResolver,
  getAllPrescriptionsResolver,
} from "./resolvers.js";
import { GraphQLID, GraphQLList } from "graphql";
import _ from "lodash";

const getPrescription = {
  type: Prescription,
  args: { id: { type: GraphQLID } },
  resolve: getPrescriptionResolver,
};

const getAllPrescriptions = {
  type: new GraphQLList(Prescription),
  args: {
    userId: { type: GraphQLID },
    vendorId: { type: GraphQLID },
  },
  resolve: getAllPrescriptionsResolver,
};

const queries = _.merge({ getPrescription }, { getAllPrescriptions });

export const prescriptionQueries = {
  name: "Query",
  fields: queries,
};
