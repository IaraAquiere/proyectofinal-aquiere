import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import { checkProductData } from "../middlewares/checkProductData.middleware.js";


const router = Router();
router.get("/", productsControllers.getAllProducts);

router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  checkProductData,
  productsControllers.createProduct
);


router.delete(
  "/:pid",
  passportCall("jwt"),
  checkProductAndCart,
  authorization("admin"),
  productsControllers.deleteProduct
);


router.put(
  "/:pid",
  passportCall("jwt"),
  checkProductAndCart,
  authorization("admin"),
  productsControllers.updateProduct
);


router.get("/:pid", checkProductAndCart, productsControllers.getProductById

);

export default router;
