import { request, response } from "express";


export const isUserCart = async (req = request, res = response, next) => {
  
  const { _Id } =  req.params;

  if (!req.user) {
    return res.status(401).json({ status: "error", msg: "Unauthorized" });
  }
  if (req.user.cart._id === _Id) {
    console.log(_Id)
    return res.status(401).json({ status: "error", msg: "Wrong cart user" });
  }
  next();
};
