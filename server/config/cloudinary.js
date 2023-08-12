import cloudinary from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudUpload = async (postMedia) => {
	return await cloudinary.v2.uploader.upload(postMedia, {
		folder: "TuneIn",
	});
};

export default cloudUpload;
