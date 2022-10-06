import Router from "express";
import SuperheroController from "../controllers/SuperheroController.js";

const router = new Router();

router.post("/superhero", SuperheroController.create);
router.get("/superheroes", SuperheroController.getAll);
router.get("/superheroes/amount", SuperheroController.getTotalAmount);
router.get("/superhero/:id", SuperheroController.getOne);
router.put("/superhero", SuperheroController.update);
router.delete("/superhero/:id", SuperheroController.delete);

export default router;
