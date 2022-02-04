import {
  getAllLaunches,
  scheduleNewLaunch,
  isIdInLaunches,
  abortLaunchById,
} from "../models/launchesModel.js";

async function httpGetAllALaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const newLaunch = req.body;

  if (
    !newLaunch.mission ||
    !newLaunch.rocket ||
    !newLaunch.target ||
    !newLaunch.launchDate
  ) {
    return res.status(400).json({
      error: "missing required field",
    });
  }

  newLaunch.launchDate = new Date(newLaunch.launchDate);

  if (isNaN(newLaunch.launchDate)) {
    return res.status(400).json({
      error: "Invalid date formate",
    });
  }

  await scheduleNewLaunch(newLaunch);

  return res.status(201).json(newLaunch);
}

async function httpAbortLaunch(req, res) {
  const launchId = +req.params.id;

  const existsInLaunch = await isIdInLaunches(launchId);

  if (!existsInLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  const aborted = await abortLaunchById(launchId);

  if (!aborted) {
    return res.status(400).json({
      error: "Launch abort unsuccessful!",
    });
  }

  return res.status(200).json({ ok: true });
}

export { httpGetAllALaunches, httpAddNewLaunch, httpAbortLaunch };
