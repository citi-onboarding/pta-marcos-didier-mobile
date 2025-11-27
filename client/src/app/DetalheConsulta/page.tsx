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
    <div className="w-full max-w-screen-2xl flex flex-col px-4 md:px-10 lg:px-20 mx-auto">
      <div className="w-full flex flex-col overflow-auto">
        <div className="w-full h-28">
          <NavBar />
          <div className="h-px w-full bg-gray-200" role="separator" />
        </div>
        <div className="flex lg:flex-row lg:gap-20">
          <div className="flex flex-col">
            <div className="mt-8 w-full max-w-3xl flex items-center mx-auto lg:mx-0">
              <div className="w-8 h-8">
                <Image src={arrow} alt="Back arrow" />
              </div>

              <div className="ml-4 font-bold text-2xl md:text-3xl lg:text-4xl">
                Detalhes da Consulta
              </div>
            </div>

            <div className="mt-6 w-full px-4 md:px-0">
              <span className="font-bold text-xl md:text-2xl">Paciente</span>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start mt-8 gap-6 px-4 md:px-0">
              <div className="w-48 h-48 md:w-[295px] md:h-[299px] flex-shrink-0">
                <Image
                  src={Cat}
                  alt="Cat"
                  width={240}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:ml-6 mt-10 md:mt-14">
                <div>
                  <span className="font-bold text-xl md:text-xl">Luna</span>
                </div>
                <div className="mt-3">
                  <span className="text-xl md:text-xl">5 anos</span>
                </div>
                <div className="mt-16 md:mt-28 w-full flex flex-col gap-2">
                  <span className="text-base md:text-base">Lucas Gomes</span>
                  <span className="text-base md:text-base">Dr. Carlos</span>
                </div>
              </div>
            </div>

            <div className="mt-10 w-full max-w-3xl mx-auto lg:mx-0 px-4">
              <div className="font-bold text-base md:text-base">
                Descrição do problema:
              </div>
              <div className="mt-3 text-base md:text-base">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </div>
            </div>

            <div className="mt-4 w-full max-w-3xl mx-auto lg:mx-0 px-4 flex flex-col md:flex-row md:items-center gap-3">
              <div className="font-bold text-base md:text-base">
                Tipo de Consulta:
              </div>
              <div className="w-fit px-4 h-8 bg-[#AAE1FF] flex items-center justify-center rounded-md">
                <span className="text-base md:text-base">Vacinação</span>
              </div>
            </div>

            <div className="mt-6 w-full max-w-3xl mx-auto lg:mx-0 px-4">
              <div className="rounded-2xl bg-[#FAFAFA] w-full flex flex-col items-center py-4">
                <span className="font-bold text-base md:text-base">
                  Deseja realizar outra consulta?
                </span>

                <div className="mt-4 w-full flex justify-center">
                  <Botao2
                    text="Agendamento"
                    color="#50E678"
                    width="90%"
                    height="48px"
                    image_src="task_alt.svg"
                    onClick={() => setIsModalOpen(true)}
                  />
                </div>
              </div>
              {isModalOpen && (
                <ModalNovaConsulta onClose={() => setIsModalOpen(false)} />
              )}
            </div>
          </div>
          <div className="w-full max-w-[558px] mt-14 lg:mx-0 px-4">
            <div>
              <span className="font-bold text-[22px] md:text-[24px]">
                Histórico de Consultas
              </span>
            </div>

            <div
              className="grid grid-cols-1 gap-y-6 
      w-full max-w-[400px] sm:max-w-[350px] md:max-w-[450px] 
      mt-6
      rounded-[24px] border border-dashed
      justify-items-center 
      pt-6 pb-6
      min-h-[300px]"
            >
              {consultaMock.slice(0, 4).map((card, idx) => (
                <CardConsulta key={idx} {...card} />
              ))}
            </div>

            <div className="mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
