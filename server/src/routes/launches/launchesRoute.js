import express from "express";
import {
  httpGetAllALaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} from "../../controllers/launchesController.js";

const launchesRouter = express.Router();

launchesRouter.get("/", httpGetAllALaunches);

launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

export { launchesRouter };
