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
    <div className="flex flex-1 flex-col bg-[#FFFFFF] items-center h-screen overflow-auto">
      <div className="w-[1920px] h-[1080px] flex flex-col overflow-auto">
        <div className="w-full h-[114px]">
          <NavBar />
          <div className="h-px w-full bg-gray-200" role="separator" />
        </div>
        <div className="flex">
          <div className="flex flex-col">
            <div className="mt-[48px] w-[624px] h-[53px] ml-[194px] flex items-center">
              <div className="w-[32px] h-[32px]">
                <Image src={arrow} alt="Back arrow" />
              </div>

              <div className="ml-[16px] font-bold text-[48px]">
                Detalhes da Consulta
              </div>
            </div>

            <div className="ml-[194px] mt-[32px] w-[96px] h-[26px] text-[24px]">
              <span className="font-bold">Paciente</span>
            </div>

            <div className="flex ml-[194px] mt-[32px] gap-6">
              <div className="w-[295px] h-[299px]">
                <Image src={Cat} alt="Cat" width={295} height={299} />
              </div>
              <div className="ml-[45px] mt-[56px]">
                <div>
                  <span className="font-bold text-[24px]">Luna</span>
                </div>
                <div>
                  <span className="text-[24px] mt-[12px]">5 anos</span>
                </div>
                <div className="mt-[126px] w-[101px] flex flex-col gap-[12px]">
                  <div>
                    <span className="text-[16px]">Lucas Gomes</span>
                  </div>
                  <div>Dr. Carlos</div>
                </div>
              </div>
            </div>

            <div className="mt-[60px] w-[631px] h-[102px] ml-[194px]">
              <div className="font-bold text-[16px]">
                Descrição do problema:
              </div>
              <div className="mt-[12px] text-[16px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries.
              </div>
            </div>

            <div className="ml-[194px] w-[294px] h-[30px] mt-[50px] flex gap-[16px] items-center">
              <div className="font-bold text-[16px]">Tipo de Consulta:</div>
              <div className="w-[101px] h-[30px] ml-[24px] bg-[#AAE1FF] flex items-center justify-center rounded-[4px]">
                <span className="text-[16px]">Vacinação</span>
              </div>
            </div>

            <div className="w-[624px] h-[138px] ml-[194px] mt-[40px] rounded-[24px] bg-[#FAFAFA] flex flex-col items-center">
              <div className="mt-[24px]">
                <span className="font-bold text-[16px]">
                  Deseja realizar outra consulta?
                </span>
              </div>

              <div className="mt-[16px]">
                <Botao2
                  text="Agendamento"
                  color="#50E678"
                  width="576px"
                  height="48px"
                  image_src="task_alt.svg"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>

              {isModalOpen && (
                <ModalNovaConsulta onClose={() => setIsModalOpen(false)} />
              )}
            </div>
          </div>
          <div className="w-[558px] mt-[133px] ml-[339px]">
            <div>
              <span className="font-bold text-[24px]">
                Histórico de Consultas
              </span>
            </div>

            <div
              className="grid grid-cols-1 gap-y-6 w-[558px] h-[448px] mt-[32px]
  rounded-[24px] border border-dashed overflow-y-auto
  justify-items-center pt-6"
            >
              {consultaMock.map((card, idx) => (
                <CardConsulta key={idx} {...card} />
              ))}
            </div>

            <div className="mt-[32px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
