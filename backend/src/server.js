import { protect } from "./middleware/auth.js";
import express from "express";
import router from "./router.js";
import morgan from "morgan";
import cors from "cors";
import { getPosts, getPostsByUser } from "./handlers/post.js";
import { createNewUser, signIn } from "./handlers/user.js";
import {
	handleInputErrors,
	signInValidation,
	signUpValidation,
} from "./middleware/validation.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	console.log("Health check...");
	res.json({ ok: true, message: "Still alive!" });
	res.status(200);
});
app.use("/posts/:userId", getPostsByUser);
app.use("/posts", getPosts);
app.use("/api", protect, router);
app.post("/signup", [signUpValidation, handleInputErrors], createNewUser);
app.post("/signin", [signInValidation, handleInputErrors], signIn);

app.use((err, req, res, next) => {
	console.log(err);
	if (err.type === "auth") {
		res.status(err.code || 401).json({
			error: { message: "Unauthorized access.", errors: err.errors },
		});
	} else if (err.type === "input") {
		res.status(err.code || 400).json({
			error: {
				message: err.message || "Request input error.",
				errors: err.errors,
			},
		});
	} else {
		res.status(err.code || 500).json({
			error: { message: "Server Error.", errors: err.errors },
		});
	}
});
export default app;
