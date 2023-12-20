const User = require("../Model/user");

module.exports.signUp = async function (req, res) {
	try {
		const { email, name, password } = req.body;

		if (!email || !name || !password) {
			return res.status(400).send({ message: "Please provide name, email, and password" });
		}

		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).send({ message: "Email already exists!" });
		}

		await User.create({
			email,
			name,
			password,
		});

		return res.status(200).send({ message: "User created successfully" });
	} catch (error) {
		console.error("Error in signUp:", error);
		return res.status(500).send({ message: "Internal Server Error" });
	}
};
