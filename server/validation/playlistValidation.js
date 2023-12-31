import Joi from "joi";

const playlistValidationSchema = Joi.object({
	playlistName: Joi.string().required().min(3).max(30).messages({
		"string.empty": "Enter a name for the playlist",
		"string.min": "Playlist name  must be at least 3 characters",
		"string.max": "Playlist name must be at most 30 characters",
	}),
	playlistDescription: Joi.string().allow(""),
	playlistImage: Joi.string().allow(""),
	userId : Joi.string().required(),
});
export default playlistValidationSchema;
