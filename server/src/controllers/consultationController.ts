import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import { consultationRepository } from "../repository/consultation";

class consultationController implements Crud {
  constructor(private readonly citi = new Citi("Consulta")) {}

  private readonly consultationRepo = new consultationRepository();

  create = async (request: Request, response: Response) => {
    const { medico, descricao, tipo, data, hora, idPaciente } = request.body;

    const isAnyUndefined = this.citi.areValuesUndefined(
      medico,
      descricao,
      tipo,
      data,
      hora,
      idPaciente
    );
    if (isAnyUndefined) return response.status(400).send();

    const newConsultation = { medico, descricao, tipo, data, hora, idPaciente };
    const { httpStatus, message } = await this.citi.insertIntoDatabase(
      newConsultation
    );

    return response.status(httpStatus).send({ message });
  };

  get = async (request: Request, response: Response) => {
    const { httpStatus, values } = await this.citi.getAll();

    return response.status(httpStatus).send(values);
  };

  getById = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { httpStatus, value } = await this.citi.findById(id);

    return response.status(httpStatus).send(value);
  };

  delete = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { httpStatus, messageFromDelete } = await this.citi.deleteValue(id);

    return response.status(httpStatus).send({ messageFromDelete });
  };

  update = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { medico, descricao, tipo, data, hora } = request.body;

    const updatedValues = { medico, descricao, tipo, data, hora };

    const { httpStatus, messageFromUpdate } = await this.citi.updateValue(
      id,
      updatedValues
    );

    return response.status(httpStatus).send({ messageFromUpdate });
  };

  getByPetId = async (request: Request, response: Response) => {
    const { id } = request.params;
    const { httpStatus, values } = await this.citi.getConsultsByPet(id);

    return response.status(httpStatus).send(values);
  };

  getByPetDr = async (request: Request, response: Response) => {
    const { drName } = request.params;
    const { httpStatus, values } = await this.citi.getConsultsByDr(drName);

    return response.status(httpStatus).send(values);
  };

  getAllCondultationsforthecards = async (
    request: Request,
    response: Response
  ) => {
    try {
      const consultations =
        await this.consultationRepo.getAllConsultationsFromPatient();
      return response.status(200).send(consultations);
    } catch (error) {
      console.error("Erro ao buscar consultas para cards:", error);
      return response
        .status(500)
        .send({ error: "Erro interno ao buscar consultas" });
    }
  };

  getConsultationForHistoric = async (request: Request, response: Response) => {
    try {
      const { petid } = request.params;
      const consultations =
        await this.consultationRepo.getAllConsultationsFromAPet(petid);
      return response.status(200).send(consultations);
    } catch (error) {
      console.error("Erro ao buscar consultas para cards:", error);
      return response
        .status(500)
        .send({ error: "Erro interno ao buscar consultas" });
    }
  };

  getConsultationDetailsByConsultationId = async (
    request: Request,
    response: Response
  ) => {
    try {
      const { id } = request.params;
      const details =
        await this.consultationRepo.getConsultationDetailsByConsultationId(id);

      if (!details)
        return response.status(404).send({ error: "Consulta não encontrada" });

      return response.status(200).send(details);
    } catch (error) {
      console.error("Erro ao buscar detalhes da consulta:", error);
      return response
        .status(500)
        .send({ error: "Erro interno ao buscar detalhes da consulta" });
    }
  };
}

export default new consultationController();
