"use client";
import NavBar from "@/components/Navbar";
import Card from "@/components/Card";
import Botao from "@/components/Botao";
import Image from "next/image";
import Arrow from "@/assets/arrow_back.svg";
import React from "react";
import { useForm } from "react-hook-form";
import cat from "@/assets/cat.svg";
import dog from "@/assets/dog.png";
import sheep from "@/assets/sheep.svg";
import horse from "@/assets/horse.svg";
import pig from "@/assets/pig.svg";
import cow from "@/assets/cow.svg";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import calendar_icon from "@/assets/calendar_month.svg";

export default function Atendimento() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<
    "agendamento" | "historico"
  >("agendamento");

  const cardsMock = [
    {
      type_appointment: "Retorno",
      patientName: "Sara",
      ownerName: "Vico Mac",
      doctorName: "Marcelo",
      date: "20/11",
      time: "11:00",
      animalIcon: cat,
      color: "bg-[#BFB5FF]",
    },
    {
      type_appointment: "Primeira consulta",
      patientName: "Rex",
      ownerName: "Ana Paula",
      doctorName: "João",
      date: "20/11",
      time: "12:30",
      animalIcon: dog,
      color: "bg-[#FF6419]",
    },
    {
      type_appointment: "Vacinacao",
      patientName: "Bela",
      ownerName: "Carlos",
      doctorName: "Mariana",
      date: "20/11",
      time: "14:00",
      animalIcon: sheep,
      color: "bg-[#9CFF95]",
    },
    {
      type_appointment: "Checkup",
      patientName: "Estrela",
      ownerName: "Luisa",
      doctorName: "Pedro",
      date: "20/11",
      time: "15:30",
      animalIcon: horse,
      color: "bg-[#AAE1FF]",
    },
    {
      type_appointment: "Historico",
      patientName: "Porquinho",
      ownerName: "Marco",
      doctorName: "Fernanda",
      date: "21/11",
      time: "09:00",
      animalIcon: pig,
      color: "bg-[#AAE1FF]",
    },

    {
      type_appointment: "Retorno",
      patientName: "Luna",
      ownerName: "Sofia",
      doctorName: "Ricardo",
      date: "21/11",
      time: "10:30",
      animalIcon: cat,
      color: "bg-[#BFB5FF]",
    },

  ];

  type FormData = {
    doctor: string;
  };

  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
    alert("Pesquisa enviada!");
  }

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
              <Image src={Arrow} alt="arrow back" className="w-6 h-6" />
              <p className="text-[32px] sm:text-[48px] ml-[16px] font-bold">Atendimento</p>
            </div>
          </div>

          <div className="w-full max-w-[660px] mt-[16px] bg-[#FFFFFF]">
            <div className="text-[20px] sm:text-[24px] text-[#000000] mb-4">
              <p>Qual é o médico?</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Pesquise Aqui..."
                    {...register("doctor")}
                    className="w-full h-[50px] pl-[16px] rounded-[8px] border border-black outline-none"
                  />
                </form>
              </div>
              <div className="w-full sm:w-[116px]">
                <button className="w-full h-[42px] bg-[#7D1AD7] text-white font-semibold rounded-full transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none">
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1532px] mt-[40px] bg-[#FFFFFF]">
            <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
              <div className="flex bg-[#F0F0F0] rounded-lg p-2 w-full lg:w-[243px]">
                <button
                  onClick={() => setSelectedTab("agendamento")}
                  className={`flex-1 h-[49px] rounded-[8px] transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base
                   ${selectedTab === "agendamento" ? "bg-[#FFFFFF]" : "bg-[#F0F0F0]"}`}
                >
                  Agendamento
                </button>

                <button
                  onClick={() => setSelectedTab("historico")}
                  className={`flex-1 h-[42px] rounded-[8px] transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base ${
                    selectedTab === "historico" ? "bg-[#FFFFFF]" : "bg-[#F0F0F0]"
                  }`}
                >
                  Histórico
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:ml-auto">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full sm:w-[126px] h-[56px] justify-between font-normal transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none"
                    >
                      {date
                        ? date.toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit", 
                            year: "2-digit",
                          })
                        : "dd/mm/aa"}

                      <Image
                        src={calendar_icon}
                        alt="calendar icon"
                        className="w-[20px] h-[20px]"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-full sm:w-[126px] h-[56px] justify-between font-normal transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none"
                    >
                      {date
                        ? date.toLocaleDateString("pt-BR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                          })
                        : "dd/mm/aa"}

                      <Image
                        src={calendar_icon}
                        alt="calendar icon"
                        className="w-[20px] h-[20px]"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        setDate(date);
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8 w-full max-w-[1536px] max-h-[400px] overflow-y-auto">
            {cardsMock.map((card, idx) => (
              <Card
                key={idx}
                {...card}
                color={selectedTab === "historico" ? "bg-[#F0F0F0]" : card.color}
              />
            ))}
          </div>

          <div className="flex justify-center sm:justify-end mt-8 mb-8">
            <Botao
              text="Nova Consulta"
              color="#50E678"
              image_src="/Vector.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
