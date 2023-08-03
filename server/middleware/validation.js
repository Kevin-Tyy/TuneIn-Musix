const validate = (schema) => {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const errorMessage = error.details[0].message;
			return res.status(400).send({ msg: errorMessage });
		}
        next()
	};
};
export default validate