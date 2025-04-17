import {
  Product,
  CreateProductInput,
  EditProductInput,
  DeleteProductInput,
  DeleteProductResult,
} from "./types.js";
import {
  createProductResolver,
  editProductResolver,
  deleteProductResolver,
} from "./resolvers.js";
import _ from "lodash";

const createProduct = {
  type: Product,
  args: {
    product: { type: CreateProductInput },
  },
  resolve: createProductResolver,
};

const editProduct = {
  type: Product,
  args: {
    product: { type: EditProductInput },
  },
  resolve: editProductResolver,
};

const deleteProduct = {
  type: DeleteProductResult,
  args: { product: { type: DeleteProductInput } },
  resolve: deleteProductResolver,
};

const mutations = _.merge(
  { createProduct },
  { editProduct },
  { deleteProduct },
);

export const productMutations = {
  name: "Mutation",
  fields: mutations,
};
