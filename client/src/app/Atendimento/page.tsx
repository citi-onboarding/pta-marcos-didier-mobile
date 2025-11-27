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

    {
      type_appointment: "Retorno",
      patientName: "Luna",
      ownerName: "Sofia",
      doctorName: "Ricardo",
      date: "21/11",
      time: "10:30",
      animalIcon: cat,
      color: "bg-[#BFB5FF]",
    }
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

        <div className="w-full px-4 sm:px-8 lg:px-[165px] flex flex-col h-full">
          <div className="pt-[40px] w-full">
            <div className="flex items-center">
              <div className="w-6 h-6 sm:w-8 sm:h-8">
                <Image src={Arrow} alt="arrow back" className="w-full h-full" />
              </div>
              <p className="text-2xl sm:text-3xl lg:text-[48px] ml-4 font-bold">Atendimento</p>
            </div>
          </div>

          <div className="w-full max-w-2xl mt-4 lg:mt-6">
            <div className="w-full">
              <p className="text-lg sm:text-xl lg:text-[24px] font-medium">Qual é o médico?</p>
            </div>

            <div className="w-full mt-6 items-center flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <input
                    type="text"
                    placeholder="Pesquise Aqui..."
                    {...register("doctor")}
                    className="w-full h-12 sm:h-[50px] pl-4 rounded-lg border border-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base"
                  />
                </form>
              </div>
              <div className="w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-full sm:w-[116px] h-10 sm:h-[42px] bg-[#7D1AD7] text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          <div className="w-full mt-8 lg:mt-[40px] bg-[#FFFFFF] flex flex-col lg:flex-row lg:justify-between">
            <div className="w-full lg:w-auto bg-[#F0F0F0] rounded-lg p-2 flex">
              <button
                onClick={() => setSelectedTab("agendamento")}
                className={`flex-1 lg:w-[159px] h-12 lg:h-[49px] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base font-medium ${
                  selectedTab === "agendamento" ? "bg-[#FFFFFF] shadow-sm" : "bg-[#F0F0F0]"
                }`}
              >
                Agendamento
              </button>

              <button
                onClick={() => setSelectedTab("historico")}
                className={`flex-1 lg:w-[92px] h-12 lg:h-[42px] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base font-medium ${
                  selectedTab === "historico" ? "bg-[#FFFFFF] shadow-sm" : "bg-[#F0F0F0]"
                }`}
              >
                Histórico
              </button>
            </div>

            <div className="flex gap-4 mt-4 lg:mt-0">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="flex-1 lg:w-[126px] h-12 lg:h-[56px] justify-between font-normal transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base"
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
                      className="w-5 h-5"
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
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-end"
                    className="flex-1 lg:w-[126px] h-12 lg:h-[56px] justify-between font-normal transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base"
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
                      className="w-5 h-5"
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

          <div className="flex-1 flex flex-col mt-6">
            <div className="w-full overflow-y-auto" style={{ maxHeight: 'calc(100vh - 400px)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-6">
                {cardsMock.map((card, idx) => (
                  <Card
                    key={idx}
                    {...card}
                    color={
                      selectedTab === "historico" ? "bg-[#F0F0F0]" : card.color
                    }
                  />
                ))}
              </div>
            </div>

            <div className="w-full flex justify-center lg:justify-end mt-8 lg:mt-[60px] mb-8 flex-shrink-0">
              <div className="w-full sm:w-auto max-w-xs lg:max-w-none">
                <Botao
                  text="Nova Consulta"
                  color="#50E678"
                  image_src="/Vector.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
