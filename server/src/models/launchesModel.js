import launchData from "./launchesMongoose.js";

import planets from "./planetsMongoose.js";

// const launches = new Map();

let DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "explore",
  rocket: "Space Search SS2",
  launchDate: new Date("December 27,2030"),
  target: "Kepler-442 b",
  customers: ["Alex", "USA"],
  upcoming: true,
  success: true,
};

// launches.set(launch.flightNumber, launch);

saveLaunchesToDB(launch);

async function saveLaunchesToDB(launch) {
  try {
    const planet = await planets.findOne({
      keplerName: launch.target,
    });

    if (!planet) {
      throw new Error("no matching planet was found");
    }
    await launchData.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

async function isIdInLaunches(launchId) {
  return await launchData.findOne({
    flightNumber: launchId,
  });
}

async function getRecentFlightNumber() {
  const recentLaunch = await launchData.findOne().sort("-flightNumber");

  if (!recentLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return recentLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchData.find(
    {},
    {
      __v: 0,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getRecentFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    success: true,
    upcoming: true,
    customers: ["Alex", "USA"],
  });

  await saveLaunchesToDB(newLaunch);
}

async function abortLaunchById(launchId) {
  const aborted = await launchData.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1 && aborted.matchedCount === 1;
}

export { isIdInLaunches, getAllLaunches, scheduleNewLaunch, abortLaunchById };
