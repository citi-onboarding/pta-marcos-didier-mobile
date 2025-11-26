import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class consultationRepository {
  async getAllConsultationsFromPatient() {
    // para o card
    try {
      const consultations = await prisma.consulta.findMany({
        select: {
          data: true,
          hora: true,
          medico: true,
          tipo: true,
          paciente: {
            select: {
              especie: true,
              nomeDoAnimal: true,
              nomeDono: true,
            },
          },
        },
      });
      return consultations;
    } catch (error) {
      console.error("Erro ao retornar todas as consultas:", error);
      throw error;
    }
  }

  async getAllConsultationsFromAPet(petid: string | number) {
    // para o historico de consultas do pet
    try {
      const consultations = await prisma.consulta.findMany({
        where: {
          idPaciente: Number(petid),
        },
        select: {
          data: true,
          hora: true,
          medico: true,
          tipo: true,
        },
      });
      return consultations;
    } catch (error) {
      console.error("Erro ao retornar todas as consultas:", error);
      throw error;
    }
  }
}
