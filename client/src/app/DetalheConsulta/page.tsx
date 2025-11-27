"use client";

import NavBar from "@/components/Navbar";
import Image from "next/image";
import arrow from "@/assets/arrow_back.svg";
import Cat from "@/assets/cat.svg";
import React from "react";
import ModalNovaConsulta from "@/components/modalnovaconsulta";
import Botao2 from "@/components/Botao2";
import CardConsulta from "@/components/CardConsulta";

export default function DetalheConsulta() {
  const consultaMock = [
    {
      data: "20/11",
      time: "11:00",
      type_appointment: "First Consulta",
      doctorName: "Dr. Marcelo",
    },
    {
      data: "20/11",
      time: "11:00",
      type_appointment: "First Consulta",
      doctorName: "Dr. Marcelo",
    },

    {
      data: "20/11",
      time: "11:00",
      type_appointment: "First Consulta",
      doctorName: "Dr. Marcelo",
    },

    {
      data: "20/11",
      time: "11:00",
      type_appointment: "First Consulta",
      doctorName: "Dr. Marcelo",
    },

    {
      data: "20/11",
      time: "11:00",
      type_appointment: "First Consulta",
      doctorName: "Dr. Marcelo",
    },

    {
      data: "20/11",
      time: "11:00",
      type_appointment: "First Consulta",
      doctorName: "Dr. Marcelo",
    },
  ];

  const [isModalOpen, setIsModalOpen] = React.useState(false);
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
              <div className="w-6 h-6 sm:w-8 sm:h-8">
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
                  <span className="font-bold text-lg sm:text-xl lg:text-2xl">Paciente</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start mt-6 sm:mt-8 gap-4 sm:gap-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-[295px] lg:h-[299px] flex-shrink-0">
                    <Image
                      src={Cat}
                      alt="Cat"
                      width={295}
                      height={299}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="sm:ml-6 mt-4 sm:mt-10 lg:mt-14 text-center sm:text-left">
                    <div>
                      <span className="font-bold text-lg sm:text-xl lg:text-2xl">Luna</span>
                    </div>
                    <div className="mt-2 sm:mt-3">
                      <span className="text-base sm:text-lg lg:text-xl text-gray-700">5 anos</span>
                    </div>
                    <div className="mt-8 sm:mt-16 lg:mt-28 w-full flex flex-col gap-2">
                      <span className="text-sm sm:text-base text-gray-600">Lucas Gomes</span>
                      <span className="text-sm sm:text-base text-gray-600">Dr. Carlos</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 sm:mt-10 w-full">
                  <div className="font-bold text-base sm:text-lg">
                    Descrição do problema:
                  </div>
                  <div className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a galley
                    of type and scrambled it to make a type specimen book. It has
                    survived not only five centuries.
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="font-bold text-base sm:text-lg">
                    Tipo de Consulta:
                  </div>
                  <div className="w-fit px-4 h-8 bg-[#AAE1FF] flex items-center justify-center rounded-md">
                    <span className="text-sm sm:text-base">Vacinação</span>
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
                        image_src="task_alt.svg"
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
                  {consultaMock.slice(0, 4).map((card, idx) => (
                    <CardConsulta key={idx} {...card} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ModalNovaConsulta onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
