import { request, response } from "express";
import productRepository from "../persistence/mongoDB/product.repository.js";

export const checkProductData = async (req = request, res = response, next) => {
  try {
    const { title, description, price, code, stock, category } = req.body;
    const newProduct = {
      title,
      description,
      price,
      code,
      stock,
      category,
    };

    const products = await productRepository.getAll();
    const productExists = products.docs.find((p) => p.code === code);
    if (productExists) return res.status(400).json({ status: "Error", msg: `El producto con el código ${code} ya existe` });
    const checkData = Object.values(newProduct).includes(undefined);
    if (checkData) return res.status(400).json({ status: "Error", msg: "Todos los datos son obligatorios" });

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
};
