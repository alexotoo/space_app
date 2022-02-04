import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { parse } from "csv-parse";

import planets from "./planetsMongoose.js";

const __filename = fileURLToPath(import.meta.url);
//const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    const __dirname = path.dirname(__filename);
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          populatePlanetDB(data);
        }
      })
      .on("error", (err) => {
        console.log(err);
        reject(err);
      })
      .on("end", async () => {
        const planetsCount = (await getAllPlanets()).length;
        console.log(` ${planetsCount}:habitable planets found`);
        resolve();
      });
  });
}

async function getAllPlanets() {
  return await planets.find({}, { __v: 0 });
}

async function populatePlanetDB(planet) {
  try {
    await planets.updateOne(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export { loadPlanetsData, getAllPlanets };
