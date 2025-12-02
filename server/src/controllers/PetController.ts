import { Request, Response } from "express";
import { Citi, Crud } from "../global";
import petRepository from "../repository/pet";

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

            const petRep = new petRepository();

            const {httpStatus, message, createdPet} = await petRep.insertNewPetIntoDatabase(newPet);

            //const {httpStatus, message, createdPet} = await this.citi.insertIntoDatabase(newPet);

            return response.status(httpStatus).send({message, createdPet});

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

    getById = async(request: Request, response: Response) => {

        const { id } = request.params;

        const {httpStatus, value} = await this.citi.findById(id);

        return response.status(httpStatus).send(value);
    }

}

export default new PetController();