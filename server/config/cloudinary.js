import cloudinary from "cloudinary";

const cloudUpload = async (image) => {
	cloudinary.v2.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	try {
		const result = await cloudinary.v2.uploader.upload(image, {
			folder: "TuneIn",
		});
		return result;
	} catch (error) {
		console.error("Cloudinary upload error:", error);
		throw error;
	}
};

export default cloudUpload;
