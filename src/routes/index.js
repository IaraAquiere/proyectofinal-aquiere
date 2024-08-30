import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import sessionRouter from "./session.routes.js"
import viewsRoutes from "../routes/views.routes.js"

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/session", sessionRouter)
router.use("/", viewsRoutes);
router.get("*", async (req, res) => {
    try {
        res.status(404).json({status: "error", msg: "Route not found"});
    } catch (error) {
        res.status(500).json({status: "Error", msg: "Internal Error Server"});
    }
} )

export default router;
