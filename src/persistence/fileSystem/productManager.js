let products = [];

import { randomUUID } from 'crypto';
import fs from "fs";

const pathFile = "./src/data/products.json";

const addProduct = async (product) => {
  await getProducts();
  const { title, description, price, thumbnail, code, stock, category } = product;
  const newProduct = {
    id: randomUUID(),
    title,
    description,
    code,
    price,
    status: true,
    stock,
    category,
    thumbnails: thumbnails || []
};

  products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));

  return product;
};

const getProducts = async (limit) => {
  const productsJson = await fs.promises.readFile(pathFile, "utf8");
  const productsParse = JSON.parse(productsJson);
  products = productsParse || [];
  
  if (!limit) return products;

  return products.slice(0, limit);
};

const getProductById = async (id) => {
  products = await getProducts();
  const product = products.find((p) => p.id === id);

  return product;
};

const updateProduct = async (id, productData) => {
  await getProducts();

  const index = products.findIndex((p) => p.id === id);
  products[index] = {
    ...products[index],
    ...productData,
  };

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
  const product = await getProductById(id);
  return product;
};

const deleteProduct = async (id) => {
  console.log(id)
  await getProducts();
  const product = await getProductById(id);
  if (!product) return false;
  products = products.filter((p) => p.id !== id);
  await fs.promises.writeFile(pathFile, JSON.stringify(products));

  return true;
};

export default {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
