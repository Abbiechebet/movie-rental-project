import {Router} from "express"
import GenreController from "../controller/movies.controller.js"
import { tryCatchHandler} from "../utils/tryCatch.handler.js"

const router = Router()

router.post("/create",  tryCatchHandler( GenreController.createGenre))

router.put("/update",  tryCatchHandler( GenreController.updateOneGenre))

router.get("/one",  tryCatchHandler( GenreController.getOneGenre))

router.get("/all_genres", tryCatchHandler( GenreController.findAll))

router.delete("/delete",  tryCatchHandler( GenreController.deleteOneGenre))

export {router}