import { GraphQLError } from "graphql";
import { Product } from "../../../db/models/Product.js";
import { Vendor } from "../../../db/models/Vendor.js";

export const getAllProductsResolver = async (_root, args, _context) => {
  try {
    const {
      vendor: { vendorId, productId },
    } = args;

    let products = [];
    if (vendorId) {
      products = await Product.find({ vendorId });
    } else if (productId?.length > 0) {
      products = await Product.find({ productId: { $in: productId } });
    }
    if (!products.length) throw new GraphQLError("No products found");
    return products;
  } catch (e) {
    return e;
  }
};

export const getProductResolver = async (_root, args) => {
  try {
    const { product } = args;
    const { productId } = product;
    if (!productId) throw new GraphQLError("Product ID is required");
    const productFound = await Product.findOne({ productId });
    if (!productFound) throw new GraphQLError("Product not found");
    return productFound;
  } catch (e) {
    return e;
  }
};

export const createProductResolver = async (_root, args) => {
  try {
    const { product } = args;
    const products = await Product.find();
    const foundVendor = await Vendor.findOne({ vendorId: product.vendorId });
    if (!foundVendor) throw new GraphQLError("Vendor not found");
    for (let prop in product) if (!product[prop]) delete product[prop];
    products.forEach((p) => {
      if (
        p.productName === product.productName &&
        p.vendorId === product.vendorId
      )
        throw new GraphQLError("Product already exists");
    });
    const newProduct = new Product(product);
    await newProduct.save();

    return { ...newProduct.toObject() };
  } catch (e) {
    return e;
  }
};

export const editProductResolver = async (_root, args) => {
  try {
    const { product } = args;
    const foundProduct = await Product.findOne({
      productId: product.productId,
    });
    if (!foundProduct) throw new GraphQLError("Product not found");
    for (let prop in product) if (!product[prop]) delete product[prop];
    foundProduct.productName = product.productName || foundProduct.productName;
    foundProduct.productDescription =
      product.productDescription || foundProduct.productDescription;
    foundProduct.productPrice =
      product.productPrice || foundProduct.productPrice;
    foundProduct.productCategory =
      product.productCategory || foundProduct.productCategory;
    foundProduct.prescriptionRequired =
      product.prescriptionRequired || foundProduct.prescriptionRequired;
    if (Array.isArray(product.media))
      foundProduct.media = [...foundProduct.media, ...product.media];
    await foundProduct.save({ safe: true });
    return { ...foundProduct.toObject(), ...product };
  } catch (e) {
    return e;
  }
};

export const deleteProductResolver = async (_root, args, _context) => {
  try {
    const {
      product: { productId },
    } = args;
    if (!productId) throw new GraphQLError("Product ID is required");
    const foundProduct = await Product.findOne({ productId });
    if (!foundProduct) throw new GraphQLError("Product not found");
    const { acknowledged, deletedCount } = await foundProduct.deleteOne();
    if (!acknowledged || !deletedCount)
      throw new GraphQLError("Product not deleted");
    return { success: deletedCount > 0 || acknowledged };
  } catch (e) {
    return e;
  }
};
