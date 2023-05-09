import {createMovieGenreValidator, updateMovieGenreValidator} from "../validators/movie.validator.js"
import MovieGenre from "../model/movie.model.js"
import User from "../model/user.model.js"
import { BadUserRequestError, NotFoundError } from "../error/error.js"
import { mongoIdValidator } from "../validators/mongoId.validator.js"

export default class GenreController {
  static async createGenre(req, res,){
      const {error } = createMovieGenreValidator.validate(req.body)
      if(error) throw error

      const isUserAvailable = await User.findById(req.body.creator)
      if(!isUserAvailable) throw new BadUserRequestError(`User with this id: ${req.body.creator} does not exist`)

      const newGenre = await MovieGenre.create(req.body)
      res.status(201).json({
      message: "Genre created successfully",
      status: "Success",
      data:{
        genre: newGenre
      }
    })
  }

  static async updateOneGenre(req, res){
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const updateValidatorResponse = await updateMovieGenreValidator.validate(req.body)
    const updateGenreError = updateValidatorResponse.error
    if(updateGenreError) throw updateGenreError

    const genre = await MovieGenre.findById(id)
    if(!genre) throw new NotFoundError(`The genre with this id: ${id}, does not exist`)

    const updatedGenre = await MovieGenre.findByIdAndUpdate(id, req.body, {new: true})
    return res.status(200).json({
      message: "Genre updated successfully",
      status: "Success",
      data:{
      genre: updatedGenre
      }
    })
  }



  static async getOneGenre(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const genre = await MovieGenre.findById(id)
    if(!genre) throw new NotFoundError(`The genre with this id: ${id}, does not exist`)

    return res.status(200).json({
      message: "Genre found successfully",
      status: "Success",
      data: {
        genre: genre
      }
    })
  }


  static async deleteOneGenre(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const genre = await MovieGenre.findById(id)
    if(!genre) throw new NotFoundError(`The genre with this id: ${id}, does not exist`)

    await MovieGenre.findByIdAndUpdate(id, {
      isDeleted: true
    })
    // await genre.findOneAndDelete()

    return res.status(200).json({
      message: "genre deleted successfully",
      status: "Success",
    })
  }


  static async findAll(req, res) {
    const { id } = req.query
    const { error } = mongoIdValidator.validate(req.query)
    if( error ) throw new BadUserRequestError("Please pass in a valid mongoId")

    const user = await User.findById(id)
    if(!user) throw new NotFoundError(`The user with this id: ${id}, does not exist`)

    const genres =  await MovieGenre.find({ creatorId: id }).populate("creator")

    return res.status(200).json({
      message: genres.length < 1 ? "No genres found" : "genres found successfully",
      status: "Success",
      data: {
        genres: genres
      }
    })
  }
  
}