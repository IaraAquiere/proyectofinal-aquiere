import { Router } from "express";
import productsControllers from "../controllers/products.controllers.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import {checkProductExist} from "../middlewares/checkProductExist.middleware.js"


const router = Router();
router.get("/", productsControllers.getAllProducts);

router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  checkProductExist,
  productsControllers.createProduct
);


router.delete(
  "/:pid",
  passportCall("jwt"),
  checkProductExist,
  authorization("admin"),
  productsControllers.deleteProduct
);


router.put(
  "/:pid",
  passportCall("jwt"),
  checkProductExist,
  authorization("admin"),
  productsControllers.updateProduct
);


router.get("/:pid", checkProductExist, productsControllers.getProductById

);

export default router;
