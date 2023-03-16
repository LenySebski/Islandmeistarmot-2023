import prisma from "../db.js";

export const getPosts = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany();
		res.json(posts);
	} catch (e) {
		next(e);
	}
};

export const getOriginalPoster = async (req, res, next) => {
	try {
		const post = await prisma.post.findUnique({
			where: { id: req.params.postId },
			select: {
				postedById: true,
			},
		});

		next(post);
	} catch (e) {
		next(e);
	}
};

export const getPost = async (req, res, next) => {
	try {
		const post = await prisma.post.findUnique({
			where: { id: req.params.postId },
		});
		res.json(post);
	} catch (e) {
		next(e);
	}
};

export const createPost = async (req, res, next) => {
	console.log("req.user: ", req.user);
	try {
		console.log(req.user);
		const post = await prisma.post.create({
			data: {
				title: req.body?.title,
				content: req.body?.content,
				district: req.body?.district,
				postedById: req.user.id,
				address: req.body?.address,
				endTime: req.body?.endTime,
			},
		});
		res.status(201);
		res.json(post);
	} catch (e) {
		e.type = "input";
		next(e);
	}
};

export const isPostEditable = async (req, res, next) => {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id_postedById: {
					id: req.params.postId,
					postedById: req.user.id,
				},
			},
		});
		if (post) {
			next();
		} else if (req.user.role === "ADMIN") {
			next();
		} else {
			const err = new Error("You are not authorized to edit this post");
			err.type = "auth";
			err.code = 401;
			next(err);
		}
	} catch (e) {
		next(e);
	}
};

export const updatePost = async (req, res, next) => {
	try {
		const post = await prisma.post.update({
			where: {
				id: req.params.postId,
			},
			data: {
				title: req.body?.title,
				content: req.body?.content,
				district: req.body?.district,
				address: req.body?.address,
				endTime: req.body?.endTime,
				postedById: req.user.id,
			},
		});
		res.json(post);
	} catch (e) {
		e.type = "input";
		next(e);
	}
};

export const deletePost = async (req, res, next) => {
	try {
		const post = await prisma.post.delete({
			where: {
				id: req.params.postId,
			},
		});
		res.json(post);
	} catch (e) {
		next(e);
	}
};

export const getPostsByUser = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				postedById: req.params.userId,
			},
		});
		if (posts.length === 0) {
			const err = new Error("No posts found.");
			err.type = "input";
			err.code = 400;
			next(err);
		} else {
			res.status(200);
			res.json(posts);
		}
	} catch (e) {
		next(e);
	}
};

export const getPostsByDistrict = async (req, res, next) => {
	try {
		const posts = await prisma.post.findMany({
			where: {
				district: req.params.districtCode,
			},
		});
		if (posts.length === 0) {
			const err = new Error("No posts found.");
			err.type = "input";
			err.code = 400;
			next(err);
		} else {
			res.status(200);
			res.json(posts);
		}
	} catch (e) {
		next(e);
	}
};
