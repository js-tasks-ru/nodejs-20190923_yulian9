
const Products = require('../models/Product');
const mongoose = require('mongoose');
const changeProduct = require('../libs/changeProduct');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.request.query;
  if (subcategory) {
    ctx.userSubcategory = subcategory;
    await next();
  } else {
    const products = await Products.find();
    ctx.body = {products: changeProduct(products)};
  }
};

module.exports.productList = async function productList(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.userSubcategory)) {
    ctx.throw(400, 'Subcategory not valid');
  } else {
    const products = await Products.find({subcategory: ctx.userSubcategory});
    ctx.body = {products: changeProduct(products)};
  }
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) {
    ctx.throw(400, 'ProductId not valid');
  }
  const product = await Products.findById(ctx.params.id);
  if (product) {
    ctx.body = {product: changeProduct(product.toJSON())};
  } else {
    ctx.throw(404, 'Product not found');
  }
};

// ************** ../libs/changeProduct.js' **************************
