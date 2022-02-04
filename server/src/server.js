import app from "./app.js";
import { createServer } from "http";
import { loadPlanetsData } from "./models/planetsModel.js";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 8000;

const server = createServer(app);

mongoose.connection.once("open", () => {
  console.log("connection ready");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

async function startServerOnDataReady() {
  try {
    //data connection, this password has been hard coded in nodemon.json file for easy reload
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await loadPlanetsData();
    server.listen(PORT, () =>
      console.log(`server listening on port: ${PORT}...`)
    );
  } catch (error) {
    console.log("server didn't start", error);
  }
}
startServerOnDataReady();
