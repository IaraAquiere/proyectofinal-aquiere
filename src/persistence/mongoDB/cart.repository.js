import { cartModel } from "./models/cart.model.js";


const getAll = async () => {
  const cart = await cartModel.find({ status: true });
  return cart;
};

const getById = async (id) => {
  const cart = await cartModel.findById(id).populate("products.product");
  return cart;
};

const create = async () => {
  const cart = await cartModel.create({});
  return cart;
};

const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};

const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

const addProductToCart = async (id, pid) => {

  const productInCart = await cartModel.findOneAndUpdate(
    { _id: id, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  );

  if (!productInCart) {
    await cartModel.updateOne(
      { _id: id },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }
  const cartUpdate = await cartModel.findById(id);

  return cartUpdate;
};

const deleteProductToCart = async (id, pid) => {
  const cart = await cartModel.findById(id);

  cart.products = cart.products.filter((element) => element.product != pid);

  await cart.save();

  return cart;
};

const updateQuantityProductInCart = async (id, pid, quantity) => {
  const cart = await cartModel.findById(id);
  const product = cart.products.find((element) => element.product == pid);
  product.quantity = quantity;

  await cart.save();
  return cart;
};

const clearProductsToCart = async (id) => {
  const cart = await cartModel.findById(id);
  cart.products = [];

  await cart.save();

  return cart;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProductInCart,
  clearProductsToCart,
};
