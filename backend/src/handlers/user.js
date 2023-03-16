import prisma from "../db.js";
import {
	createToken,
	hashPassword,
	comparePassword,
} from "../middleware/auth.js";

export const createNewUser = async (req, res, next) => {
	try {
		const isUserInDB = await prisma.user.findUnique({
			where: {
				username: req.body.username.toLowerCase(),
			},
		});
		if (isUserInDB) {
			throw new Error("User already exists. Please try another username.");
		}
		const user = await prisma.user.create({
			data: {
				username: req.body.username.toLowerCase(),
				password: await hashPassword(req.body.password),
			},
		});
		const token = createToken(user);
		return res.json({
			token,
			user: { username: user.username, id: user.id, role: user.role },
		});
	} catch (e) {
		e.type = "input";
		next(e);
	}
};

export const signIn = async (req, res, next) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				username: req.body.username.toLowerCase(),
			},
		});
		if (user && (await comparePassword(req.body.password, user.password))) {
			const token = createToken(user);
			res.json({
				token,
				user: { username: user.username, id: user.id, role: user.role },
			});
		} else {
			throw new Error("Invalid username or password");
		}
	} catch (e) {
		e.type = "input";
		e.message = "Invalid username or password";
		e.code = 400;
		e.errors = [{ msg: "Invalid username or password" }];
		next(e);
	}
};

export const getUserById = async (req, res, next) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.params.userId,
			},
		});
		res.json(user);
	} catch (e) {
		next(e);
	}
};

export const isUserEditable = async (req, res, next) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.params.userId,
			},
			select: {
				id: true,
			},
		});
		if (user.id === req.user.id) {
			next();
		} else if (req.user.role === "ADMIN") {
			next();
		} else {
			throw new Error("You are not authorized to edit this user");
		}
	} catch (e) {
		e.code = 403;
		e.type = "auth";
		next(e);
	}
};

export const updateUser = async (req, res, next) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: req.params.userId,
			},
			data: {
				username: req.body.username,
				password: await hashPassword(req.body.password),
				email: req.body.email,
				phone: req.body.phone,
				role: req.body.role,
			},
		});
		res.json(user);
	} catch (e) {
		next(e);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const user = await prisma.user.delete({
			where: {
				id: req.params.userId,
			},
		});
		res.json(user);
	} catch (e) {
		next(e);
	}
};

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (e) {
		next(e);
	}
};
