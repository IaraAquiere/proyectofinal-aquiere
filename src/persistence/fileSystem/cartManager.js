import fs from "fs";
import { randomUUID } from "crypto";
let carts = [];
const pathFile = "./src/data/carts.json";

const getCarts = async () => {
  const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
  const cartsPars = JSON.parse(cartsJson);
  carts = cartsPars || [];
};

const createCart = async () => {
  await getCarts();
    const newCart = {
        id: randomUUID(),
        products: [],
  };

  carts.push(newCart);

  await fs.promises.writeFile(pathFile, JSON.stringify(carts));
  return newCart;
};

const getCartById = async (cid) => {
  
  await getCarts();
  const cartId = carts.find((c) => c.id === cid);
  return cartId;
};

const addProductToCart = async (cid, pid) => {
  await getCarts();

    let quantity = 1;

    const product = {
        product: pId,
        quantity: quantity,
  };

  const index = carts.findIndex((cart) => cart.id === id);

    const productOnCart = carts[index].products.find(p => p.product === pId);
    
    if(productOnCart){
        productOnCart.quantity = productOnCart.quantity + 1;
    }else{
        carts[index].products.push(product);
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return carts[index];
};

export default {
  getCarts,
  getCartById,
  addProductToCart,
  createCart,
};
