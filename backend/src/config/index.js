import merge from "lodash.merge";
import { productionConfig } from "./prod.js";
import { testingConfig } from "./testing.js";
import { localConfig } from "./local.js";

// If 'process.env.NODE_ENV' exists, don't override it, but if it doesn't set it to "development"
process.env.NODE_ENV = process.env.NODE_ENV || "development"; 

// Stage is whatever 'process.env.STAGE' if we have set it. If not, it's "local"
const stage = process.env.STAGE || "local";


let envConfig; // I don't give it a value here because below we make the value dynamic

// Dynamically require each config depending on the stage we're in
if (stage === "production") {
    envConfig = productionConfig; // If stage is production, require the production file
  } else if (stage === "testing") {
    envConfig = testingConfig; // If stage is testing, require the testing file
  } else {
    envConfig = localConfig; // Or default to local
  }

  // Default configuration which gets overridden by the envConfig above
  const defaultConfig = {
    stage,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    port: 5002,
    logging: false,
  };
  
  export default merge(defaultConfig, envConfig);
  