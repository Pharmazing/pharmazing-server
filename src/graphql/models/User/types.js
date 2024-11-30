import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from "graphql";
import { addressFieldResolver } from "../Address/resolvers.js";
import { Address } from "../Address/types.js";

export const User = new GraphQLObjectType({
  name: "User",
  fields: {
    userId: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    age: { type: GraphQLInt },
    contactNumber: {
      type: GraphQLString,
    },
    cartId: { type: GraphQLString },
    address: {
      type: new GraphQLList(new GraphQLNonNull(Address)),
      resolve: addressFieldResolver,
    },
    // cart: { type: Cart, resolve: cartFieldResolver },
    token: { type: GraphQLString },
  },
});

export const CreateUserInputType = new GraphQLInputObjectType({
  name: "CreateUserInput",
  fields: {
    userId: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLInt },
    // address: {
    //   type: new GraphQLList(new GraphQLNonNull(Address)),
    //   // resolve: addressFieldResolver,
    // },
    // addressLine1: { type: GraphQLString },
    // addressLine2: { type: GraphQLString },
    // city: { type: GraphQLString },
    // parish: { type: GraphQLString },
    // country: { type: GraphQLString },
    // zip: { type: GraphQLString },
    // primary: { type: GraphQLBoolean },
  },
});

export const EditUserInputType = new GraphQLInputObjectType({
  name: "EditUserInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    // password: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    age: { type: GraphQLInt },
    // address: new GraphQLInputObjectType({
    //   name: "AddressInput",
    //   fields: {
    //     userId: { type: GraphQLString },
    //     addressId: { type: GraphQLString },
    //     addressLine1: { type: GraphQLString },
    //     addressLine2: { type: GraphQLString },
    //     city: { type: GraphQLString },
    //     parish: { type: GraphQLString },
    //     country: { type: GraphQLString },
    //     zip: { type: GraphQLString },
    // }})
  },
});

export const DeleteUserInputType = new GraphQLInputObjectType({
  name: "DeleteUserInput",
  fields: {
    userId: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
  },
});
