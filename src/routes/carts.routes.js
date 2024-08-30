import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { checkCartExist } from "../middlewares/checkCartExist.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

const middlewares = [checkCartExist,passportCall("jwt"), authorization("user"), isUserCart];

router.post("/",middlewares, 
    cartsControllers.createCart
   );
 

 router.get("/:cId",
   middlewares, 
   cartsControllers.getCartById
 );
 
 router.post(
    "/:cId/product/:pid",
    middlewares, 
    cartsControllers.addProductToCart
  );

  router.delete(
    "/:cId/product/:pid",
    middlewares,
    cartsControllers.deleteProductToCart
  );

router.put(
  "/:cId/product/:pid",
  middlewares,
  cartsControllers.updateQuantityProductInCart
);

router.delete("/:cId", 
    middlewares, 
    cartsControllers.deleteProductToCart);
  
  router.get("/:cId/purchase",passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);
  
export default router;
