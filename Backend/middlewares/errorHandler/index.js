module.exports = (err, req, res, next) => {
	if (err.kind == "ObjectId") {
		err.message = `id supplied in parameter is not an ObjectId`;
		err.status = 400;
	}
	const status = err.status || 500;
	const message = err.messages || err.message;
	res.status(status).json({
		message,
		status,
	});
};
