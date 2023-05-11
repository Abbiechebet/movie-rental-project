import Joi from "joi"
import JoiMongoId from "joi-objectid"

Joi.objectId = JoiMongoId(Joi)

export const createMovieGenreValidator = Joi.object({
  producer:Joi.string().required(),
  producerId: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
}).strict()


export const updateMovieGenreValidator = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
}).strict()