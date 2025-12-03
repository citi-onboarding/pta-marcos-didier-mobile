"use client";

import NavBar from "@/components/Navbar";
import Image from "next/image";
import arrow from "@/assets/arrow_back.svg";
import Cat from "@/assets/cat.svg";
import React, { useEffect, useState } from "react";
import ModalNovaConsulta from "@/components/modalnovaconsulta";
import Botao2 from "@/components/Botao2";
import CardConsulta from "@/components/CardConsulta";
import { useParams, useRouter } from "next/navigation";
import { set } from "date-fns";
import api from "@/services/api";
import cat from "@/assets/cat.svg";
import dog from "@/assets/dog.png";
import sheep from "@/assets/sheep.svg";
import horse from "@/assets/horse.svg";
import pig from "@/assets/pig.svg";
import cow from "@/assets/cow.svg";


interface MappedHistoryItem {
  id: string;
  date: string;
  time: string;
  type_appointment: string;
  doctorName: string;
}

export default function DetalheConsulta() {
  const [loading, setLoading] = React.useState(false);
  const [consultaDetails, setConsultaDetails] = useState<any | null>(null);

  const [history, setHistory] = useState<MappedHistoryItem[]>([]);
  const params = useParams() as { ID?: string; id?: string };
  const id = params.ID ?? params.id; 

  const colorMap: Record<string, string> = {
    Retorno: "bg-[#FF641999]",
    PrimeiraConsulta: "bg-[#BFB5FF]",
    Vacinacao: "bg-[#AAE1FF]",
    CheckUp: "bg-[#9CFF95]",
  };

  const imgsporpet: Record<string, any> = {
    Gato: cat,
    Cachorro: dog,
    Bode: sheep,
    Girafa: cow,
    Cavalo: horse,
    Porco: pig,
  };

  useEffect(() => {
    async function fetchConsultaDetails() {
      try {
        setLoading(true);
        const response = await api.get(`/consultation/details/${id}`);
        const data = response.data;
        
        const mappedDetails = {
          petName: data.paciente.nomeDoAnimal,
          petAge: data.paciente.idade,
          ownerName: data.paciente.nomeDono,
          petSpecies: data.paciente.especie,
          doctorName: data.consulta.medico,
          problemDescription: data.consulta.descricao,
          consultationType: data.consulta.tipo,
          petId: data.consulta.idPaciente,
        };

        const mappedHistory: MappedHistoryItem[] = Array.isArray(data.historico)
          ? data.historico
              .map((item: any): MappedHistoryItem => ({
                id: item.id || Math.random().toString(),
                date: item.data, // Ex: "05/12"
                time: item.hora, // Ex: "17:00"
                type_appointment: item.tipo,
                doctorName: item.medico,
              }))
              .filter((item: MappedHistoryItem) => {
                //monta a data completa usando o Ano Atual
                const [dia, mes] = item.date.split('/');
                const anoAtual = new Date().getFullYear();
                
                //formato ISO: YYYY-MM-DDTHH:mm
                const dataCompleta = new Date(`${anoAtual}-${mes}-${dia}T${item.time}`);
                
                //true se for passado
                return dataCompleta < new Date();
              })
              .sort((a: MappedHistoryItem, b: MappedHistoryItem) => {
                const anoAtual = new Date().getFullYear();

                const [diaA, mesA] = a.date.split('/');
                const dataA = new Date(`${anoAtual}-${mesA}-${diaA}T${a.time}`);

                const [diaB, mesB] = b.date.split('/');
                const dataB = new Date(`${anoAtual}-${mesB}-${diaB}T${b.time}`);

          // Ordem decrescente (mais recente primeiro)
          return dataB.getTime() - dataA.getTime();
        })
        : [];

          {console.log(data.historico)}

        setConsultaDetails(mappedDetails);
        setHistory(mappedHistory);
      } catch (error) {
        console.error("Erro ao buscar detalhes da consulta:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
        fetchConsultaDetails();
    }
  }, [id]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-1 flex-col bg-[#FFFFFF] min-h-screen">
      <div className="w-full flex flex-col">
        <div className="w-full">
          <NavBar />
          <div className="h-px w-full bg-gray-200" role="separator" />
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-[165px]">
          <div className="pt-[40px] w-full">
            <div className="flex items-center">
              <div
                className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
                onClick={() => router.back()}
              >
                <Image src={arrow} alt="Back arrow" className="w-full h-full" />
              </div>
              <div className="ml-4 font-bold text-2xl sm:text-3xl lg:text-[48px]">
                Detalhes da Consulta
              </div>
            </div>
          </div>

          <div className="w-full mt-[40px] overflow-y-auto">
            <div className="flex flex-col xl:flex-row xl:gap-20">
              <div className="flex flex-col flex-1">
                <div className="w-full">
                  <span className="font-bold text-lg sm:text-xl lg:text-2xl">
                    Paciente
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start mt-6 sm:mt-8 gap-4 sm:gap-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-[295px] lg:h-[299px] flex-shrink-0">
                    {/*verificacao segura da imagem*/}
                    <Image
                      src={imgsporpet[consultaDetails?.petSpecies] || cat} 
                      alt={consultaDetails?.petSpecies || "Pet"}
                      width={295}
                      height={299}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="sm:ml-6 mt-4 sm:mt-10 lg:mt-14 text-center sm:text-left">
                    <div>
                      <span className="font-bold text-lg sm:text-xl lg:text-2xl">
                        {consultaDetails?.petName || "Nome do Pet"}
                      </span>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <span className="text-base sm:text-lg lg:text-xl text-gray-700">
                        {consultaDetails?.petAge || "Idade do Pet"} anos
                      </span>
                    </div>
                    <div className="mt-8 sm:mt-16 lg:mt-28 w-full flex flex-col gap-2">
                      <span className="text-sm sm:text-base text-gray-600">
                        {consultaDetails?.ownerName || "Nome do Dono"}
                      </span>
                      <span className="text-sm sm:text-base text-gray-600">
                        Dr. {consultaDetails?.doctorName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10 w-full">
                  <div className="font-bold text-base sm:text-lg">
                    Descrição do problema:
                  </div>
                  <div className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                    {consultaDetails?.problemDescription ||
                      "Descrição detalhada do problema apresentado pelo pet durante a consulta."}
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="font-bold text-base sm:text-lg">
                    Tipo de Consulta:
                  </div>
                  <div
                    className={`w-fit px-4 h-8 ${
                      colorMap[
                        consultaDetails?.consultationType || "bg-transparent"
                      ]
                    } flex items-center justify-center rounded-md`}
                  >
                    <span className="text-sm sm:text-base">
                      {consultaDetails?.consultationType}
                    </span>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 w-full">
                  <div className="rounded-2xl bg-[#FAFAFA] w-full flex flex-col items-center py-6 px-4">
                    <span className="font-bold text-base sm:text-lg text-center">
                      Deseja realizar outra consulta?
                    </span>

                    <div className="mt-4 w-full flex justify-center max-w-xs">
                      <Botao2
                        text="Agendamento"
                        color="#50E678"
                        width="100%"
                        height="48px"
                        image_src="../task_alt.svg"
                        onClick={() => setIsModalOpen(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full xl:max-w-[558px] mt-8 xl:mt-0">
                <div>
                  <span className="font-bold text-lg sm:text-xl lg:text-[24px]">
                    Histórico de Consultas
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 w-full mt-6 rounded-[24px] border border-dashed border-gray-300 justify-items-center pt-6 pb-6 min-h-[300px]">
                  {history.length > 0 ? (
                    history.slice(0, 4).map((card, idx) => (
                      <CardConsulta key={card.id || idx} {...card} />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      Nenhum histórico recente.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && consultaDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ModalNovaConsulta
            onClose={() => setIsModalOpen(false)}
            idPaciente={consultaDetails.petId}
            descricao={consultaDetails.problemDescription}
          />
        </div>
      )}
    </div>
  );
}