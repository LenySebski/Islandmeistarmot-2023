import * as dotenv from "dotenv";
dotenv.config();
import config from "./config/index.js";

import app from "./server.js";

app.listen(config.port, () => {
	console.log(`server listening on http://localhost:${config.port}`);
});
