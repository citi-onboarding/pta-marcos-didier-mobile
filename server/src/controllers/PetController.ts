import { Request, Response } from "express";
import { Citi, Crud } from "../global";

/**
 genero String
  idade Int
  especie Especies
  nomeDono String
  nomeDoAnimal String
*/

class PetController implements Crud {

    constructor(private readonly citi = new Citi("Paciente")) {}

    create = async (request: Request, response: Response) => {

        console.log("1. Chegou no Controller Create");

        try{
            const {genero, idade, especie, nomeDono, nomeDoAnimal} = request.body;

            const isAnyUndefined = this.citi.areValuesUndefined(
                genero,
                idade,
                especie,
                nomeDono,
                nomeDoAnimal
            );

            if (isAnyUndefined) return response.status(400).send();

            const newPet = {genero, idade, especie, nomeDono, nomeDoAnimal};

            const {httpStatus, message} = await this.citi.insertIntoDatabase(newPet);

            return response.status(httpStatus).send({message});

        }catch(error){
            return response.status(500).send({message: "Internal server error"});
        }
    }

    get = async(request: Request, response: Response) => {

        const {httpStatus, values} = await this.citi.getAll();

        return response.status(httpStatus).send(values);

    }

    delete = async(request: Request, response: Response) => {

        const { id } = request.params;

        const {httpStatus, messageFromDelete} = await this.citi.deleteValue(id);

        return response.status(httpStatus).send({messageFromDelete});
    }

    update = async(request: Request, response: Response) => {

        const { id } = request.params;

        const {genero, idade, especie, nomeDono, nomeDoAnimal} = request.body;

        const updatedValues = {genero, idade, especie, nomeDono, nomeDoAnimal};

        const {httpStatus, messageFromUpdate} = await this.citi.updateValue(
            id,
            updatedValues
        );

        return response.status(httpStatus).send({messageFromUpdate});
    }

}

export default new PetController();