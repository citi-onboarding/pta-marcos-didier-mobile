import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class consultationRepository {
  async getAllConsultationsFromPatient() {
    // para o card
    try {
      const consultations = await prisma.consulta.findMany({
        select: {
          id: true,
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
          id: true,
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

  async getConsultationDetailsByConsultationId(
    consultationId: string | number
  ) {
    try {
      const consulta = await prisma.consulta.findUnique({
        // a variavel consulta guarda os dados da consulta e do paciente (com id pra usar dps)
        where: { id: Number(consultationId) },
        select: {
          id: true,
          medico: true,
          descricao: true,
          tipo: true,
          idPaciente: true, // pega o id pra pegar o historico dps
          paciente: {
            select: {
              idade: true,
              especie: true,
              nomeDono: true,
              nomeDoAnimal: true,
            },
          },
        },
      });

      if (!consulta) return null;

      const historico = await prisma.consulta.findMany({
        // igual a funcao de cima que pegava so o historico
        where: { idPaciente: Number(consulta.idPaciente) },
        select: {
          id: true,
          data: true,
          hora: true,
          medico: true,
          tipo: true,
        },
      });

      return {
        // return formatado
        paciente: consulta.paciente,
        consulta: {
          id: consulta.id,
          medico: consulta.medico,
          descricao: consulta.descricao,
          tipo: consulta.tipo,
          idPaciente: consulta.idPaciente,
        },
        historico,
      };
    } catch (error) {
      console.error(
        "Erro ao buscar detalhes da consulta e histórico do paciente:",
        error
      );
      throw error;
    }
  }

  async getCardsByDr(drName: string) {
    try {
      const consultations = await prisma.consulta.findMany({
        where: {
          medico: drName,
        },
        select: {
          id: true,
          data: true,
          hora: true,
          medico: true,
          tipo: true,
          paciente: {
            select: {
              idade: true,
              especie: true,
              nomeDono: true,
              nomeDoAnimal: true,
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
}
