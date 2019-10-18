const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
// const mapProduct = require('../mappers/product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;

  if (!subcategory) {
    return next();
  }

  if (!mongoose.Types.ObjectId.isValid(subcategory)) {
    ctx.throw(400, 'invalid subcategory id');
  }

  const products = await Product.find({subcategory}).limit(20);
  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find().limit(20);
  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productById = async function productById(ctx, next) {
  const {id} = ctx.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    ctx.throw(400, 'invalid product id');
  }

  const product = await Product.findById(id);

  if (!product) {
    ctx.throw(404, `no product with ${ctx.params.id} id`);
  }

  ctx.body = {product: mapProduct(product)};
};

//* =============================================================
module.exports = function mapProduct(product) {
  return {
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description,
  };
};
//* =============================================================

module.exports.productAdd = async function categoryAdd(ctx, next) {
  const productNum = Math.floor(Math.random() * 100000);
  const categories = await Category.find();
  const idx = Math.floor(Math.random() * categories.length);
  const category = categories[idx];

  const product = await Product.create({
    title: `product ${productNum}`,
    description: `description of product ${productNum}`,
    price: (productNum / 1000).toFixed(2),
    category: category._id,
    subcategory: category.subcategories[0]._id,
    images: new Array(idx + 2).fill(`image-${Math.random()}`),
  });

  ctx.body = product;
};
