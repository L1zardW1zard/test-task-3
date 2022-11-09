import Router from "express";
import SuperheroController from "../controllers/SuperheroController.js";

const router = new Router();

router.post("/superhero", SuperheroController.create);
router.get("/superheroes", SuperheroController.getAllOnPage);
router.get("/superhero/:id", SuperheroController.getOne);
router.put("/superhero", SuperheroController.update);
router.delete("/superhero/:id", SuperheroController.delete);

export default router;
