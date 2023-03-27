// importando core da rota
import * as express from "express"
import { Request, Response } from "express"

//importando service da rota
import UserController from "../controllers/UserController"
const userController = new UserController()

//criando rotas
const userRoutes  = express.Router()

userRoutes.post("/users", (req: Request,res: Response) => {userController.create(req,res)})
userRoutes.get("/users", (req: Request,res: Response) => {userController.getAll(req,res)})
userRoutes.get("/users/:id", (req: Request,res: Response) => {userController.getById(req,res)})
userRoutes.patch("/users/:id", (req: Request,res: Response) => {userController.updateById(req,res)})
userRoutes.delete("/users/:id", (req: Request,res: Response) => {userController.removeById(req,res)})

export default userRoutes