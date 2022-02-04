import express from "express";
import { httpGetAllPlanets } from "../../controllers/planetsController.js";

const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets);

export { planetsRouter };
