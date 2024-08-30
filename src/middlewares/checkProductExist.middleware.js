import { request, response } from "express";
import productRepository from "../persistence/mongoDB/product.repository.js";

export const checkProductExist = async (
  req = request,
  res = response,
  next
) => {
  const { pid } = req.params;
  const product = await productRepository.getById(pid);
  if (!product)
    return res.status(404).json({status: "Error", msg: `No se encontro el producto con el ID ${pid}`, });
  next();
};