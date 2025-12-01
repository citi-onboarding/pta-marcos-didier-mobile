import express from "express";
import userController from "./controllers/UserController";
import petController from "./controllers/PetController";
import consultationController from "./controllers/consultationController";
import mailController from "./controllers/mailController";

const routes = express.Router();

// ROTA DE ENVIO DE EMAIL

routes.post("/send-email", mailController.send);

// RESTO DO CÓDIGO

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/pet", petController.create);
routes.get("/pet", petController.get);
routes.delete("/pet/:id", petController.delete);
routes.put("/pet/:id", petController.update);
routes.get("/pet/:id", petController.getById);

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

routes.get(
  "/consultation/drcards/:drName",
  consultationController.getCardsByDr
);

//detalhes da consulta
routes.get(
  "/consultation/details/:id",
  consultationController.getConsultationDetailsByConsultationId
);

// rota dinâmica de id deve ficar após rotas estáticas para evitar conflito com '/cards', '/pet', etc.
routes.get("/consultation/:id", consultationController.getById);

export default routes;
