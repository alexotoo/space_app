import { getAllPlanets } from "../models/planetsModel.js";

async function httpGetAllPlanets(req, res) {
  return res.status(200).json(await getAllPlanets());
}

export { httpGetAllPlanets };
