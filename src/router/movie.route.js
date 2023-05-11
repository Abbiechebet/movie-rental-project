import {Router} from "express"
import GenreController from "../controller/movies.controller.js"
import { tryCatchHandler} from "../utils/tryCatch.handler.js"
import {userAuthMiddleWare} from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/create", userAuthMiddleWare, tryCatchHandler( GenreController.createGenre))

router.put("/update", userAuthMiddleWare, tryCatchHandler( GenreController.updateOneGenre))

router.get("/one", userAuthMiddleWare, tryCatchHandler( GenreController.getOneGenre))

router.get("/all_genres", userAuthMiddleWare, tryCatchHandler( GenreController.findAll))

router.delete("/delete", userAuthMiddleWare, tryCatchHandler( GenreController.deleteOneGenre))

export {router}