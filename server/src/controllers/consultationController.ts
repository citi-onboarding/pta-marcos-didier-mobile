import { Request, Response } from "express";
import { Citi, Crud } from "../global";

class consultationController implements Crud {
  constructor(private readonly citi = new Citi("Consulta")) {}

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
}

export default new consultationController();
