import { Router } from "express";
import {
	getAllUsers,
	isUserEditable,
	updateUser,
	deleteUser,
} from "./handlers/user.js";
import { isAdmin } from "./middleware/auth.js";
import {
	handleInputErrors,
	signUpValidation,
	createPostValidation,
} from "./middleware/validation.js";
import {
	isPostEditable,
	createPost,
	deletePost,
	getPost,
	updatePost,
  getPostsByDistrict,
} from "./handlers/post.js";

const router = Router();

/**Get/Update User */

router.get("/users", isAdmin, getAllUsers);
router.get("/user/:userId");
router.put(
	"/user/:userId",
	[signUpValidation, handleInputErrors, isUserEditable],
	updateUser
);
router.delete("/user/:userId", isUserEditable, deleteUser);

/**Get/Update Post */
router.post("/post", [createPostValidation, handleInputErrors], createPost);
router.get("/post/:postId", getPost);
router.get("/posts/bydistrict/:districtCode", getPostsByDistrict);


router.put(
	"/post/:postId",
	[createPostValidation, handleInputErrors, isPostEditable],
	updatePost
);
router.delete("/post/:postId", isPostEditable, deletePost);

export default router;
