import express from "express";
import userController from "./controllers/UserController";
import consulptationController from "./controllers/consulptationController";

const routes = express.Router();

routes.post("/user", userController.create);
routes.get("/user", userController.get);
routes.delete("/user/:id", userController.delete);
routes.patch("/user/:id", userController.update);

routes.post("/consultation", consulptationController.create);
routes.get("/consultation", consulptationController.get);
routes.delete("/consultation/:id", consulptationController.delete);
routes.patch("/consultation/:id", consulptationController.update);
routes.get("/consultation/:id", consulptationController.getbyid);

export default routes;
