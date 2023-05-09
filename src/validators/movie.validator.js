import Joi from "joi"
import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)

export const createMovieGenreValidator = Joi.object({
  creator: Joi.objectId().required(),
  creatorId: Joi.objectId().required(),
  title: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
}).strict()


export const updateMovieGenreValidator = Joi.object({
  genre: Joi.string().optional(),
  startDate: Joi.string().optional(),
  endDate: Joi.string().optional(),
}).strict()