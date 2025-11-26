import express from "express";
import userController from "./controllers/UserController";
import consultationController from "./controllers/ConsultationController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

// ROTAS DE CONSULTAS

routes.post("/consultation", consultationController.create);
routes.get("/consultation", consultationController.get);
routes.delete("/consultation/:id", consultationController.delete);
routes.put("/consultation/:id", consultationController.update);
routes.get("/consultation/pet/:id", consultationController.getByPetId);
routes.get("/consultation/dr/:drName", consultationController.getByPetDr);
routes.get(
  "/consultation/cards",
  consultationController.getAllCondultationsforthecards
);
routes.get(
  "/consultation/historic/:petid",
  consultationController.getConsultationForHistoric
);

// rota dinâmica de id deve ficar após rotas estáticas para evitar conflito com '/cards', '/pet', etc.
routes.get("/consultation/:id", consultationController.getById);

export default routes;
