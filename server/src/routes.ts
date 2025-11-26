import express from "express";
import userController from "./controllers/UserController";
import petController from "./controllers/PetController";
import consultationController from "./controllers/consultationController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/pet", petController.create);
routes.get("/pet", petController.get);
routes.delete("/pet/:id", petController.delete);
routes.put("/pet/:id", petController.update);

// ROTAS DE CONSULTAS

routes.post("/consultation", consultationController.create);
routes.get("/consultation", consultationController.get);
routes.delete("/consultation/:id", consultationController.delete);
routes.put("/consultation/:id", consultationController.update);
routes.get("/consultation/:id", consultationController.getById);
routes.get("/consultation/pet/:id", consultationController.getByPetId);
routes.get("/consultation/dr/:drName", consultationController.getByPetDr);

export default routes;
