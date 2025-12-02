import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class petRepository{

    async insertNewPetIntoDatabase(newPet: any){
        try{
            const createdPet = await prisma.paciente.create({
                data: newPet
            })
            return {httpStatus: 201, message: "Pet created successfully", createdPet};
        }catch(error){
            console.log("Erro ao inserir novo pet no banco de dados:", error);
            return {httpStatus: 500, message: "Internal server error"};
        }
    }
}